---
name: nemesis-doc-sync
description: >
  Trata documentacao como FEATURE. APOS a validacao (Skill 4.5) e ANTES do finishing
  (Skill 5), analisa o git diff da mudanca e decide se a superficie de doc do perfil
  (portfolio: README.md) precisa ser atualizada. Se nao, segue o fluxo. Se sim, reconcilia
  (codigo = verdade, sem inserir por inserir). Roda automaticamente como ultimo passo
  autonomo; a PARADA UNICA obrigatoria (HARD-GATE humano) acontece no FIM dela, antes do
  finishing. Quando a validacao fechou PASS, monta o combo de deploy (git add/commit/push,
  que dispara o deploy Vercel) como TEXTO para o Fernando executar manualmente (o modelo
  nunca executa git de escrita).
---

# Nemesis Doc Sync (documentacao como feature)

> A superficie de doc do perfil portfolio e o `README.md` do repo. O conteudo das secoes
> do site (textos em `src/components/main-content/sections/`) e PRODUTO, nao doc: mudanca
> de conteudo do site segue o pipeline normal via spec/plano, nao esta skill.

## ULTIMO PASSO AUTONOMO (roda automaticamente; a PARADA UNICA vem no fim dela)

Esta skill **faz parte da fase autonoma do pipeline** (modo auto): a `nemesis-tests` (4.5)
a invoca automaticamente, sem pausa. **A PARADA UNICA obrigatoria acontece no FIM desta
skill** (Fase 4), depois da doc-sync e antes do finishing. E nesse ponto que o Fernando
revisa o relatorio consolidado e decide entre finalizar a entrega
(`nemesis-finishing-branch`) ou gerar novas issues e reiniciar o ciclo (PDCA). Apenas a
`nemesis-finishing-branch` exige autorizacao explicita dele.

**Anuncio de inicio**: "Estou usando a skill nemesis-doc-sync para verificar se a mudanca exige atualizar a documentacao."

**Pre-requisito**: Skill 4.5 (`nemesis-tests`) concluida: codigo validado, suite do perfil
verde.

## Por que existe

Documentacao errada deixa o codigo em **check-mate**: o leitor confia na doc, nao no
codigo. Por isso a doc e tratada como **feature** e tem um passo proprio no pipeline,
rodando automaticamente: assim a PR sempre inclui a atualizacao de doc.

## Processo

### Fase 1: Coletar o que mudou (git diff real)
```bash
git diff --stat
git diff
```
Read-only (git de escrita e exclusivo do Fernando). O diff e a fonte do que mudou.

### Fase 2: GATE DE DECISAO — a mudanca afeta a documentacao?

Confronte o diff contra o que o `README.md` DOCUMENTA. Checklist de itens que podem ser
afetados:
- **Estrutura do projeto** descrita no README (pastas, componentes, hooks).
- **Stack e dependencias** citadas (versoes, bibliotecas).
- **Features do site** descritas (secoes, temas, atalhos, comportamento Finder).
- **Instrucoes de setup/build** (comandos bun, deploy).
- **Harness (F10):** a mudanca tocou arquivos do harness (`.devin/`, `AGENTS.md`,
  `CLAUDE.md`)? Se sim, rodar o procedimento de verificacao de
  `nemesis-harness-integrity.md` e reportar o resultado; nao-conformidade = pendencia a
  resolver antes do finishing.

Para CADA item afetado, emita um veredito:
- **NAO PRECISA**: o diff nao toca nada documentado, OU a doc ja reflete. Justificar em 1 linha.
- **PRECISA**: listar exatamente o que ficou divergente (doc vs codigo), com `arquivo:linha`.

> **Regra dura: nao inserir doc por inserir.** Refactor interno, ajuste visual etc.
> geralmente NAO exigem atualizacao. So atualize o que a mudanca tornou divergente.

### Fase 3a: Veredito NAO PRECISA
Reportar "a doc ja reflete a mudanca; nada a atualizar" e seguir para a Fase 4 (PARADA UNICA).

### Fase 3b: Veredito PRECISA — reconciliar (codigo = verdade)

Atualizar o `README.md` com disciplina:
- **Codigo e a fonte de verdade.** Verificar cada fato no codigo antes de escrever.
- **Sem numero fragil:** preferir descricao por estrutura a totais que a proxima mudanca
  defasa.
