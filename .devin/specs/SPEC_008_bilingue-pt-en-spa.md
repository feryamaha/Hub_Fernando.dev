# SPEC_008 — Bilíngue PT-BR/EN por rota, preservando a SPA Finder

> Origem: `.devin/issue/ISSUE_001_bilingue-pt-en.md`.
> Arquitetura decidida pelo Fernando em 2026-07-22, após duas rodadas de re-análise.

## REQUEST

Adicionar PT-BR e EN com seletor por bandeiras na barra superior, com um arquivo de
tradução por área do site, duas rotas indexáveis (`/` e `/en/`), sitemap e robots cobrindo
os dois idiomas, preservando integralmente a SPA Finder.

## CATEGORY

Feature (i18n + SEO) + Refactor (externalização de textos).

## PROBLEM

1. Todos os textos voltados ao usuário estão hardcoded em 18 arquivos (mapa na ISSUE_001).
2. O conteúdo mistura EN e PT sem regra (`TITLES` em `main-content.tsx:20-26` tem "Home"
   entre 4 rótulos PT; `skills.tsx:543` tem "Skills — N items"; `dock.tsx` tem labels EN com
   `aria-label` PT).
3. Não existe versão em inglês para recrutador internacional.
4. Não existem `sitemap.xml` nem `robots.txt` (verificado: ausentes em `public/` e `src/app/`).

## CONTEXT

### Histórico da decisão (duas premissas refutadas, registradas)

- **next-intl foi descartado.** A doc oficial afirma que, mesmo com `localePrefix: 'never'`,
  "You still need to place all your pages inside a `[locale]` folder", e o modo sem routing
  resolve locale por `cookies()`, API dinâmica inexistente em `output: 'export'`. Usar
  next-intl obrigaria a uma página por seção, quebrando a metáfora Finder.
- **A proposta de dois arquivos (`pt.ts`/`en.ts`) foi reprovada pelo Fernando** por
  manutenibilidade: concentraria todo o conteúdo do portfólio em arquivos de 500+ linhas.
  A crítica é procedente e o desenho foi refeito.

### Arquitetura aprovada

Baseada em recurso nativo do Next, verificado na doc de Route Groups (v16.2.11):

> "Use cases: Defining multiple root layouts."
> "**Full page load**: If you navigate between routes that use different root layouts, it'll
> trigger a full page reload."

O recarregamento entre root layouts distintos é exatamente o comportamento pedido ao clicar
na bandeira. Isso elimina hook assíncrono, `import()` dinâmico, `localStorage` e flash de
idioma.

- **Locale vem da rota, não de estado.** `(pt)` serve `/`, `(en)` serve `/en/`. Cada grupo
  tem seu root layout com `<html lang>` e `metadata` próprios.
- **Nove arquivos de tradução**, um por área, cada um contendo `pt` e `en` lado a lado.
- **Seletor de bandeiras é `<a href>`**, não botão de estado.
- O HTML estático de cada rota já sai no idioma correto, o que dá SEO real por idioma.

### Assumpções declaradas

- **A1 (bundle):** cada JSON carrega os dois idiomas, então o idioma não exibido entra no
  bundle JS (cerca de +15 KB). O **HTML** de cada rota, que governa first paint e SEO, contém
  apenas um idioma. Trade-off aceito em favor da manutenibilidade pedida.
- **A2 (`sitemap.ts`/`robots.ts` com `output: 'export'`):** convenções de arquivo do App
  Router que devem gerar artefatos estáticos no build. **Não verificado nesta stack ainda**;
  a validação é critério de aceite da TASK 2, com fallback declarado para arquivos estáticos
  em `public/`.
- **A3 (`basePath`):** `next.config.ts` define `basePath` para GitHub Pages. O sitemap usa a
  URL canônica absoluta (`NEXT_PUBLIC_SITE_URL`), não o `basePath`.
- **A4 (tradução):** o EN é tradução do PT existente. Nenhum fato novo sobre a carreira do
  Fernando pode ser introduzido (invariante 5 do `AGENTS.md`).

## REQUIREMENTS

1. Reorganizar `src/app/` em route groups `(pt)` e `(en)`, com dois root layouts, removendo
   o `app/layout.tsx` de topo (exigência da doc para múltiplos root layouts).
