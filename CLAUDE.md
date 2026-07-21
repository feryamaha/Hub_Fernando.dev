# CLAUDE.md — Hub_Fernando.dev

> Instruções específicas para Claude Code neste repo. A fonte única cross-tool é o
> `AGENTS.md`: leia-o primeiro e siga-o integralmente. Este arquivo só adiciona o que é
> específico do Claude Code.

## Ordem de leitura

1. `AGENTS.md` (invariantes, mapa do repo, comandos, processo)
2. `.devin/rules/nemesis-repo-profile.md` (perfil: stack, comandos, 6 regras, rubrica UI)
3. `.devin/rules/nemesis-fable-method.md` (leis F1..F12)
4. `.devin/rules/nemesis-epistemic-safety.md` (disciplina epistêmica)

## Específico do Claude Code

- **Pipeline padrão:** ao receber uma necessidade de desenvolvimento, seguir
  `.devin/workflows/nemesis-sdd-pipeline-auto.md` (automático até a PARADA ÚNICA).
- **Subagentes:** usar a Agent tool com distribuição por camadas (workflow auto, seção
  "Distribuição de modelos"): orquestrador = modelo da sessão; implementadores um degrau
  abaixo; revisores em modelo DISTINTO do implementador da mesma tarefa. Contrato de
  handoff completo em cada disparo (lei F9).
- **Preview visual:** usar o Browser pane da IDE para a verificação visual da Skill 4.5
  (Fase 2.5) quando o diff toca UI.
- **Nemesis pretool ativo:** bloqueios com exit 2 são enforcement legítimo da máquina.
  Corrigir a ação, nunca contornar. Arquivos protegidos (`.devin/hooks.json`, `AGENTS.md`,
  `CLAUDE.md`) são gerenciados pelo Fernando; conteúdo novo para eles é proposto em
  `.devin/*.proposed.md`.
- **Git:** somente leitura. Combos de commit/push são entregues como texto (o push em
  `main` dispara deploy na Vercel).
- **Idioma:** responder SEMPRE em PT-BR, sem travessão em nenhum texto.
