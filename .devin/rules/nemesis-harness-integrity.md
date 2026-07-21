---
trigger: always_on
status: active
scope: canonical
last_updated: 2026-07-20
---

# Integridade do Harness (repo único, Hub_Fernando.dev)

> Regra canônica adaptada do ecossistema Nemesis. Operacionaliza a lei F10 do método
> Fable: **afirmação sobre o próprio harness em documento canônico precisa de verificador
> mecânico**. No ecossistema de origem havia dois repos irmãos com espelhamento 1:1; este
> repo é ÚNICO, então o manifest de espelhamento entre repos NÃO se aplica aqui. O que
> permanece: o lint estrutural de skills e a disciplina de que mudança em harness roda o
> verificador na mesma sessão.

## Escopo do harness neste repo

Arquivos de harness: `.devin/` (rules, skills, workflows, ledger, specs, plans, pr,
issue), `AGENTS.md`, `CLAUDE.md`. O `.devin/hooks.json` é protegido pelo Nemesis Defender
da máquina e gerenciado exclusivamente pelo Fernando: o agente não lê nem edita.

## Verificador determinístico (procedimento, não script)

> **Origem desta forma (herdada, 2026-07-09):** no ecossistema de origem, o verificador
> materializado como script shell foi quarentenado pelo próprio Defender (variável de
> shell contendo path protegido do harness). Por isso o verificador vive como
> PROCEDIMENTO em markdown, executado pelo agente como tool calls individuais (cada uma
> visível ao pretool), nunca como script shell.

Executar os comandos abaixo (read-only, classe A). Saída vazia em todos = **HARNESS
ÍNTEGRO**. Qualquer linha = não-conformidade a corrigir (ou classificar) na mesma sessão.

```bash
# 1) name do frontmatter == nome do diretório da skill
#    (exceção por design, herdada da origem: disciplina-epistemica é carregada via
#     plugin global de skills e mantém o name humano no frontmatter)
grep -H '^name:' .devin/skills/*/SKILL.md \
  | grep -v '/disciplina-epistemica/' \
  | awk -F'[/:]' '{n=$NF; sub(/^ +/,"",n); if ($3 != n) print "NOME!=DIR: "$0}'

# 2) SKILL.md dentro do teto de 500 linhas
wc -l .devin/skills/*/SKILL.md | awk '$1>=500 && $NF!="total"'

# 3) frontmatter com description presente
grep -L '^description:' .devin/skills/*/SKILL.md
```

## Quando o verificador RODA (gates)

1. **Finishing (Skill 5):** se o `git diff` da entrega toca qualquer arquivo de harness,
   o procedimento precisa estar verde ANTES de gerar a PR.
2. **Doc-sync (Skill 4.6):** mesma condição; não-conformidade é reportada como pendência.
3. **Após qualquer edição em skill/regra/workflow:** rodar o procedimento na sequência
   (na mesma sessão).
4. **Sob demanda:** skill `nemesis-harness-sync` (verifica, apresenta a não-conformidade
   arquivo a arquivo e reconcilia com HARD-GATE humano quando material).

## Regras duras

- É proibido criar script shell que manipule paths do harness (ver origem acima); o
  verificador é procedimento em markdown, executado por tool calls.
- Divergência material de conteúdo (ex.: skill local editada em conflito com a intenção
  declarada) não se resolve em silêncio: a escolha do canônico é do Fernando.
- Este arquivo é escaneado contra poisoning como os demais docs canônicos: descrever
  regras por conceito, nunca reproduzir sintaxe de comando perigoso, nunca isentar do scan.
- Item novo em `.devin/` entra no escopo do harness no mesmo diff que o cria.

## Integração

Aplicar junto com: `nemesis-fable-method.md` (F10), `nemesis-trust-ledger.md` (F11),
as invariantes do `AGENTS.md` e o SDD pipeline. Lei sem verificador é intenção; este
procedimento é o verificador desta lei.
