---
trigger: always_on
status: active
scope: canonical
last_updated: 2026-07-09
---

# Trust Ledger (vereditos sao artefatos) — Hub_Fernando.dev

> Regra canonica deste repo, herdada do ecossistema Nemesis. Operacionaliza a lei F11
> do metodo Fable: **veredito de gate e artefato persistente e reconciliavel, nao mensagem
> efemera de conversa**. Origem: os gates do SDD pipeline (analise critica P1/P2, rule
> control, validacao) emitiam vereditos que morriam no chat; quando a Skill 4.5 reprovava
> algo que um gate aprovou, o sinal de calibracao se perdia.

## O arquivo

- **Path:** `.devin/ledger/trust-ledger.md` (per-repo, historico local deste repo).
- **Append-only:** entradas novas vao ao FIM do arquivo. Nunca editar nem remover entrada
  existente; correcao e uma entrada nova referenciando a anterior.
- **Formato de entrada (uma linha, greppavel):**

```
[data] | ciclo=[SPEC/PLAN/ISSUE ref ou "avulso"] | skill=[emissor] | evento=[tipo] | resultado=[...] | base=[evidencia em 1 linha]
```

## Eventos registrados (tipos)

| evento | emissor | resultado tipico |
|---|---|---|
| `veredito-p1` | nemesis-critical-analysis (Ponto 1) | PROSSEGUIR / REJEITAR / AMBIGUA |
| `veredito-p2` | nemesis-critical-analysis (Ponto 2) | PROSSEGUIR / REJEITAR / AMBIGUA |
| `veredito-rule-control` | pre-writing-rule-control | PASS / FAIL |
| `validacao` | nemesis-tests | PASS / FAIL (com fases) |
| `reconciliacao` | nemesis-tests (Fase 4) | gate=[qual] deixou passar [o que] |
| `parada-emergencia` | qualquer skill | motivo em 1 linha |
| `postmortem` | nemesis-postmortem-to-law | emenda proposta / emenda aplicada / sem emenda |
| `harness` | nemesis-harness-sync / gate F10 | INTEGRO / nao-conformidade reconciliada |

## Quando o ledger e escrito

1. **Na PARADA UNICA** (fim da Skill 4.5): a skill `nemesis-trust-ledger-update` coleta os
   vereditos do ciclo (anotados por cada gate no proprio veredito) e faz o append de todas
   as entradas de uma vez. E a escrita padrao.
2. **Em parada de emergencia:** a entrada `parada-emergencia` e escrita antes de aguardar o
   Fernando.
3. **Em post-mortem:** ao fim de cada post-mortem (`nemesis-postmortem-to-law`).

Os numeros e vereditos entram **copiados da saida literal** da sessao (lei F3/F6), nunca de
memoria.

## Para que o ledger serve (e para que NAO serve)

- **Serve** para: reconciliar gate vs desfecho (gate que aprovou o que a validacao reprovou
  = sinal de calibracao); construir o scorecard por skill (precisao observada dos vereditos,
  paradas de emergencia, tentativas de fix); fundamentar PROPOSTAS de calibracao (elevar
  limiar de um gate furado, reduzir escrutinio redundante de um gate com N ciclos de
  precisao total).
- **NAO serve** para: graduar autonomia automaticamente. **Nenhum modelo tem autonomia
  total** (AGENTS.md invariante 12): o ledger fundamenta a proposta; quem gradua ou
  restringe e o Fernando. Reconciliacao e sinal de calibracao, nao culpa.

## Integracao

- Lei: `nemesis-fable-method.md` F11. Skill de escrita: `nemesis-trust-ledger-update`.
- Os gates anotam os campos da entrada no proprio veredito (ver formato em cada skill de
  gate) para que a coleta na PARADA UNICA seja copia, nao reconstrucao.
- O relatorio da PARADA UNICA contem a secao `Trust Ledger:` com as entradas do ciclo.
