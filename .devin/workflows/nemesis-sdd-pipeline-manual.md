# Nemesis SDD Pipeline Manual (Specification-Driven Development)

## Overview

O Nemesis SDD Pipeline Manual e um workflow sequencial de 7 skills que governa o
desenvolvimento de forma deterministica e auditavel. **Cada etapa exige parada obrigatoria
e aprovacao explicita do Fernando antes de avançar.** Nenhuma skill executa a proxima sem
aprovacao humana.

## Modo

**100% manual.** O modelo executa uma skill, apresenta o resultado, PARA e aguarda aprovacao
explicita do Fernando. So avanca para a proxima skill apos receber "sim", "pode", "aprovado",
"ok" ou "prossiga".

## Workflow Sequencial

```
┌─────────────────────────────────────────────────────────────┐
│ USER REQUEST (Fernando descreve necessidade informal)       │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ Skill 1: nemesis-specification-design                       │
│ OUTPUT: Especificacao tecnica gerada (nao gravada ainda)    │
│ ⛔ PARADA: Fernando revisa a spec gerada                     │
└────────────────────┬────────────────────────────────────────┘
                     │ aprovado
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ Skill 0: nemesis-critical-analysis (PONTO 1: Pre-Spec)      │
│ VALIDACAO: Analise critica da spec antes de gravar          │
│ OUTPUT: PROSSEGUIR (gravar spec) ou REJEITAR (ajustar)      │
│ ⛔ PARADA: Fernando revisa o veredito da analise critica    │
└────────────────────┬────────────────────────────────────────┘
                     │ aprovado
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ Skill 1: nemesis-specification-design (gravacao)            │
│ OUTPUT: SPEC gravada em .devin/specs/                       │
│ ⛔ PARADA: Fernando confirma gravacao da spec               │
└────────────────────┬────────────────────────────────────────┘
                     │ aprovado
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ Skill 2: pre-writing-rule-control                           │
│ VALIDACAO: Spec contra regras do projeto                    │
│ OUTPUT: PASS (prosseguir) ou FAIL (ajustar)                 │
│ ⛔ PARADA: Fernando revisa o resultado da validacao         │
└────────────────────┬────────────────────────────────────────┘
                     │ aprovado
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ Skill 3: nemesis-writing-plans                              │
│ INPUT: SPEC aprovada + validada                             │
│ OUTPUT: PLAN com tarefas atomicas                           │
│ ⛔ PARADA: Fernando revisa e aprova o plano                 │
└────────────────────┬────────────────────────────────────────┘
                     │ aprovado
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ Skill 0: nemesis-critical-analysis (PONTO 2: Pre-Execution) │
│ VALIDACAO: Analise critica do plano antes de executar       │
│ OUTPUT: PROSSEGUIR (executar) ou REJEITAR (ajustar)         │
│ ⛔ PARADA: Fernando revisa o veredito da analise critica    │
└────────────────────┬────────────────────────────────────────┘
                     │ aprovado
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ Skill 4: nemesis-subagent-driven-development                │
│ EXECUCAO: Tarefa por tarefa (two-stage review)              │
│ OUTPUT: Todas as tarefas completadas                        │
│ ⛔ PARADA: Fernando revisa o resultado da execucao          │
└────────────────────┬────────────────────────────────────────┘
                     │ aprovado
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ Skill 4.5: nemesis-tests                                    │
│ VALIDACAO: lint + tsc + build (+ visual em UI)              │
│ OUTPUT: Validacao completa PASS                             │
│ ⛔ PARADA: Fernando aprova o resultado da validacao         │
└────────────────────┬────────────────────────────────────────┘
                     │ aprovado
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ Skill 4.6: nemesis-doc-sync (documentacao como feature)     │
│ GATE: a mudanca afeta o README.md?                          │
│ NAO PRECISA: segue. PRECISA: reconcilia (codigo=verdade,    │
│   README sincronizado)                                      │
│ OUTPUT: doc sincronizada (ou veredito "nada a atualizar")   │
│ ⛔ PARADA: Fernando aprova as mudancas de doc               │
└────────────────────┬────────────────────────────────────────┘
                     │ aprovado
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ Skill 5: nemesis-finishing-branch                           │
│ VALIDACAO FINAL: testes finais                              │
│ OUTPUT: PR documentada                                      │
│ ⛔ PARADA: Fernando aprova PR e escolhe disposition         │
│ DISPOSICAO: Fernando escolhe merge/keep/discard             │
└─────────────────────────────────────────────────────────────┘
```

