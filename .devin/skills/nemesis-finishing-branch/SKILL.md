---
name: nemesis-finishing-branch
description: >
  Finaliza o desenvolvimento: verifica testes do perfil, gate de integridade do harness,
  coleta git diff real, gera PR estruturada, apresenta opcoes de merge/PR/descarte.
  HARD-GATE de revisao humana antes de salvar a PR.
---

# Nemesis Finishing Branch

Verificar conclusao, coletar evidencias de git diff real, gerar documentacao de PR
estruturada, apresentar opcoes de disposicao da branch.

> Comandos de verificacao e path da PR vem do perfil do repo
> (`.devin/rules/nemesis-repo-profile.md`).

## AUTORIZACAO OBRIGATORIA (nunca auto-invocar)

Esta skill **NAO faz parte da fase autonoma do pipeline**. Ela so executa mediante
autorizacao explicita do Fernando, dada na PARADA UNICA (pos-validacao) ou depois dela.
Ficar "tudo verde" na validacao NAO autoriza o finishing. Invocar sem autorizacao explicita =
violacao do pipeline.

**Anuncio de inicio**: "Estou usando a skill nemesis-finishing-branch para finalizar o desenvolvimento."

**Pre-requisitos**: (1) todas as tarefas de implementacao completadas e validadas (Skill 4.5);
(2) autorizacao explicita do Fernando para esta skill.

## Processo

### Step 1: Verificar Conclusao (suite do perfil)

```bash
bun run lint
bunx tsc --noEmit
bun run build
```

Todos devem sair com exit code 0. Se qualquer um falhar:
- Retornar para `nemesis-subagent-driven-development`
- Reportar qual comando falhou e por que
- NAO prosseguir

### Step 1.5: GATE de integridade do harness (lei F10)

Se o `git diff` da entrega toca qualquer arquivo de harness (`.devin/`, `AGENTS.md`,
`CLAUDE.md`): executar o procedimento de verificacao de
`.devin/rules/nemesis-harness-integrity.md`. Resultado precisa ser **HARNESS INTEGRO**
antes de gerar a PR. Nao-conformidade detectada = reconciliar via `nemesis-harness-sync`
(com o HARD-GATE dela) antes de continuar. Se o diff nao toca harness, declarar "gate
F10: nao se aplica" e seguir.

### Step 2: Coletar Evidencias Reais

**IMPORTANTE**: Usar APENAS evidencias reais de git diff. NUNCA fabricar.

```bash
git branch --show-current
git diff --stat
git diff HEAD --name-only
git log --oneline -5
git diff HEAD   # se necessario detalhe
```

### Step 3: Gerar Conteudo da PR

Construir PR a partir de dados reais (git diff, stat, log). A PR DEVE conter todas as secoes
abaixo, na ordem exata, incluindo a **CLI Table** com comandos, resultados e observacoes:

```markdown
# PR_NNN: [Titulo Descritivo da Entrega]

## Objetivo
[1-4 linhas: o que foi feito e por que. Referencia a spec/plano.]

## Arquivos Afetados
- `<path>` [new|modified]

(Usar output EXATO de `git diff --stat`)

## Implementacoes Realizadas

### Arquivo: `<path>` (new|modified)
[O que foi criado/modificado em detalhe. Decisao tecnica. Padrao do perfil seguido.]

[Repetir para cada arquivo significativo]

## Criterios de Aceitacao
- [x] suite do perfil: PASS (listar cada comando)
- [x] Sem violacoes Nemesis
- [x] Gate F10 (harness): [INTEGROS | nao se aplica]
- [x] Codigo idiomatico na stack do perfil

## Beneficios
[Reuso, desacoplamento, seguranca, performance, enforcebilidade]

## Notas Adicionais
[Contexto adicional se relevante]

## CLI Table

> **IMPORTANTE**: A CLI Table contem APENAS comandos de VALIDACAO do projeto. NUNCA inclua
> comandos de analise como `git diff`, `git log`, `git status` ou similares. Esses sao
> ferramentas internas para coletar evidencias, nao validacoes do projeto.

| Command | Result (OK/FAIL) | Observations |
|---------|------------------|--------------|
| bun run lint | OK | [observacao] |
| bunx tsc --noEmit | OK | [observacao] |
| bun run build | OK | [observacao] |
```

> **IMPORTANTE**: O modelo acima e a ESTRUTURA. Substitua todos os valores pelos dados
> reais do seu git diff e das saidas literais desta sessao. Titulo com colon, secoes na
> ordem exata, um `### Arquivo:` por arquivo significativo, output exato de
> `git diff --stat` em bloco de codigo, criterios com checkboxes marcados, e **sempre**
> a **CLI Table** com comandos, resultados (OK/FAIL) e observacoes.

### Step 4: Apresentar PR para Review

**HARD-GATE**: Apresentar PR completa (incluindo CLI Table). BLOQUEAR ate resposta de
Fernando.

Perguntar:
```
PR gerada com base em git diff real. Revise acima. Aprovado?
```

Respostas validas: "sim", "pode", "aprovado", "ok", "prossiga"

### Step 5: Salvar PR

Apos aprovacao, salvar no path de PRs do perfil (`.devin/pr/`), nome
`PR_NNN_nome-descritivo.md`.

**Antes de gravar**: listar o conteudo do diretorio de PRs para determinar o proximo numero
sequencial. NUNCA assumir um numero sem verificar. NUNCA criar numero repetido ou errado.

### Step 6: Apresentar Opcoes de Disposicao

**FERNANDO DECIDE** o que fazer com a branch:

```
OPCOES DE DISPOSICAO:

1. MERGE NA BRANCH PRINCIPAL
   Fernando executa: git merge <branch-name>

2. MANTER BRANCH PARA PR REVIEW EXTERNO
   Branch fica aberta para pull request externo

3. DESCARTAR BRANCH
   Fernando executa: git branch -D <branch-name>

Aguardando decisao de Fernando...
```

## Red Flags

- Qualquer comando da suite do perfil NAO PASS
- Gate F10 com deriva nao reconciliada
- Arquivos modificados fora do scope original
- Violacoes de regras do perfil detectadas
- git diff contem arquivos secretos (.env, credentials, etc)

## Lembrar

- NUNCA fabricar git diff — usar dados reais SOMENTE
- NUNCA pular pipeline de validacao
- Mudanca em harness exige espelhos integros ANTES da PR (F10)
- PR segue convencoes deste projeto (PT-BR, paths exatos, evidencias reais)
- Fernando faz commit/push manualmente — skill NAO faz git write

## Integracao

**Skill anterior**: `nemesis-doc-sync` (4.6) ou diretamente a PARADA UNICA
**Final skill no pipeline Nemesis SDD**
