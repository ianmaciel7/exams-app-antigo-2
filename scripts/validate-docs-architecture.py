#!/usr/bin/env python3
"""Valida JSON e links Markdown locais em prototypes/docs/architecture, prototypes/docs/features e prototypes/docs/planning."""
import json, pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
AREAS = ["prototypes/docs/architecture", "prototypes/docs/features", "prototypes/docs/planning"]
LINK = re.compile(r"\]\(([^)\s]+)\)")
errors = []

for area in AREAS:
    for path in sorted((ROOT / area).rglob("*")):
        if path.suffix == ".json":
            try:
                json.loads(path.read_text(encoding="utf-8"))
            except json.JSONDecodeError as e:
                errors.append(f"{path.relative_to(ROOT)}: JSON inválido: {e}")
        elif path.suffix == ".md":
            for target in LINK.findall(path.read_text(encoding="utf-8")):
                if re.match(r"^(https?:|mailto:|#)", target):
                    continue
                file_part = target.split("#", 1)[0]
                if not file_part:
                    continue
                if not (path.parent / file_part).exists():
                    errors.append(f"{path.relative_to(ROOT)}: link local quebrado: {target}")

if errors:
    print("\n".join(errors))
    sys.exit(1)
print("prototypes/docs/architecture, prototypes/docs/features, prototypes/docs/planning: JSON e links locais OK")
