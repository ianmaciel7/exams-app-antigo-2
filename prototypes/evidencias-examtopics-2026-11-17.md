# Evidências — ExamTopics × Exams App (17/11/2026)

> **Fonte de verdade da auditoria:** este dossiê integra **todos os achados listados** no benchmark de 17/11/2026, a matriz com a `dev`, as evidências de fonte, cinco imagens históricas e as pendências. O catálogo/board de evidências aponta para cá; os documentos de pesquisa permanecem como histórico e síntese. Observações públicas não comprovam comportamento autenticado. Nenhum screenshot ou E2E novo foi produzido nesta etapa.

**Base Exam App:** `dev@a594e16` (código examinado originalmente em `41b6987`; sem alteração funcional no merge documental). **Método:** Firecrawl (`map`, `search`, `scrape`, `interact` sem login), GitHub para inspeção do código e validações do board. **Issue:** [#28](https://github.com/ianmaciel7/exams-app/issues/28). **PR de pesquisa anterior:** [#275](https://github.com/ianmaciel7/exams-app/pull/275).

## Como interpretar as evidências

- **Observado**: elemento visual/HTML ou fluxo público conferido no site em 17/11. **Formulário observado** não confirma conclusão do envio.
- **Oferta pública**: benefício anunciado pelo fornecedor; não confirma entrega em conta paga. **Não identificado** significa ausência na navegação pública examinada, nunca inexistência universal.
- **Dev no código**: caminho/função presente no protótipo; scripts E2E no repositório **não foram reexecutados nesta investigação**. **Parcial** indica dados, modalidades ou sessões ainda sem comprovação.
- **Imagem histórica**: captura versionada anteriormente (AZ-104), **não** uma captura nova de AZ-900 em 17/11. As imagens são evidências visuais de um snapshot anterior e não substituem inspeção atual.
- **Sem evidência**: registrar explicitamente como pendência, nunca inventar screenshot, GIF, teste ou funcionamento.

## Evidências visuais históricas — AZ-104

| ID | Captura visível | O que mostra | Escopo |
| --- | --- | --- | --- |
| EX-IMG-01 | ![Cabeçalho e visão geral; captura AZ-104 histórica](examtopics_az104_header_and_overview.png) | Cabeçalho e visão geral; captura AZ-104 histórica | Captura anterior; data e versão visual exatas não confirmadas |
| EX-IMG-02 | ![Card da questão; captura AZ-104 histórica](examtopics_az104_question_card.png) | Card da questão; captura AZ-104 histórica | Captura anterior; data e versão visual exatas não confirmadas |
| EX-IMG-03 | ![Revelação do gabarito e votação; captura AZ-104 histórica](examtopics_az104_solution_reveal.png) | Revelação do gabarito e votação; captura AZ-104 histórica | Captura anterior; data e versão visual exatas não confirmadas |
| EX-IMG-04 | ![Discussão e votos; captura AZ-104 histórica](examtopics_az104_discussion_modal.png) | Discussão e votos; captura AZ-104 histórica | Captura anterior; data e versão visual exatas não confirmadas |
| EX-IMG-05 | ![Paginação e rodapé; captura AZ-104 histórica](examtopics_az104_pagination_and_footer.png) | Paginação e rodapé; captura AZ-104 histórica | Captura anterior; data e versão visual exatas não confirmadas |

[Galeria de evidências](gallery.html) · [Catálogo central](CATALOG.md) · [Canvas completo](board-exam-app__index.html) · [Manifesto estruturado](examtopics-auditoria-evidencias-2026-11-17.json)

## Inventário de fontes verificáveis

| Fonte | Página oficial | Nível de acesso | Proveniência |
| --- | --- | --- | --- |
| ET-01 | [Catálogo geral](https://www.examtopics.com/exams/) | público | Extração pública de 17/11, exceto ET-16 (capturas anteriores) |
| ET-02 | [Exames Google](https://www.examtopics.com/exams/google/) | público | Extração pública de 17/11, exceto ET-16 (capturas anteriores) |
| ET-03 | [Exame AZ-900](https://www.examtopics.com/exams/microsoft/az-900/) | público | Extração pública de 17/11, exceto ET-16 (capturas anteriores) |
| ET-04 | [Banco AZ-900](https://www.examtopics.com/exams/microsoft/az-900/view/) | público | Extração pública de 17/11, exceto ET-16 (capturas anteriores) |
| ET-05 | [Banco AWS CLF-C02](https://www.examtopics.com/exams/amazon/aws-certified-cloud-practitioner-clf-c02/view/) | público | Extração pública de 17/11, exceto ET-16 (capturas anteriores) |
| ET-06 | [AZ-900 página 2](https://www.examtopics.com/exams/microsoft/az-900/view/2/) | tela de login pública | Extração pública de 17/11, exceto ET-16 (capturas anteriores) |
| ET-07 | [AZ-900 página 30](https://www.examtopics.com/exams/microsoft/az-900/view/30/) | tela de login pública | Extração pública de 17/11, exceto ET-16 (capturas anteriores) |
| ET-08 | [Discussão AZ-900](https://www.examtopics.com/discussions/microsoft/view/93155-exam-az-900-topic-1-question-401-discussion/) | público | Extração pública de 17/11, exceto ET-16 (capturas anteriores) |
| ET-09 | [Discussões Microsoft](https://www.examtopics.com/discussions/microsoft/) | público | Extração pública de 17/11, exceto ET-16 (capturas anteriores) |
| ET-10 | [Login](https://www.examtopics.com/login/) | formulário público | Extração pública de 17/11, exceto ET-16 (capturas anteriores) |
| ET-11 | [Cadastro](https://www.examtopics.com/signup/) | formulário público | Extração pública de 17/11, exceto ET-16 (capturas anteriores) |
| ET-12 | [ExamTopics PRO](https://www.examtopics.com/unlimited/) | oferta pública; benefícios não testados | Extração pública de 17/11, exceto ET-16 (capturas anteriores) |
| ET-13 | [Checkout PRO](https://www.examtopics.com/pro/) | oferta pública | Extração pública de 17/11, exceto ET-16 (capturas anteriores) |
| ET-14 | [Termos](https://www.examtopics.com/terms/) | público | Extração pública de 17/11, exceto ET-16 (capturas anteriores) |
| ET-15 | [Blog](https://www.examtopics.com/news/) | público | Extração pública de 17/11, exceto ET-16 (capturas anteriores) |
| ET-16 | [Catálogo histórico AZ-104](https://www.examtopics.com/exams/microsoft/az-104/view/) | referência para capturas históricas; não reverificado nesta auditoria | Extração pública de 17/11, exceto ET-16 (capturas anteriores) |

## Matriz completa de observações, lacunas e comparação

**Status da dev não representa resultado de CI de execução do produto.** O detalhamento dos caminhos e símbolos consta também na [auditoria técnica](examtopics-auditoria-2026-11-17.md).

### Catálogo (7 registros)

| ID | Funcionalidade ou achado | Estado da evidência | Fonte | Exam App `dev` | Decisão |
| --- | --- | --- | --- | --- | --- |
| ET-E01 | Lista de fornecedores de certificação | observado | [ET-01](https://www.examtopics.com/exams/), [ET-02](https://www.examtopics.com/exams/google/) | não localizado | adiar |
| ET-E02 | Listagem de exames por fornecedor | observado | [ET-01](https://www.examtopics.com/exams/), [ET-02](https://www.examtopics.com/exams/google/) | parcial | adaptar |
| ET-E03 | Pesquisa por nome ou código de exame | observado | [ET-01](https://www.examtopics.com/exams/) | parcial | condicionar a certificações |
| ET-E04 | Rótulo de exame popular | observado | [ET-02](https://www.examtopics.com/exams/google/) | não verificado | opcional |
| ET-E05 | Página de detalhes de exame | observado | [ET-03](https://www.examtopics.com/exams/microsoft/az-900/) | parcial | adaptar |
| ET-E06 | Contagem de questões do exame | observado | [ET-03](https://www.examtopics.com/exams/microsoft/az-900/), [ET-04](https://www.examtopics.com/exams/microsoft/az-900/view/) | no código | manter |
| ET-E07 | Data de atualização do banco | observado | [ET-04](https://www.examtopics.com/exams/microsoft/az-900/view/) | parcial | proveniência/atualização |

### Questões (9 registros)

| ID | Funcionalidade ou achado | Estado da evidência | Fonte | Exam App `dev` | Decisão |
| --- | --- | --- | --- | --- | --- |
| ET-E08 | Questão identificada por número e tópico | observado | [ET-04](https://www.examtopics.com/exams/microsoft/az-900/view/), [ET-05](https://www.examtopics.com/exams/amazon/aws-certified-cloud-practitioner-clf-c02/view/) | no código | manter |
| ET-E09 | Enunciado e alternativas com letras | observado | [ET-04](https://www.examtopics.com/exams/microsoft/az-900/view/), [ET-05](https://www.examtopics.com/exams/amazon/aws-certified-cloud-practitioner-clf-c02/view/) | no código | manter |
| ET-E10 | Paginação por página de questões | observado | [ET-04](https://www.examtopics.com/exams/microsoft/az-900/view/) | no código | manter |
| ET-E11 | Intervalo X–Y e total de N questões | observado | [ET-04](https://www.examtopics.com/exams/microsoft/az-900/view/) | no código | manter |
| ET-E12 | Navegação anterior e próxima página | observado | [ET-04](https://www.examtopics.com/exams/microsoft/az-900/view/) | no código | manter |
| ET-E13 | Revelar ou ocultar solução/gabarito | observado | [ET-04](https://www.examtopics.com/exams/microsoft/az-900/view/) | no código | adaptar |
| ET-E14 | Resposta sugerida apresentada após revelar | observado | [ET-04](https://www.examtopics.com/exams/microsoft/az-900/view/) | no código | preferir oficial |
| ET-E15 | Enunciado com diagramas e imagens (exhibits) | observado | [ET-04](https://www.examtopics.com/exams/microsoft/az-900/view/) | parcial | aprofundar E2E |
| ET-E16 | Cenários e estudos de caso nos enunciados | observado | [ET-04](https://www.examtopics.com/exams/microsoft/az-900/view/) | parcial | separar contexto/tipo |

### Comunidade (9 registros)

| ID | Funcionalidade ou achado | Estado da evidência | Fonte | Exam App `dev` | Decisão |
| --- | --- | --- | --- | --- | --- |
| ET-E17 | Alternativa mais votada indicada | observado | [ET-04](https://www.examtopics.com/exams/microsoft/az-900/view/) | fora do escopo | não copiar |
| ET-E18 | Distribuição percentual de votos por alternativa | observado | [ET-04](https://www.examtopics.com/exams/microsoft/az-900/view/) | fora do escopo | não copiar |
| ET-E19 | Discussão individual por questão | observado | [ET-08](https://www.examtopics.com/discussions/microsoft/view/93155-exam-az-900-topic-1-question-401-discussion/) | fora do escopo | adaptar para justificativas |
| ET-E20 | Comentários de usuários | observado | [ET-08](https://www.examtopics.com/discussions/microsoft/view/93155-exam-az-900-topic-1-question-401-discussion/), [ET-09](https://www.examtopics.com/discussions/microsoft/) | fora do escopo | não copiar |
| ET-E21 | Respostas/réplicas em discussões | observado | [ET-08](https://www.examtopics.com/discussions/microsoft/view/93155-exam-az-900-topic-1-question-401-discussion/) | fora do escopo | não copiar |
| ET-E22 | Alternativa escolhida em comentário | observado | [ET-08](https://www.examtopics.com/discussions/microsoft/view/93155-exam-az-900-topic-1-question-401-discussion/) | fora do escopo | não copiar |
| ET-E23 | Votos/curtidas em comentários | observado | [ET-08](https://www.examtopics.com/discussions/microsoft/view/93155-exam-az-900-topic-1-question-401-discussion/) | fora do escopo | não copiar |
| ET-E24 | Denunciar comentário | observado | [ET-08](https://www.examtopics.com/discussions/microsoft/view/93155-exam-az-900-topic-1-question-401-discussion/) | fora do escopo | não copiar |
| ET-E25 | Identificação do autor e data da postagem | observado | [ET-08](https://www.examtopics.com/discussions/microsoft/view/93155-exam-az-900-topic-1-question-401-discussion/) | fora do escopo | não copiar |

### Conta e acesso (7 registros)

| ID | Funcionalidade ou achado | Estado da evidência | Fonte | Exam App `dev` | Decisão |
| --- | --- | --- | --- | --- | --- |
| ET-E26 | Login por email e senha | formulário observado | [ET-10](https://www.examtopics.com/login/) | não homologado | futuro |
| ET-E27 | Cadastro com apelido, email e senha | formulário observado | [ET-11](https://www.examtopics.com/signup/) | não homologado | futuro |
| ET-E28 | Verificação de email no fluxo de cadastro | fluxo descrito publicamente | [ET-10](https://www.examtopics.com/login/), [ET-11](https://www.examtopics.com/signup/) | não homologado | futuro |
| ET-E29 | Recuperação de senha | formulário observado | [ET-10](https://www.examtopics.com/login/) | não homologado | futuro |
| ET-E30 | Reenvio de verificação/ativação | fluxo descrito publicamente | [ET-10](https://www.examtopics.com/login/), [ET-11](https://www.examtopics.com/signup/) | não homologado | futuro |
| ET-E31 | Exigência de login para avançar da primeira página de AZ-900 | observado | [ET-06](https://www.examtopics.com/exams/microsoft/az-900/view/2/), [ET-07](https://www.examtopics.com/exams/microsoft/az-900/view/30/) | não implementado | não copiar bloqueio |
| ET-E32 | Oferta de salvar histórico de navegação ao cadastrar | texto da interface observado | [ET-06](https://www.examtopics.com/exams/microsoft/az-900/view/2/) | parcial | persistência multi-conta pendente |

### Premium e conteúdo (8 registros)

| ID | Funcionalidade ou achado | Estado da evidência | Fonte | Exam App `dev` | Decisão |
| --- | --- | --- | --- | --- | --- |
| ET-E33 | Contributor Access por exame | oferta pública | [ET-03](https://www.examtopics.com/exams/microsoft/az-900/), [ET-12](https://www.examtopics.com/unlimited/) | fora do escopo | não copiar |
| ET-E34 | ExamTopics PRO com ativação de até dez exames | oferta pública | [ET-12](https://www.examtopics.com/unlimited/) | fora do escopo | não copiar |
| ET-E35 | Oferta de atualizações durante prazo contratado | oferta pública | [ET-12](https://www.examtopics.com/unlimited/) | fora do escopo | não copiar |
| ET-E36 | PRO promete navegação sem CAPTCHA/MFA | oferta pública | [ET-12](https://www.examtopics.com/unlimited/) | fora do escopo | não copiar |
| ET-E37 | PRO anuncia discussões integradas | oferta pública | [ET-12](https://www.examtopics.com/unlimited/) | fora do escopo | não copiar |
| ET-E38 | Aquisição separada de PDF de questões e respostas | oferta pública | [ET-03](https://www.examtopics.com/exams/microsoft/az-900/), [ET-13](https://www.examtopics.com/pro/) | fora do escopo | não copiar |
| ET-E39 | Checkout de produto digital e termos | formulário/oferta | [ET-13](https://www.examtopics.com/pro/), [ET-14](https://www.examtopics.com/terms/) | fora do escopo | não copiar |
| ET-E40 | Blog e conteúdo sobre certificações | observado | [ET-15](https://www.examtopics.com/news/) | não localizado | opcional |

### Não confirmado no ExamTopics (9 registros)

| ID | Funcionalidade ou achado | Estado da evidência | Fonte | Exam App `dev` | Decisão |
| --- | --- | --- | --- | --- | --- |
| ET-E41 | Filtro de questões por ano e dificuldade | não identificado no acesso público | [ET-04](https://www.examtopics.com/exams/microsoft/az-900/view/) | no código | não atribuir ao concorrente |
| ET-E42 | Filtro de questões por tipo ou situação da resposta | não identificado no acesso público | [ET-04](https://www.examtopics.com/exams/microsoft/az-900/view/) | no código | não atribuir ao concorrente |
| ET-E43 | Filtros múltiplos, chips, filtros salvos | não identificado no acesso público | [ET-04](https://www.examtopics.com/exams/microsoft/az-900/view/) | no código | diferencial |
| ET-E44 | Pesquisa pelo texto de questões | não identificado no acesso público | [ET-04](https://www.examtopics.com/exams/microsoft/az-900/view/) | no código | diferencial |
| ET-E45 | Resposta interativa corrigida automaticamente | não identificado no acesso público | [ET-04](https://www.examtopics.com/exams/microsoft/az-900/view/) | no código | diferencial |
| ET-E46 | Drag-and-drop e hotspot executáveis no navegador | não verificado; imagens/cenários não provam interação | [ET-04](https://www.examtopics.com/exams/microsoft/az-900/view/) | não localizado | pesquisar quando houver dados |
| ET-E47 | Simulado cronometrado, configurador e score final | não identificado no acesso público | [ET-03](https://www.examtopics.com/exams/microsoft/az-900/), [ET-04](https://www.examtopics.com/exams/microsoft/az-900/view/) | no código | diferencial |
| ET-E48 | Histórico de tentativas e dashboard pessoal | não verificado em conta autenticada | [ET-06](https://www.examtopics.com/exams/microsoft/az-900/view/2/) | no código | não atribuir ao concorrente |
| ET-E49 | Favoritos, flashcards e revisão espaçada | não identificado no acesso público | [ET-04](https://www.examtopics.com/exams/microsoft/az-900/view/) | no código (Exam App) | não atribuir ao concorrente |

### Comparação dev (8 registros)

| ID | Funcionalidade ou achado | Estado da evidência | Fonte | Exam App `dev` | Decisão |
| --- | --- | --- | --- | --- | --- |
| ET-E50 | Filtro Disciplina > Assunto e demais critérios | evidência estática do código dev | [código `dev`](exam-app-0.1.1__index.html) | no código | manter |
| ET-E51 | Chips, limpar filtros e sincronizar URL | evidência estática do código dev | [código `dev`](exam-app-0.1.1__index.html) | no código | manter |
| ET-E52 | Cadernos, favoritos e filtros salvos | evidência estática do código dev | [código `dev`](exam-app-0.1.1__index.html) | no código | manter |
| ET-E53 | Simulado com timer, correção e resultado | evidência estática do código dev | [código `dev`](exam-app-0.1.1__index.html) | no código | manter |
| ET-E54 | Exhibits acessíveis em todos contextos de questões | sem E2E específico nesta auditoria | [código `dev`](exam-app-0.1.1__index.html) | parcial | testar |
| ET-E55 | Tipos de resposta múltiplas, hotspot, drag-drop | sem implementação interativa localizada | [código `dev`](exam-app-0.1.1__index.html) | não localizado | futuro |
| ET-E56 | Fornecedor > certificação > exame e metadados de versão | não localizado como catálogo próprio | [código `dev`](exam-app-0.1.1__index.html) | não localizado | futuro |
| ET-E57 | Conta real e sincronização multi-dispositivo | não homologados nesta auditoria | [código `dev`](exam-app-0.1.1__index.html) | parcial | futuro |

## Rastreabilidade e critérios de aceite

| Item | Evidência acessível | Limite que deve permanecer visível |
| --- | --- | --- |
| Observações e recursos do ExamTopics | ET-E01 a ET-E57; fonte ET vinculada por registro | Fluxos pagos ou autenticados não testados |
| Capturas históricas | EX-IMG-01 a EX-IMG-05; miniaturas acima e galeria | AZ-104, não novas capturas do AZ-900 |
| Comportamento atual do Exam App | [Protótipo 0.1.1](exam-app-0.1.1__index.html) e [auditoria](examtopics-auditoria-2026-11-17.md) | Leitura estática; não afirmar E2E desta sessão |
| Testes existentes | [Filtros](../tests/advanced-question-filters.e2e.mjs), [Estudo](../tests/study-unification.e2e.mjs), [Pedagogia](../tests/question-pedagogy.e2e.mjs) | Existência ≠ execução em 17/11 |
| Histórico e decisões | [Inventário antigo](examtopics-inventory.md), [análise antiga](analise-examtopics.md), [board de pesquisa](05-pesquisa-e-decisoes.md) | Documentos históricos não são baseline da `dev` |

## Pendências de comprovação (não mascarar)

1. Sessão autenticada gratuita: visibilidade de demais páginas, histórico salvo e ações de comentar/votar.
2. PRO/Contributor: comprovar benefícios efetivos em conta contratada; não comprar plano para testar sem autorização.
3. Imagens **novas** desktop/tablet/mobile por tela, com data, viewport e URL, e GIF somente se captura de animação real.
4. E2E executado na `dev` atual para banco, filtros, gabarito, simulado, imagens, navegação e acessibilidade.
5. Modelagem futura de certificações e formatos multimodais sem inventar suporte já implementado.

**Regra permanente:** qualquer nova observação precisa de `ET-E##`, data, fonte, método, estado de acesso, decisão e vínculo à captura/HTML/DOM/teste quando disponível. Atualizar este documento, manifesto JSON, `board.json`, `BOARD.md`, índice temático e catálogo juntos.
