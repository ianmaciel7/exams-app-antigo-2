# Inventário do Capacities (issue #32)

Data da pesquisa: 2026-11-14. Escopo: fontes públicas (documentação oficial, páginas de produto e comparação do fornecedor, uma review de concorrente, notas de versão antigas). Não houve acesso ao aplicativo autenticado, a código privado ou a capturas de tela de uso real.

**Legenda de certeza:** *Oficial* (declarado pelo Capacities), *Terceiros* (review ou blog), *Antigo* (nota de versão de 2022 ou 2024), *Não verificado*.

**Ressalva:** várias páginas linkadas não foram lidas (importação, exportação, offline, datas e notas diárias, preços, rate limiting). Os itens dependentes delas estão marcados como não verificados.

## 1. Produto e ecossistema

- **Posicionamento** (*Oficial*, capacities.io/product): app de anotações e PKM "built around objects, bi-directional links, daily notes, AI features, and calendar integration".
- **Plataformas** (*Oficial*): Mac, Windows, Linux, iOS, Android e web.
  - *Conflito:* a review da Saner.ai (março de 2026, *Terceiros*) diz que não há app para Linux. Não resolvido.
- **Planos** (*Terceiros* e comparação do fornecedor):
  - Free: objetos ilimitados, todas as plataformas, acesso offline (*Oficial*). A review diz 5 GB de armazenamento (*Terceiros*).
  - Pro: US$ 9,99/mês anual (*Oficial*, comparação) ou US$ 11,99/mês mensal (*Terceiros*). Inclui IA, queries com nome, integração de calendário, tarefas e API (*Terceiros*).
  - Builder: US$ 14,99/mês (*Terceiros*). A comparação oficial não cita este plano.
  - Preços não verificados na página oficial de preços.
- **Servidores** (*Oficial*): UE, backups diários criptografados, TLS em trânsito. Sem criptografia de ponta a ponta, declarado como escolha para que sync, busca e integrações funcionem.
- **Exportação** (*Oficial*): Markdown, CSV e arquivos de mídia com links preservados. Detalhes não verificados.
- **Sincronização e offline** (*Conflito*): a comparação oficial diz "full offline access". A review diz "offline-first", com IA e sync dependendo de internet. Não verificado na página de offline.
- **Changelog**: há páginas de "What's new" (release-9 de 2022, release-33 de janeiro de 2024). Não foi feito levantamento de versões recentes.

## 2. Arquitetura da informação

- **Tipos de objeto básicos** (*Oficial*): Page, Whiteboard, Tag, Image, Weblink, Audio, PDF, Files, Tweet (integração desativada), AI Chat, Query e Table. Não aparecem no Object Studio. Entram na sidebar no primeiro uso.
- **Tipos personalizados** (*Oficial*): criados em Settings > Object Types. Podem ter propriedades, layout de página, dashboard de objeto e visualização em cards.
- **Object Dashboard** (*Oficial*): cada tipo tem um. Seções: objetos abertos recentemente, sem tag, fora de coleção, sem backlinks e coleções. Queries no dashboard são Pro.
- **Navegação**: sidebar, topbar, tabs e painel de backlinks (*Oficial*). Estrutura exata de topbar e abas não verificada.
- **Rotas, deep links, estados vazios e erros**: não verificados.

## 3. Modelo de domínio

### Objetos
- Todo objeto tem um tipo (*Oficial*). Conversão de tipo é suportada, inclusive em coleções inteiras. Merge só entre objetos do mesmo tipo.
- Duplicar objeto é possível; duplicar tipo inteiro não (*Oficial*).

### Propriedades (*Oficial*, docs/reference/properties)
- **Padrão** (em todos os tipos; a visibilidade pode ser controlada, exceto título): Title (alimenta busca), Aliases, Description, Icon, Created at (alimenta a visão "neste dia" do calendário), Tags.
- **Normais**: Text (sem tipo URL próprio), Cover Image, Number, Checkbox, Content (bloco; um segundo Content pede confirmação), Datetime (com intervalo, aparece no calendário), Label (seleção simples ou múltipla), Object Select (dropdown ligado a um tipo, pode ser bidirecional).
- Propriedades de tipos básicos não podem ser editadas.
- Mudança de tipo de propriedade é possível quando há conversão; o original é mantido e pode haver perda.

### Tags, labels e coleções (*Oficial*)
- **Labels**: categorizam dentro de um tipo.
- **Tags**: conectam entre tipos.
- **Coleção**: lista manual de um único tipo. Não aninha, não mistura tipos; um objeto pode estar em várias.
- **Query**: "saved filters or smart views", atualizadas em tempo real. Filtros: tipo, coleção, tags ou backlinks, busca, propriedades, exclusões. Controles: ordenação, agrupamento, limite (inclui subconjunto aleatório) e exibição (objetos, blocos ou ambos). Queries com nome são Pro.
- **Regra do fornecedor**: coleção quando a lista é montada à mão, query quando deve se atualizar sozinha.
- **Queries variáveis** ("This object") precisam ser embutidas para funcionar (*Oficial*).

### Visualizações
- O produto cita listas, galerias, tabelas e cards (*Oficial*). Uma página específica para cada visualização não foi lida.
- Kanban é citado apenas em uma recomendação de conteúdo, agrupado por labels (*Oficial*).

### Daily notes, calendário e captura
- Notas diárias, "Quick capture" via WhatsApp, Telegram e e-mail, Timeline e "Automatic threading" (*Oficial*, produto).
- Integração de calendário: Google, Outlook, iCloud e CalDAV, Pro (*Oficial* e *Terceiros*).
- Tarefas aparecem em dashboard, com envio para Todoist, Things, TickTick, Apple Reminders, Google Tasks e Microsoft To Do (*Oficial*).
- Detalhes de datas e notas diárias não verificados.

