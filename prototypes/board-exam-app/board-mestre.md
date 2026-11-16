# Exam App — Central de Boards

> Navegação por assunto, não por etapa. Cada board temático agrupa documentos e blocos do canvas original. O conteúdo canônico permanece em board.json/BOARD.md; estes boards são mapas e índices, não cópias.

## Visão geral

| Board | Escopo | Blocos | Documentos | Diagrama |
| --- | --- | ---: | ---: | --- |
| 01 — Produto & domínio | Modelo de domínio, tipos, propriedades, relações e decisões de produto. | 6 | 3 | [Abrir](../docs/board/boards/01-produto-e-dominio.md) |
| 02 — Workspace & UX | Navegação, layout, painéis, propriedades, grafo, responsividade e interação. | 14 | 7 | [Abrir](../docs/board/boards/02-workspace-e-ux.md) |
| 03 — Fluxos de estudo | Questões, filtros, cadernos, simulados, recuperação, revisão e leitura de PDFs. | 9 | 7 | [Abrir](../docs/board/boards/03-fluxos-de-estudo.md) |
| 04 — Arquitetura técnica | Serviços, estado, IA, sincronização, integrações e infraestrutura de agentes. | 6 | 3 | [Abrir](../docs/board/boards/04-arquitetura-tecnica.md) |
| 05 — Pesquisa & benchmarks | Fontes externas, análises de concorrentes, dossiês e sínteses de referência. | 8 | 8 | [Abrir](../docs/board/boards/05-pesquisa-e-decisoes.md) |
| 06 — Evidências & qualidade | Capturas, antes/depois, resultados de testes e rastreabilidade verificável. | 3 | 4 | [Abrir](../docs/board/boards/06-evidencias-e-qualidade.md) |
| 07 — Entrega & arquivo | Versões, roadmap histórico, arquivos de entrada e recuperação de branches antigas. | 7 | 5 | [Abrir](../docs/board/boards/07-entrega-e-arquivo.md) |

## 01 — Produto & domínio

Modelo de domínio, tipos, propriedades, relações e decisões de produto.

[Abrir diagrama do board](../docs/board/boards/01-produto-e-dominio.md)

### Documentos

- [Board original completo](BOARD.md) — Fonte canônica dos blocos e especificações.
- [Pesquisa Capacities](../docs/research/capacities-issue-32-2026-11-15.md) — Referência oficial sobre objetos, tipos e propriedades.
- [Arquitetura da informação](../docs/ux/arquitetura-informacao-navegacao.md) — Distingue jornadas de tipos de objeto.

### Blocos do canvas original

