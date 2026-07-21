---
name: nemesis-writing-plans
description: >
  Converte especificacao aprovada em plano de implementacao com tarefas atomicas
  (2-5 min cada). Cada tarefa tem paths exatos, codigo completo na stack do perfil do repo
  e comando de verificacao do perfil.
---

# Nemesis Writing Plans

Converter especificacao aprovada em plano de implementacao abrangente com tarefas atomicas.

> O comando de verificacao por tarefa e os paths vem do perfil do repo
> (`.devin/rules/nemesis-repo-profile.md`): neste portfolio, `bunx tsc --noEmit`.

**Anuncio de inicio**: "Estou usando a skill nemesis-writing-plans para gerar o plano de implementacao."

**Pre-requisito**: Uma especificacao aprovada existe no path de specs do perfil.

## Processo

### Step 1: Carregar e Revisar Spec

Ler a especificacao aprovada. Identificar:
- O que deve ser construido (REQUEST/REQUIREMENTS)
- Quais modulos serao afetados (FILES INVOLVED)
- Quais restricoes se aplicam (RESTRICTIONS)
- Quais sao os criterios de aceitacao (EXPECTED DELIVERY)

### Step 2: Ler Codigo Fonte Obrigatorio (lei F1)

**OBRIGATORIO**: Ler TODOS os arquivos listados na secao FILES INVOLVED da spec.
Nao gerar plano sem ter lido o codigo real (manifests do modulo, entrypoints, arquivos a
modificar).

### Step 3: Mapear Estrutura de Arquivos

Antes de definir tarefas, confirmar quais arquivos serao criados ou modificados:

```
CREATE: <path exato do arquivo novo>
MODIFY: <path exato do arquivo existente>
TEST:   <path exato do teste>
```

Cada arquivo tem uma responsabilidade clara. Arquivos que mudam juntos vivem juntos.

### Step 4: Decompor em Tarefas Atomicas

**Cada tarefa = 1 arquivo, 1 mudanca, 1 verificacao. Tempo: 2-5 minutos.**

Granularidade:
- Ler arquivo existente = um passo
- Analisar linha de mudanca = um passo
- Implementar mudanca = um passo
- Executar o comando de verificacao por tarefa do perfil = um passo

**Exemplo bom (perfil portfolio):**
```
TASK 1: Criar constants.ts com dados de contato tipados
  FILE: src/lib/constants.ts (CREATE)
  DEPENDE_DE: nenhuma
  VERIFICACAO: bunx tsc --noEmit

TASK 2: Consumir constants no footer
  FILE: src/components/footer/footer.tsx (MODIFY)
  DEPENDE_DE: TASK 1
  VERIFICACAO: bunx tsc --noEmit

TASK 3: Consumir constants no top-bar
  FILE: src/components/top-bar/top-bar.tsx (MODIFY)
  DEPENDE_DE: TASK 1
  VERIFICACAO: bunx tsc --noEmit
```

**DEPENDE_DE (obrigatorio em toda tarefa):** lista das TASKs pre-requisito, ou `nenhuma`.
E dele que a `nemesis-subagent-driven-development` deriva as waves de execucao paralela:
tarefas sem dependencia entre si E com arquivos disjuntos executam em paralelo. Declarar a
dependencia REAL (dado/tipo/funcao consumida), nao a ordem de escrita do plano; dependencia
inflada mata o paralelismo, dependencia omitida quebra a wave.

**Exemplo ruim**:
```
TASK 1: "Implementar tudo no novo modulo"   ← Muito grande
TASK 2: "TBD — adicionar testes depois"     ← Placeholder
TASK 3: "Similar a TASK 1"                  ← Referencia indireta
```

### Step 5: Escrever o Plano

**Header obrigatorio**:

```markdown
# [Nome da Feature] — Plano de Implementacao

> **Para agentes**: Use nemesis-subagent-driven-development para executar este plano.

**Objetivo**: [Uma sentenca clara]

**Spec**: [path exato da spec, no path de specs do perfil]

**Modulos Afetados**: [crates ou diretorios, conforme o perfil]

**Arquitetura**: [2-3 sentencas sobre abordagem tecnica]

**Tech Stack**: [dependencias relevantes do perfil]

---
```

**Estrutura de tarefa (obrigatoria para TODA tarefa)**:

```markdown
## TASK N: [Descricao curta]

**Modulo**: [crate ou diretorio]

**Arquivos**:
- CREATE: `<path exato>`
- MODIFY: `<path exato>` (linhas XXX-YYY)
- TEST:   `<path exato>`

**Depende de**: [TASK N, TASK M | nenhuma]

**Verificacao**:
[comando de verificacao por tarefa do perfil]

**Descricao Detalhada**:
[O que fazer, contexto tecnico, padroes do perfil a seguir]

**Implementacao**:
[Codigo completo a ser escrito — NAO deixar placeholders]
```

### Step 6: Sem Placeholders

NUNCA escrever:
- "TBD", "TODO", "implementar depois", "fill in details"
- "Adicionar error handling apropriado" sem codigo real
- "Escrever testes para o acima" sem codigo de teste real
- "Similar a TASK N" — repetir o codigo, tarefas podem ser lidas fora de ordem

Cada tarefa deve ter:
- Codigo **completo** e **exato** na stack do perfil
- Comando de verificacao **exato** (com expected output)
- Assumpcoes **documentadas**

### Step 7: Auto-Review (checklist obrigatorio)

Checklist interno (reprovou em algum item = corrigir o plano antes de seguir):
- [ ] Todos os paths sao exatos e confirmados no disco?
- [ ] Codigo completo em cada tarefa? (sem placeholders)
- [ ] Cada tarefa tem o comando de verificacao do perfil?
- [ ] Ordem faz sentido? (tipos antes de funcoes, entrypoints antes de integracoes, testes
      por ultimo; a suposicao mais arriscada do plano e verificada nas PRIMEIRAS tarefas,
      nao nas ultimas)
- [ ] Toda tarefa declara DEPENDE_DE (real, nao inflado)? Tarefas paralelizaveis (mesma
      wave potencial) tem arquivos disjuntos?
- [ ] Nenhuma tarefa executa git write operations?
- [ ] Verificacao final inclui a suite completa do perfil? (lint + tsc + build)

**MODO AUTONOMO (default)**: nao ha aprovacao humana aqui. O gate do plano e a
`nemesis-critical-analysis` (Ponto 2), invocada apos a gravacao (Step 8). Veredito
PROSSEGUIR = disparar a execucao sem pausa; REJEITAR = ajustar e re-analisar (1 ciclo);
segundo REJEITAR = parada de emergencia.

**MODO SUPERVISIONADO** (so quando o Fernando pedir): apresentar o plano e bloquear ate
aprovacao explicita ("sim", "pode", "aprovado", "ok", "prossiga", "execute").

### Step 8: Salvar Plano

Salvar no path de plans do perfil (`.devin/plans/`), nome `PLAN_NNN_nome-descritivo.md`,
numero auto-increment verificado com `ls` antes de gravar.

## Lembrar

- Ler codigo ANTES de gerar plano — obrigatorio
- Paths exatos SEMPRE
- Codigo completo em cada passo
- Comandos exatos com output esperado
- Tarefas atomicas, sequenciais, verificaveis
- Responder SEMPRE em PT-BR

## Integracao

**Skill anterior**: `pre-writing-rule-control`
**Proxima skill apos aprovacao**: `nemesis-subagent-driven-development`
