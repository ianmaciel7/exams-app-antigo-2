# Fontes de verdade do board

Este documento diz qual fonte manda em cada tipo de informação e como as representações são geradas. Não há sincronização bidirecional automática entre elas.

| Fonte | Responsabilidade | Como é atualizada | Sincronização |
| --- | --- | --- | --- |
| `prototypes/board-exam-app/board.json` | Canvas: blocos, imagens e setas. Fonte canônica do board local. | Edição direta do JSON, em PR. | Gera `BOARD.md` (`board_to_md.py`). CI falha se `BOARD.md` estiver desatualizado. |
| `prototypes/board-exam-app/BOARD.md` | Versão em Markdown para leitura por IA e humanos. | Nunca editar à mão. Gerado. | Regenerado pelo CI a cada PR que mexe no board. |
| `prototypes/board-exam-app/board-mestre.json` | Índice compacto: áreas 01–05 e cards que apontam para blocos do `board.json` por ID. | Edição direta, em PR. | Gera `board-mestre.md` (`render_board_mestre.py`). Falha se algum ID não existir. |
| `prototypes/board-exam-app/index.html` | Visualizador do canvas. Aceita `#ID` para enquadrar um bloco. | Código, em PR. | Lê `board.json` em tempo de execução. |
| `prototypes/board-exam-app/mestre.html` | Visualizador do Board Mestre: busca, filtros, galeria e lista. | Código, em PR. | Lê `board-mestre.json` e `board.json`. |
| `docs/evidence/catalog.json` | Catálogo de evidências (capturas, testes, órfãos, duplicatas). | `scripts/build-evidence-catalog.py`. | `scripts/validate-evidence-catalog.py` verifica se está atualizado. |
| GitHub (issues, PRs, CI) | Execução de engenharia e status. | Pelo fluxo issue → PR contra `dev` → squash. | Não duplicar status no board à mão. |
| Claude Whiteboards | Exploração visual. | Manual, no próprio ambiente. | **Não sincronizado.** Nenhuma alteração remota foi verificada. Qualquer cópia exige teste real de exportação ou importação antes de ser afirmada. |

## Regras

1. Mudança no board começa em `board.json` ou `board-mestre.json`, nunca em `BOARD.md` ou `board-mestre.md`.
2. Antes de abrir PR, rode `python3 -I validate_board.py`, `python3 -I render_board_mestre.py` e `python3 -I board_to_md.py`. O CI faz as mesmas checagens.
3. Um bloco novo entra no `board.json` com ID único e estável. Depois, ele é referenciado no `board-mestre.json` pelo mesmo ID.
4. Evidência nova: adicione o arquivo em `assets/` (ou `assets/evidence/`) e cite-o em `board-mestre.json` pelo campo `images`. Não duplique arquivos que já existem (verifique por hash).
5. Status de issue e PR não se copiam para o board. O board diz o que existe e o que foi verificado. O GitHub diz o que foi feito.

## Limites conhecidos

- Os status dos cards em `board-mestre.json` foram classificados por mim a partir do conteúdo. Precisam de revisão humana.
- Vínculos de evidência com funcionalidade e issue, no catálogo, são inferidos pelo nome do arquivo.
- Não há sincronização com Claude Whiteboards.
