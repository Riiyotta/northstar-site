#!/usr/bin/env python3
"""Semantic validator for Northstar PageSpecs.

Runs the Draft-07 schema (rule SCHEMA) and then every rule in compatibility/graph.json
that JSON Schema cannot express. The rule ids and severities in RULES must equal the
graph's (verify_all.py GRAPH_VALIDATOR_AGREEMENT). Exceptions (ONE_HERO,
NO_ADJACENT_SAME_SECTION, CTA_BEFORE_FOOTER) are read from the graph itself, so the
prose rule and the enforcement share one source.

    python3 -I schema/semantic_validate.py                 # validates schema/example.pagespec.json
    python3 -I schema/semantic_validate.py a.json b.json   # validates the given PageSpecs
Exit status 1 if any error-severity issue is found; warnings never fail.
"""
import glob
import json
import os
import re
import sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

RULES = {
    "SCHEMA": "error", "TEMPLATE_KNOWN": "error", "TEMPLATE_SEQUENCE": "error", "ROUTE_TEMPLATE_BINDING": "error",
    "OUT_OF_SCOPE_ROUTE": "warn", "HEADER_FIRST": "error", "FOOTER_LAST": "error", "ONE_PER_PAGE": "error",
    "HOME_ROUTE_ONLY": "error", "ONE_HERO": "error", "HERO_POSITION": "error", "NO_ADJACENT_SAME_SECTION": "warn",
    "GROUP_CONTIGUOUS": "error", "GROUP_SHARED_SURFACE": "error", "CONTEXT_MATCHES_SURFACE": "error",
    "BACKGROUND_ALLOWED": "error", "VARIANT_FIELDS": "error", "VARIANT_ITEM_COUNTS": "error", "EXACTLY_ONE_FLAG": "error",
    "HEADER_FOOTER_PAIRING": "warn", "CTA_BEFORE_FOOTER": "warn", "FAQ_TAIL_POSITION": "warn", "PRICING_ORDER": "error",
    "STICKY_ROWS_NEED_CHAPTER": "error", "MOTION_PATTERN_ALLOWED": "error", "REDUCED_MOTION_FALLBACK": "error",
    "MOTION_BUDGET": "error", "MAX_WORDS": "error", "MAX_CHARS": "error", "ASSET_ROLE_ALLOWED": "error",
    "FORBIDDEN_CONTENT": "error",
}

FORBIDDEN = re.compile(r"superhuman|playwright-mcp|(^|[\s/])reference/", re.IGNORECASE)


def _load(rel):
    with open(os.path.join(REPO, rel), encoding="utf-8") as f:
        return json.load(f)


def load_context():
    sections = {}
    for p in sorted(glob.glob(os.path.join(REPO, "sections", "*.json"))):
        with open(p, encoding="utf-8") as f:
            s = json.load(f)
        sections[s["id"]] = s
    graph = _load("compatibility/graph.json")
    return {
        "sections": sections,
        "templates": _load("templates/templates.json")["templates"],
        "routes": _load("templates/routes.json"),
        "graph": graph,
        "graphRules": {r["id"]: r for r in graph["rules"]},
        "surfaces": _load("tokens/10-semantic/surface.json")["surface"],
        "patterns": _load("compatibility/motion-patterns.json")["patterns"],
        "roles": _load("assets/asset-roles.json")["roles"],
        "schema": _load("schema/pagespec.schema.json"),
    }


class Issues(list):
    def add(self, rule, msg, path=""):
        self.append({"rule": rule, "severity": RULES[rule], "path": path, "message": msg})


# ---------------------------------------------------------------- helpers
def node_matches(tn, n):
    if n.get("section") != tn["section"]:
        return False
    return tn["variants"] is None or n.get("variant") in tn["variants"]


