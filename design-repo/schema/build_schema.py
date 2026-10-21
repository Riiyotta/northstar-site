#!/usr/bin/env python3
"""Build schema/pagespec.schema.json (JSON Schema draft-07) from the repo's own contracts.

The schema is derived, never hand-edited: sections/*.json (content contracts, variants,
allowed motion), templates/templates.json (template enum), tokens/10-semantic/surface.json
(background enum), compatibility/motion-patterns.json (closed motion objects) and
assets/asset-roles.json (assetRole enum).

    python3 -I schema/build_schema.py --write   # regenerate
    python3 -I schema/build_schema.py --check   # exit 1 if the file on disk differs
"""
import glob
import json
import os
import sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCHEMA_PATH = os.path.join(REPO, "schema", "pagespec.schema.json")
SLOT_PATTERN = "^[a-z0-9]+(-[a-z0-9]+)*$"
EMPHASIS = ["none", "brand", "highlight", "sub", "bold"]


def load(rel):
    with open(os.path.join(REPO, rel), encoding="utf-8") as f:
        return json.load(f)


def load_sections():
    out = {}
    for p in sorted(glob.glob(os.path.join(REPO, "sections", "*.json"))):
        with open(p, encoding="utf-8") as f:
            s = json.load(f)
        out[s["id"]] = s
    return out


def field_schema(f):
    k = f["kind"]
    if k == "text":
        s = {"type": "string", "minLength": 1, "maxLength": f["maxChars"]}
        if f.get("pattern"):
            s["pattern"] = f["pattern"]
        return s
    if k == "richText":
        return {"oneOf": [{"type": "string", "minLength": 1, "maxLength": f["maxChars"]},
                          {"type": "array", "minItems": 1, "maxItems": 8, "items": {"$ref": "#/definitions/richSegment"}}]}
    if k == "paragraphs":
        return {"type": "array", "minItems": f["minItems"], "maxItems": f["maxItems"],
                "items": {"type": "string", "minLength": 1, "maxLength": f["maxChars"]}}
    if k == "cta":
        return {"type": "object", "additionalProperties": False, "required": ["label", "variant"],
                "properties": {"label": {"type": "string", "minLength": 1, "maxLength": f["maxChars"]}, "variant": {"enum": f["variants"]}}}
    if k == "ctaList":
        one = field_schema(dict(f, kind="cta"))
        return {"type": "array", "minItems": f["minItems"], "maxItems": f["maxItems"], "items": one}
    if k == "media":
        return {"type": "object", "additionalProperties": False, "required": ["slotId", "assetRole"],
                "properties": {"slotId": {"type": "string", "pattern": SLOT_PATTERN}, "assetRole": {"enum": f["assetRoles"]}}}
    if k == "mediaList":
        return {"type": "array", "minItems": f["minItems"], "maxItems": f["maxItems"], "items": field_schema(dict(f, kind="media"))}
    if k == "items":
        return {"type": "array", "minItems": f["minItems"], "maxItems": f["maxItems"], "items": object_schema(f["fields"])}
    if k == "enum":
        return {"enum": f["values"]}
    if k == "boolean":
        return {"type": "boolean"}
    if k == "faqAnswer":
        para = {"type": "string", "minLength": 1, "maxLength": f["maxChars"]}
        short = {"type": "string", "minLength": 1, "maxLength": f["listItem"]["maxChars"]}
        part = {"oneOf": [
            para,
            {"type": "object", "additionalProperties": False, "required": ["before", "link", "after"],
             "properties": {"before": {"type": "string", "maxLength": f["maxChars"]}, "link": short, "after": {"type": "string", "maxLength": f["maxChars"]}}},
            {"type": "object", "additionalProperties": False, "required": ["list"],
             "properties": {"list": {"type": "array", "minItems": 1, "maxItems": 6, "items": short}}},
            {"type": "object", "additionalProperties": False, "required": ["bold", "text"],
             "properties": {"bold": short, "text": para}}]}
        return {"type": "array", "minItems": f["minItems"], "maxItems": f["maxItems"], "items": part}
    raise SystemExit(f"unknown field kind {k}")


def object_schema(fields):
    # requiredForVariants fields are enforced by the semantic validator (VARIANT_FIELDS);
    # the schema only requires unconditionally-required fields.
    return {"type": "object", "additionalProperties": False,
            "required": sorted(n for n, f in fields.items() if f.get("required")),
            "properties": {n: field_schema(f) for n, f in fields.items()}}


