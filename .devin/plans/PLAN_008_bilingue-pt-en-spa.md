# PLAN_008 — Bilíngue PT-BR/EN por rota

> Spec: `.devin/specs/SPEC_008_bilingue-pt-en-spa.md`
> Verificação por tarefa: `bunx tsc --noEmit` · Suite: `bun run lint` + `tsc` + `bun run build`

## Global Constraints

- TypeScript strict, sem `any`. **Nenhuma dependência nova, nenhum downgrade.**
- **Nenhuma mudança visual** além do seletor de bandeiras. Classes, layout, espaçamento,
  animações e estrutura JSX idênticos. Só string literal vira leitura de JSON.
- SPA preservada: `useNavigation`, seções ocultas via CSS, sidebar, dock, spotlight.
- Preservar SPEC_006 e SPEC_007: dock inferior, acordeão `new Set(["Linguagens"])`,
  `layout="position"` nos Reorder.Item, cards `initialState="compact"`, alvos 44 px,
  pastas macOS no Contato, `loading="lazy"` nos semáforos.
- **Cromo macOS fica em EN nos dois idiomas** e NÃO vira chave: labels do Dock, "Favorites",
  "Theme", colunas "Name"/"Size"/"Kind", nomes de tema.
- **`aria-label`, `title` e sr-only VIRAM chave** e seguem o idioma.
- Termos técnicos e nomes próprios não se traduzem: TypeScript, React, Next.js, Rust, eBPF,
  BPF LSM, tree-sitter, Full-Stack, Clean Architecture, BFF, Server Components, App Router,
  Route Handlers, Quick Look, Spotlight, sidebar, titlebar, vibrancy, design system,
  fail-closed, supply-chain, OWASP, Zod, Playwright, Tailwind, Lighthouse, LCP, TTI, CSP,
  HSTS, Nemesis Defender, MapHunter, Harvestin, Cifra-Tom, Auclan Design, UIKit, MLX Capital.
- Tradução EN em **primeira pessoa**, fiel, sem inventar fato (invariante 5).
- `next.config.ts`, `package.json`, `tailwind.config.ts`, `constants.ts` NÃO são tocados.
- Nenhuma tarefa executa git de escrita. Arquivos são **movidos**, nunca deletados.

## Contrato de consumo (fixado; todas as tarefas de hidratação seguem)

```ts
// src/hooks/use-locale.tsx
export type Locale = "pt" | "en";
export function useLocale(): Locale;
```

Uso em qualquer componente client:

```tsx
import home from "@/data/i18n/home.json";
import { useLocale } from "@/hooks/use-locale";

const locale = useLocale();
const t = home[locale];
// t.subtitle, t.ctaProjects ...
```

O TypeScript infere o tipo do JSON. Se `pt` e `en` tiverem formas diferentes, `home[locale]`
vira união e o acesso quebra na compilação: é essa a garantia de paridade entre idiomas.

Formato de cada JSON:

```jsonc
{ "pt": { /* chaves */ }, "en": { /* MESMAS chaves */ } }
```

Interpolação por placeholder: `"itemsCount": "{n} itens"` e o componente faz
`.replace("{n}", String(n))`.

## Waves

```
WAVE 1: TASK 1 (rotas)        — gargalo estrutural, precisa fechar antes de tudo
WAVE 2: TASK 2 (sitemap/robots), TASK 3 (locale hook + toggle + providers)
WAVE 3: TASK 4, 5, 6, 7, 8    — conteúdo e hidratação, arquivos disjuntos, paralelo
```

---

## TASK 1 — Route groups com dois root layouts

**FILES:** move `src/app/layout.tsx` e `src/app/page.tsx`; cria `(pt)/layout.tsx`,
`(pt)/page.tsx`, `(pt)/not-found.tsx`, `(en)/layout.tsx`, `(en)/en/page.tsx`
**DEPENDE_DE:** nenhuma · **VERIFICACAO:** `bunx tsc --noEmit` **e** `bun run build`

Estrutura final:

```
src/app/
  (pt)/  layout.tsx   page.tsx   not-found.tsx
  (en)/  layout.tsx   en/page.tsx
  globals.css   providers.tsx
```

`src/app/layout.tsx` e `src/app/page.tsx` deixam de existir na raiz (a doc exige a ausência
do layout de topo quando há múltiplos root layouts). **Mover com `mv`, nunca `rm`.**

- `(pt)/layout.tsx`: cópia do layout atual, com `<html lang="pt-BR">`, o `themeInitScript`
  preservado **exatamente como está** (incluindo o `dangerouslySetInnerHTML`, cujo aviso de
  lint é pré-existente e estacionado), `metadata` PT e
  `alternates: { canonical: "/", languages: { "pt-BR": "/", en: "/en/" } }`.
- `(en)/layout.tsx`: igual, com `<html lang="en">`, `metadata` EN (title, description e
  `openGraph.locale: "en_US"`) e `alternates.canonical: "/en/"`.
- Ambos envolvem com `<Providers locale="pt">` e `<Providers locale="en">`.
- `(pt)/page.tsx` e `(en)/en/page.tsx`: mesmo conteúdo do `page.tsx` atual, sem alteração de
  JSX.