| Bloco | Tipo de conteúdo | ID |
| --- | --- | --- |
| Espaço → Objeto → Tipo | modelo | [e52](index.html#e52) |
| Modelo de objetos e relações | modelo | [e104](index.html#e104) |
| Herança Arquivo → Documento → PDF | modelo | [e99](index.html#e99) |
| Glossário do domínio | referencia | [e95](index.html#e95) |
| Decisões de modelagem | decisao | [e152](index.html#e152) |
| Matriz de decisões de produto | decisao | [e1150](index.html#e1150) |

## 02 — Workspace & UX

Navegação, layout, painéis, propriedades, grafo, responsividade e interação.

[Abrir diagrama do board](../docs/board/boards/02-workspace-e-ux.md)

### Documentos

- [Arquitetura da informação e navegação](../docs/ux/arquitetura-informacao-navegacao.md) — Rotas, jornadas e hierarquia de páginas.
- [Leis e princípios UX/UI](../docs/ux/ux-ui-principles.md) — Catálogo de princípios e critérios.
- [Padrões de componentes UI](../docs/ux/componentes-ui-padroes-2026.md) — Inventário de padrões verificáveis.
- [Taxonomia de componentes e dialogs](../docs/ux/taxonomia-componentes-e-dialogs-2026.md) — Variantes e semântica de componentes.
- [Data Visualization e dashboards](../docs/ux/data-visualization-dashboards-2026.md) — Métricas, gráficos e dashboards.
- [Pesquisa UX — 20 fontes](../docs/ux/pesquisa-20-fontes-2026-11.md) — Síntese de referências.
- [Auditoria Material 3 e Apple](../docs/auditorias/231-skills-m3-apple.md) — Auditoria de design systems.

### Blocos do canvas original

| Bloco | Tipo de conteúdo | ID |
| --- | --- | --- |
| Workspace de três painéis | arquitetura de interação | [e500](index.html#e500) |
| Diretrizes gerais de UI/UX | diretriz | [e162](index.html#e162) |
| Painel de propriedades | especificacao | [e504](index.html#e504) |
| Dashboard central de estudos | especificacao | [e506](index.html#e506) |
| Explorar, grafo e navegação contextual | especificacao | [e510](index.html#e510) |
| Auditoria geral de UI/UX | auditoria | [e600](index.html#e600) |
| Capacities e branches antigas | pesquisa | [e700](index.html#e700) |
| Painel direito e motor de grafo | blueprint | [e800](index.html#e800) |
| Tema e seletores nativos | teste | [e1228](index.html#e1228) |
| Responsividade da Home | teste | [e1339](index.html#e1339) |
| Movimento reduzido no grafo | teste | [e1351](index.html#e1351) |
| Exportação PNG do grafo | teste | [e1361](index.html#e1361) |
| SpaceSwitcher | especificacao | [e1385](index.html#e1385) |
| Atalhos e roteador de comandos | especificacao | [e1397](index.html#e1397) |

## 03 — Fluxos de estudo

Questões, filtros, cadernos, simulados, recuperação, revisão e leitura de PDFs.

[Abrir diagrama do board](../docs/board/boards/03-fluxos-de-estudo.md)

### Documentos

- [Estratégia de questões — #230](../docs/pesquisas/230-estrategia-questoes/README.md) — Consolidação do fluxo e pendências.
- [Pesquisa QConcursos — #31](../docs/research/qconcursos-issue-31-2026-11-15.md) — Filtros, cadernos e simulados.
- [Inventário ExamTopics](../docs/research/examtopics-inventory.md) — Banco, questões e tópicos.
- [Gran Questões — #62](../docs/research/gran-questoes-issue-62-2026-11-15.md) — Evidências públicas e critérios pendentes.
- [Análise QConcursos](../analises/analise-qconcursos.md) — Análise funcional complementar.
- [Análise ExamTopics](../analises/analise-examtopics.md) — Análise funcional complementar.
- [Dossiê Readwise Reader e SRS](READWISE_DOSSIER.md) — Leitura, destaques e revisão espaçada.

### Blocos do canvas original

| Bloco | Tipo de conteúdo | ID |
| --- | --- | --- |
| Navegação por teclado, grade e relatório | fluxo | [e508](index.html#e508) |
| Banco de questões e simulados | fluxo | [e1155](index.html#e1155) |
| PDF.js: texto, canvas, DPR e zoom | diagnostico | [e1177](index.html#e1177) |
| Cadernos e queries de questões | fluxo | [e1188](index.html#e1188) |
| Filtros avançados | fluxo | [e1208](index.html#e1208) |
| Questões contextuais | componente | [e1381](index.html#e1381) |
| Recuperação de erros | fluxo | [e1453](index.html#e1453) |
| Revisão diária | fluxo | [e1465](index.html#e1465) |
| PDF Reader: reflow e anotações | especificacao | [e1477](index.html#e1477) |

## 04 — Arquitetura técnica

Serviços, estado, IA, sincronização, integrações e infraestrutura de agentes.

[Abrir diagrama do board](../docs/board/boards/04-arquitetura-tecnica.md)

### Documentos

- [Claude Pro Storage API](../docs/reports/claude-storage-api/CLAUDE_STORAGE_API_INTEGRATION.md) — Fila, proxy, segurança e homologação.
- [Investigação Storage Bridge](../docs/reports/claude-storage-bridge/CLAUDE_STORAGE_BRIDGE_INVESTIGATION.md) — Experimentos e limites da sandbox.
- [Fontes de verdade do board](../docs/board/FONTES.md) — Responsabilidades e sincronização.

### Blocos do canvas original

| Bloco | Tipo de conteúdo | ID |
| --- | --- | --- |
| Camada de IA | arquitetura | [e410](index.html#e410) |
| Infraestrutura de agentes | infraestrutura | [e1248](index.html#e1248) |
| Claude Storage Bridge — PoC | experimento | [e1371](index.html#e1371) |
| Claude Storage — homologação | homologacao | [e1440](index.html#e1440) |
| Isolamento do grafo por espaço | arquitetura | [e1407](index.html#e1407) |
| Máquina de estados de carregamento | arquitetura | [e1450](index.html#e1450) |

## 05 — Pesquisa & benchmarks

Fontes externas, análises de concorrentes, dossiês e sínteses de referência.

[Abrir diagrama do board](../docs/board/boards/05-pesquisa-e-decisoes.md)

### Documentos

- [Capacities — #32](../docs/research/capacities-issue-32-2026-11-15.md) — Fatos oficiais e lacunas.
- [ExamTopics — inventário](../docs/research/examtopics-inventory.md) — Sitemap e funcionalidades observadas.
- [QConcursos — #31](../docs/research/qconcursos-issue-31-2026-11-15.md) — Observações e critérios pendentes.
- [Gran Questões — #62](../docs/research/gran-questoes-issue-62-2026-11-15.md) — Evidências públicas.
- [Auditoria UI skills — #156](../docs/research/issue-156-ui-skills-audit-2026-11-15.md) — Material 3, Apple e limites.
- [Pesquisa UX — 20 fontes](../docs/ux/pesquisa-20-fontes-2026-11.md) — Síntese de referências.
- [Análise QConcursos](../analises/analise-qconcursos.md) — Inventário local.
- [Análise ExamTopics](../analises/analise-examtopics.md) — Inventário local.

### Blocos do canvas original

| Bloco | Tipo de conteúdo | ID |
| --- | --- | --- |
| Índice de fontes e referências | referencia | [e107](index.html#e107) |
| QConcursos — referência | benchmark | [e108](index.html#e108) |
| ExamTopics — referência | benchmark | [e116](index.html#e116) |
| Readwise — Reader e SRS | benchmark | [e119](index.html#e119) |
| ExamTopics — análise e pendências | pesquisa | [e190](index.html#e190) |
| QConcursos — análise e pendências | pesquisa | [e400](index.html#e400) |
| Dossiê funcional comparativo | pesquisa | [e900](index.html#e900) |
| Dossiê Readwise — inventário completo | pesquisa | [e1090](index.html#e1090) |

## 06 — Evidências & qualidade

Capturas, antes/depois, resultados de testes e rastreabilidade verificável.

[Abrir diagrama do board](../docs/board/boards/06-evidencias-e-qualidade.md)

### Documentos

- [Catálogo de evidências](../docs/evidence/CATALOG.md) — Índice navegável das mídias.
- [Catálogo estruturado](../docs/evidence/catalog.json) — Hashes, duplicatas, órfãos e referências.
- [Galeria de evidências](../docs/evidence/gallery.html) — Visualização filtrável.
- [Relatório de reestruturação](../docs/board/RELATORIO-REESTRUTURACAO.md) — Histórico, validações e limitações.

### Blocos do canvas original

| Bloco | Tipo de conteúdo | ID |
| --- | --- | --- |
| Capturas do usuário e feedback | evidencia | [e300](index.html#e300) |
| Low-chrome — antes e depois | evidencia | [e993](index.html#e993) |
| Fechamento dos gaps de referência | auditoria-evidencia | [e1300](index.html#e1300) |

## 07 — Entrega & arquivo

Versões, roadmap histórico, arquivos de entrada e recuperação de branches antigas.

[Abrir diagrama do board](../docs/board/boards/07-entrega-e-arquivo.md)

### Documentos

- [README de protótipos](../README.md) — Ponto de entrada para protótipos e boards.
- [Catálogo de branches arquivadas](../docs/archives/README.md) — Índice dos bundles e snapshots.
- [Mapa de reutilização](../docs/archives/REUSE-MAP.md) — Candidatos e limites de reutilização.
- [Fontes de verdade](../docs/board/FONTES.md) — Governança do board.
- [Relatório da reestruturação](../docs/board/RELATORIO-REESTRUTURACAO.md) — Histórico das fases anteriores.

### Blocos do canvas original

| Bloco | Tipo de conteúdo | ID |
| --- | --- | --- |
| Feito — coluna de status legada | historico | [e47](index.html#e47) |
| Em andamento — coluna de status legada | historico | [e48](index.html#e48) |
| Pendente — coluna de status legada | historico | [e49](index.html#e49) |
| Versão 0.1.0 | versao | [e4](index.html#e4) |
| Versão 0.1.1 | versao | [e149](index.html#e149) |
| Roadmap original de versões | historico | [e154](index.html#e154) |
| Arquivos de entrada do projeto | referencia | [e363](index.html#e363) |
