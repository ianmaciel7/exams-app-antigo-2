#!/usr/bin/env python3
"""Gera board-mestre.md a partir de board-mestre.json e valida que todo ID de bloco existe em board.json.
Uso: python3 -I render_board_mestre.py (dentro de prototypes/board-exam-app/). Exit 1 se houver ID inexistente."""
import json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
M = json.load(open(os.path.join(HERE, "board-mestre.json"), encoding="utf8"))
E = json.load(open(os.path.join(HERE, "board.json"), encoding="utf8"))["elements"]

errors = []
lines = [f"# {M['title']}", "", f"> {M['note']}", ""]
for a in M["areas"]:
    lines += [f"## {a['id']} — {a['name']}", "", a["summary"], "", "| Card | Estado | Blocos |", "| --- | --- | --- |"]
    for c in a["cards"]:
        for b in c["blocks"]:
            if b not in E:
                errors.append(f"{a['id']} / {c['name']}: bloco {b} inexistente em board.json")
        refs = ", ".join(f"`{b}`" for b in c["blocks"])
        lines.append(f"| {c['name']} | {c['status']} | {refs} |")
    lines.append("")

if errors:
    print("\n".join(errors)); print(f"FALHOU: {len(errors)}"); sys.exit(1)
open(os.path.join(HERE, "board-mestre.md"), "w", encoding="utf8").write("\n".join(lines))
print("OK: board-mestre.md gerado; todos os IDs existem em board.json")
