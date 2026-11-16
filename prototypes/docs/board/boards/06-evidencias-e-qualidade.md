# 06 — Evidências e qualidade

> Evidência informa o que foi observado, em qual ambiente e por qual método. Status textual não substitui teste, captura ou CI.

```mermaid
flowchart TB
  OBS[Observação ou cenário] --> CAP[Captura - log - manifesto E2E]
  CAP --> META[Data - ambiente - contexto]
  META --> HASH[Hash e integridade]
  HASH --> CATALOG[Catálogo de evidências]
  CATALOG --> LINK[Issue - PR - documento - bloco]
  CATALOG --> GALLERY[Galeria e busca]
  TEST[Teste automatizado] --> RESULT[Passou - falhou - não executado]
  RESULT --> CATALOG
```

## Contrato mínimo

- Registre arquivo, hash, data, ambiente, funcionalidade e finalidade.
- Diferencie benchmark, captura do protótipo, inspeção técnica e teste executado.
- Vincule evidência a issue/PR/documento/bloco apenas quando comprovado.
- Duplicata não é evidência canônica adicional; órfão precisa de contexto.
- Resultado deve informar cenário, ambiente, comando e limites da conclusão.

## Documentos

- [Catálogo Markdown](../../evidence/CATALOG.md)
- [Catálogo JSON](../../evidence/catalog.json)
- [Galeria](../../evidence/gallery.html)
- [Relatório da reestruturação](../RELATORIO-REESTRUTURACAO.md)
- [Manifesto Low-Chrome #97](../../../board-exam-app/lowchrome_97_manifest.json)

## Manifestos E2E

- [Issue #68 — Exportação do grafo](../../../board-exam-app/issue68_export_e2e.json)
- [Issue #70 — Filtros avançados](../../../board-exam-app/issue70_e2e.json)
- [Issue #75 — Cadernos e filtros](../../../board-exam-app/issue75_e2e.json)
- [Issue #76 — Recuperação](../../../board-exam-app/issue76_recovery_e2e.json)
- [Issue #77 — PDF Reader](../../../board-exam-app/issue77_reader_e2e.json)
- [Issue #82 — Revisão diária](../../../board-exam-app/issue82_daily_review_e2e.json)
- [Issue #120 — Tema e seletores](../../../board-exam-app/issue120_e2e.json)
- [Issue #128 — Movimento do grafo](../../../board-exam-app/issue128_motion_e2e.json)
- [Issue #132 — Responsividade Home](../../../board-exam-app/issue132_home_e2e.json)
- [Issue #136 — Questões contextuais](../../../board-exam-app/issue136_e2e.json)
- [Issue #138 — SpaceSwitcher](../../../board-exam-app/issue138_spaces_e2e.json)
- [Issue #139 — Comandos](../../../board-exam-app/issue139_commands_e2e.json)
- [Issue #140 — Type Studio](../../../board-exam-app/issue140_type_studio_e2e.json)
- [Diagnóstico PDF #112](../../../board-exam-app/pdf112_diagnostic.json)

## Blocos originais

- [e300 — Prints e feedback](../../../board-exam-app/index.html#e300)
- [e993 — Low-Chrome](../../../board-exam-app/index.html#e993)
- [e1300 — Gaps de referência](../../../board-exam-app/index.html#e1300)
