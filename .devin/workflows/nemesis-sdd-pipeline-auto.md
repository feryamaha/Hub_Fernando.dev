# Nemesis SDD Pipeline Auto (Specification-Driven Development)

## Overview

O Nemesis SDD Pipeline Auto e um workflow sequencial de 7 skills que governa o
desenvolvimento de forma deterministica e auditavel. **100% automatico: o modelo executa
todas as skills do input ate a Skill 4.6 (doc-sync) sem parar para aprovacao intermediaria.**
A unica parada e antes da Skill 5 (finishing): o modelo apresenta o relatorio consolidado e
o Fernando decide se autoriza o finishing.

## Modo

**100% automatico.** O modelo executa do input ate a conclusao da Skill 4.6 sem pausar para
aprovacao. Gates automaticos (Skill 0, Skill 2) bloqueiam se falharem, mas nao pedem
aprovacao humana. Apos a Skill 4.6, o modelo PARA na **PARADA UNICA** e apresenta o relatorio
consolidado. O Fernando decide o proximo passo.

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
└────────────────────┬────────────────────────────────────────┘
                     │ automatico
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ Skill 0: nemesis-critical-analysis (PONTO 1: Pre-Spec)      │
│ VALIDACAO: Analise critica da spec antes de gravar          │
│ OUTPUT: PROSSEGUIR (gravar spec) ou REJEITAR (ajustar)      │
│ GATE AUTOMATICO: Veredito PROSSEGUIR para gravar spec       │
└────────────────────┬────────────────────────────────────────┘
                     │ automatico
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ Skill 1: nemesis-specification-design (gravacao)            │
│ OUTPUT: SPEC gravada em .devin/specs/                       │
└────────────────────┬────────────────────────────────────────┘
                     │ automatico
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ Skill 2: pre-writing-rule-control                           │
│ VALIDACAO: Spec contra regras do projeto                    │
│ OUTPUT: PASS (prosseguir) ou FAIL (ajustar)                 │
│ GATE AUTOMATICO: Validacao passa ou propoe ajustes          │
└────────────────────┬────────────────────────────────────────┘
                     │ automatico
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ Skill 3: nemesis-writing-plans                              │
│ INPUT: SPEC aprovada + validada                             │
│ OUTPUT: PLAN com tarefas atomicas                           │
└────────────────────┬────────────────────────────────────────┘
                     │ automatico
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ Skill 0: nemesis-critical-analysis (PONTO 2: Pre-Execution) │
│ VALIDACAO: Analise critica do plano antes de executar       │
│ OUTPUT: PROSSEGUIR (executar) ou REJEITAR (ajustar)         │
│ GATE AUTOMATICO: Veredito PROSSEGUIR para executar plano    │
└────────────────────┬────────────────────────────────────────┘
                     │ automatico
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ Skill 4: nemesis-subagent-driven-development                │
│ EXECUCAO: Tarefa por tarefa (two-stage review)              │
│ OUTPUT: Todas as tarefas completadas                        │
│ EXECUCAO CONTINUA: Sem pause entre tarefas                  │
└────────────────────┬────────────────────────────────────────┘
                     │ automatico
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ Skill 4.5: nemesis-tests                                    │
│ VALIDACAO: lint + tsc + build (+ verificacao visual em UI)  │
│ SE FAIL: investigar causa raiz, corrigir, retestar          │
│ OUTPUT: Validacao completa PASS                             │
└────────────────────┬────────────────────────────────────────┘
                     │ automatico
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ Skill 4.6: nemesis-doc-sync (documentacao como feature)     │
│ GATE: a mudanca afeta README.md / JSONs de docs?            │
│ NAO PRECISA: segue. PRECISA: reconcilia (codigo=verdade,    │
│   regra do coeficiente, README + JSONs sincronizados)       │
│ OUTPUT: doc sincronizada (ou veredito "nada a atualizar")   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ ⛔ PARADA UNICA — Relatorio consolidado                     │
│ O modelo APRESENTA o relatorio e PARA.                      │
│ Nenhuma skill pos-validacao (5) executa sem autorizacao.    │
│ HARD-GATE: Fernando decide proximo passo                    │
└────────────────────┬────────────────────────────────────────┘
                     │ autorizado
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ Skill 5: nemesis-finishing-branch                           │
│ VALIDACAO FINAL: testes finais                              │
│ OUTPUT: PR documentada                                      │
│ DISPOSICAO: Fernando escolhe merge/keep/discard             │
└─────────────────────────────────────────────────────────────┘
```

## Regras Fundamentais

1. **Autonomia ate a PARADA UNICA, nunca alem dela.** Entre o input e o fim da Skill 4.6 nao
   ha pausas para aprovacao. A PARADA UNICA e inegociavel: nenhuma skill pos-validacao (5)
   e invocada automaticamente, nem "por conveniencia", nem porque "ja estava tudo verde".

2. **Gates automaticos nao sao decorativos.** A analise critica (Skill 0) e o rule control
   (Skill 2) substituem a aprovacao humana intermediaria; por isso os vereditos deles
   BLOQUEIAM de verdade. Veredito negativo permite UM ciclo de ajuste + re-analise; o
   segundo veredito negativo vira PARADA DE EMERGENCIA (reportar ao Fernando com o veredito
   e a evidencia).

3. **Paradas de emergencia** (alem da PARADA UNICA): bloqueio persistente apos correcao;
   mesma tarefa/falha apos 2 tentativas de fix; escopo real materialmente maior que a spec;
   qualquer acao irreversivel ou externa nao prevista no plano; ambiguidade que genuinamente
   impede progresso. Nesses casos: STOP, reportar o bloqueador exato com evidencia, aguardar
   o Fernando.

4. **Evidencia real sempre.** git diff/log reais nas PRs (nunca fabricar); numeros copiados
   da saida literal dos comandos desta sessao; falha reportada com a mesma proeminencia que
   sucesso.

5. **Fernando governa as decisoes humanas.** A PARADA UNICA, o finishing e a disposicao da
   branch sao dele. Git de escrita e exclusivamente dele.

6. **Pre-flight e Trust Ledger (leis F1 e F11).** A Skill 4 abre com o pre-flight de postura
   declarado por comando (Step 0 da skill). Cada gate (Skill 0 P1/P2, Skill 2) anota os
   campos do seu veredito para o Trust Ledger; na PARADA UNICA a `nemesis-trust-ledger-update`
   grava todas as entradas do ciclo (append-only em `.devin/ledger/trust-ledger.md`) e o
   relatorio consolidado inclui a secao Trust Ledger.

7. **Gate de harness (lei F10).** Se o git diff do ciclo toca arquivos do harness
   (`.devin/`, `AGENTS.md`, `CLAUDE.md`), o procedimento de verificacao de
   `nemesis-harness-integrity.md` precisa retornar HARNESS INTEGRO antes do finishing
   (Step 1.5 da Skill 5); nao-conformidade reconcilia-se via `nemesis-harness-sync`.

8. **Distribuicao por camadas de raciocinio.** O pipeline e executado por um ORQUESTRADOR
   (o modelo principal da sessao) que distribui fases a subagentes dedicados conforme a
   secao "Distribuicao de modelos por camada de raciocinio" abaixo. Julgamento, gates,
   PARADA UNICA e Trust Ledger NUNCA se delegam.

## Distribuicao de modelos por camada de raciocinio (orquestracao de subagentes)

A atribuicao de modelo e por CAMADA DE RACIOCINIO relativa, nunca por nome fixo de modelo:
no inicio de cada ciclo o orquestrador identifica os modelos disponiveis no harness da IDE
(ex.: parametro `model` da tool de subagentes no Claude Code) e mapeia as camadas relativas
a si mesmo. Assim a regra sobrevive a mudanca de catalogo (ex.: topo Fable hoje, Opus depois).

| Camada | Papel | Fases do pipeline | Regra de mapeamento |
|---|---|---|---|
| MAIOR | Investigacao, analise de estado atual, analise de causa, spec, analises criticas, plano, orquestracao | Skills 1, 0 (P1 e P2), 2, 3 + consolidacao e Trust Ledger | O modelo principal da sessao (o de maior raciocinio disponivel). NUNCA delegar estas fases. |
| MEDIA | Executor fiel do plano (implementacao, segue spec+plano a risca) | Skill 4 — subagentes implementadores | Um degrau abaixo do orquestrador (ou o proprio, se nao houver degrau) |
| REVISOR | Review independente, testes, build release, pentest, validacoes | Skill 4 — subagentes revisores; Skill 4.5 | Camada media-para-baixo; na Skill 4, obrigatoriamente modelo DISTINTO do implementador da mesma tarefa (reforca a independencia da lei F9) |
| LEVE | doc-sync e preparacao do finishing | Skill 4.6; Skill 5 (preparacao do texto da PR) | O modelo mais leve disponivel que segue instrucoes com confiabilidade e menor custo |

Exemplo de mapeamento (jul/2026, Claude Code): orquestrador Fable -> implementador Opus,
revisor Sonnet, leve Haiku. Se o topo disponivel for Opus: implementador Sonnet, revisor
Sonnet, leve Haiku. O orquestrador declara o mapeamento escolhido no pre-flight do ciclo.

**Regras de orquestracao:**

1. **O que NUNCA se delega:** os vereditos das analises criticas (Skill 0), os HARD-GATEs,
   a PARADA UNICA, a escrita do Trust Ledger e o relatorio consolidado. Subagente prepara e
   executa; o orquestrador confere, julga e apresenta.
2. **Sincronizacao por dependencia (gate de fase):** um subagente so e disparado quando o
   artefato de que ele depende existe e esta validado. Ordem inviolavel entre fases:
   implementacao (4) -> validacao (4.5) -> doc-sync (4.6). doc-sync NUNCA dispara antes da
   validacao PASS, porque os fixes autonomos da 4.5 mudam o git diff que a 4.6 reconcilia.
3. **Paralelismo so DENTRO da Skill 4, por waves:** tarefas do plano sem dependencia
   declarada (DEPENDE_DE) e com arquivos disjuntos executam em paralelo na mesma wave;
   intersecao de arquivos ou dependencia = waves sequenciais. Procedimento na skill
   `nemesis-subagent-driven-development`.
4. **Contrato de handoff completo (lei F9):** todo subagente nasce sem memoria da conversa;
   o disparo carrega o contrato integral (objetivo, arquivos exatos, invariantes,
   o-que-nao-fazer, comando de verificacao, formato do resultado).
5. **Fallback obrigatorio:** se o harness da IDE nao oferece selecao de modelo por
   subagente, o pipeline executa com subagentes no modelo da sessao (comportamento
   anterior). A distribuicao e otimizacao de custo/velocidade, nunca condicao para rodar.

## Entradas e Saidas

| Fase | Entrada | Saida | Gate |
|------|---------|-------|------|
| 1: specification-design | Input informal / ISSUE | Spec gerada | automatico (Skill 0 P1) |
| 0 (P1): critical-analysis | Request + spec | PROSSEGUIR/REJEITAR | automatico |
| (gravacao) | Spec aprovada pela analise | SPEC_NNN.md | nenhum |
| 2: pre-writing-rule-control | SPEC_NNN.md | PASS/FAIL | automatico |
| 3: writing-plans | SPEC validada | PLAN_NNN.md gravado | automatico (Skill 0 P2) |
| 0 (P2): critical-analysis | SPEC + PLAN | PROSSEGUIR/REJEITAR | automatico |
| 4: subagent-driven-development | PLAN validado | Tarefas completas | continuo |
| 4.5: nemesis-tests | Workspace atualizado | Validacao completa | automatico |
| 4.6: doc-sync | git diff da mudanca | Doc sincronizada | automatico |
| ⛔ PARADA UNICA | Tudo acima | Relatorio consolidado | **Fernando** |
| 5: finishing-branch | Autorizacao explicita | PR_NNN.md | **Fernando** |

## Relatorio da PARADA UNICA (formato obrigatorio)

```
PIPELINE CONCLUIDO ATE A VALIDACAO — aguardando Fernando

