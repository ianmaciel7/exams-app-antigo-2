# Prototypes

Protótipos e material de design do Exam App, baixados do Claude. Tudo aqui é arquivo comum: qualquer agente ou pessoa lê diretamente.

| Pasta | O que é | Como ler |
| --- | --- | --- |
| `exam-app-0.1.1/` | Protótipo atual (HTML estático + PDFs + dados Dataprev) | Servir `prototypes/` e abrir `/exam-app-0.1.1/` |
| `exam-app-0.1.0/` | Versão anterior | Servir `prototypes/` e abrir `/exam-app-0.1.0/` |
| `board-exam-app/` | Canvas original e central de boards temáticos | Pessoas: `board-exam-app/mestre.html`; canvas: `board-exam-app/index.html` |
| `analises/` | Análises de QConcursos e ExamTopics | Markdown |

## Board do Exam App

- Comece pela central: `board-exam-app/mestre.html` mostra mapa dos sete boards, filtros por tipo, documentos e diagramas.
- Mapa e leitura por assunto: `../docs/board/README.md` e `../docs/board/boards/00-mapa-geral.md`.
- Agentes: leia primeiro o mapa geral e o board temático da tarefa; abra `BOARD.md` apenas para detalhes do canvas original.
- `board-exam-app/board.json`: fonte canônica dos blocos, imagens e setas.
- `board-exam-app/BOARD.md`: Markdown gerado de `board.json`; não editar manualmente.
- `board-exam-app/board-mestre.json`: índice temático; cada container aparece em exatamente um board.
- `board-exam-app/board-mestre.md`: índice Markdown gerado.
- `board-exam-app/index.html`: visualizador do canvas original; links `#ID` enquadram blocos.
- `board-exam-app/mestre.html`: central visual com mapa, lista, galeria e busca.
- `board-exam-app/assets/`: imagens do canvas.

## Fonte única e sincronização

O canvas local não sincroniza automaticamente com Claude Whiteboards. Alterações remotas precisam ser exportadas e validadas. Os boards temáticos são índices e diagramas; não copiam o conteúdo das fontes canônicas.
