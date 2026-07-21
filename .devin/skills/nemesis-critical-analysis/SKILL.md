---
name: nemesis-critical-analysis
description: Aplica disciplina epistemica e analise critica em 2 pontos do SDD pipeline: antes de gravar a spec e antes de executar o plano. Garante que toda mudanca melhora o portfolio sem regredir o que ja funciona, com evidencia empirica e sem bajulacao.
---

# Nemesis Critical Analysis

Validacao critica de spec e plano antes da escrita e antes da execucao.

> **Regra canonica e transversal deste harness.** Aplica disciplina anti-sycophancy e
> analise critica em 2 pontos do SDD pipeline: (1) antes de gravar a spec, (2) apos
> o plano e antes de executar. Garante que toda mudanca melhora o portfolio sem
> regredir o que ja funciona.
>
> Parametros de stack (comandos, paths, regras de linguagem) vem do perfil do repo:
> `.devin/rules/nemesis-repo-profile.md`.
>
> **Invoca explicitamente:** `disciplina-epistemica` (anti-sycophancy e autoridade
> humana). Os conceitos abaixo nao sao referencia bibliografica: sao regras ativas
> que moldam cada veredito.

## Quando Invocar

### Ponto 1: Pre-Spec (antes de gravar a SPEC)
- **Quando:** Apos gerar a especificacao tecnica e ANTES de apresenta-la para aprovacao
- **Entrada:** Request do Fernando + especificacao tecnica gerada
- **Saida:** Veredito PROSSEGUIR ou REJEITAR com justificativa

### Ponto 2: Pre-Execution (apos plano, antes de executar)
- **Quando:** Apos o plano ser aprovado por Fernando e ANTES de disparar a Skill 4
- **Entrada:** SPEC aprovada + PLAN aprovado
- **Saida:** Veredito PROSSEGUIR ou REJEITAR com justificativa

## HARD-GATE

Se a analise retornar REJEITAR, BLOQUEAR a gravacao da spec (Ponto 1) ou a execucao
do plano (Ponto 2). Apresentar o veredito e a justificativa a Fernando. Aguardar
ajuste ou instrucao.

## Processo

### Step 1: Compreender o objetivo do portfolio

O Hub_Fernando.dev e o cartao de visita profissional do Fernando: comunica perfil,
projetos e competencias a recrutadores tecnicos mantendo a identidade Finder/macOS.
O humano e o arquiteto; o agente e o executor contido. Nenhuma mudanca pode: quebrar a
identidade visual macOS, expor dado pessoal sensivel, publicar alegacao nao verificavel,
degradar acessibilidade/contraste ou quebrar o build/deploy.

Toda mudanca deve ser avaliada contra este objetivo: **a mudanca melhora a percepcao
profissional do portfolio (visual, clareza, credibilidade) sem regredir o que ja
funciona?**

### Step 1A: Principios epistemicos (fonte unica: nemesis-epistemic-safety.md)

A regra canonica vive em **`.devin/rules/nemesis-epistemic-safety.md`** e e REGRA ATIVA
desta skill, nao referencia bibliografica: LER e APLICAR integralmente a cada veredito
(principio central, proibicoes anti-sycophancy, distincao posicao_usuario vs
evidencia_observada vs salto_injustificado, padroes de alto risco). O conteudo nao e
duplicado aqui de proposito: fonte unica evita divergencia entre copia e regra.

Sintese operacional minima (o detalhe esta na regra canonica):
- evidencia_observada e o que decide; salto_injustificado = BLOQUEADO;
- veredito proporcional a evidencia; hipotese rival sempre formulada;
- alto risco (Fernando ja propoe a conclusao, solucao elegante mas fracamente evidenciada,
  urgencia/tom pressionando) = elevar o limiar de evidencia, nao abaixa-lo.

### Step 2: Estrutura da Analise

Para cada mudanca proposta na spec ou no plano, responder explicitamente.
Cada resposta deve distinguir **evidencia_observada** de **inferencia_valida** de
**salto_injustificado**. Se a resposta for um salto_injustificado, marcar como tal.

#### 2.1 Qual problema resolve?
- Qual sintoma observavel (nao hipotese causal) motiva a mudanca?
- Ha evidencia empirica (logs, pentest, bypass comprovado, codigo-fonte) ou e especulacao?
- Qual o impacto do problema se nao for corrigido?
- Estou tratando possibilidade como confirmacao? (proibido)

