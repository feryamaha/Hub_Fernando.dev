# Hub Fernando.dev

Portfolio pessoal de Fernando Moreira — interface inspirada no Finder do macOS.

## Stack

- **Next.js 16.3** (App Router) + **React 19.2** + **TypeScript 7** (strict)
- **Tailwind CSS 4.3** (100% dos estilos)
- **Biome** (lint + format + organize imports)
- **Bun** (gerenciador de pacotes)

> O TypeScript 7 removeu a API JS interna usada pelo Next para checar tipos. O projeto
> habilita `experimental.useTypeScriptCli` em `next.config.ts`, que faz o Next invocar o
> `tsc` local diretamente.

## Design system

Fonte única de verdade: **`tailwind.config.ts`**.

- `FINDER_BASE` e `FINDER_THEMES` concentram todos os valores hexadecimais.
- Um plugin `addBase` gera, a partir dessas constantes, o `:root`, os blocos `.theme-*`
  (troca de tema em runtime) e as classes de swatch.
- Um plugin `addUtilities` gera as classes de componente (`.mac-window`, `.spotlight-*`,
  `.scrollbar-finder` e afins).
- `src/app/globals.css` tem 4 linhas: só o import da fonte, o import do Tailwind e o
  `@config`. Nenhum valor de cor vive lá.

Para mudar a cor de um tema, edite o hex em `FINDER_THEMES` e nada mais.

## Scripts

```bash
bun install        # instala dependências
bun run dev        # ambiente de desenvolvimento (http://localhost:3000/Hub_Fernando.dev)
bun run build      # build estático → gera ./out
bun run lint       # biome check
bun run format     # biome check --write
```

## Estrutura

```
src/
  app/            # App Router: layout, page, providers, globals.css
  components/
    ui/           # genéricos (modal, rotating-text, true-focus)
    top-bar/      # barra superior + modais
    sidebar/      # navegação (Favorites) + temas
    main-content/ # área principal, seções e Contact viewers
  hooks/          # use-theme, use-screen-size, use-download, use-navigation
  lib/            # cn() helper
  types/          # tipos globais
public/           # assets estáticos (ícones, favicon)
```

## Deploy — GitHub Pages

O projeto é exportado como site estático com `output: 'export'` e
`basePath: '/Hub_Fernando.dev'` (ver `next.config.ts`).

```bash
bun run build      # gera ./out
```

Publique o conteúdo de `./out` na branch do GitHub Pages (ex.: via GitHub
Actions ou subindo a pasta `out` para `gh-pages`).
