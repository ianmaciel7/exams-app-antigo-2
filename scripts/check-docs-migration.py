"""Integridade da migração docs/ → prototypes/docs/ e etapas seguintes.

Verifica: (1) cada linha do MIGRATION-MAP existe no destino e o sha256 bate;
(2) links Markdown locais em prototypes/docs resolvem; (3) caminhos prototypes/docs
citados em workflows e scripts existem.
"""
import hashlib, os, re, glob, sys
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
os.chdir(ROOT)
erros = []

# (1) mapa de migração: destino existe e prefixo do sha256 confere
for line in open('prototypes/docs/MIGRATION-MAP.md', encoding='utf-8'):
    m = re.match(r'\| `([^`]+)` \| `([^`]+)` \| `([0-9a-f—]+)` \| `([0-9a-f]{16})` \|', line)
    if not m:
        continue
    _, dest, _orig, h = m.groups()
    if not os.path.isfile(dest):
        erros.append(f'destino ausente: {dest}')
    elif hashlib.sha256(open(dest, 'rb').read()).hexdigest()[:16] != h:
        erros.append(f'sha256 divergente: {dest}')

# (2) links Markdown locais em prototypes/docs
for md in glob.glob('prototypes/docs/**/*.md', recursive=True):
    base = os.path.dirname(md)
    for t in re.findall(r'\]\(([^)\s#]+)(?:#[^)]*)?\)', open(md, encoding='utf-8').read()):
        if re.match(r'^(https?:|mailto:)', t):
            continue
        if not os.path.exists(os.path.normpath(os.path.join(base, t))):
            erros.append(f'link quebrado em {md}: {t}')

# (3) caminhos prototypes/docs citados em workflows e scripts
for f in glob.glob('.github/workflows/*.yml') + glob.glob('scripts/*.py') + glob.glob('scripts/*.mjs'):
    for p in set(re.findall(r'prototypes/docs/[A-Za-z0-9_./-]+', open(f, encoding='utf-8').read())):
        p = p.rstrip('/.')
        if not os.path.exists(p) and not os.path.exists(p.rstrip('/') + '/'):
            erros.append(f'caminho citado não existe em {f}: {p}')

print('erros:', len(erros))
for e in erros[:50]:
    print(' -', e)
sys.exit(1 if erros else 0)
