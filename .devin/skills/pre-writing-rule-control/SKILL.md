---
name: pre-writing-rule-control
description: >
  Valida o plano de implementacao contra as regras de linguagem do perfil do repo
  (.devin/rules/nemesis-repo-profile.md) antes da escrita formal. Recebe spec aprovada,
  analisa se o plano proposto viola regras, aprova ou rejeita.
---

# Pre-Writing Rule Control

Validar planos de implementacao contra as regras do repo antes da escrita formal.
Recebe spec aprovada, analisa se o plano proposto viola regras, aprova ou rejeita.

> As 6 regras de linguagem validadas por esta skill vivem no perfil do repo
> (`.devin/rules/nemesis-repo-profile.md`, secao "Regras de linguagem"): versao
> TypeScript/Bun/Next deste portfolio. Esta skill define o PROCESSO; o perfil define o
> CONTEUDO. Nunca duplicar as regras aqui.

**Anuncio de inicio**: "Estou usando a skill pre-writing-rule-control para validar o plano contra as regras do perfil do repo."

**Pre-requisito**: Uma especificacao aprovada existe no path de specs do perfil.

## Processo

### Step 1: Carregar Spec e Perfil

Ler a especificacao aprovada (path de specs do perfil) e o perfil do repo
(`.devin/rules/nemesis-repo-profile.md`). Identificar o que deve ser construido, quais
modulos/arquivos sao afetados, que restricoes se aplicam e quais sao as 6 regras vigentes.

### Step 2: Validar Contra as 6 Regras do Perfil

Validar o plano proposto contra as **6 regras de linguagem do perfil**, uma a uma:

1. **Regra 1 (linguagem do repo):** os arquivos novos respeitam a linguagem/stack unica do
   perfil? Excecoes de infra pre-existente e config sao as declaradas no perfil, nenhuma outra.
2. **Regra 2 (toolchain de build):** cada tarefa usa o comando de verificacao por tarefa do
   perfil? Nenhum toolchain paralelo introduzido?
3. **Regra 3 (areas sensiveis):** alguma tarefa toca area sensivel do perfil
   (`next.config.ts`, `package.json` dependencias, `tailwind.config.ts`,
   `src/app/layout.tsx` metadata)? Se sim, a flag `sensitive_area` exigida pelo perfil
   esta presente no plano?
4. **Regra 4 (escopo da spec):** todos os arquivos de todas as tarefas estao em FILES
   INVOLVED da spec original?
5. **Regra 5 (git):** nenhuma tarefa executa git de escrita?
6. **Regra 6 (artefatos):** nenhuma tarefa cria artefato proibido pelo perfil (build em
   `out/`/`.next/` como diff intencional, segredo ou dado pessoal sensivel em codigo)?

### Step 3: Checklist de Verificacao

```
- [ ] REGRA 1 (linguagem do perfil): PASS/FAIL
- [ ] REGRA 2 (toolchain do perfil): PASS/FAIL
- [ ] REGRA 3 (areas sensiveis + flag): PASS/ALERTAR/FAIL
- [ ] REGRA 4 (escopo da spec): PASS/FAIL
- [ ] REGRA 5 (git somente Fernando): PASS/FAIL
- [ ] REGRA 6 (artefatos proibidos): PASS/FAIL
```

**Se violacao detectada**:
- Rejeitar o plano
- Explicar qual regra foi violada (citando a secao do perfil)
- Sugerir ajustes
- NAO prosseguir para nemesis-writing-plans

**Se NENHUMA violacao**:
- Aprovar o plano
- Prosseguir para `nemesis-writing-plans`

### Step 4: Apresentar Decisao

**GATE AUTOMATICO** (modo autonomo, default): o veredito bloqueia ou libera sozinho, sem
aguardar resposta humana. PASS = prosseguir imediatamente para `nemesis-writing-plans`.
FAIL = ajustar a spec/plano proposto conforme a violacao e revalidar (maximo 1 ciclo);
segundo FAIL = parada de emergencia (reportar violacao + evidencia ao Fernando e aguardar).

**Se aprovado**:
```
Plano validado contra as 6 regras do perfil do repo:
✅ REGRA 1 (linguagem): PASS
✅ REGRA 2 (toolchain): PASS
✅ REGRA 3 (areas sensiveis): [PASS | ALERTAR]
✅ REGRA 4 (escopo): PASS
✅ REGRA 5 (git): PASS
✅ REGRA 6 (artefatos): PASS

Registro para o Trust Ledger (F11): gate=rule-control · veredito=PASS · ref=[SPEC]

Prosseguindo para nemesis-writing-plans.
```

**Se rejeitado**:
```
Plano rejeitado. Violacao detectada:
❌ [REGRA_N]: [descricao exata da violacao, com a secao do perfil]

Ajustes necessarios: [lista de mudancas requeridas]

Aplicando ajuste e revalidando (ciclo 1 de 1)...
```

Se o segundo ciclo tambem falhar: parada de emergencia, reportar ao Fernando e aguardar.

## Veredito e artefato (Trust Ledger, lei F11)

O veredito (PASS/FAIL, com a base em 1 linha) sera registrado no Trust Ledger na PARADA
UNICA pela skill `nemesis-trust-ledger-update`. Anotar os campos no proprio veredito.

## Lembrar

- Validacao ANTES de escrita, nao depois
- As 6 regras vivem no PERFIL e nao sao negociaveis; esta skill nao as duplica
- Explicacao clara quando rejeitar
- Sempre PT-BR
- Nemesis enforcement valida codigo — skill valida planejamento

## Integracao

**Skill anterior**: `nemesis-specification-design`
**Proxima skill apos aprovacao**: `nemesis-writing-plans`
