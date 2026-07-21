---
name: nemesis-postmortem-to-law
description: >
  Compost de processo (lei F12): converte um erro de PROCESSO com custo material em
  post-mortem minimo (sintoma, causa verificada, lei violada ou ausente) e em proposta de
  emenda a regra/skill correspondente, com HARD-GATE humano.
---

# Nemesis Postmortem-to-Law (lei F12)

Transformar falha de processo em lei, com trilho padronizado e decisao humana.

> Paths de processo vem do perfil (`.devin/rules/nemesis-repo-profile.md`).

**Anuncio de inicio**: "Estou usando a skill nemesis-postmortem-to-law para converter uma falha de processo em proposta de emenda."

## Quando invocar

- Erro de processo com custo material: uma lei existente (F1..F12, invariante do AGENTS.md,
  regra de skill/workflow) foi violada, OU uma situacao mostrou que falta uma lei.
- NAO invocar para: erro trivial sem custo, falha de produto (essa vai para ISSUE + SDD),
  ou achado especulativo sem incidente concreto.

## Processo

### Step 1: Post-mortem minimo (3 campos, com evidencia)

```
SINTOMA OBSERVADO: [o que aconteceu, com a evidencia literal da sessao (saida, diff, log)]
CAUSA VERIFICADA:  [verificada no artefato, nao inferida; se nao verificavel, declarar]
LEI: [violada: qual lei/invariante/regra, citada por ID] OU [ausente: que lei faltou]
```

Disciplina epistemica integral: sem causa-raiz por inferencia; hipotese rival considerada;
se a evidencia e ambigua, o post-mortem diz isso.

### Step 2: Proposta de emenda

- **Arquivo alvo:** a regra/skill/workflow onde a lei vive (ou deveria viver). Lei de
  trabalho do modelo → `nemesis-fable-method.md`; regra de stack → o perfil do repo
  (`nemesis-repo-profile.md`).
- **Texto proposto:** a emenda exata (diff minimo), incluindo o campo **origem** (o
  incidente que a gerou; leis carregam a propria historia).
- **Racionalizacao prevista:** a desculpa mais provavel que um agente usaria para contornar
  a emenda ("so desta vez", "meu caso e obviamente diferente", "estou confiante") e a
  contra-resposta que o texto da emenda incorpora. Emenda que nao resiste a propria
  racionalizacao volta para reescrita antes do gate.
- **Efeito colateral:** o que a emenda pode restringir de legitimo (analogo ao FP do motor).

### Step 2.5: Teste de pressao da emenda (o RED ja existe; provar o GREEN)

O incidente do post-mortem E o teste RED: a falha observada SEM a emenda. Antes do
HARD-GATE, quando o cenario e reproduzivel a custo baixo (simulacao com subagente que
recebe o mesmo contexto do incidente + a emenda proposta), rodar o cenario e anexar o
desfecho literal a proposta (GREEN comprovado, ou emenda insuficiente — que volta para o
Step 2). Cenario caro ou irreproduzivel: declarar isso explicitamente na proposta; o
Fernando decide com essa informacao. Origem (2026-07-17): destilacao de praticas externas
(superpowers/writing-skills — TDD aplicado a documentacao de processo), por solicitacao
do Fernando.

### Step 3: HARD-GATE humano (inegociavel)

Regras sao autoridade: **so o Fernando emenda lei**. Apresentar post-mortem + proposta e
BLOQUEAR ate decisao explicita. Respostas validas: "sim", "pode", "aprovado", "ok",
"prossiga" (ou a recusa dele, que tambem e desfecho valido e registravel).

### Step 4: Aplicar (somente apos aprovacao)

1. Aplicar a emenda no arquivo alvo.
2. Rodar o procedimento de integridade do harness (`nemesis-harness-integrity.md`,
   lei F10) na mesma sessao.
3. Registrar no Trust Ledger (`nemesis-trust-ledger-update`, evento `postmortem`):
   emenda aplicada, ou "sem emenda por decisao do Fernando".

## Formato de saida

```
## Post-mortem → Lei (F12)

SINTOMA OBSERVADO: [...]
CAUSA VERIFICADA:  [...]
LEI: [violada F#/invariante N | ausente]

### Proposta de emenda
Arquivo alvo: [path]
Texto proposto: [diff minimo, com origem]
Racionalizacao prevista: [desculpa + contra-resposta incorporada]
Teste de pressao: [GREEN comprovado com evidencia | nao rodado: motivo declarado]
Efeito colateral possivel: [...]

⛔ HARD-GATE: aguardando decisao do Fernando.
```

## Exemplo real (origem desta skill, 2026-07-09)

SINTOMA: verificador de espelhamento materializado como script shell foi quarentenado pelo
proprio Defender no momento da criacao. CAUSA VERIFICADA: visitor `nemesis_bypass` (variavel
de shell contendo path protegido do harness), registrada em `.nemesis/quarantine/PENDING.json`.
LEI AUSENTE: nao havia lei sobre a forma dos verificadores de harness. EMENDA: proibicao de
script shell manipulando paths do harness + verificador como procedimento em markdown
(aplicada em `nemesis-harness-integrity.md`, secao "Verificador deterministico").

## Lembrar

- So processo; falha de produto segue o trilho ISSUE → SDD.
- Emenda sem HARD-GATE humano = violacao (a autoridade sobre as leis e do Fernando).
- Emenda em harness exige check F10 na mesma sessao.
- Registrar o desfecho no ledger SEMPRE (inclusive "sem emenda").
- Sempre PT-BR.

## Integracao

**Invocada por**: qualquer skill que detecte violacao de lei com custo material, ou o
Fernando diretamente.
**Skills relacionadas**: `nemesis-trust-ledger-update` (registro), `nemesis-harness-sync`
(reconciliacao de harness).