## Regras Fundamentais

1. **Cada skill tem parada obrigatoria.** O modelo apresenta o resultado e PARA. Nao avanca
   sem aprovacao explicita do Fernando.

2. **NUNCA escrever codigo antes do design ser aprovado.** Skill 1 tem parada; so grava
   apos o Fernando aprovar a spec e a analise critica (Skill 0 P1) passar.

3. **NUNCA executar antes do plano ser aprovado.** Skill 3 tem parada; so executa apos o
   Fernando aprovar o plano e a analise critica (Skill 0 P2) passar.

4. **Usar git diff real para PRs.** NUNCA fabricar evidencias. Sempre `git diff`, `git log`,
   dados reais.

5. **Fernando governa todas as decisoes.** Todas as paradas sao dele. Git de escrita e
   exclusivamente dele.

6. **Pre-flight e Trust Ledger (leis F1 e F11).** A Skill 4 abre com o pre-flight de postura
   declarado por comando (Step 0 da skill). Cada gate anota os campos do seu veredito; na
   parada da Skill 4.5 a `nemesis-trust-ledger-update` grava as entradas do ciclo
   (append-only em `.devin/ledger/trust-ledger.md`) e o relatorio inclui a secao Trust Ledger.

7. **Gate de harness (lei F10).** Se o git diff do ciclo toca arquivos do harness
   (`.devin/`, `AGENTS.md`, `CLAUDE.md`), o procedimento de verificacao de
   `nemesis-harness-integrity.md` precisa retornar HARNESS INTEGRO antes do finishing
   (Step 1.5 da Skill 5); nao-conformidade reconcilia-se via `nemesis-harness-sync`.

## Entradas e Saidas

| Skill | Entrada | Saida | Gate |
|-------|---------|-------|------|
| 1: specification-design | Request informal | Spec gerada | Fernando |
| 0 (P1): critical-analysis | Request + spec | PROSSEGUIR/REJEITAR | Fernando |
| (gravacao) | Spec aprovada | SPEC_NNN.md | Fernando |
| 2: pre-writing-rule-control | SPEC_NNN.md | PASS/FAIL | Fernando |
| 3: writing-plans | SPEC validada | PLAN_NNN.md | Fernando |
| 0 (P2): critical-analysis | SPEC + PLAN | PROSSEGUIR/REJEITAR | Fernando |
| 4: subagent-driven-development | PLAN validado | Tarefas completas | Fernando |
| 4.5: nemesis-tests | Workspace atualizado | Validacao completa | Fernando |
| 4.6: doc-sync | git diff da mudanca | Doc sincronizada | Fernando |
| 5: finishing-branch | Workspace validado | PR_NNN.md | Fernando |

## Como Usar

Fernando descreve a necessidade:
```
"Quero refinar o hero da Home e adicionar download de CV no top-bar"
```

Invocar: `/nemesis-sdd-pipeline-manual`

O modelo executa Skill 1, apresenta a spec e PARA. Fernando aprova. O modelo executa Skill 0
P1, apresenta o veredito e PARA. Fernando aprova. E assim por diante em todas as etapas.

Respostas validas para avancar: "sim", "pode", "aprovado", "ok", "prossiga".

## Comandos de Validacao

> Fonte canonica dos comandos e fases: o perfil do repo,
> `.devin/rules/nemesis-repo-profile.md`. O bloco abaixo e o resumo.

### Hub_Fernando.dev (portfolio)
```bash
bun run lint
bunx tsc --noEmit
bun run build
```

## Convencoes de Nomenclatura

- **Specs**: SPEC_NNN_nome-descritivo.md (em .devin/specs/)
- **Plans**: PLAN_NNN_nome-descritivo.md (em .devin/plans/)
- **PRs**: PR_NNN_nome-descritivo.md (em .devin/pr/)
- **Numero**: auto-increment verificado com `ls` antes de gravar (nunca assumir)

## Suporte

Se bloqueado: (1) consultar `AGENTS.md`; (2) consultar a skill especifica em `.devin/skills/`;
(3) reportar o bloqueador exato ao Fernando e aguardar.