2. Criar `src/app/sitemap.ts` e `src/app/robots.ts` cobrindo `/` e `/en/` com `hreflang`.
3. Criar os nove arquivos em `src/data/i18n/`, cada um com `pt` e `en`.
4. Criar `src/hooks/use-locale.tsx` (Context mínimo: só expõe o locale vindo da rota).
5. Criar `src/components/ui/language-toggle.tsx` com bandeiras SVG inline, montado na barra
   superior à direita, com alvo de 44x44 px.
6. Hidratar os 18 componentes, trocando string literal por leitura do JSON da sua área.
7. Padronizar as misturas EN/PT conforme as decisões de conteúdo.

## Decisões de conteúdo (do Fernando)

- **Cromo do macOS permanece em EN nos dois idiomas**: labels do Dock, "Favorites", "Theme",
  colunas "Name"/"Size"/"Kind", nomes de tema.
- **`aria-label` e textos sr-only seguem o idioma ativo.**
- **Termos técnicos e nomes próprios não se traduzem.**
- **Voz em primeira pessoa preservada no EN.**

## FILES INVOLVED

**Novos (16)**
- `src/data/i18n/{layout,topbar,sidebar,footer,home,about,skills,projects,contact}.json`
- `src/hooks/use-locale.tsx`
- `src/components/ui/language-toggle.tsx`
- `src/app/(pt)/layout.tsx`, `src/app/(pt)/page.tsx`, `src/app/(pt)/not-found.tsx`
- `src/app/(en)/layout.tsx`, `src/app/(en)/en/page.tsx`
- `src/app/sitemap.ts`, `src/app/robots.ts`

**Movidos (2)**
- `src/app/layout.tsx` → `src/app/(pt)/layout.tsx` (base para os dois root layouts)
- `src/app/page.tsx` → `src/app/(pt)/page.tsx`

**Alterados (19)**
- `src/app/providers.tsx`
- `src/components/top-bar/{top-bar,info-modal,share-modal}.tsx`
- `src/components/main-content/{main-content,spotlight}.tsx`
- `src/components/main-content/sections/{home,about,skills,projects,contact}.tsx`
- `src/components/sidebar/{favorites-section,theme-section}.tsx`
- `src/components/dock/dock.tsx`
- `src/components/footer/footer.tsx`
- `src/components/ui/{mac-card,project-card,modal}.tsx`

**Fora do escopo:** `next.config.ts`, `package.json`, `tailwind.config.ts`,
`src/lib/constants.ts`, `src/hooks/use-theme.tsx`.

## RESTRICTIONS

- **Nenhuma dependência nova. Nenhum downgrade de versão.**
- **Nenhuma mudança visual** além do seletor de bandeiras: classes, layout, espaçamentos e
  animações idênticos.
- A SPA permanece: `useNavigation`, seções ocultas via CSS, sidebar, dock, spotlight.
- Preservar o que os ciclos SPEC_006 e SPEC_007 entregaram: dock inferior, acordeão
  exclusivo, cards em `compact`, alvos de 44 px, pastas do Contato, `layout="position"`.
- Invariante 5: a tradução não inventa fato.
- Nenhum arquivo deletado: `layout.tsx` e `page.tsx` são **movidos** (lei F4).

## EXPECTED DELIVERY

- `out/index.html` com conteúdo PT e `<html lang="pt-BR">`.
- `out/en/index.html` com conteúdo EN e `<html lang="en">`.
- `sitemap.xml` com as duas URLs e `hreflang` cruzado; `robots.txt` liberando ambas.
- Clicar na bandeira recarrega na outra rota, já no idioma correto.
- Nenhum texto de usuário hardcoded nos 18 arquivos.
- Editar a Home significa abrir `home.json`, e só ele.

## VERIFICATION

```bash
bun run lint       # 1 erro pré-existente conhecido (layout.tsx:72), nenhum novo
bunx tsc --noEmit  # PASS
bun run build      # PASS + out/index.html e out/en/index.html gerados
```

Visual em 375x812 e 1280x800: alternar bandeira, conferir as 5 seções, 2 modais, Spotlight,
Dock, sidebar e rodapé nos dois idiomas; confirmar `<html lang>` por rota.