def motion_schema(pattern, spec, additional=None):
    props = {"pattern": {"const": pattern}, "reducedMotionFallback": {"const": spec["reducedMotionFallback"]}}
    for key in ("durationMs", "intervalMs", "easing", "trigger"):
        if key in spec:
            props[key] = {"const": spec[key]}
    s = {"type": "object", "additionalProperties": False, "required": ["pattern", "reducedMotionFallback"], "properties": props}
    if additional:
        s["properties"]["additional"] = {"type": "array", "minItems": 1, "maxItems": len(additional), "uniqueItems": True,
                                         "items": {"oneOf": [{"$ref": f"#/definitions/motion.{a}"} for a in additional]}}
    return s


def build():
    sections = load_sections()
    templates = load("templates/templates.json")["templates"]
    surfaces = list(load("tokens/10-semantic/surface.json")["surface"])
    patterns = load("compatibility/motion-patterns.json")["patterns"]
    roles = sorted(load("assets/asset-roles.json")["roles"])

    defs = {
        "richSegment": {"type": "object", "additionalProperties": False, "required": ["text", "emphasis"],
                        "properties": {"text": {"type": "string", "minLength": 1}, "emphasis": {"enum": EMPHASIS}}},
        "assetRole": {"enum": roles},
    }
    for p, spec in sorted(patterns.items()):
        defs[f"motion.{p}"] = motion_schema(p, spec)

    branches = []
    for sid, s in sorted(sections.items()):
        mot = s["motion"]
        options = [motion_schema(p, patterns[p], mot.get("additional")) for p in mot["allowedPatterns"]]
        then = {"properties": {"content": object_schema(s["content"]),
                               "motion": options[0] if len(options) == 1 else {"oneOf": options}}}
        if s["variants"]:
            then["properties"]["variant"] = {"enum": sorted(s["variants"])}
            then["required"] = ["variant"]
        else:
            then["not"] = {"required": ["variant"]}
        branches.append({"if": {"properties": {"section": {"const": sid}}, "required": ["section"]}, "then": then})

    node = {
        "type": "object", "additionalProperties": False,
        "required": ["section", "background", "context", "motion", "content"],
        "properties": {
            "id": {"type": "string", "pattern": SLOT_PATTERN},
            "section": {"enum": sorted(sections)},
            "variant": {"type": "string"},
            "group": {"type": "string", "pattern": SLOT_PATTERN},
            "background": {"enum": surfaces},
            "context": {"enum": ["light", "dark"]},
            "motion": {"type": "object"},
            "content": {"type": "object"},
        },
        "allOf": branches,
    }
    defs["node"] = node
    return {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "$id": "northstar-design-repo/schema/pagespec.schema.json",
        "title": "Northstar PageSpec",
        "description": "Machine contract for a generated page composition. GENERATED by schema/build_schema.py from sections/, templates/, tokens/10-semantic/surface.json, compatibility/motion-patterns.json and assets/asset-roles.json; do not hand-edit (verify_all.py SCHEMA_SYNC).",
        "type": "object", "additionalProperties": False,
        "required": ["pageSpecVersion", "template", "route", "title", "nodes"],
        "properties": {
            "pageSpecVersion": {"const": "1.0.0"},
            "template": {"enum": sorted(templates)},
            "route": {"type": "string", "pattern": "^/([a-z0-9]+(-[a-z0-9]+)*(/[a-z0-9]+(-[a-z0-9]+)*)*)?$"},
            "title": {"type": "string", "minLength": 1, "maxLength": 60},
            "description": {"type": "string", "maxLength": 240},
            "nodes": {"type": "array", "minItems": 3, "items": {"$ref": "#/definitions/node"}},
        },
        "definitions": defs,
    }


def dumps(obj):
    return json.dumps(obj, indent=2, ensure_ascii=False) + "\n"


def main(argv):
    text = dumps(build())
    if "--write" in argv:
        with open(SCHEMA_PATH, "w", encoding="utf-8") as f:
            f.write(text)
        print("wrote schema/pagespec.schema.json")
        return 0
    if "--check" in argv:
        with open(SCHEMA_PATH, encoding="utf-8") as f:
            on_disk = f.read()
        if on_disk != text:
            print("SCHEMA_SYNC: schema/pagespec.schema.json differs from the schema built from the contracts")
            return 1
        print("SCHEMA_SYNC: ok")
        return 0
    sys.stdout.write(text)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
