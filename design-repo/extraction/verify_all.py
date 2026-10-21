#!/usr/bin/env python3
"""One-shot verification for this design-repo. Exit 1 if any check FAILs.

    python3 -I extraction/verify_all.py [--source-root DIR] [--strict-source] [--repo DIR]

The repo root is derived from this file's location (never hard-coded). The source root
(the site project this snapshot was measured from) defaults to the repo's parent directory
and is recognised by src/routes.js. Without it, citation and source-drift checks are skipped
with a WARN, so a standalone copy still verifies everything it contains.

Drift-proofing: extraction/prove_drift.py copies the repo to a scratch directory, injects
one defect per check below and confirms this script fails for each.
"""
import glob
import io
import json
import os
import re
import sys
from contextlib import redirect_stdout

ARGS = sys.argv[1:]


def arg(name, default=None):
    return ARGS[ARGS.index(name) + 1] if name in ARGS else default


REPO = os.path.abspath(arg("--repo", os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
_src = arg("--source-root", os.path.dirname(REPO))
SOURCE = os.path.abspath(_src) if _src and os.path.isfile(os.path.join(_src, "src", "routes.js")) else None
STRICT_SOURCE = "--strict-source" in ARGS
BREAKPOINTS = ["640.02px", "1080.02px", "1280.02px", "1440.02px"]

# Compliance-critical roles pinned to one specific policy (MASTER-GUIDE 3.23). Membership in
# the policy enum is not enough: changing one of these to a different valid policy must fail.
PINNED_POLICIES = {
    "logo.customer-wordmark": "reuse-registry-or-placeholder",
    "badge.compliance-placeholder": "placeholder-only",
    "person.avatar": "illustrated-person-only",
    "media.integration-strip": "invented-marks-only",
    "brand.wordmark": "must-reuse-exact",
    "brand.product-lockup": "must-reuse-exact",
}

sys.path.insert(0, os.path.join(REPO, "schema"))
sys.path.insert(0, os.path.join(REPO, "schema", "tests"))

results = []


def report(check, status, detail=""):
    results.append((check, status, detail))


def load(rel):
    with open(os.path.join(REPO, rel), encoding="utf-8") as f:
        return json.load(f)


def files(pattern):
    return sorted(glob.glob(os.path.join(REPO, pattern), recursive=True))


def rel(p):
    return os.path.relpath(p, REPO)


# ------------------------------------------------------------------ 1. JSON parses
def check_json():
    bad = []
    for p in files("**/*.json"):
        try:
            with open(p, encoding="utf-8") as f:
                json.load(f)
        except Exception as e:  # noqa: BLE001
            bad.append(f"{rel(p)}: {e}")
    report("JSON_PARSE", "FAIL" if bad else "PASS", "; ".join(bad) or f"{len(files('**/*.json'))} files")


# ------------------------------------------------------------------ 2-4. schema
def check_schema():
    try:
        from jsonschema import Draft7Validator
    except ImportError:
        report("SCHEMA_DRAFT07", "FAIL", "jsonschema not installed")
        return
    schema = load("schema/pagespec.schema.json")
    try:
        Draft7Validator.check_schema(schema)
        report("SCHEMA_DRAFT07", "PASS", "pagespec.schema.json is valid Draft-07")
    except Exception as e:  # noqa: BLE001
        report("SCHEMA_DRAFT07", "FAIL", str(e)[:200])
    import build_schema
    expected = build_schema.dumps(build_schema.build())
    with open(os.path.join(REPO, "schema", "pagespec.schema.json"), encoding="utf-8") as f:
        in_sync = f.read() == expected
    report("SCHEMA_SYNC", "PASS" if in_sync else "FAIL",
           "schema equals the one built from the contracts" if in_sync else "schema/pagespec.schema.json was edited or the contracts changed; run schema/build_schema.py --write")
    errs = list(Draft7Validator(schema).iter_errors(load("schema/example.pagespec.json")))
    report("EXAMPLE_SCHEMA", "FAIL" if errs else "PASS", f"{len(errs)} Draft-07 errors in example.pagespec.json")
    import semantic_validate as sv
    iss = sv.validate(load("schema/example.pagespec.json"))
    report("EXAMPLE_SEMANTIC", "FAIL" if sv.errors(iss) else "PASS", f"{len(sv.errors(iss))} errors, {len(iss) - len(sv.errors(iss))} warnings")


def check_graph_agreement():
    import semantic_validate as sv
    graph = {r["id"]: r["severity"] for r in load("compatibility/graph.json")["rules"]}
    diff = set(graph.items()) ^ set(sv.RULES.items())
    report("GRAPH_VALIDATOR_AGREEMENT", "FAIL" if diff else "PASS", f"diverging: {sorted(diff)}" if diff else f"{len(graph)} rules, same ids and severities")


# ------------------------------------------------------------------ 5-6. allowlist
def contract_ids(folder):
    return sorted(load(rel(p))["id"] for p in files(f"{folder}/*.json"))


def check_allowlist():
    al = load("tokens/llm/component-allowlist.json")
    problems = []
    for kind in ("primitives", "components", "sections"):
        have = contract_ids(kind)
        for x in sorted(set(al[kind]) - set(have)):
            problems.append(f"phantom {kind} entry '{x}' (no contract file)")
        for x in sorted(set(have) - set(al[kind])):
            problems.append(f"orphan {kind} contract '{x}' (not in allowlist)")
        for p in files(f"{kind}/*.json"):
            if os.path.splitext(os.path.basename(p))[0] != load(rel(p))["id"]:
                problems.append(f"{rel(p)}: filename does not match id")
    if set(al["templates"]) != set(load("templates/templates.json")["templates"]):
        problems.append("templates differ from templates/templates.json")
    if set(al["assetRoles"]) != set(load("assets/asset-roles.json")["roles"]):
        problems.append("assetRoles differ from assets/asset-roles.json")
    if set(al["surfaces"]) != set(load("tokens/10-semantic/surface.json")["surface"]):
        problems.append("surfaces differ from tokens/10-semantic/surface.json")
    schema = load("schema/pagespec.schema.json")
    if set(al["nodeProperties"]) != set(schema["definitions"]["node"]["properties"]):
        problems.append("nodeProperties differ from the schema's node properties")
    mprops = set()
    for k, v in schema["definitions"].items():
        if k.startswith("motion."):
            mprops |= set(v["properties"])
    mprops.add("additional")
    if set(al["motionProperties"]) != mprops:
        problems.append(f"motionProperties differ from schema motion properties {sorted(mprops)}")
    report("ALLOWLIST_PARITY", "FAIL" if problems else "PASS", "; ".join(problems) or "allowlist <-> contracts/schema/registries in parity")
    man = load("registry.manifest.json")
    report("ALLOWLIST_VERSION", "PASS" if man.get("allowlistVersion") == al.get("version") else "FAIL",
           f"manifest {man.get('allowlistVersion')} vs allowlist {al.get('version')}")


# ------------------------------------------------------------------ 7. asset roles
def check_assets():
    ar = load("assets/asset-roles.json")
    problems = []
    for r, spec in ar["roles"].items():
        if spec["generationPolicy"] not in ar["generationPolicies"]:
            problems.append(f"{r}: unknown policy {spec['generationPolicy']}")
    for r, pol in PINNED_POLICIES.items():
        got = ar["roles"].get(r, {}).get("generationPolicy")
        if got != pol:
            problems.append(f"PINNED {r} must be '{pol}', found '{got}'")
    used = set()

    def walk(fields):
        for f in fields.values():
            if f["kind"] in ("media", "mediaList"):
                used.update(f["assetRoles"])
            if f["kind"] == "items":
                walk(f["fields"])
    for p in files("sections/*.json"):
        walk(load(rel(p))["content"])
    missing = used - set(ar["roles"])
    if missing:
        problems.append(f"sections use unknown roles {sorted(missing)}")
    unused = {r for r in set(ar["roles"]) - used if not ar["roles"][r].get("chromeOnly")}
    if unused:
        problems.append(f"roles never used by any section {sorted(unused)}")
    joined = " ".join(ar["globalProhibitions"]).lower()
    for must in ("logos", "fonts", "certification", "photographs", "third-party"):
        if must not in joined:
            problems.append(f"globalProhibitions lost its '{must}' clause")
    report("ASSET_ROLES", "FAIL" if problems else "PASS", "; ".join(problems) or f"{len(ar['roles'])} roles closed, {len(PINNED_POLICIES)} pinned policies hold")


# ------------------------------------------------------------------ 8-9. tokens
def token_paths(obj, prefix):
    out = set()
    if isinstance(obj, dict):
        if "$value" in obj:
            return {prefix}
        for k, v in obj.items():
            if not k.startswith("$"):
                out |= token_paths(v, f"{prefix}.{k}" if prefix else k)
    return out


def foundation_index():
    idx = {}
    for p in files("tokens/00-foundation/*.json"):
        for top, v in load(rel(p)).items():
            if not top.startswith("$"):
                idx.setdefault(top, set()).update(token_paths(v, top))
    return idx


def check_tokens():
    idx = foundation_index()
    allpaths = set().union(*idx.values())
    sem = load("tokens/10-semantic/color.json")["semantic"]
    problems = []
    refre = re.compile(r"\{([A-Za-z0-9_.\-]+)\}")
    for p in files("tokens/10-semantic/*.json") + files("tokens/20-component/*.json") + files("tokens/30-layout/*.json") + files("tokens/themes/*.json"):
        txt = json.dumps(load(rel(p)))
        for ref in refre.findall(txt):
            if ref == "theme":
                continue
            if ref not in allpaths:
                problems.append(f"{rel(p)}: unresolved reference {{{ref}}}")
    for t in files("tokens/themes/*.json"):
        res = load(rel(t))["resolves"]
        if set(res) != set(sem):
            problems.append(f"{rel(t)} does not resolve exactly the semantic set")
    report("TOKEN_REFERENCES", "FAIL" if problems else "PASS", "; ".join(problems[:5]) or "every reference resolves to a foundation token; themes resolve every semantic colour")
    cat = load("tokens/llm/token-catalog.json")["categories"]
    pol = load("tokens/llm/token-policy.json")["rawValueRestrictions"]
    expected = {k: sorted(v) for k, v in idx.items()}
    expected["semantic"] = sorted(token_paths(sem, "semantic"))
    expected["surface"] = sorted(token_paths(load("tokens/10-semantic/surface.json")["surface"], "surface"))
    probs = []
    if {k: sorted(v) for k, v in cat.items()} != expected:
        probs.append("token-catalog.json differs from the token files")
    if set(pol) - set(cat):
        probs.append(f"policy categories not in catalog: {sorted(set(pol) - set(cat))}")
    report("TOKEN_POLICY_KEYS", "FAIL" if probs else "PASS", "; ".join(probs) or f"{len(cat)} catalog categories match token files; policy keys resolve")


# ------------------------------------------------------------------ 10. contracts
def check_contracts():
    patterns = load("compatibility/motion-patterns.json")["patterns"]
    surfaces = load("tokens/10-semantic/surface.json")["surface"]
    problems, seen_bp = [], set()
    declared = set(re.findall(r"(\d{3,4}\.02)px", json.dumps(load("tokens/00-foundation/breakpoint.json"))))
    if declared != {b.replace("px", "") for b in BREAKPOINTS}:
        problems.append(f"breakpoint tokens {sorted(declared)} differ from the measured set {BREAKPOINTS}")

    def text_fields(fields, sid, path=""):
        for n, f in fields.items():
            if f["kind"] in ("text", "richText", "paragraphs", "cta", "ctaList", "faqAnswer"):
                for k in ("maxChars", "maxWords", "budgetSource"):
                    if k not in f:
                        problems.append(f"{sid}.{path}{n}: missing {k}")
            if f["kind"] == "items":
                text_fields(f["fields"], sid, f"{path}{n}.")
    for p in files("sections/*.json"):
        s = load(rel(p))
        for k in ("id", "category", "purpose", "implementedBy", "usedOn", "content", "allowedBackgrounds", "motion", "responsive", "measuredFrom"):
            if k not in s:
                problems.append(f"{s.get('id', rel(p))}: missing {k}")
        text_fields(s["content"], s["id"])
        for pat in s["motion"]["allowedPatterns"] + s["motion"].get("additional", []):
            if pat not in patterns:
                problems.append(f"{s['id']}: unknown motion pattern {pat}")
        for bg in s["allowedBackgrounds"]:
            if bg not in surfaces:
                problems.append(f"{s['id']}: unknown surface {bg}")
        if not s["responsive"]:
            problems.append(f"{s['id']}: empty responsive list")
        for r in s["responsive"]:
            if r["minWidth"] != "base" and r["minWidth"] not in BREAKPOINTS:
                problems.append(f"{s['id']}: unmeasured breakpoint {r['minWidth']}")
            seen_bp.add(r["minWidth"].replace("px", ""))
    missing_bp = [b for b in BREAKPOINTS if b.replace("px", "") not in seen_bp]
    if missing_bp:
        problems.append(f"breakpoints never described: {missing_bp}")
    report("SECTION_CONTRACTS", "FAIL" if problems else "PASS", "; ".join(problems[:6]) or "every text field budgeted; motion/surfaces/breakpoints closed; all 4 breakpoints covered")


# ------------------------------------------------------------------ 11. templates and routes
def check_templates():
    T = load("templates/templates.json")["templates"]
    secs = {load(rel(p))["id"]: load(rel(p)) for p in files("sections/*.json")}
    routes = load("templates/routes.json")
    problems = []
    snap = [r["route"] for r in routes["routes"]]
    claimed = [r for t in T.values() for r in t["routes"]]
    if sorted(claimed) != sorted(snap) or len(set(claimed)) != len(claimed):
        problems.append(f"route coverage not 1:1: templates claim {sorted(claimed)}, snapshot has {sorted(snap)}")
    for r in routes["routes"]:
        if r["route"] not in T.get(r["template"], {}).get("routes", []):
            problems.append(f"{r['route']} bound to {r['template']} which does not list it")
    seqs = {}
    for tid, t in T.items():
        key = json.dumps([(n["section"], n["variants"], n["min"], n["max"]) for n in t["nodes"]])
        if key in seqs:
            problems.append(f"templates {seqs[key]} and {tid} have identical node sequences")
        seqs[key] = tid
        for n in t["nodes"]:
            s = secs.get(n["section"])
            if not s:
                problems.append(f"{tid}: unknown section {n['section']}")
                continue
            if n["realBackground"] not in s["allowedBackgrounds"]:
                problems.append(f"{tid}: {n['section']} realBackground {n['realBackground']} not in allowedBackgrounds")
            for v in (n["variants"] or []) + ([n["realVariant"]] if n.get("realVariant") else []):
                if v not in s["variants"]:
                    problems.append(f"{tid}: {n['section']} variant {v} not in contract")
            if not (n["min"] <= n["realCount"] <= n["max"]) or (n["required"] and n["min"] < 1):
                problems.append(f"{tid}: {n['section']} counts inconsistent")
            if t["routes"][0] not in s["usedOn"]:
                problems.append(f"{tid}: {n['section']} contract usedOn lacks {t['routes'][0]}")
    report("TEMPLATES_ROUTES", "FAIL" if problems else "PASS", "; ".join(problems[:6]) or f"{len(T)} templates, {len(snap)} routes, 1:1, sequences distinct, real backgrounds/variants consistent")


# ------------------------------------------------------------------ 12. citations
def iter_citations(obj, where):
    if isinstance(obj, dict):
        if "path" in obj and "lines" in obj and isinstance(obj["path"], str):
            yield where, obj
        for k, v in obj.items():
            yield from iter_citations(v, f"{where}.{k}")
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            yield from iter_citations(v, f"{where}[{i}]")


def check_citations():
    cites = []
    for p in files("**/*.json"):
        cites += [(rel(p) + w, c) for w, c in iter_citations(load(rel(p)), "")]
    problems = []
    for w, c in cites:
        pth = c["path"]
        if pth.startswith(("/", "..")) or "reference/" in pth or ".playwright-mcp" in pth or not re.fullmatch(r"\d+-\d+", c["lines"]):
            problems.append(f"{w}: forbidden or malformed citation {pth}:{c['lines']}")
    if SOURCE is None:
        report("CITATIONS", "FAIL" if problems else "WARN", "; ".join(problems[:5]) or f"source root not found; {len(cites)} citations not resolved (standalone copy)")
        return
    cache = {}
    for w, c in cites:
        fp = os.path.join(SOURCE, c["path"])
        if not os.path.isfile(fp):
            problems.append(f"{w}: missing file {c['path']}")
            continue
        if fp not in cache:
            with open(fp, encoding="utf-8") as f:
                cache[fp] = f.read().split("\n")
        L = cache[fp]
        a, b = (int(x) for x in c["lines"].split("-"))
        if not (1 <= a <= b <= len(L)):
            problems.append(f"{w}: {c['path']}:{c['lines']} outside 1-{len(L)}")
            continue
        if c.get("expect") and c["expect"] not in "\n".join(L[a - 1:b]):
            problems.append(f"{w}: {c['path']}:{c['lines']} does not contain {c['expect']!r}")
    report("CITATIONS", "FAIL" if problems else "PASS", "; ".join(problems[:5]) + (f" (+{len(problems) - 5} more)" if len(problems) > 5 else "") if problems else f"{len(cites)} citations resolve in range and contain their expected text")


# ------------------------------------------------------------------ 13. source drift (snapshot re-check)
def check_source_drift():
    if SOURCE is None:
        report("SOURCE_DRIFT", "WARN", "source root not found; snapshot claims not re-checked")
        return
    problems = []
    with open(os.path.join(SOURCE, "src", "routes.js"), encoding="utf-8") as f:
        live = set(re.findall(r"path: '(/[^']*)'", f.read()))
    with open(os.path.join(SOURCE, "src", "App.jsx"), encoding="utf-8") as f:
        if "<Route index" in f.read():
            live.add("/")
    snap = {r["route"] for r in load("templates/routes.json")["routes"]}
    if live != snap:
        problems.append(f"routes: source {sorted(live)} vs snapshot {sorted(snap)}")
    for tid, t in load("templates/templates.json")["templates"].items():
        so = t["sourceOrder"]
        with open(os.path.join(SOURCE, so["path"]), encoding="utf-8") as f:
            txt = f.read()
        pos = txt.find(so["after"])
        for tok in so["tokens"]:
            nxt = txt.find(tok, pos + 1) if pos >= 0 else -1
            if nxt < 0:
                problems.append(f"{tid}: '{tok}' not found in order in {so['path']}")
                break
            pos = nxt
    covered = set()
    for p in files("primitives/*.json") + files("components/*.json"):
        covered |= {c["path"] for c in load(rel(p))["implementedBy"]}
    for p in sorted(glob.glob(os.path.join(SOURCE, "src", "components", "ui", "*.jsx"))):
        rp = os.path.relpath(p, SOURCE)
        if rp not in covered:
            problems.append(f"{rp} has no primitive/component contract")
    with open(os.path.join(SOURCE, "package.json"), encoding="utf-8") as f:
        pkg = json.load(f)
    deps = {**pkg.get("dependencies", {}), **pkg.get("devDependencies", {})}
    for name, ver in load("registry.manifest.json")["snapshot"]["stack"].items():
        if deps.get(name) != ver:
            problems.append(f"package {name}: manifest {ver} vs package.json {deps.get(name)}")
    status = ("FAIL" if STRICT_SOURCE else "WARN") if problems else "PASS"
    report("SOURCE_DRIFT", status, "; ".join(problems[:6]) or "routes, template source order, ui component coverage and stack versions match current source")


# ------------------------------------------------------------------ 14-16. manifest, paths, counts
def computed_counts():
    import adversarial_test as at
    tokens = 0
    for p in files("tokens/00-foundation/*.json") + files("tokens/10-semantic/*.json") + files("tokens/20-component/*.json") + files("tokens/30-layout/*.json"):
        for top, v in load(rel(p)).items():
            if not top.startswith("$"):
                tokens += len(token_paths(v, top))
    return {
        "tokens": tokens,
        "primitives": len(files("primitives/*.json")),
        "components": len(files("components/*.json")),
        "sections": len(files("sections/*.json")),
        "templates": len(load("templates/templates.json")["templates"]),
        "routes": len(load("templates/routes.json")["routes"]),
        "graphRules": len(load("compatibility/graph.json")["rules"]),
        "motionPatterns": len(load("compatibility/motion-patterns.json")["patterns"]),
        "assetRoles": len(load("assets/asset-roles.json")["roles"]),
        "adversarialMutations": len(at.MUTATIONS),
        "adversarialWarnCases": len(at.WARN_CASES),
        "adversarialControls": 1 + len(load("templates/templates.json")["templates"]),
    }


def check_manifest():
    man = load("registry.manifest.json")
    problems = []
    for k in ("repositoryId", "status", "productionApproved", "repositoryVersion", "pageSpecVersion", "allowlistVersion", "versionFieldNote", "defaultTheme", "schemaValidatedThemes", "counts", "entryPoints"):
        if k not in man:
            problems.append(f"missing {k}")
    if man.get("status") != "design-review-pending" or man.get("productionApproved") is not False:
        problems.append("status must be design-review-pending and productionApproved false")
    for name, p in man.get("entryPoints", {}).items():
        if os.path.isabs(p) or ".." in p.split("/") or not os.path.isfile(os.path.join(REPO, p)):
            problems.append(f"entryPoint {name} -> {p} is not a file inside design-repo/")
    themes = [os.path.splitext(os.path.basename(p))[0] for p in files("tokens/themes/*.json")]
    if sorted(man.get("schemaValidatedThemes", [])) != sorted(themes) or man.get("defaultTheme") not in themes:
        problems.append("theme declaration does not match tokens/themes/")
    report("MANIFEST", "FAIL" if problems else "PASS", "; ".join(problems) or f"{len(man['entryPoints'])} entry points, all inside the repo")
    with open(os.path.join(REPO, "CHANGELOG.md"), encoding="utf-8") as f:
        top = re.search(r"^## (\d+\.\d+\.\d+)\b", f.read(), re.M)
    newest = top.group(1) if top else None
    report("REPOSITORY_VERSION", "PASS" if newest and newest == man.get("repositoryVersion") else "FAIL",
           f"manifest {man.get('repositoryVersion')} vs newest CHANGELOG entry {newest}")
    counts = computed_counts()
    diff = {k: (man.get("counts", {}).get(k), v) for k, v in counts.items() if man.get("counts", {}).get(k) != v}
    with open(os.path.join(REPO, "README.md"), encoding="utf-8") as f:
        readme = f.read()
    for k, v in counts.items():
        m = re.search(rf"^\| {k} \| (\d+) \|", readme, re.M)
        if not m or int(m.group(1)) != v:
            diff[f"README:{k}"] = (m.group(1) if m else None, v)
    report("MANIFEST_COUNTS", "FAIL" if diff else "PASS", f"stale counts (claimed, actual): {diff}" if diff else f"recomputed {counts}")


def check_paths():
    bad = []
    pat = re.compile("|".join(["/" + "Users/", "/" + "home/[a-z]", "/" + "private/tmp", "[A-Z]:" + "\\\\" + "Users"]))
    for p in files("**/*"):
        if os.path.isdir(p) or "__pycache__" in p:
            continue
        try:
            with open(p, encoding="utf-8") as f:
                if pat.search(f.read()):
                    bad.append(rel(p))
        except UnicodeDecodeError:
            continue
    junk = [rel(p) for p in files("**/.DS_Store")] + [rel(p) for p in glob.glob(os.path.join(REPO, "**", "__MACOSX"), recursive=True)]
    report("NO_ABSOLUTE_PATHS", "FAIL" if bad or junk else "PASS", f"absolute paths in {bad}; junk {junk}" if bad or junk else "no absolute machine paths, no .DS_Store/__MACOSX")


def check_adversarial():
    import adversarial_test as at
    buf = io.StringIO()
    with redirect_stdout(buf):
        code = at.run()
    summary = [l for l in buf.getvalue().splitlines() if l.startswith("SUMMARY")]
    report("ADVERSARIAL", "FAIL" if code else "PASS", summary[0] if summary else "no summary")


def main():
    for fn in (check_json, check_graph_agreement, check_schema, check_allowlist, check_assets, check_tokens, check_contracts, check_templates,
               check_citations, check_source_drift, check_manifest, check_paths, check_adversarial):
        try:
            fn()
        except Exception as e:  # noqa: BLE001  a crashing check is a failing check
            report(fn.__name__.upper(), "FAIL", f"{type(e).__name__}: {e}")
    print(f"design-repo: {os.path.basename(REPO)}   source root: {'found' if SOURCE else 'NOT FOUND (standalone mode)'}")
    for c, s, d in results:
        print(f"{s:4}  {c:26} {d}")
    fails = [r for r in results if r[1] == "FAIL"]
    print(f"\n{len(results)} checks: {sum(r[1] == 'PASS' for r in results)} pass, {sum(r[1] == 'WARN' for r in results)} warn, {len(fails)} fail")
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