#### 2.2 Qual o efeito colateral no que ja funciona?
- A mudanca modifica logica existente que funciona corretamente?
- A mudanca pode quebrar fluxo legitimo de visitante (navegacao SPA, temas, responsivo,
  SEO das secoes montadas)?
- A mudanca interage com outras camadas? (temas via CSS vars, navegacao/use-navigation,
  AOS/animacoes, export estatico do Next)
- Ha risco de regressao na suite de validacao do perfil? (lint + tsc + build)
- Verifiquei no codigo ou e inferencia? (nao afirmar causa-raiz sem verificar)

#### 2.3 Qual o efeito negativo?
- Que workflow legitimo poderia ser afetado?
- Que divida tecnica e introduzida?
- A abordagem e consistente com os padroes existentes ou cria excecao?
- A mudanca e cirurgica (minima) ou amplifica escopo?
- Estou ampliando escopo por conta propria? (overreach, proibido)

#### 2.4 Alinhamento com o objetivo do portfolio (invariantes por ID)
- A mudanca melhora primeira impressao, clareza para recrutador ou polimento visual?
- A mudanca viola alguma invariante do `AGENTS.md` deste repo? Citar por numero a
  invariante em risco, se houver.
- A mudanca preserva a identidade Finder/macOS e o principio de que o humano e o decisor?
- A mudanca e aditiva (novo polimento/feature) ou subtrativa (remove algo que funciona)?

#### 2.5 Interacao entre mudancas (se multiplas)
- As mudancas sao independentes ou complementares?
- Uma mudanca pode mascarar outra?
- A ordem de aplicacao importa?

#### 2.6 Deteccao de padroes de alto risco
- O Fernando ja propoe a conclusao e estou so confirmando? (alto risco)
- A solucao parece elegante mas e fracamente evidenciada? (alto risco)
- Estou sendo pressionado por urgencia ou tom? (alto risco)
- Se alto risco: declarar explicitamente e redobrar escrutinio

### Step 3: Auto-auditoria (obrigatoria, inegociavel)

Antes de emitir o veredito, responder as 6 perguntas da disciplina epistemica.
Auto-auditoria pulada igual BLOQUEADO.

1. Estou fazendo so o que foi pedido, ou ampliei o escopo por conta propria?
2. Estou respondendo a **evidencia** ou ao **enquadramento** do Fernando?
3. Que **evidencia observavel** sustenta esta conclusao?
4. Qual **hipotese alternativa plausivel** ainda existe?
5. O que **falsificaria** minha conclusao atual?
6. Meu tom esta mais assertivo do que a evidencia permite?

### Step 4: Veredito

Emitir um dos dois vereditos. O veredito deve ser **proporcional a evidencia**.
Se a evidencia e ambigua, declarar incerteza no veredito.

#### PROSSEGUIR
- A mudanca resolve um problema com **evidencia empirica** (nao especulacao)
- Nao degrada o que funciona (aditiva ou compativel)
- Efeitos colaterais sao minimos e mitigaveis
- Alinhada com o objetivo do Nemesis
- Nao introduz divida tecnica significativa
- Auto-auditoria confirma: conclusao sustentada por evidencia_observada

#### REJEITAR
- A mudanca degrada protecao existente
- Efeitos colaterais superam beneficios
- **Evidencia insuficiente** para justificar a mudanca
- Cria divida tecnica ou excecao arquitetural
- Amplifica escopo alem do necessario (overreach)
- Auto-auditoria identifica salto_injustificado

Em caso de REJEITAR, apresentar:
- Qual ponto especifico falhou
- Que **evidencia observada** sustenta a rejeicao
- Que ajuste resolveria (se aplicavel)
- Ao menos uma **hipotese alternativa** plausivel

Em caso de evidencia ambigua (nem PROSSEGUIR nem REJEITAR claramente):
- Declarar a incerteza explicitamente
- Separar fato observado de inferencia
- Pedir a observacao que falta quando a lacuna e material

### Step 5: Veredito e artefato (Trust Ledger, lei F11)

