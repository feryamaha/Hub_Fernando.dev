---
name: nemesis-tests
description: >
  Valida a implementacao apos a Skill 4 no perfil portfolio: lint + tipos + build
  (autorizados intrinsecamente pelo pipeline) e verificacao visual quando o diff toca UI.
  Fix autonomo de falhas com maximo de 2 tentativas por falha, com reconciliacao de
  vereditos no Trust Ledger. Ao passar, invoca a nemesis-doc-sync (4.6) automaticamente,
  sem pausa.
---

# Nemesis Tests (Validacao Pos-Execucao)

Executar bateria de validacao apos implementacao (Skill 4). Ao passar, invoca a
`nemesis-doc-sync` (4.6) automaticamente (sem pausa); a PARADA UNICA do pipeline acontece
no FIM da doc-sync, nao aqui.

> Os comandos por fase vem do perfil do repo (`.devin/rules/nemesis-repo-profile.md`).
> As fases de pentest, eBPF, doctor e pretool do perfil motor do ecossistema de origem
> NAO existem neste perfil.

**Anuncio de inicio**: "Estou usando a skill nemesis-tests para validar a implementacao."

**Pre-requisito**: Todas as tarefas do PLAN foram completadas (Skill 4 concluida).

## Processo

**Regra geral da skill**: cada comando e executado individualmente. O proximo comando so e
executado se o anterior passou. Se um comando falhar, NAO executar os subsequentes: ir para
a Fase 3 (investigacao).

### Fase 1: Lint e tipos

```bash
bun run lint          # Step 1
bunx tsc --noEmit     # Step 2
```

- **PASS**: prosseguir para a Fase 2
- **FAIL**: ir para Fase 3 (investigacao)
- Erros de lint PRE-EXISTENTES em arquivos fora do diff do ciclo: estacionar e reportar,
  nao corrigir em silencio (F7).

### Fase 2: Build

O build valida a arvore inteira (export estatico do Next).

```bash
bun run build
```

> **Autorizacao**: se o workflow foi chamado, o build dentro desta skill ja esta
> autorizado intrinsecamente. Nao requer HARD-GATE adicional.

- **PASS**: prosseguir para a Fase 2.5
- **FAIL**: ir para Fase 3 (investigacao)

### Fase 2.5: Verificacao visual (quando o diff toca UI)

Se o diff do ciclo toca componente, pagina ou estilo: abrir o preview no browser da IDE,
navegar pelas secoes afetadas e verificar contra a rubrica de UI do perfil (identidade
Finder, estados, contraste, responsivo, sem overflow horizontal). Registrar o que foi
observado (nivel "comportamento real" da hierarquia F3). Divergencia visual = tratar como
falha (Fase 3).

### Fase 3: Investigacao de causa raiz + fix autonomo (se qualquer Step falhou)

Se qualquer comando falhou, aplicar o metodo Fable (F2, debugging por hipoteses):

1. **Investigar a causa raiz** (nao tratar sintoma)
   - Ler a saida de erro COMPLETA; corrigir o PRIMEIRO erro (os demais costumam ser eco)
   - Identificar o arquivo e linha exata do problema
   - Checar a hipotese do artefato defasado (cache/build antigo) antes de culpar o fonte
   - Determinar se e regressao do codigo alterado ou problema pre-existente (baseline:
     a falha existe sem a mudanca? se pre-existente, NAO consertar em silencio: registrar
     no estacionamento e reportar na PARADA UNICA)
   - Confirmar a causa por predicao antes de editar
2. **Fix autonomo** (modo autonomo, default): implementar o fix cirurgico, escopo minimo,
   dentro dos arquivos da spec. **Maximo 2 tentativas por falha.**
3. **Retestar**: apos o fix, re-executar desde a Fase 1
   - Se passar: prosseguir (o fix e as tentativas ficam registrados para o relatorio da
     PARADA UNICA)
   - Se falhar apos 2 tentativas: **PARADA DE EMERGENCIA**, reportar ao Fernando com
     comando que falhou, saida completa, causa raiz com evidencia, fixes tentados e
     hipoteses descartadas. Aguardar orientacao.
4. Fix que exigiria sair do escopo da spec = parada de emergencia imediata (sem tentar).
5. **Reconciliacao de vereditos (lei F11)**: se a investigacao concluir que a falha era
   detectavel na spec ou no plano (um gate anterior aprovou o que aqui reprovou), anotar
   a reconciliacao para o Trust Ledger: `reconciliacao: gate=[Skill 0 P1|P2|rule-control]
   deixou passar [descricao em 1 linha]`. Sinal de calibracao do gate, nao culpa.

### Fase 4: Handoff automatico para doc-sync (Skill 4.6)

- **Tudo passou**: anotar os vereditos do ciclo (Skill 0 P1/P2, rule-control, resultado
  desta validacao, reconciliacoes) para a coleta do Trust Ledger, e **invocar
  `nemesis-doc-sync` (4.6) SEM PAUSA**. A doc-sync e o ultimo passo autonomo do pipeline;
  a gravacao do Trust Ledger e a PARADA UNICA obrigatoria acontecem no FIM dela. NAO
  emitir a PARADA UNICA aqui, e NAO invocar finishing.
- **Algo falhou e nao foi possivel fixar** (2 tentativas esgotadas): parada de emergencia,
  reportar com evidencia completa (a parada tambem e registrada no ledger).

## Saida Esperada

```
VALIDACAO POS-EXECUCAO (perfil: portfolio):
  [PASS] Fase 1 (lint + tsc)
  [PASS] Fase 2 (build)
  [PASS] Fase 2.5 (verificacao visual)   [quando o diff toca UI]

Validacao verde -> invocando nemesis-doc-sync (4.6) sem pausa.
(Trust Ledger e PARADA UNICA acontecem no FIM da doc-sync.)
```

## Integracao

**Skill anterior**: `nemesis-subagent-driven-development` (Skill 4)
**Proxima skill (automatica, sem pausa)**: `nemesis-doc-sync` (4.6), que roda o Trust
Ledger e emite a PARADA UNICA no fim dela. O `nemesis-finishing-branch` (5) so executa
com autorizacao explicita do Fernando na PARADA UNICA.

## Lembrar

- Os comandos sao obrigatorios e sequenciais (1 por vez, proximo so se anterior passou)
- Investigar causa raiz, nao sintoma; reconciliar veredito de gate furado no ledger (F11)
- Fernando aprova qualquer fix que saia do escopo da spec
- Diff de UI sem verificacao visual = validacao incompleta (declarar o nivel real, F3)
- Sempre PT-BR