def match_template(tnodes, nodes):
    """Ordered match; returns (ok, furthest_node_index_reached)."""
    memo, best = {}, [0]

    def go(i, j):
        best[0] = max(best[0], j)
        if i == len(tnodes):
            return j == len(nodes)
        key = (i, j)
        if key in memo:
            return memo[key]
        tn = tnodes[i]
        lo = tn["min"] if tn["required"] else 0
        ok = False
        k = 0
        # consume as many as possible first, then back off
        run = 0
        while run < tn["max"] and j + run < len(nodes) and node_matches(tn, nodes[j + run]):
            run += 1
        for k in range(run, lo - 1, -1):
            if go(i + 1, j + k):
                ok = True
                break
        memo[key] = ok
        return ok

    return go(0, 0), best[0]


def rich_text(v):
    if isinstance(v, str):
        return v
    if isinstance(v, list):
        return "".join(s.get("text", "") for s in v if isinstance(s, dict))
    return ""


def words(t):
    return len(t.split())


def check_text(issues, t, f, path, label=None):
    if not isinstance(t, str):
        return
    maxc = f["maxChars"] if label is None else f[label]["maxChars"]
    maxw = f["maxWords"] if label is None else f[label]["maxWords"]
    if len(t) > maxc:
        issues.add("MAX_CHARS", f"{len(t)} chars > maxChars {maxc} ({f.get('budgetSource', '')})", path)
    if words(t) > maxw:
        issues.add("MAX_WORDS", f"{words(t)} words > maxWords {maxw} ({f.get('budgetSource', '')})", path)


def strings(v):
    if isinstance(v, str):
        yield v
    elif isinstance(v, dict):
        for x in v.values():
            yield from strings(x)
    elif isinstance(v, list):
        for x in v:
            yield from strings(x)


def check_fields(issues, ctx, fields, content, path, variant):
    if not isinstance(content, dict):
        return
    for name, f in fields.items():
        p = f"{path}.{name}"
        v = content.get(name)
        if v is not None and "onlyForVariants" in f and variant not in f["onlyForVariants"]:
            issues.add("VARIANT_FIELDS", f"field '{name}' is only allowed for variants {f['onlyForVariants']}, not '{variant}'", p)
        if v is None and variant in f.get("requiredForVariants", []):
            issues.add("VARIANT_FIELDS", f"field '{name}' is required for variant '{variant}'", p)
        if v is None:
            continue
        k = f["kind"]
        if k == "text":
            check_text(issues, v, f, p)
        elif k == "richText":
            check_text(issues, rich_text(v), f, p)
        elif k == "paragraphs" and isinstance(v, list):
            for i, t in enumerate(v):
                check_text(issues, t, f, f"{p}[{i}]")
            if "maxTotalChars" in f:
                total = sum(len(t) for t in v if isinstance(t, str))
                if total > f["maxTotalChars"]:
                    issues.add("MAX_CHARS", f"{total} total chars > maxTotalChars {f['maxTotalChars']}", p)
        elif k == "cta" and isinstance(v, dict):
            check_text(issues, v.get("label"), f, f"{p}.label")
        elif k == "ctaList" and isinstance(v, list):
            for i, c in enumerate(v):
                if isinstance(c, dict):
                    check_text(issues, c.get("label"), f, f"{p}[{i}].label")
        elif k == "media":
            check_media(issues, ctx, f, v, p)
        elif k == "mediaList" and isinstance(v, list):
            for i, m in enumerate(v):
                check_media(issues, ctx, f, m, f"{p}[{i}]")
        elif k == "items" and isinstance(v, list):
            for i, it in enumerate(v):
                check_fields(issues, ctx, f["fields"], it, f"{p}[{i}]", variant)
        elif k == "faqAnswer" and isinstance(v, list):
            for i, part in enumerate(v):
                pp = f"{p}[{i}]"
                if isinstance(part, str):
                    check_text(issues, part, f, pp)
                elif isinstance(part, dict):
                    if "list" in part:
                        for j, li in enumerate(part.get("list") or []):
                            check_text(issues, li, f, f"{pp}.list[{j}]", "listItem")
                    if "link" in part:
                        check_text(issues, part.get("link"), f, f"{pp}.link", "listItem")
                        check_text(issues, (part.get("before") or "") + (part.get("after") or ""), f, pp)
                    if "bold" in part:
                        check_text(issues, part.get("bold"), f, f"{pp}.bold", "listItem")
                        check_text(issues, part.get("text"), f, f"{pp}.text")


