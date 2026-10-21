#!/usr/bin/env python3
"""Adversarial suite: proves every rule rejects a bad PageSpec, and that real structures pass.

Controls (must produce zero errors and zero warnings):
  * the bundled example (schema/example.pagespec.json, real /mail copy);
  * one PageSpec per template, synthesized generically from templates.json (each node at its
    realCount / realVariant / realBackground) and minimal fixture content built from the section
    contracts. A new or split template is covered automatically, with no new control code.
Mutations (must each produce at least one error from the expected rule).
Warn cases (must produce the expected warning and zero errors: warnings never fail).

    python3 -I schema/tests/adversarial_test.py
"""
import copy
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, os.path.join(REPO, "schema"))
import semantic_validate as sv  # noqa: E402

CTX = sv.load_context()
SAMPLE = "Northstar sample copy for this field"
EYEBROW = "01 / 05 · NORTHSTAR"


# ---------------------------------------------------------------- fixtures from contracts
def sample(f):
    if f.get("pattern"):
        return EYEBROW
    return SAMPLE[: f["maxChars"]].rstrip() or "N"


def fixture_field(f, variant):
    k = f["kind"]
    if k in ("text", "richText"):
        return sample(f)
    if k == "paragraphs":
        return [sample(f)] * max(f["minItems"], 1)
    if k == "cta":
        return {"label": sample(f), "variant": f["variants"][0]}
    if k == "ctaList":
        return [{"label": sample(f), "variant": f["variants"][0]}] * f["minItems"]
    if k == "media":
        return {"slotId": "fixture-slot", "assetRole": f["assetRoles"][0]}
    if k == "mediaList":
        return [{"slotId": "fixture-slot", "assetRole": f["assetRoles"][0]}] * f["minItems"]
    if k == "items":
        return [fixture_obj(f["fields"], variant) for _ in range(f["minItems"])]
    if k == "enum":
        return f["values"][0]
    if k == "boolean":
        return False
    if k == "faqAnswer":
        return [sample(f)]
    raise ValueError(k)


def fixture_obj(fields, variant):
    out = {}
    for name, f in fields.items():
        only = f.get("onlyForVariants")
        if only and variant not in only:
            continue
        if f.get("required") or variant in f.get("requiredForVariants", []):
            out[name] = fixture_field(f, variant)
    return out


def fixture_node(section_id, variant, background):
    s = CTX["sections"][section_id]
    if variant is None and s["variants"]:
        variant = sorted(s["variants"])[0]
    content = fixture_obj(s["content"], variant)
    for field, rng in (s.get("variantItemCounts", {}).get(variant) or {}).items():
        content[field] = [content[field][0]] * rng[0]
    for field, flag in (s.get("exactlyOneTrue") or {}).items():
        content[field] = [dict(it) for it in content[field]]
        content[field][0][flag] = True
    mot = s["motion"]
    pat = (mot.get("byVariant") or {}).get(variant) or mot.get("default") or mot["allowedPatterns"][0]
    n = {"section": section_id}
    if variant:
        n["variant"] = variant
    n.update({"background": background, "context": CTX["surfaces"][background]["context"],
              "motion": {"pattern": pat, "reducedMotionFallback": CTX["patterns"][pat]["reducedMotionFallback"]},
              "content": content})
    return n


def template_control(tid):
    t = CTX["templates"][tid]
    nodes = []
    for tn in t["nodes"]:
        variant = tn.get("realVariant") or (tn["variants"][0] if tn["variants"] else None)
        for _ in range(tn["realCount"]):
            nodes.append(fixture_node(tn["section"], variant, tn["realBackground"]))
    return {"pageSpecVersion": "1.0.0", "template": tid, "route": t["routes"][0], "title": f"Control for {tid}", "nodes": nodes}


with open(os.path.join(REPO, "schema", "example.pagespec.json"), encoding="utf-8") as fh:
    EXAMPLE = json.load(fh)


def base(name):
    return copy.deepcopy(EXAMPLE if name == "example" else template_control(name))


def idx(spec, section, nth=0):
    hits = [i for i, n in enumerate(spec["nodes"]) if n["section"] == section]
    return hits[nth]


def node(spec, section, nth=0):
    return spec["nodes"][idx(spec, section, nth)]


# ---------------------------------------------------------------- mutations
def m(fn):
    def apply(spec):
        fn(spec)
        return spec
    return apply


def _set(path_fn, value):
    return m(lambda s: path_fn(s).update(value))


def swap(a, b):
    def f(s):
        i, j = idx(s, a), idx(s, b)
        s["nodes"][i], s["nodes"][j] = s["nodes"][j], s["nodes"][i]
    return m(f)


def long_words(n):
    return " ".join(["go"] * n)