- `(pt)/not-found.tsx`: página 404 simples reaproveitando classes existentes
  (`bg-finder-window`, `text-finder-text`, `text-finder-accent`), com link para `/`.

**O QUE NÃO FAZER:** não alterar `next.config.ts`; não mexer em `globals.css`; não alterar o
JSX de `page.tsx` ao mover; não criar `not-found.tsx` em `(en)` nesta tarefa (evita conflito
de rota, avaliado depois).

---

## TASK 2 — `sitemap.ts` e `robots.ts`

**FILES:** `src/app/sitemap.ts`, `src/app/robots.ts` (CREATE)
**DEPENDE_DE:** TASK 1 · **VERIFICACAO:** `bunx tsc --noEmit` **e** `bun run build`

Usar as convenções do App Router (`MetadataRoute.Sitemap` e `MetadataRoute.Robots`), com a
URL canônica de `process.env.NEXT_PUBLIC_SITE_URL ?? "https://hub-fernando-dev.vercel.app"`
(mesmo default de `layout.tsx`). **Não** usar `basePath`.

`sitemap.ts`: duas entradas (`/` e `/en/`), cada uma com
`alternates: { languages: { "pt-BR": ..., en: ... } }`.
`robots.ts`: `allow: "/"` e `sitemap: <url>/sitemap.xml`.

**CRITÉRIO DE ACEITE (é o risco A2 da spec):** após `bun run build`, os arquivos
`out/sitemap.xml` e `out/robots.txt` precisam existir. Verifique com
`ls -la out/sitemap.xml out/robots.txt` e cole a saída. **Se não forem gerados**, reporte o
fato com a saída literal e NÃO improvise solução: o fallback (arquivos estáticos em
`public/`) será decidido pelo orquestrador.

---

## TASK 3 — Hook de locale, seletor de bandeiras e providers

**FILES:** `src/hooks/use-locale.tsx` (CREATE), `src/components/ui/language-toggle.tsx`
(CREATE), `src/app/providers.tsx` (MODIFY)
**DEPENDE_DE:** TASK 1 · **VERIFICACAO:** `bunx tsc --noEmit`

`use-locale.tsx`: Context mínimo. Provider recebe `locale` como prop (vem da rota, via
layout). `useLocale()` retorna o locale e lança erro se usado fora do provider. Seguir o
estilo de `use-theme.tsx`. **Sem localStorage, sem efeito assíncrono, sem import dinâmico.**

`providers.tsx`: aceitar `locale: Locale` como prop e envolver a árvore com
`LocaleProvider`, mantendo `ThemeProvider` e `NavigationProvider` como estão.

`language-toggle.tsx`:
- `"use client"`, usa `useLocale()`.
- Dois `<a>`: `href="/"` (BR) e `href="/en/"` (EUA). São links reais, o reload é intencional.
- Bandeiras em **SVG inline** (`viewBox="0 0 24 16"`, `aria-hidden="true"`); nada de emoji
  nem imagem externa.
  - BR: fundo `#009B3A`, losango `#FFDF00`, círculo `#002776`.
  - EUA: fundo branco, listras `#B22234`, cantão `#3C3B6E`.
- Cada link: `aria-label` no idioma ativo (de `topbar.json`), `aria-current="true"` no ativo,
  área de toque `inline-flex items-center justify-center w-11 h-11` (44 px, coerente com
  SPEC_006), `focus-visible:outline-2 focus-visible:outline-finder-accent`.
- Ativo com opacidade cheia; inativo `opacity-50 hover:opacity-100`. Sem texto visível.

A montagem na barra superior pertence à TASK 8 (que é dona de `top-bar.tsx`).

---

## TASK 4 — Home e About

**FILES:** `src/data/i18n/home.json`, `src/data/i18n/about.json` (CREATE);
`sections/home.tsx`, `sections/about.tsx` (MODIFY)
**DEPENDE_DE:** TASK 3 · **VERIFICACAO:** `bunx tsc --noEmit`

Extrair os textos PT **literalmente** dos componentes e traduzir para EN.

- `home.json`: subtítulo, parágrafo de descrição, `rotatingText` (array de 8, preservando a
  ordem; nomes próprios como TypeScript/React/Next.js/Rust não mudam, "Segurança" vira
  "Security"), rótulos dos 2 botões.
- `about.json`: os 8 tópicos (`title` + `content`), a quote do rodapé, "Clique na pasta para
  abrir", o título da janela e o `aria-label` da nav de tópicos.
- Nos componentes: trocar literais por `home[locale].*` / `about[locale].*`. O array `topics`
  passa a derivar do JSON, **preservando os ícones** (componentes, não texto) por índice.

**O QUE NÃO FAZER:** não alterar `data-aos`, `motionOk`, `AnimatePresence`, a interação de
pasta nem qualquer classe.

---

## TASK 5 — Skills