def check_media(issues, ctx, f, m, p):
    if not isinstance(m, dict):
        return
    role = m.get("assetRole")
    if role not in f["assetRoles"]:
        issues.add("ASSET_ROLE_ALLOWED", f"assetRole '{role}' not allowed here (allowed: {f['assetRoles']})", p)
    elif role not in ctx["roles"]:
        issues.add("ASSET_ROLE_ALLOWED", f"assetRole '{role}' missing from assets/asset-roles.json", p)


def exceptions(ctx, rule, key):
    return {e[key] for e in ctx["graphRules"].get(rule, {}).get("exceptions", []) if key in e}


# ---------------------------------------------------------------- main entry
def validate(spec, ctx=None, run_schema=True):
    ctx = ctx or load_context()
    issues = Issues()
    if run_schema:
        try:
            from jsonschema import Draft7Validator
        except ImportError:
            issues.add("SCHEMA", "jsonschema is not installed (pip install jsonschema into a venv)")
        else:
            for e in sorted(Draft7Validator(ctx["schema"]).iter_errors(spec), key=lambda e: list(e.absolute_path)):
                issues.add("SCHEMA", e.message[:300], "/".join(str(x) for x in e.absolute_path))
    if not isinstance(spec, dict):
        return issues
    nodes = [n for n in spec.get("nodes", []) if isinstance(n, dict)]
    secs = ctx["sections"]
    tid = spec.get("template")
    route = spec.get("route", "")
    sid = [n.get("section") for n in nodes]

    # template
    if tid not in ctx["templates"]:
        issues.add("TEMPLATE_KNOWN", f"unknown template '{tid}'")
    else:
        ok, reached = match_template(ctx["templates"][tid]["nodes"], nodes)
        if not ok:
            at = nodes[reached] if reached < len(nodes) else None
            where = f"node {reached} ({at.get('section')}/{at.get('variant')})" if at else "end of nodes"
            issues.add("TEMPLATE_SEQUENCE", f"node sequence does not match template '{tid}'; first divergence near {where}", f"nodes/{reached}")
    bound = {r["route"]: r["template"] for r in ctx["routes"]["routes"]}
    if route in bound and tid != bound[route]:
        issues.add("ROUTE_TEMPLATE_BINDING", f"route '{route}' is bound to template '{bound[route]}', not '{tid}'")
    for fam in ctx["routes"]["outOfScope"]["families"]:
        if any(route == px or route.startswith(px + "/") or route.startswith(px + "-") for px in fam["pathPrefixes"]):
            issues.add("OUT_OF_SCOPE_ROUTE", f"route '{route}' belongs to the out-of-scope '{fam['family']}' family (no template evidence in this snapshot)")

    # chrome and position
    if not sid or sid[0] != "shell.header":
        issues.add("HEADER_FIRST", "first node must be shell.header", "nodes/0")
    if not sid or sid[-1] != "shell.footer":
        issues.add("FOOTER_LAST", "last node must be shell.footer", f"nodes/{max(len(sid) - 1, 0)}")
    for s in set(sid):
        c = secs.get(s, {}).get("constraints", {})
        if c.get("onePerPage") and sid.count(s) > 1:
            issues.add("ONE_PER_PAGE", f"{s} appears {sid.count(s)} times (onePerPage)")
        if c.get("homeRouteOnly") and route != "/":
            issues.add("HOME_ROUTE_ONLY", f"{s} is only allowed on route '/'")
    if "shell.banner" in sid and (sid.index("shell.banner") != 1 or sid[0] != "shell.header"):
        issues.add("HOME_ROUTE_ONLY", "shell.banner must directly follow shell.header")
    heroes = [i for i, s in enumerate(sid) if secs.get(s, {}).get("category") == "hero"]
    if tid in exceptions(ctx, "ONE_HERO", "template"):
        if heroes or sid.count("pricing.suite-intro") != 1:
            issues.add("ONE_HERO", f"template '{tid}' takes no hero.* and exactly one pricing.suite-intro")
        heads = [i for i, s in enumerate(sid) if s == "pricing.suite-intro"]
    else:
        if len(heroes) != 1:
            issues.add("ONE_HERO", f"expected exactly one hero.* node, found {len(heroes)}")
        heads = heroes
    first_body = 1 + (1 if len(sid) > 1 and sid[1] == "shell.banner" else 0)
    if heads and heads[0] != first_body:
        issues.add("HERO_POSITION", f"page hero must be node {first_body}, found at node {heads[0]}", f"nodes/{heads[0]}")
    allowed_adj = exceptions(ctx, "NO_ADJACENT_SAME_SECTION", "section")
    for i in range(1, len(sid)):
        if sid[i] == sid[i - 1] and sid[i] not in allowed_adj:
            issues.add("NO_ADJACENT_SAME_SECTION", f"consecutive {sid[i]} nodes", f"nodes/{i}")

    # groups and surfaces
    seen_groups, last = {}, None
    for i, n in enumerate(nodes):
        g = n.get("group")
        if g:
            if g in seen_groups and last != g:
                issues.add("GROUP_CONTIGUOUS", f"group '{g}' is split", f"nodes/{i}")
            seen_groups.setdefault(g, []).append(i)
        last = g
    for g, idx in seen_groups.items():
        bgs = {nodes[i].get("background") for i in idx if not secs.get(nodes[i].get("section"), {}).get("paintsOwnBackground")}
        if len(bgs) > 1:
            issues.add("GROUP_SHARED_SURFACE", f"group '{g}' mixes backgrounds {sorted(map(str, bgs))}")
    for i, n in enumerate(nodes):
        bg, s = n.get("background"), secs.get(n.get("section"))
        if bg in ctx["surfaces"] and n.get("context") != ctx["surfaces"][bg]["context"]:
            issues.add("CONTEXT_MATCHES_SURFACE", f"background '{bg}' is a {ctx['surfaces'][bg]['context']} surface, context is '{n.get('context')}'", f"nodes/{i}/context")
        if s and bg not in s["allowedBackgrounds"]:
            issues.add("BACKGROUND_ALLOWED", f"{s['id']} is not observed on '{bg}' (allowed: {s['allowedBackgrounds']})", f"nodes/{i}/background")

    # chrome pairing, tail, order
    if sid and sid[0] == "shell.header" and sid[-1] == "shell.footer":
        light_footer = nodes[-1].get("variant") == "light"
        warm_header = nodes[0].get("background") == "neutral-5"
        if light_footer != warm_header:
            issues.add("HEADER_FOOTER_PAIRING", "light footer pairs with the neutral-5 header only (and vice versa)")
        if len(sid) >= 2 and not sid[-2].startswith("cta.") and tid not in exceptions(ctx, "CTA_BEFORE_FOOTER", "template"):
            issues.add("CTA_BEFORE_FOOTER", f"node before the footer is {sid[-2]}, not a cta.* section", f"nodes/{len(sid) - 2}")
    if "faq.accordion" in sid:
        tail = sid[sid.index("faq.accordion") + 1:]
        if any(not (s.startswith("cta.") or s == "shell.footer") for s in tail):
            issues.add("FAQ_TAIL_POSITION", "faq.accordion should be followed only by cta.* and the footer")
    order = [s for s in sid if s in ("pricing.suite-intro", "pricing.plan-cards", "pricing.comparison")]
    if order != sorted(order, key=["pricing.suite-intro", "pricing.plan-cards", "pricing.comparison"].index):
        issues.add("PRICING_ORDER", f"pricing sections out of order: {order}")
    for i, s in enumerate(sid):
        if s == "feature.sticky-row" and (i == 0 or sid[i - 1] != "feature.sticky-row") and (i == 0 or sid[i - 1] != "chapter.intro"):
            issues.add("STICKY_ROWS_NEED_CHAPTER", "a feature.sticky-row run must directly follow chapter.intro", f"nodes/{i}")

    # per-node: motion, content
    counts = {"carousel-crossfade": 0, "logo-rotate": 0}
    for i, n in enumerate(nodes):
        s = secs.get(n.get("section"))
        if not s:
            continue
        path = f"nodes/{i}"
        variant = n.get("variant")
        m = n.get("motion") if isinstance(n.get("motion"), dict) else {}
        allowed = s["motion"]["allowedPatterns"]
        pat = m.get("pattern")
        if pat not in allowed:
            issues.add("MOTION_PATTERN_ALLOWED", f"motion '{pat}' not allowed for {s['id']} (allowed {allowed})", f"{path}/motion")
        by = s["motion"].get("byVariant")
        if by and variant in by and pat != by[variant]:
            issues.add("MOTION_PATTERN_ALLOWED", f"variant '{variant}' requires motion '{by[variant]}'", f"{path}/motion")
        extra = m.get("additional") or []
        for a in extra:
            ap = a.get("pattern") if isinstance(a, dict) else None
            if ap not in s["motion"].get("additional", []):
                issues.add("MOTION_PATTERN_ALLOWED", f"additional motion '{ap}' not allowed for {s['id']}", f"{path}/motion/additional")
        for mm in [m] + [a for a in extra if isinstance(a, dict)]:
            p = mm.get("pattern")
            if "reducedMotionFallback" not in mm:
                issues.add("REDUCED_MOTION_FALLBACK", f"motion '{p}' has no reducedMotionFallback", f"{path}/motion")
            elif p in ctx["patterns"] and mm["reducedMotionFallback"] != ctx["patterns"][p]["reducedMotionFallback"]:
                issues.add("REDUCED_MOTION_FALLBACK", f"motion '{p}' must fall back to '{ctx['patterns'][p]['reducedMotionFallback']}'", f"{path}/motion")
            if p in counts:
                counts[p] += 1
        content = n.get("content")
        check_fields(issues, ctx, s["content"], content, f"{path}/content", variant)
        for field, rng in (s.get("variantItemCounts", {}).get(variant) or {}).items():
            got = len((content or {}).get(field) or [])
            if not rng[0] <= got <= rng[1]:
                issues.add("VARIANT_ITEM_COUNTS", f"{s['id']} variant '{variant}' needs {rng[0]}-{rng[1]} {field}, got {got}", f"{path}/content/{field}")
        for field, flag in (s.get("exactlyOneTrue") or {}).items():
            got = sum(1 for it in (content or {}).get(field) or [] if isinstance(it, dict) and it.get(flag) is True)
            if got != 1:
                issues.add("EXACTLY_ONE_FLAG", f"exactly one {field} item must have {flag}: true, got {got}", f"{path}/content/{field}")
        for t in strings(content):
            if FORBIDDEN.search(t):
                issues.add("FORBIDDEN_CONTENT", f"text references the original company or excluded material: {t[:60]!r}", f"{path}/content")
    for t in strings({k: spec.get(k) for k in ("title", "description")}):
        if FORBIDDEN.search(t):
            issues.add("FORBIDDEN_CONTENT", f"text references the original company or excluded material: {t[:60]!r}")
    if counts["carousel-crossfade"] > 1 or counts["logo-rotate"] > 1:
        issues.add("MOTION_BUDGET", f"motion budget exceeded: {counts}")
    return issues


def errors(issues):
    return [i for i in issues if i["severity"] == "error"]


def main(argv):
    files = argv or [os.path.join(REPO, "schema", "example.pagespec.json")]
    ctx = load_context()
    failed = False
    for fp in files:
        with open(fp, encoding="utf-8") as f:
            spec = json.load(f)
        iss = validate(spec, ctx)
        errs, warns = errors(iss), [i for i in iss if i["severity"] == "warn"]
        name = os.path.relpath(fp, REPO) if os.path.abspath(fp).startswith(REPO) else os.path.basename(fp)
        print(f"{name}: {len(errs)} error(s), {len(warns)} warning(s)")
        for i in iss:
            print(f"  [{i['severity']}] {i['rule']} {i['path']}: {i['message']}")
        failed |= bool(errs)
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
