# Issue #278 — fase 2C: arquivos Git históricos

Baseline: `dev@b6ece41f0568c94c6ccb7655e8e973f926801afc`, 17/11/2026. **Entrega parcial, não fechamento da issue.**

## Executado

- **15 bundles Git (.bundle)** (101.388.903 bytes) movidos integralmente para `prototype/archive/backups/` com SHAs de blob Git preservados: 12 Notes App e 3 Exams App Old.
- `prototype/docs__archives__README.md`, os 15 manuais individuais e `prototype/archive/README.md` tiveram links e comandos de restauração atualizados.
- Inventário `phase2-navigation-map.json`: 969 arquivos originais, **223 movidos (208 marcadores vazios + 15 bundles)** e 746 em `prototype/` aguardando movimentação segura.
- Validador `scripts/validate-issue278-navigation.py`: inspeciona paths, unicidade, SHA Git, sete boards e links dos 15 manuais.
- Testes: `tests/test_prototype_migration.py` executa `git hash-object` e `git bundle verify` para cada bundle em Ubuntu e Windows.
- Não alterado: app 0.1.0/0.1.1, PDF.js, workers, PDFs, screenshots, catálogo de evidências, `board.json`, IDs e publicações Claude.
- `migration-hold` permanece ativo (sem deploy Artifact, mirror ou auto-push de evidências).

## Gates da PR

Os resultados dos checks de CI devem ser consultados na PR antes do merge. **Este documento não declara execução local de E2E/Chromium, Windows 11 interativo ou proxy/storage.** Links históricos e exemplos de restauração são rastreáveis; evidências externas não versionadas não foram recuperadas.

## Rollback

Reverter apenas a PR da fase 2C e manter os bloqueios de publicação das fases anteriores. Não reativar workflows remotos.

## Próximo escopo

Migrar documentos e dados de board com manutenção de referências; depois assets, galerias, históricos Claude e a aplicação ativa com HTTP redirects/compatibilidade, smoke/E2E e registro de capturas reais. O produto novo não possui fonte aprovada.
