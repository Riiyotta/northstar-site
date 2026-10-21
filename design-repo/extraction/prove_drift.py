#!/usr/bin/env python3
"""Prove that verify_all.py's drift checks actually catch drift.

For each defect below: copy this repo to a fresh temporary directory, inject the defect,
run verify_all.py there and require that the named check FAILs. Finally require that an
unmodified copy passes. The real repo is never modified.

    python3 -I extraction/prove_drift.py [--source-root DIR]

Citation defects need the site source; without it they are skipped with a notice.
"""
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ARGS = sys.argv[1:]
_src = ARGS[ARGS.index("--source-root") + 1] if "--source-root" in ARGS else os.path.dirname(REPO)
SOURCE = os.path.abspath(_src) if os.path.isfile(os.path.join(_src, "src", "routes.js")) else None


def edit_json(rel, fn):
    def apply(root):
        p = os.path.join(root, rel)
        with open(p, encoding="utf-8") as f:
            d = json.load(f)
        fn(d)
        with open(p, "w", encoding="utf-8") as f:
            json.dump(d, f, indent=2)
    return apply


def edit_text(rel, fn):
    def apply(root):
        p = os.path.join(root, rel)
        with open(p, encoding="utf-8") as f:
            t = f.read()
        with open(p, "w", encoding="utf-8") as f:
            f.write(fn(t))
    return apply


def first_cite(d):
    return d["implementedBy"][0]


DEFECTS = [
    ("phantom allowlist entry", "ALLOWLIST_PARITY", edit_json("tokens/llm/component-allowlist.json", lambda d: d["sections"].append("hero.phantom")), False),
    ("orphan section contract", "ALLOWLIST_PARITY", lambda r: shutil.copy(os.path.join(r, "sections", "stat.band.json"), os.path.join(r, "sections", "stat.orphan.json")) or edit_json("sections/stat.orphan.json", lambda d: d.update(id="stat.orphan"))(r), False),
    ("allowlist version drift", "ALLOWLIST_VERSION", edit_json("tokens/llm/component-allowlist.json", lambda d: d.update(version="1.0.1")), False),
    ("repository version not bumped with the changelog", "REPOSITORY_VERSION", edit_json("registry.manifest.json", lambda d: d.update(repositoryVersion="1.0.0")), False),
    ("manifest count hand-bumped", "MANIFEST_COUNTS", edit_json("registry.manifest.json", lambda d: d["counts"].update(templates=d["counts"]["templates"] + 1)), False),
    ("README count stale", "MANIFEST_COUNTS", edit_text("README.md", lambda t: re.sub(r"^\| sections \| \d+ \|", "| sections | 99 |", t, flags=re.M)), False),
    ("pinned policy changed to another valid policy", "ASSET_ROLES", edit_json("assets/asset-roles.json", lambda d: d["roles"]["logo.customer-wordmark"].update(generationPolicy="may-generate-new-original")), False),
    ("graph rule removed from graph only", "GRAPH_VALIDATOR_AGREEMENT", edit_json("compatibility/graph.json", lambda d: d.update(rules=[x for x in d["rules"] if x["id"] != "ONE_HERO"])), False),
    ("graph severity changed", "GRAPH_VALIDATOR_AGREEMENT", edit_json("compatibility/graph.json", lambda d: [x.update(severity="warn") for x in d["rules"] if x["id"] == "GROUP_CONTIGUOUS"]), False),
    ("schema hand-edited", "SCHEMA_SYNC", edit_json("schema/pagespec.schema.json", lambda d: d["properties"]["title"].update(maxLength=999)), False),
    ("contract budget changed without rebuilding schema", "SCHEMA_SYNC", edit_json("sections/cta.band.json", lambda d: d["content"]["title"].update(maxChars=500)), False),
    ("entry point outside the package", "MANIFEST", edit_json("registry.manifest.json", lambda d: d["entryPoints"].update(cloneSpec="../CLONE_SPEC.md")), False),
    ("absolute machine path", "NO_ABSOLUTE_PATHS", edit_text("CHANGELOG.md", lambda t: t + "\nBuilt at /" + "Users/someone/project\n"), False),
    ("token policy key not in catalog", "TOKEN_POLICY_KEYS", edit_json("tokens/llm/token-policy.json", lambda d: d["rawValueRestrictions"].update(shadow="forbidden")), False),
    ("dangling token reference", "TOKEN_REFERENCES", edit_json("tokens/20-component/card.json", lambda d: d["card"]["aside"]["radius"].update({"$value": "{radius.13}"})), False),
    ("template background not allowed by its section", "TEMPLATES_ROUTES", edit_json("templates/templates.json", lambda d: d["templates"]["pricing"]["nodes"][1].update(realBackground="green-90")), False),
    ("out-of-range citation", "CITATIONS", edit_json("sections/stat.band.json", lambda d: first_cite(d).update(lines="9000-9001")), True),
    ("in-range citation describing the wrong code", "CITATIONS", edit_json("sections/stat.band.json", lambda d: first_cite(d).update(lines="1-3")), True),
    ("citation into excluded material", "CITATIONS", edit_json("extraction/measured-values.json", lambda d: d["evidenceBase"].append({"path": "../reference/index.html", "lines": "1-2", "expect": "x"})), False),
]


def run_verify(root):
    cmd = [sys.executable, "-I", os.path.join(root, "extraction", "verify_all.py"), "--repo", root]
    cmd += ["--source-root", SOURCE] if SOURCE else ["--source-root", os.path.join(root, "no-source")]
    out = subprocess.run(cmd, capture_output=True, text=True)
    return out.returncode, out.stdout


def fresh_copy():
    tmp = tempfile.mkdtemp(prefix="drift-")
    root = os.path.join(tmp, "design-repo")
    shutil.copytree(REPO, root, ignore=shutil.ignore_patterns("__pycache__"))
    return tmp, root


def main():
    failures, skipped = 0, 0
    tmp, root = fresh_copy()
    code, out = run_verify(root)
    shutil.rmtree(tmp)
    print(f"{'PASS' if code == 0 else 'FAIL'}  clean copy verifies (exit {code})")
    failures += code != 0
    for name, check, inject, needs_source in DEFECTS:
        if needs_source and not SOURCE:
            print(f"SKIP  {name} -> {check} (needs the site source)")
            skipped += 1
            continue
        tmp, root = fresh_copy()
        inject(root)
        code, out = run_verify(root)
        shutil.rmtree(tmp)
        caught = code != 0 and re.search(rf"^FAIL\s+{check}\b", out, re.M)
        failures += not caught
        print(f"{'PASS' if caught else 'FAIL'}  {name} -> caught by {check}")
    print(f"\nSUMMARY: {len(DEFECTS) - skipped} injected defects, {skipped} skipped (no site source), {failures} not caught")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