MUTATIONS = [
    # --- schema layer
    ("bad-template-enum", "schema", "example", m(lambda s: s.update(template="landing-page")), "TEMPLATE_KNOWN"),
    ("invented-section-type", "schema", "example", m(lambda s: s["nodes"][4].update(section="hero.mega")), "SCHEMA"),
    ("missing-motion", "schema", "example", m(lambda s: s["nodes"][4].pop("motion")), "SCHEMA"),
    ("missing-reduced-motion-fallback", "schema", "example", m(lambda s: s["nodes"][1]["motion"].pop("reducedMotionFallback")), "REDUCED_MOTION_FALLBACK"),
    ("wrong-reduced-motion-fallback", "schema", "example", m(lambda s: node(s, "proof.logo-strip")["motion"].update(reducedMotionFallback="no-animation")), "REDUCED_MOTION_FALLBACK"),
    ("invented-motion-field", "schema", "example", m(lambda s: s["nodes"][4]["motion"].update(inventedAnimation="spin")), "SCHEMA"),
    ("tampered-motion-duration", "schema", "example", m(lambda s: node(s, "proof.logo-strip")["motion"].update(durationMs=900)), "SCHEMA"),
    ("invented-asset-role", "schema", "example", m(lambda s: node(s, "stat.band")["content"]["backgroundArt"].update(assetRole="stock.photo")), "SCHEMA"),
    ("real-but-wrong-asset-role", "schema", "example", m(lambda s: node(s, "quotes.grid")["content"]["items"][0]["avatar"].update(assetRole="product.ui-illustration")), "ASSET_ROLE_ALLOWED"),
    ("extra-content-property", "schema", "example", m(lambda s: node(s, "cta.band")["content"].update(subtitle="Extra field")), "SCHEMA"),
    ("unknown-variant", "schema", "example", m(lambda s: node(s, "proof.logo-strip").update(variant="marquee")), "SCHEMA"),
    ("variant-on-variantless-section", "schema", "example", m(lambda s: node(s, "stat.band").update(variant="wide")), "SCHEMA"),
    ("raw-hex-background", "schema", "example", m(lambda s: s["nodes"][4].update(background="#ff00ff")), "SCHEMA"),
    ("invented-emphasis", "schema", "example", m(lambda s: node(s, "intro.section")["content"]["title"][1].update(emphasis="rainbow")), "SCHEMA"),
    ("chapter-eyebrow-pattern", "schema", "product-chapters", m(lambda s: node(s, "chapter.intro")["content"].update(eyebrow="Chapter one")), "SCHEMA"),
    # --- structural
    ("duplicate-header", "structural", "example", m(lambda s: s["nodes"].insert(1, copy.deepcopy(s["nodes"][0]))), "ONE_PER_PAGE"),
    ("missing-footer", "structural", "example", m(lambda s: s["nodes"].pop()), "FOOTER_LAST"),
    ("header-not-first", "structural", "example", swap("shell.header", "hero.product-video"), "HEADER_FIRST"),
    ("removed-required-section", "structural", "example", m(lambda s: s["nodes"].pop(idx(s, "stat.band"))), "TEMPLATE_SEQUENCE"),
    ("reordered-sections", "structural", "example", swap("grid.cards", "quotes.grid"), "TEMPLATE_SEQUENCE"),
    ("template-node-mismatch", "structural", "example", m(lambda s: s.update(template="product-chapters", route="/new-page")), "TEMPLATE_SEQUENCE"),
    ("route-template-binding", "structural", "example", m(lambda s: s.update(template="product-chapters")), "ROUTE_TEMPLATE_BINDING"),
    ("repeatable-max-exceeded", "structural", "example", m(lambda s: s["nodes"].insert(idx(s, "split.feature"), copy.deepcopy(node(s, "split.feature")))), "TEMPLATE_SEQUENCE"),
    ("variant-not-in-template", "structural", "example", m(lambda s: (node(s, "quotes.grid").update(variant="logo"), [it.pop("avatar") for it in node(s, "quotes.grid")["content"]["items"]])), "TEMPLATE_SEQUENCE"),
    ("banner-off-home", "structural", "example", m(lambda s: s["nodes"].insert(1, fixture_node("shell.banner", None, "purple-10"))), "HOME_ROUTE_ONLY"),
    ("carousel-off-home", "structural", "example", m(lambda s: s["nodes"].insert(1, fixture_node("hero.carousel", None, "hero-gradient"))), "HOME_ROUTE_ONLY"),
    ("two-heroes", "structural", "split-hero-solutions", m(lambda s: s["nodes"].insert(2, fixture_node("hero.centered", None, "neutral-10"))), "ONE_HERO"),
    ("hero-not-after-header", "structural", "example", swap("hero.product-video", "proof.logo-strip"), "HERO_POSITION"),
    ("pricing-gains-a-hero", "structural", "pricing", m(lambda s: s["nodes"].insert(1, fixture_node("hero.split", None, "purple-0"))), "ONE_HERO"),
    ("pricing-order", "structural", "pricing", swap("pricing.suite-intro", "pricing.plan-cards"), "PRICING_ORDER"),
    ("sticky-rows-without-chapter", "structural", "product-chapters", m(lambda s: s["nodes"].pop(idx(s, "chapter.intro"))), "STICKY_ROWS_NEED_CHAPTER"),
    ("group-split", "structural", "example", m(lambda s: node(s, "quotes.grid").update(group="c")), "GROUP_CONTIGUOUS"),
    ("group-mixed-surface", "structural", "example", m(lambda s: node(s, "proof.logo-strip").update(background="white")), "GROUP_SHARED_SURFACE"),
    ("dark-surface-light-context", "structural", "example", m(lambda s: node(s, "grid.cards").update(context="light")), "CONTEXT_MATCHES_SURFACE"),
    ("background-not-observed", "structural", "example", m(lambda s: node(s, "cta.band").update(background="purple-100")), "BACKGROUND_ALLOWED"),
    ("variant-field-leak", "structural", "example", m(lambda s: node(s, "intro.section")["content"].update(cta={"label": "Try it", "variant": "primary"})), "VARIANT_FIELDS"),
    ("variant-field-missing", "structural", "example", m(lambda s: node(s, "intro.section", 1)["content"].pop("media")), "VARIANT_FIELDS"),
    ("logo-count-for-variant", "structural", "example", m(lambda s: node(s, "proof.logo-strip")["content"].update(logos=node(s, "proof.logo-strip")["content"]["logos"][:6])), "VARIANT_ITEM_COUNTS"),
    ("no-highlighted-plan", "structural", "pricing", m(lambda s: [p.update(highlight=False) for p in node(s, "pricing.plan-cards")["content"]["plans"]]), "EXACTLY_ONE_FLAG"),
    ("motion-not-allowed", "structural", "example", m(lambda s: node(s, "split.feature").update(motion={"pattern": "logo-fade-in", "reducedMotionFallback": "no-animation", "durationMs": 500, "easing": "in-out", "trigger": "mount"})), "MOTION_PATTERN_ALLOWED"),
    ("motion-variant-mismatch", "structural", "example", m(lambda s: node(s, "proof.logo-strip").update(motion={"pattern": "logo-fade-in", "reducedMotionFallback": "no-animation"})), "MOTION_PATTERN_ALLOWED"),
    ("motion-budget", "structural", "example", m(lambda s: s["nodes"].insert(idx(s, "proof.logo-strip"), copy.deepcopy(node(s, "proof.logo-strip")))), "MOTION_BUDGET"),
    # --- runtime budgets
    ("max-words-overflow", "runtime", "example", m(lambda s: node(s, "split.feature")["content"]["body"].__setitem__(0, long_words(80))), "MAX_WORDS"),
    ("rich-text-total-overflow", "runtime", "example", m(lambda s: node(s, "intro.section")["content"]["title"][1].update(text="a to-do list other people keep editing, forwarding, snoozing and resending")), "MAX_CHARS"),
    ("lede-total-overflow", "runtime", "example", m(lambda s: node(s, "hero.product-video")["content"].update(lede=["x" * 100, "y" * 100])), "MAX_CHARS"),
    ("forbidden-original-brand", "runtime", "example", m(lambda s: node(s, "quotes.grid")["content"]["items"][0].update(quote="We switched from Superhuman last year.")), "FORBIDDEN_CONTENT"),
]

