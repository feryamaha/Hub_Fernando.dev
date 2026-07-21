---
name: nemesis-specification-design
description: >
  Converte request informal em especificacao tecnica estruturada para o portfolio
  Hub_Fernando.dev (Next.js/TypeScript, conforme o perfil do repo). Auto-ativa quando
  Fernando descreve uma necessidade. NUNCA escreva codigo antes do design ser validado.
  No modo autonomo (default) o gate da spec e a analise critica (Skill 0, Ponto 1); a
  spec e gravada sem aguardar aprovacao humana.
---

# Nemesis Specification Design

Converter requests informais em especificacoes tecnicas estruturadas.

> **Texto unico espelhado nos dois repos.** Stack, comandos e paths vem do perfil do repo
> (`.devin/rules/nemesis-repo-profile.md`).

**Anuncio de inicio**: "Estou usando a skill nemesis-specification-design para gerar uma especificacao tecnica."

## GATE (por modo)

NAO execute qualquer skill de implementacao e NAO escreva codigo antes do design validado.

- **MODO AUTONOMO (default)**: o gate e AUTOMATICO. Apos gerar a spec, invocar
  `nemesis-critical-analysis` (Ponto 1). Veredito PROSSEGUIR = gravar a spec e seguir o
  pipeline sem pausa. Veredito REJEITAR = ajustar e re-analisar (1 ciclo); segundo REJEITAR =
  parada de emergencia (reportar ao Fernando).
- **MODO SUPERVISIONADO** (so quando o Fernando pedir): apresentar a spec e BLOQUEAR ate
  aprovacao explicita ("sim", "pode", "aprovado", "ok", "prossiga", "continua").

## Processo

### Step 1: Entender Contexto do Projeto

Ler a paisagem do repo para grounding da analise, conforme o perfil:

```bash
# Hub_Fernando.dev (portfolio):
cat AGENTS.md | head -60
cat package.json
ls src/app src/components src/hooks src/lib
```

Identificar: stack do perfil, componentes/secoes afetados, padroes existentes (tokens
--finder-*, estrutura de secoes, hooks), regras vigentes.

### Step 2: Analisar Request e Gerar Especificacao

Analisar o request de Fernando e gerar a especificacao **COMPLETA** em uma unica passagem.
NAO fazer perguntas socraticas.

**Mapa de traducao (informal → tecnica), exemplos:**
- "nao compila" → "Erro de compilacao em <crate/modulo> X"
- "nao roda o teste" → "suite do perfil falha em X::Y::test_Z"
- "ta lento" → "Latencia/performance acima de threshold"
- "nao valida corretamente" → "Regra semantica nao e enforced / schema nao valida"

**Disciplina epistemica:**
- NUNCA tratar framing do usuario como verdade absoluta
- Quando evidencia e ambigua: declarar incerteza na spec
- Fazer assumpcoes razoaveis quando necessario, documentadas em CONTEXT

**Estrutura de especificacao (gerar completa de uma vez):**

1. **REQUEST** — Traducao tecnica da necessidade
2. **CATEGORY** — Bugfix | Feature | Refactor | Infra | Docs
3. **PROBLEM** — Sintomas observaveis somente, SEM hipoteses causais
4. **CONTEXT** — Modulos afetados, sintomas, comportamento esperado, assumpcoes
5. **REQUIREMENTS** — O que deve ser feito (tecnico, na stack do perfil)
6. **FILES INVOLVED** — Paths exatos
7. **RESTRICTIONS** — Limites nao-negociaveis (regras do perfil, compatibilidade)
8. **EXPECTED DELIVERY** — Resultado concreto e verificavel, com os comandos de validacao
   do perfil e o resultado esperado de cada um

**Exemplo (perfil portfolio):**
```
REQUEST: Centralizar dados de contato em constante unica importada pelos componentes

CATEGORY: Refactor

PROBLEM:
- Atual: e-mail duplicado com valores divergentes entre componentes
- Esperado: fonte unica de dados de contato, mesmos valores em todo o site

CONTEXT:
- Componentes afetados: top-bar, footer, contact
- Assumpcao: o e-mail canonico e decidido pelo Fernando; divergencia e reportada

REQUIREMENTS:
1. Criar `src/lib/constants.ts` com EMAIL, SOCIAL_LINKS e CV_PATH tipados
2. Substituir valores hardcoded nos componentes por imports da constante
3. Nenhuma mudanca visual

FILES INVOLVED:
- src/lib/constants.ts (create)
- src/components/top-bar/top-bar.tsx (modify)
- src/components/footer/footer.tsx (modify)
- src/components/main-content/sections/contact.tsx (modify)

RESTRICTIONS:
- Regras 1-6 do perfil do repo (linguagem, toolchain, areas sensiveis, escopo, git, artefatos)
- Nao quebrar build nem alterar aparencia

EXPECTED DELIVERY:
- Valores unicos importados de constants.ts
- bunx tsc --noEmit: PASS
- bun run build: PASS

VERIFICATION:
$ bunx tsc --noEmit
$ bun run build
```

### Step 2.5: Ler o codigo real dos pontos de contato (obrigatorio, lei F1/F6)

Antes de fechar FILES INVOLVED, ler os arquivos que a spec cita (metodo Fable, F1:
nenhum path citado sem confirmacao no disco; F6: nenhuma assinatura sem grep).
Assumpcoes que nao puderam ser verificadas ficam DECLARADAS na secao CONTEXT.

### Step 3: Validar (gate automatico no modo autonomo)

Invocar `nemesis-critical-analysis` (Ponto 1) sobre a spec gerada.

- **PROSSEGUIR**: seguir para Step 4 (gravar) sem pausa.
- **REJEITAR**: ajustar a spec conforme a justificativa e re-analisar (maximo 1 ciclo).
  Segundo REJEITAR = parada de emergencia: reportar veredito + evidencia ao Fernando.

No modo supervisionado: apresentar a spec ao Fernando e bloquear ate aprovacao.

### Step 4: Salvar Especificacao

Apos veredito PROSSEGUIR (ou aprovacao, no modo supervisionado), salvar no path de specs do
perfil (`.devin/specs/`), nome `SPEC_NNN_nome-descritivo.md`, numero auto-increment
verificado com `ls` antes de gravar (nunca assumir).

## Lembrar

- NUNCA escrever codigo antes de design validado (analise critica no autonomo; Fernando no supervisionado)
- Ler o codigo real dos pontos de contato ANTES de fechar a spec (nenhum path inventado)
- Gerar especificacao completa SEM fazer perguntas
- Somente sintomas observaveis, NUNCA hipoteses causais
- Documentar assumpcoes quando fizer inferencias razoaveis
- Responder SEMPRE em PT-BR, escrever specs em PT-BR

## Proxima Skill

**Apos spec gravada** (modo autonomo, sem pausa):
1. Invocar `pre-writing-rule-control` para validacao de regras
2. Se validacao PASS: invocar `nemesis-writing-plans`