**FILES:** `src/data/i18n/skills.json` (CREATE); `sections/skills.tsx` (MODIFY)
**DEPENDE_DE:** TASK 3 · **VERIFICACAO:** `bunx tsc --noEmit`

- `skills.json`: os 8 nomes de categoria, as **43 descrições** e os labels de UI (instruções,
  "Pasta", "Modificado", "Voltar", "Selecione um arquivo para ver o preview.", rótulo da
  janela e contagem `"{n} itens"`).
- As 43 descrições PT foram redigidas e aprovadas em ciclo anterior: **copiar literalmente**,
  sem reescrever.
- **NÃO** criar chave para as colunas "Name", "Size", "Kind" (cromo, ficam em EN).
- **NÃO** traduzir `name`, `extension`, `size`, `modDate`, `kind` dos arquivos (são dados).
- Preservar: acordeão `new Set(["Linguagens"])`, `toggleFolder` exclusivo,
  `layout="position"` nos 2 Reorder.Item do modo lista, Quick Look, modo ícone, drag-and-drop.

---

## TASK 6 — Projects

**FILES:** `src/data/i18n/projects.json` (CREATE); `sections/projects.tsx` (MODIFY)
**DEPENDE_DE:** TASK 3 · **VERIFICACAO:** `bunx tsc --noEmit`

- `projects.json`: 4 headings, subtítulo da linha do tempo, rótulos dos botões e, para os 11
  projetos, apenas `title`, `summary`, `details`, `description`, `date`, `imageAlt`,
  `extraNote`.
- **NÃO** traduzir `imageSrc`, `technologies`, `codeUrl`, `demoUrl`, `windowTitle`.
- Preservar os `initialState` da SPEC_006 (só NEMESIS DEFENDER v0 em `"full"`).

---

## TASK 7 — Contact e Footer

**FILES:** `src/data/i18n/contact.json`, `src/data/i18n/footer.json` (CREATE);
`sections/contact.tsx`, `footer/footer.tsx` (MODIFY)
**DEPENDE_DE:** TASK 3 · **VERIFICACAO:** `bunx tsc --noEmit`

- `contact.json`: título, subtítulo, CTA do CV, os 6 `aria-label`/`title` das pastas sociais,
  os 2 textos sr-only de cópia e os títulos de "copiar".
- `footer.json`: copyright (com placeholder `{year}`) e `aria-label` da navegação.
- Preservar as pastas macOS com ícone sobreposto e sem texto (SPEC_007) e o `Crosshair`.

---

## TASK 8 — Cromo: topbar, sidebar, layout, main-content, spotlight, cards

**FILES:** `src/data/i18n/{topbar,sidebar,layout}.json` (CREATE);
`top-bar/{top-bar,info-modal,share-modal}.tsx`, `main-content/{main-content,spotlight}.tsx`,
`sidebar/{favorites-section,theme-section}.tsx`, `dock/dock.tsx`,
`ui/{mac-card,project-card,modal}.tsx` (MODIFY)
**DEPENDE_DE:** TASK 3 · **VERIFICACAO:** `bunx tsc --noEmit`

- `topbar.json`: `aria-label`/`title` dos controles, texto de digitação, rótulo do CV,
  conteúdo do info-modal e do share-modal, e os 2 `aria-label` do seletor de idioma.
- `sidebar.json`: apenas `aria-label` (headings "Favorites"/"Theme" e os 5 labels ficam EN).
- `layout.json`: textos do not-found e rótulos gerais de página.
- `main-content.tsx`: `TITLES` das 5 seções (com "Home" virando **"Início"** em PT, corrigindo
  a mistura), os 6 `aria-label` e "Seção minimizada. Clique para restaurar." vão para
  `layout.json`.
- `spotlight.tsx`: `label` e `hint` dos itens, placeholder, "Nenhum resultado encontrado." e
  `aria-label` vão para `layout.json`. **Os `keywords` passam a conter os termos nos dois
  idiomas concatenados**, para a busca funcionar em qualquer idioma (achado 4 da ISSUE_001).
- `dock.tsx`: labels visíveis **continuam EN**; só o `aria-label` da `<nav>` vira chave.
- `mac-card.tsx`: os 3 `aria-label`. `project-card.tsx`: "Ver código", default de
  `demoLabel`, `aria-label` das tecnologias. `modal.tsx`: `aria-label` de fechar.
- **Montar `<LanguageToggle />`** como primeiro item do container de controles da barra
  superior (a `div` com `flex items-center space-x-0 md:space-x-1`), antes do GitHub.

---

## Verificação final

```bash
bun run lint && bunx tsc --noEmit && bun run build
ls -la out/index.html out/en/index.html out/sitemap.xml out/robots.txt
```

## Medições a coletar

- `out/index.html` com `lang="pt-BR"` e texto PT; `out/en/index.html` com `lang="en"` e texto EN.
- `sitemap.xml` com as 2 URLs e `hreflang`; `robots.txt` presente.
- Tamanho dos dois HTML comparado aos 96 KB atuais.
- Regressão zero: dock, acordeão, cards `compact`, alvos 44 px, pastas do Contato.
- Nenhum texto de usuário hardcoded remanescente.
