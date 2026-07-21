# AGENTS.md — Hub_Fernando.dev (portfólio)

> Documento canônico cross-tool deste repo. Qualquer agente (Claude Code, Codex, Cursor,
> Devin, Gemini) que opere aqui segue este arquivo. Regras detalhadas vivem em
> `.devin/rules/`; skills de processo em `.devin/skills/`; workflows em
> `.devin/workflows/`. Este harness foi adaptado do ecossistema Nemesis para repo único.

## 1. O que é este repo

Portfólio pessoal de Fernando Moreira com interface estilo Finder do macOS.

- **Site:** https://hub-fernando-dev.vercel.app (deploy automático no push para `main`)
- **Stack:** Next.js 16 (App Router, export estático), React 19, TypeScript strict,
  Tailwind CSS 4, Biome, Bun, AOS + framer-motion
- **Objetivo:** comunicar perfil, projetos e competências a recrutadores técnicos,
  mantendo a identidade visual macOS/Finder com polimento profissional.

## 2. Invariantes de segurança e autoridade (numeradas, citáveis)

1. **Git de escrita é exclusivamente do Fernando.** O agente nunca executa
   `git add/commit/push/tag/merge`; ele monta combos como TEXTO. Push em `main` dispara
   deploy na Vercel (ação externa, classe C da lei F4).
2. **O Fernando é o único decisor e arquiteto.** O agente executa o solicitado, não
   conduz, não amplia nem reduz escopo por conta própria; ambiguidade material = parar e
   perguntar. Inteligência não é autoridade.
3. **Nemesis Defender ativo na máquina.** Bloqueio (exit 2) se resolve corrigindo a ação,
   NUNCA contornando ou desabilitando o Nemesis. `.devin/hooks.json` é protegido e
   gerenciado exclusivamente pelo Fernando (o agente não lê nem edita). `AGENTS.md` e
   `CLAUDE.md` também são protegidos: o agente propõe conteúdo em `.devin/*.proposed.md`
   e o Fernando instala.
4. **Nenhum dado pessoal sensível novo em código** (documentos, credenciais, tokens).
   Dados de contato públicos vivem centralizados (fonte única) e mudam só por ordem do
   Fernando.
5. **Nenhuma alegação não verificável no conteúdo do site.** Número/métrica só com fonte
   real (regra de veracidade em `nemesis-documentation-style.md`).
6. **Assets são do Fernando.** O agente não baixa arquivo externo nem fabrica asset
   (CV, screenshot, fonte); asset faltante vira pendência declarada.
7. **Identidade Finder/macOS é decisão de produto.** Mudança que descaracterize a
   metáfora (janelas, sidebar, traffic lights) exige decisão explícita do Fernando.

## 3. Mapa do repo

```
src/app/                    layout (metadata/SEO), page, providers, globals.css (tokens --finder-*)
src/components/top-bar/     barra superior (typing, ícones sociais, modais info/share)
src/components/sidebar/     favorites (navegação) + temas de accent
src/components/main-content/ janela Finder: barra de título, seções, busca
src/components/main-content/sections/  home, about, skills, projects, contact
src/components/footer/      rodapé com links
src/components/ui/          componentes reutilizáveis (modal, rotating-text, true-focus)
src/hooks/                  use-navigation (SPA por seção), use-theme, use-screen-size, use-download
src/lib/                    utils (e constants quando existir)
src/types/                  tipos compartilhados
public/icons/               SVGs e imagens (webp) de projetos
out/                        build gerado (nunca editar à mão)
.devin/                     harness de processo (rules, skills, workflows, specs, plans, pr, ledger)
```

Detalhe de navegação: todas as seções ficam montadas no HTML (SEO) e a inativa é ocultada
via CSS (`main-content.tsx`); ao mudar de seção o AOS é recalculado.

## 4. Comandos de validação (fonte: `.devin/rules/nemesis-repo-profile.md`)

```bash
bun run lint       # Biome
bunx tsc --noEmit  # tipos (verificação por tarefa)
bun run build      # export estático (suite completa)
```

Diff que toca UI pede também verificação visual no browser (rubrica de UI no perfil).

## 5. Processo de desenvolvimento (SDD Pipeline)

- **Workflow padrão:** `.devin/workflows/nemesis-sdd-pipeline-auto.md`, 100% automático
  do input até a Skill 4.6 (doc-sync), com PARADA ÚNICA antes do finishing.
- **Sequência:** spec (1) → análise crítica P1 (0) → rule-control (2) → plano (3) →
  análise crítica P2 (0) → execução por subagentes em waves (4) → validação (4.5) →
  doc-sync (4.6) → ⛔ PARADA ÚNICA → finishing (5, só com autorização explícita).
- **Leis de trabalho:** `.devin/rules/nemesis-fable-method.md` (F1..F12).
- **Disciplina epistêmica:** `.devin/rules/nemesis-epistemic-safety.md` (anti-sycophancy;
  o agente prova, não supõe).
- **Trust Ledger:** `.devin/ledger/trust-ledger.md` (vereditos são artefatos, lei F11).
- **Paths:** specs `.devin/specs/`, planos `.devin/plans/`, PRs `.devin/pr/`.

## 6. Regras de linguagem (resumo; fonte: perfil do repo, seção 6)

1. TypeScript strict como única linguagem nova em `src/`; estilo via Tailwind/globals.css.
2. Toolchain Bun/Biome/Next; sem lockfile ou build system paralelo.
3. Áreas sensíveis (`next.config.ts`, `package.json` deps, `tailwind.config.ts`,
   `layout.tsx` metadata) exigem flag `sensitive_area` no plano.
4. Nenhuma tarefa fora de FILES INVOLVED da spec.
5. Git de escrita: só o Fernando (invariante 1).
6. Sem artefato de build em diff intencional; sem segredo em código.

## 7. Idioma e estilo

- Conversa e documentos de processo: **PT-BR**, sem travessão.
- Conteúdo do site: primeira pessoa (voz do Fernando); processo: voz impessoal.
- Fonte: `.devin/rules/nemesis-documentation-style.md`.

## 8. Suporte

Se bloqueado: (1) consultar este arquivo; (2) consultar a skill específica em
`.devin/skills/`; (3) reportar o bloqueador exato ao Fernando e aguardar.