### Mídia e arquivos
- PDFs, fotos e áudio. Pro adiciona OCR, marcação em PDF, leitor de artigos e transcrição de reuniões (*Oficial*).
- Limite de armazenamento Free: *Conflito* entre fontes (ver seção 1).

### Backlinks e grafo
- Backlinks automáticos. Backlinks contextuais mostram o bloco em que o link foi criado, com blocos pai e filho (*Antigo*, release-9, 2022).
- Grafo: "Graph view" do network inteiro e "visual knowledge graph with tag network" (*Oficial*). Objetos públicos aparecem em verde (*Antigo*).
- Comportamento de foco, física, filtros e cores do grafo: não verificado. Não atribuímos algoritmo de física, conforme a regra da issue.

### Relações
- Object Select cria relações tipadas e bidirecionais (*Oficial*).
- Relação unidirecional ou bidirecional criada em um lado (*Oficial*, docs de organização).

## 4. API e integrações

- API REST em api.capacities.io, com um space por token (*Oficial*). Escopos `api:read` e `api:write`.
- Endpoint de exemplo: `GET /space/structures`. SDK TypeScript `@capacities/api`. OpenAPI em api.capacities.io/openapi.json (*Oficial*).
- *Conflito*: a review diz que a API é Pro; a página oficial mostra badge Pro. Rate limiting e erros não verificados.
- Conectores MCP para ChatGPT, Claude, Le Chat e Cursor (*Oficial*).
- Readwise e Kindle (Pro, *Terceiros*).

## 5. Pontos fortes e fracos (*Terceiros*, review da Saner.ai, concorrente)

- **Pontos fortes**: modelo de objetos, design desktop (nota 9/10), plano gratuito generoso, servidores na UE, links bidirecionais, integração com Readwise e Kindle.
- **Pontos fracos**: curva de aprendizado, app mobile limitado e instável, sem widget, sem importação em massa de Notion ou Obsidian, web clipper salva só o link, sem colaboração de equipe, grafo menos poderoso que o do Obsidian, sem canvas.
- A review é de um concorrente direto, então deve ser lida com cuidado.

## 6. Não copiar

- Identidade visual, ícones, cores e textos do Capacities.
- Conteúdo de documentação e de páginas de produto.
- Código, algoritmo de grafo ou física sem evidência pública.

## 7. Matriz preliminar Capacities × Exam App `dev`

| Recurso Capacities | Evidência | Equivalente no Exam App | Lacuna | Observação para estudo |
|---|---|---|---|---|
| Objetos com tipo e propriedades | Oficial | Tipos Concurso, Órgão, Banca, Cargo, Edição, Disciplina, Questão, Simulado, Resposta, PDF | Propriedades tipadas em painel próprio | Já existe modelo parecido (#22) |
| Object Select bidirecional | Oficial | Relações entre objetos (#22) | Verificar edição bidirecional | Relações em um lado só, conforme spec do Ian |
| Labels × tags × coleções × queries | Oficial | Coleções e filtros de listas (popover) | Queries salvas ainda não existem | Proposta 2 do Board: saved filter como "Visão" |
| Backlinks contextuais | Antigo | Painel direito com backlinks (#25) | Mostrar o bloco de origem | Útil para ver onde uma questão é citada |
| Grafo | Oficial | #13 | Foco, filtros e física não verificados | Não copiar algoritmo; comparar só comportamento |
| Daily notes e calendário | Oficial | Não existe | Fora do foco atual | Baixa prioridade |
| Captura rápida | Oficial | Não existe | Fora do foco | Baixa prioridade |
| Tarefas | Oficial | Simulados e revisão | Modelo diferente | Ver #21 para dashboard |
| Import/export | Oficial parcial | Não existe | Não verificado | Pendente de leitura das páginas |
| API | Oficial | Não existe | Fora do escopo atual | Baixa prioridade |

## 8. Recomendações priorizadas

1. Adotar a regra "coleção à mão × query automática" como orientação da proposta de "Visão" (proposta 2 do Board).
2. Mostrar o bloco de origem nos backlinks do painel direito (#25).
3. Ler as páginas pendentes (importação, exportação, offline, preços, rate limiting) antes de decidir sobre sync e exportação.
4. Manter o grafo como comportamento observável, sem copiar física.

## 9. Lacunas e fontes

**Lidas com sucesso (HTTP 200):**
- https://docs.capacities.io/reference/content-types
- https://docs.capacities.io/reference/properties
- https://docs.capacities.io/reference/queries
- https://docs.capacities.io/reference/collections
- https://docs.capacities.io/reference/organizational-structures
- https://docs.capacities.io/faq/editing/queries-vs-collections
- https://capacities.io/product
- https://capacities.io/compare/capacities-vs-obsidian
- https://developers.capacities.io/api/overview
- https://capacities.io/whats-new/release-9 (*Antigo*, 2022)
- https://capacities.io/whats-new/release-33 (*Antigo*, 2024)
- https://blog.saner.ai/capacities-review (*Terceiros*, concorrente, março de 2026)

**Não lidas:**
- Importação, exportação, offline, datas e notas diárias, preços oficiais, rate limiting da API.
- Páginas de visualizações, espaços, configurações e compartilhamento.
- Changelog recente (últimos 12 meses).

**Conflitos entre fontes:**
- Linux: produto e comparação dizem que há app; review diz que não.
- Importação: review diz que não há importação em massa; a comparação linka um guia de importação.
- Preço Pro: US$ 9,99 anual × US$ 11,99 mensal; Builder só na review.
- Offline: "full offline access" × "offline-first" com sync dependente de internet.
- Armazenamento Free: "objetos ilimitados" × 5 GB.
- API: Pro segundo a review; badge Pro na página oficial.