O veredito emitido NAO e mensagem efemera: ele sera registrado no Trust Ledger do repo
(`.devin/ledger/trust-ledger.md`) na PARADA UNICA, pela skill `nemesis-trust-ledger-update`,
com ponto (P1/P2), veredito, base de evidencia em 1 linha e referencia a spec/plano. Anotar
desde ja esses 4 campos no proprio veredito, para a coleta ser copia e nao reconstrucao.
Na reconciliacao posterior: se a validacao (Skill 4.5) reprovar algo que este gate aprovou,
a entrada de reconciliacao apontara para este veredito (sinal de calibracao, nao culpa).

## Formato de Saida

```
## Analise Critica — [Ponto 1: Pre-Spec | Ponto 2: Pre-Execution]

### Mudanca analisada
[descricao tecnica da mudanca]

### 2.1 Problema que resolve
[evidencia empirica ou declaracao de incerteza]

### 2.2 Efeito colateral no que funciona
[interacao com camadas existentes, risco de regressao]

### 2.3 Efeito negativo
[workflow legitimo afetado, divida tecnica]

### 2.4 Alinhamento com objetivo do Nemesis
[fecha auto-privilegio? invariante em risco citada por numero? preserva arquitetura?]

### 2.5 Interacao entre mudancas
[se aplicavel]

### 2.6 Deteccao de padroes de alto risco
[alto risco identificado ou nenhum, com justificativa]

### Auto-auditoria (6 perguntas)
1. [resposta]
2. [resposta]
3. [resposta]
4. [resposta]
5. [resposta]
6. [resposta]

### Veredito: [PROSSEGUIR | REJEITAR | EVIDENCIA AMBIGUA]
[justificativa em 1-3 linhas, proporcional a evidencia]

### Registro para o Trust Ledger (F11)
ponto=[P1|P2] · veredito=[...] · base=[1 linha] · ref=[SPEC/PLAN]
```

## Integracao com o SDD Pipeline (modo autonomo, default)

No modo autonomo esta skill E o gate que substitui a aprovacao humana intermediaria; por isso
o veredito bloqueia de verdade. Regime: veredito negativo permite UM ciclo de ajuste +
re-analise; o segundo veredito negativo vira parada de emergencia (reportar ao Fernando com
veredito e evidencia, aguardar).

### Ponto 1 (Pre-Spec):
1. Skill 1 (`nemesis-specification-design`) gera a especificacao
2. **Invocar `nemesis-critical-analysis` (Ponto 1)**
3. Se PROSSEGUIR: gravar a spec e seguir para `pre-writing-rule-control` sem pausa
4. Se REJEITAR: ajustar spec e re-analisar (1 ciclo); segundo REJEITAR = parada de emergencia

### Ponto 2 (Pre-Execution):
1. Skill 3 (`nemesis-writing-plans`) gera e grava o plano
2. **Invocar `nemesis-critical-analysis` (Ponto 2)**
3. Se PROSSEGUIR: disparar Skill 4 (`nemesis-subagent-driven-development`) sem pausa
4. Se REJEITAR: ajustar plano e re-analisar (1 ciclo); segundo REJEITAR = parada de emergencia

No modo supervisionado (so a pedido do Fernando), as aprovacoes humanas de spec e plano
voltam a existir alem destes gates.

## Disciplina Epistemica (regras ativas, nao referencia)

Esta skill **invoca e aplica** os conceitos de `disciplina-epistemica` (SKILL.md) e
`nemesis-epistemic-safety.md`. Eles nao sao citados bibliograficamente: sao regras
que moldam cada veredito. Em caso de conflito, a disciplina epistemica prevalece
sobre a conveniencia de aprovar uma spec ou plano.

### Linguagem (disciplina epistemica)

Prefira: "a evidencia indica", "o estado atual do codigo sugere", "a hipotese mais
sustentada e", "isto permanece incerto porque".
Evite como confirmacao vazia: "voce esta certo", "exatamente", "essa e definitivamente
a causa", "a solucao e obvia", sem suporte direto.
Evite como autoridade indevida: "preciso te frear", "deixa eu te corrigir", "o que voce
deveria fazer e...", quando nao foi solicitado.

### Formato de texto

Nao usar travessao em nenhum texto, em qualquer idioma. Usar virgula, dois-pontos ou
parenteses no lugar.

Prove, nao suponha. Execute o solicitado. Preserve a autoridade humana.

## Linguagem

Responder SEMPRE em PT-BR.
