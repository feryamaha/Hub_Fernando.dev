---
trigger: always_on
status: active
scope: repo-local
repo: Hub_Fernando.dev
last_updated: 2026-07-20
---

# Perfil do repo: Hub_Fernando.dev (portfólio)

> Regra per-repo POR DESIGN. As skills e workflows deste harness são texto ÚNICO e leem
> deste arquivo tudo o que depende de stack: comandos de validação, paths, regras de
> linguagem e fases aplicáveis. Este harness foi adaptado do ecossistema Nemesis
> (Nemesis_Defender_v0 / Dashboard-Nemesis-Defender) para operar em REPO ÚNICO: não há
> repo irmão, não há espelhamento entre repos e não há harness de pentest local.

## Identidade

- **Papel:** portfólio pessoal de Fernando Moreira com interface estilo Finder do macOS
  (SPA Next.js com export estático, deploy na Vercel: https://hub-fernando-dev.vercel.app).
- **Stack:** Next.js 16 (App Router), React 19, TypeScript strict, Tailwind CSS 4,
  Biome (lint/format), Bun (runtime/package manager), AOS + framer-motion (animações).
- **Objetivo do produto:** comunicar perfil, projetos e competências a recrutadores
  técnicos, mantendo a identidade visual macOS/Finder com polimento profissional.

## Comandos de validação (por fase)

| Fase | Comando | Observação |
|---|---|---|
| Verificação por tarefa | `bunx tsc --noEmit` | uma por tarefa do plano |
| Lint | `bun run lint` | Biome; erros pré-existentes fora do diff = estacionar, não corrigir em silêncio |
| Tipos (suite) | `bunx tsc --noEmit` | |
| Build | `bun run build` | Next.js export estático; valida a árvore inteira |
| Verificação visual (opcional) | preview no browser da IDE | screenshots das seções afetadas quando o diff toca UI |

## Fases do pipeline aplicáveis a este perfil

As fases de pentest estático, capabilities eBPF, nemesis-doctor e pentest full do perfil
motor NÃO existem aqui. A validação deste perfil é: lint + tsc + build (+ verificação
visual quando o diff toca UI). O hook pretool do Nemesis Defender instalado na máquina
segue ativo e intercepta tool calls normalmente; ele é enforcement da máquina, não fase
do pipeline deste repo.

## Paths de processo

- Specs: `.devin/specs/SPEC_NNN_nome.md`
- Plans: `.devin/plans/PLAN_NNN_nome.md`
- PRs: `.devin/pr/PR_NNN_nome.md`
- Issues: `.devin/issue/`
- Trust Ledger: `.devin/ledger/trust-ledger.md`

## Regras de linguagem (as 6 regras do rule-control, versão deste perfil)

1. **TypeScript como única linguagem nova em `src/`.** Componentes novos em `.tsx`,
   módulos em `.ts`, sempre em strict mode, sem `any` gratuito. CSS novo vive em
   `src/app/globals.css` ou em classes Tailwind; proibido introduzir styled-components,
   CSS-in-JS novo ou outro toolchain de estilo. Config (`.json`, `.ts` de config) onde o
   design prevê.
2. **Toolchain via Bun/Biome/Next.** Verificação por tarefa com `bunx tsc --noEmit`;
   suite com `bun run lint` + `bun run build`. Proibido introduzir npm/yarn/pnpm
   lockfiles paralelos ou toolchain de build alternativo.
3. **Áreas sensíveis exigem cautela declarada.** Tarefa que toca `next.config.ts`,
   `package.json` (dependências), `tailwind.config.ts` ou `src/app/layout.tsx` (metadata,
   SEO) declara a flag `sensitive_area` no plano com justificativa em 1 linha. Dependência
   nova só com necessidade demonstrada (stdlib + código próprio primeiro).
4. **Escopo da spec.** Nenhuma tarefa modifica arquivo fora de FILES INVOLVED.
5. **Git é exclusivamente do Fernando.** Nenhuma tarefa executa git de escrita; o agente
   monta combos de commit/push como TEXTO para o Fernando executar.
6. **Sem artefatos de build commitados.** Nada novo em `out/`, `.next/` ou
   `tsconfig.tsbuildinfo` entra em diff intencional; nenhum segredo, token ou dado pessoal
   sensível em código.

## Rubrica de revisão UI (aplicar quando o diff toca componente, página ou estilo)

- **Identidade Finder preservada:** janelas mac-window, traffic lights, sidebar,
  tipografia de sistema; nada que quebre a metáfora macOS.
- **Tokens, não valores soltos:** cores via variáveis `--finder-*` (incluindo
  `--finder-accent-contrast` quando existir); nada de hex hardcoded fora de
  `globals.css`/tema.
- **Estados completos:** hover, active, focus-visible e disabled coerentes; contraste
  WCAG AA (4.5:1 texto normal) em TODOS os temas de accent, não só no azul default.
- **Responsividade:** sem overflow horizontal em 360 a 1440 px; texto display com
  `clamp()` quando escala.
- **Movimento com propósito:** animações finitas ou pausáveis; respeitar
  `prefers-reduced-motion`.
- **Conteúdo em PT-BR** no corpo; rótulos do cromo Finder podem ser EN quando fiéis ao
  macOS real (decisão de produto do Fernando).

## Guardas específicas do perfil

- O portfólio é o cartão de visita do Fernando: erro visível em produção custa
  oportunidade real. Build verde é gate mínimo, não suficiente; diff de UI pede
  verificação visual.
- Dados pessoais (e-mail, telefone, links sociais) vivem centralizados em
  `src/lib/constants.ts` (quando existir); nunca duplicar valores em componentes.
- Assets (imagens, PDF de CV, fontes) são fornecidos pelo Fernando; o agente nunca baixa
  arquivo externo nem fabrica asset (CV, screenshot) por conta própria. Asset faltante =
  pendência declarada no relatório.
- O conteúdo textual do portfólio fala em primeira pessoa (voz do Fernando); specs,
  planos e PRs usam voz técnica impessoal (ver `nemesis-documentation-style.md`).