- **Cirurgico:** mudar so o que ficou divergente; nao reescrever secoes inteiras sem
  necessidade.
- **Estilo:** `nemesis-documentation-style.md` (sem travessao; voz conforme a superficie).

Apresentar o diff das mudancas de doc.

### Fase 3c: Handoff de deploy (combo git para o Fernando executar MANUALMENTE)

> **INVARIANTE ABSOLUTA: o modelo NUNCA executa git de escrita.** Esta fase apenas MONTA
> o combo de comandos como TEXTO para o Fernando copiar e rodar no terminal nativo dele.
> Nenhum `git add/commit/push` e executado pelo agente, jamais, nem "para testar".
> Comandos de LEITURA (`git log`, `git status`, `git branch`) sao permitidos e usados so
> para montar o combo correto. Lembrete: neste repo, `git push origin main` dispara o
> deploy automatico na Vercel (classe C, F4): a decisao de publicar e do Fernando.

**Quando roda:** SEMPRE que a validacao (Skill 4.5) fechou PASS. O combo e entregue para
o Fernando decidir se e quando publicar. O veredito PRECISA/NAO PRECISA da doc NAO
suprime o combo. Unico caso de pular: a validacao reprovou algo (reportar "nao recomendo
publicar, pendencia em X" e NAO montar combo).

**Passos:**

1. Ler o estado de git (read-only): `git log --oneline -5` (padrao de mensagem,
   kebab-case: `fix-...`, `feat-...`, `refactor-...`) e `git branch --show-current`.
2. Entregar o combo preenchido:

   ```bash
   git add .
   git commit -m "<mensagem-kebab-case>"
   git push origin main
   ```

3. Declarar explicitamente: "Git e exclusivamente seu. Este combo e TEXTO para voce
   executar manualmente; nenhum comando git de escrita foi rodado. O push dispara o
   deploy na Vercel."

### Fase 4: PARADA UNICA obrigatoria (HARD-GATE humano, fim da fase autonoma)

Esta e a **PARADA UNICA do pipeline**: depois da doc-sync, antes do finishing. Passos:

1. **Trust Ledger (lei F11):** invocar `nemesis-trust-ledger-update` para gravar todos os
   vereditos do ciclo (gates da Skill 0 P1/P2, rule-control, resultado da Skill 4.5,
   reconciliacoes) e o veredito desta doc-sync (PRECISA/NAO PRECISA), append-only em
   `.devin/ledger/trust-ledger.md`.
2. **Relatorio consolidado:** emitir o relatorio da PARADA UNICA no formato do workflow
   (`nemesis-sdd-pipeline-auto.md`): spec, plano, git diff real, tabela de validacao com
   saidas literais, decisoes tomadas, achados fora de escopo, veredito da doc-sync (e o
   diff das mudancas de doc, se houve), secao Trust Ledger, gate F10 (harness). Se a
   Fase 3c gerou combo de deploy, inclui-lo aqui como texto.
3. **BLOQUEAR e aguardar o Fernando.** NAO invocar `nemesis-finishing-branch`
   automaticamente. Respostas validas para avancar ao finishing: "sim", "pode",
   "aprovado", "ok", "prossiga".

## Integracao

- **Skill anterior**: `nemesis-tests` (4.5), que invoca esta skill automaticamente (sem pausa).
- **Proxima skill (SO com autorizacao explicita do Fernando na PARADA UNICA)**:
  `nemesis-finishing-branch` (5).

## Lembrar

- Documentacao = feature. Doc errada = check-mate.
- Roda automaticamente apos a Skill 4.5; a PARADA UNICA vem no FIM desta skill (Fase 4).
- GATE de decisao ANTES de editar (nao inserir por inserir).
- Codigo = verdade; README sincronizado; estilo da regra de documentacao.
- Mudanca em harness = rodar o procedimento de integridade (F10).
- Validacao PASS = montar SEMPRE o combo git como TEXTO; o Fernando decide se e quando
  publicar (push = deploy Vercel). O modelo NUNCA executa git de escrita.
- Finishing so com autorizacao explicita do Fernando.
- Sempre PT-BR.