WARN_CASES = [
    ("out-of-scope-route", "example", m(lambda s: s.update(route="/team")), "OUT_OF_SCOPE_ROUTE"),
    ("header-footer-pairing", "example", m(lambda s: s["nodes"][0].update(background="neutral-5")), "HEADER_FOOTER_PAIRING"),
]


def run():
    failures, lines = 0, []
    controls = [("example", copy.deepcopy(EXAMPLE))] + [(f"template:{t}", template_control(t)) for t in sorted(CTX["templates"])]
    for name, spec in controls:
        iss = sv.validate(spec, CTX)
        ok = not iss
        failures += not ok
        lines.append(f"{'PASS' if ok else 'FAIL'}  control   {name}: {len(sv.errors(iss))} errors, {len(iss) - len(sv.errors(iss))} warnings")
        if not ok:
            lines += [f"        {i['severity']} {i['rule']} {i['path']} {i['message']}" for i in iss[:6]]
    for cid, cat, b, fn, rule in MUTATIONS:
        iss = sv.validate(fn(base(b)), CTX)
        hit = [i for i in sv.errors(iss) if i["rule"] == rule]
        failures += not hit
        lines.append(f"{'PASS' if hit else 'FAIL'}  reject    [{cat}] {cid} -> {rule}" + ("" if hit else f"  (got {sorted({i['rule'] for i in sv.errors(iss)})})"))
    for cid, b, fn, rule in WARN_CASES:
        iss = sv.validate(fn(base(b)), CTX)
        ok = any(i["rule"] == rule and i["severity"] == "warn" for i in iss) and not sv.errors(iss)
        failures += not ok
        lines.append(f"{'PASS' if ok else 'FAIL'}  warn-only {cid} -> {rule}")
    print("\n".join(lines))
    print(f"\nSUMMARY: {len(controls)} controls, {len(MUTATIONS)} mutations, {len(WARN_CASES)} warn cases, {failures} failure(s)")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(run())