Spec:  [caminho da spec]
Plano: [caminho do plano]

Diff real (git diff --stat):
[saida literal]

Validacao:
| Comando | Resultado | Observacao |
[tabela com saidas literais]

Decisoes tecnicas tomadas (com justificativa em 1 linha cada):
[lista]

Achados fora de escopo (estacionamento — sem acao tomada):
[lista com arquivo:linha, ou "nenhum"]

Doc-sync: [veredito PRECISA/NAO PRECISA + o que foi atualizado]

Trust Ledger (ciclo [ref]):
- entradas gravadas: N
- gates do ciclo: P1=[veredito], rule-control=[veredito], P2=[veredito]
- validacao: [PASS/FAIL + placar literal]
- reconciliacoes: [nenhuma | lista]
- gate F10 (harness): [nao se aplica | INTEGROS | deriva reconciliada]

Proximos passos possiveis:
(a) autorizar finishing  (b) gerar issues  (c) ajustar  (d) descartar
```

## Como Usar

Fernando descreve a necessidade:
```
"Quero refinar o hero da Home e adicionar download de CV no top-bar"
```

Invocar: `/nemesis-sdd-pipeline-auto`

O modelo executa tudo automaticamente ate a Skill 4.6, apresenta o relatorio da PARADA UNICA
e PARA. Fernando decide o proximo passo.

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
