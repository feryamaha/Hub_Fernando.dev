# Hub Fernando.dev

Portfolio pessoal de Fernando Moreira — interface inspirada no Finder do macOS.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript 5** (strict)
- **Tailwind CSS v4** (100% dos estilos)
- **Biome** (lint + format + organize imports)
- **Bun** (gerenciador de pacotes)

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
