# SPEC_003: Substituir semáforos CSS por SVGs oficiais macOS

## REQUEST

Substituir os semáforos macOS atuais (círculos CSS com background-color) por SVGs oficiais do macOS em `public/icons/`, distinguindo visualmente botões funcionais (com ícone) de cosméticos (sem ícone).

## CATEGORY

Refactor

## PROBLEM

- Atual: semáforos são círculos CSS (`background-color` via classes `.close`, `.minimize`, `.maximize` ou cores Tailwind hardcoded). Não há distinção visual entre botões com ação e botões puramente decorativos.
- Esperado: SVGs oficiais macOS distinguem funcionais (com ícone dentro) de cosméticos (limpos), comunicando affordance ao visitante.

## CONTEXT

- 6 SVGs já existem em `public/icons/`:
  - Funcionais (com ícone): `icon-mac-close_button.svg`, `icon-mac-minimize_button.svg`, `icon-mac-maximize-button.svg`
  - Cosméticos (sem ícone): `icon-close.svg`, `icon-mac-minimize.svg`, `icon-mac-maximize.svg`
- 5 arquivos com semáforos, 6 locais distintos:
  - **Funcionais (com onClick nos semáforos individuais)**:
    1. `main-content.tsx:138-162`: barra de título Finder fixa, 3 botões com onClick, usa cores Tailwind hardcoded (`bg-[#FF5F57]`, `bg-[#FFBD2E]`, `bg-[#28C840]`)
    2. `mac-card.tsx:44-60`: semáforos dos cards de projeto, 3 botões com onClick, usa classes `traffic-light close/minimize/maximize`
  - **Cosméticos (sem onClick nos semáforos individuais)**:
    3. `main-content.tsx:108-112`: janela minimizada de restauração, 3 spans decorativos
    4. `skills.tsx:419-422`: barra de título da janela Skills, 3 spans decorativos
    5. `about.tsx:94-97`: barra de título da seção Sobre, 3 spans decorativos
- `theme-section.tsx:34-40` usa `window-controls`/`window-control` (seletor de cor de tema, não semáforo de janela): NÃO entra na substituição.
- Assumpções:
  - A1: os SVGs serão renderizados via `<img>` com `width={12} height={12}` (tamanho atual dos semáforos), não via `next/image` (ícones decorativos pequenos, sem necessidade de otimização)
  - A2: o `aria-label` permanece nos botões funcionais; os spans cosméticos mantêm-se sem aria-label
  - A3: as classes CSS `.traffic-light`, `.close`, `.minimize`, `.maximize` no `globals.css` não são removidas (podem ser usadas em outros contextos futuros), apenas não são mais aplicadas nos semáforos substituídos
  - A4: o hover visual (opacidade reduzida) é preservado nos botões funcionais via classe Tailwind `hover:opacity-80 transition-opacity`

## REQUIREMENTS

1. Em `main-content.tsx` (barra fixa, linhas 138-162): substituir os 3 `<button>` com `bg-[#...]` por `<button>` contendo `<img src="/icons/icon-mac-{close|minimize|maximize}-button.svg" width={12} height={12} alt="" />`, preservando `aria-label`, `onClick` e adicionando `hover:opacity-80 transition-opacity`
2. Em `mac-card.tsx` (linhas 44-60): substituir os 3 `<button className="traffic-light ...">` por `<button>` contendo `<img src="/icons/icon-mac-{close|minimize|maximize}-button.svg" ...>`, preservando `aria-label`, `onClick`
3. Em `main-content.tsx` (janela minimizada, linhas 108-112): substituir os 3 `<span className="traffic-light ...">` por `<img src="/icons/icon-{close|mac-minimize|mac-maximize}.svg" width={12} height={12} alt="" />`
4. Em `skills.tsx` (linhas 419-422): substituir os 3 `<span className="traffic-light ...">` por `<img>` cosméticos
5. Em `about.tsx` (linhas 94-97): substituir os 3 `<span className="traffic-light ...">` por `<img>` cosméticos
6. Preservar todas as funcionalidades existentes (onClick, aria-label, estados)
7. Dimensão dos SVGs: 12x12px (mesmo tamanho dos semáforos atuais)

## FILES INVOLVED

- `src/components/main-content/main-content.tsx` (modify: 2 locais, barra fixa + janela minimizada)
- `src/components/ui/mac-card.tsx` (modify: semáforos funcionais dos cards)
- `src/components/main-content/sections/skills.tsx` (modify: semáforos cosméticos)
- `src/components/main-content/sections/about.tsx` (modify: semáforos cosméticos)

## RESTRICTIONS

- Regras 1-6 do perfil do repo (TypeScript strict, toolchain Bun/Biome/Next, áreas sensíveis, escopo, git, artefatos)
- Não quebrar build nem alterar comportamento dos botões
- Identidade Finder/macOS preservada (semáforos continuam visualmente idênticos no estado default)
- Não introduzir dependência nova
- Não remover as classes CSS `.traffic-light`, `.close`, `.minimize`, `.maximize` do `globals.css`

## EXPECTED DELIVERY

- Semáforos SVG substituídos em todos os 5 arquivos (6 locais)
- Botões funcionais usam SVGs com ícone (`_button`), cosméticos usam SVGs limpos
- `bunx tsc --noEmit`: PASS
- `bun run lint`: PASS
- `bun run build`: PASS

## VERIFICATION

```bash
bunx tsc --noEmit
bun run lint
bun run build
```
