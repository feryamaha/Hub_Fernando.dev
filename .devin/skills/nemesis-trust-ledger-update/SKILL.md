---
name: nemesis-trust-ledger-update
description: >
  Registra no Trust Ledger do repo (.devin/ledger/trust-ledger.md) os vereditos, validacoes,
  reconciliacoes e paradas do ciclo corrente (lei F11). Invocada na PARADA UNICA (fim da
  doc-sync), nas paradas de emergencia e ao fim de post-mortems. Append-only; numeros
  copiados da saida literal. Gera o scorecard resumido do ciclo.
---

# Nemesis Trust Ledger Update (lei F11)

Persistir os vereditos do ciclo como artefatos e reconcilia-los com o desfecho.

> O ledger e per-repo (`.devin/ledger/trust-ledger.md`). Formato e eventos:
> `.devin/rules/nemesis-trust-ledger.md` (fonte unica; nao duplicar aqui).

**Anuncio de inicio**: "Estou usando a skill nemesis-trust-ledger-update para registrar os vereditos do ciclo no Trust Ledger."

## Quando invocar

1. **PARADA UNICA** (fim da `nemesis-doc-sync`, Fase 4): escrita padrao do ciclo completo.
2. **Parada de emergencia**: registrar o evento antes de aguardar o Fernando.
3. **Fim de post-mortem** (`nemesis-postmortem-to-law`).

## Processo

### Step 1: Coletar os eventos do ciclo (copia, nao reconstrucao)

Reunir da SESSAO atual (lei F3/F6: da saida literal, nunca de memoria):
- vereditos anotados pelos gates (`veredito-p1`, `veredito-p2`, `veredito-rule-control`),
  cada um com veredito, base em 1 linha e ref de spec/plano;
- resultado da validacao (`validacao`) com as fases executadas e o placar literal;
- reconciliacoes apontadas pela Fase 3 da `nemesis-tests` (`reconciliacao`);
- paradas de emergencia, post-mortems e checks de harness, se houver.

### Step 2: Append no ledger

Abrir `.devin/ledger/trust-ledger.md` e ACRESCENTAR ao final uma linha por evento, no
formato da regra canonica. NUNCA editar ou remover entradas existentes; correcao e entrada
nova referenciando a anterior.

### Step 3: Scorecard do ciclo (para o relatorio da PARADA UNICA)

Emitir o bloco:

```
Trust Ledger (ciclo [ref]):
- entradas gravadas: N
- gates do ciclo: P1=[veredito], rule-control=[veredito], P2=[veredito]
- validacao: [PASS/FAIL + placar literal]
- reconciliacoes: [nenhuma | lista em 1 linha cada]
- paradas de emergencia: [nenhuma | lista]
```

Este bloco entra no relatorio consolidado da PARADA UNICA.

### Step 4: Proposta de calibracao (somente quando houver sinal)

Se o ledger acumulado mostrar padrao (ex.: mesmo gate furado em 2+ ciclos; gate com muitos
ciclos de precisao total), formular PROPOSTA de calibracao em 1-3 linhas, com as entradas
do ledger como evidencia. **A proposta e apresentada ao Fernando; nada muda sem decisao
dele** (nenhum modelo tem autonomia total; graduacao/restricao e humana).

## Regras duras

- Append-only.
- Nenhum numero de memoria: so saida literal da sessao.
- Falha registra-se com a mesma proeminencia que sucesso.
- A skill NAO julga o merito dos vereditos; ela os persiste e reconcilia.

## Integracao

**Invocada por**: `nemesis-doc-sync` (Fase 4, PARADA UNICA), paradas de emergencia,
`nemesis-postmortem-to-law`.
**Regra canonica**: `.devin/rules/nemesis-trust-ledger.md` (lei F11).
Sempre PT-BR.
