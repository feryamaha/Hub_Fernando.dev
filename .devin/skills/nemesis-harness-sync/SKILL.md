---
name: nemesis-harness-sync
description: >
  Verifica e reconcilia a integridade do harness (lei F10) neste repo unico: roda o
  procedimento deterministico de nemesis-harness-integrity.md (lint estrutural de
  skills), apresenta cada nao-conformidade e reconcilia. Divergencia material tem
  HARD-GATE humano (o Fernando escolhe o canonico).
---

# Nemesis Harness Sync (lei F10)

Verificar e reconciliar a integridade do harness deste repo (`.devin/`, `AGENTS.md`,
`CLAUDE.md`).

> O procedimento de verificacao vive em `.devin/rules/nemesis-harness-integrity.md`
> (fonte unica; nao duplicar aqui). Este repo e UNICO: nao ha espelhamento entre repos.

**Anuncio de inicio**: "Estou usando a skill nemesis-harness-sync para verificar a integridade do harness."

## Quando invocar

- Apos qualquer edicao em regra, skill ou workflow (mesma sessao).
- No gate F10 do finishing (Step 1.5) quando ha nao-conformidade a reconciliar.
- Sob demanda do Fernando (auditoria periodica).

## Processo

### Step 1: Verificar (procedimento da regra canonica)

Executar os comandos do procedimento de `nemesis-harness-integrity.md` (lint estrutural:
name==diretorio, teto de 500 linhas, description presente). Saida vazia em todos =
**HARNESS INTEGRO**: reportar e encerrar.

### Step 2: Classificar cada nao-conformidade (com evidencia, nao suposicao)

1. **Nao-conformidade estrutural** (name divergente, arquivo acima do teto, frontmatter
   incompleto): classificar como correcao mecanica.
2. **Divergencia material de conteudo** (skill/regra em conflito com a intencao declarada
   do harness ou com outra regra): classificar como decisao humana.
3. **Item novo fora do escopo declarado** (arquivo novo em `.devin/` sem papel claro):
   classificar como pendencia de escopo.

### Step 3: Reconciliar

- **Classe 1:** corrigir mecanicamente, listando cada correcao feita.
- **Classe 2 (HARD-GATE):** apresentar ao Fernando o conflito com a analise em 1 linha
  por diferenca; BLOQUEAR ate ele escolher o canonico. So entao aplicar.
- **Classe 3:** propor a classificacao do item (papel, regra correspondente) ao Fernando.
  Nao decidir sozinho.

### Step 4: Re-verificar e registrar

1. Re-executar o procedimento do Step 1: precisa retornar **HARNESS INTEGRO**.
2. Registrar no Trust Ledger (`nemesis-trust-ledger-update`, evento `harness`):
   resultado, arquivos reconciliados, decisoes do Fernando se houve.

## Formato de saida

```
## Harness Sync (F10)

Verificacao inicial: [INTEGRO | nao-conformidade em N arquivos]

| Arquivo | Classe | Acao |
|---|---|---|
| [path] | [1-3] | [corrigido | HARD-GATE | pendencia] |

Re-verificacao: [INTEGRO]
Ledger: [entrada gravada]
```

## Regras duras

- NUNCA "resolver" divergencia material escolhendo uma versao em silencio.
- Git e exclusivo do Fernando; esta skill so toca arquivos, nunca faz git de escrita.
- Sempre PT-BR.

## Integracao

**Regra canonica**: `.devin/rules/nemesis-harness-integrity.md` (procedimento).
**Invocada por**: gate F10 do `nemesis-finishing-branch`, `nemesis-doc-sync`,
`nemesis-postmortem-to-law` (emendas), ou o Fernando.
**Skill relacionada**: `nemesis-trust-ledger-update` (registro do resultado).
