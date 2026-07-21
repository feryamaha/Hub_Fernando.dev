# SPEC_002 — Design system 100% no tailwind.config + upgrade de stack

REQUEST: Mover TODA a estilização e TODOS os tokens de cor para `tailwind.config.ts`,
deixando em `globals.css` apenas o que o Tailwind não suporta (o mínimo essencial para a
troca de tema em runtime e as diretivas obrigatórias). Nenhum valor hexadecimal fora do
`tailwind.config.ts`. Atualizar a stack para as versões pedidas.

CATEGORY: Refactor (arquitetura de estilo) + Infra (upgrade de dependências)

PROBLEM (sintomas observáveis, verificados nesta sessão):
- `globals.css` tem 484 linhas e é o dono real do design system: 23 tokens em `:root`
  (globals.css:9-37), 8 blocos `.theme-*` com hex (globals.css:288-356) e 212 linhas de
  classes de componente em `@layer components` (globals.css:72-283).
- `tailwind.config.ts:7-22` não contém nenhum valor: só repassa `var(--finder-*)`. Mudar
  uma cor de tema exige editar CSS, nunca a config.
- Consumo de cor fragmentado nos componentes (contagem literal desta sessão):
  150 usos de `[var(--finder-*)]`, 51 de token semântico, 22 hex hardcoded em `.tsx`.
- Colisão: `.w-sidebar` existe em globals.css:181 e é gerada também por
  `spacing.sidebar` em tailwind.config.ts:35.
- Duplicação de valores: `.close/.minimize/.maximize` (globals.css:152-160) repetem os hex
  de `--finder-control-*` (globals.css:18-20); `--background` (globals.css:26) repete
  `--finder-window` (globals.css:10).
- Código morto: classes sem uso em componentes (`.traffic-light`, `.sidebar-item`,
  `.sidebar-icon`, `.text-theme`, `.icon-theme`, `.section-title`, `.selected-item`,
  `.window-control*`, `.close`, `.minimize`, `.maximize`) e variáveis sem consumo
  (`--finder-accent-rgb`, `--finder-accent-filter`, os três `--finder-control-*-hover`,
  `--finder-folder-top`, `--finder-folder-border`).
- CSS de bibliotecas de terceiros no global: `.text-rotate-*` e `.focus-*`/`.corner`
  (globals.css:361-467, 107 linhas).
- Stack desatualizada: next 16.2.9, typescript ^5.7.0, react ^19.2.0, tailwindcss ^4.0.0.
- ACHADO EMPÍRICO (baseline de CSS computado desta sessão, reconciliação do gate P1): os
  mesmos 7 hex de tema estão duplicados em TRÊS lugares: `globals.css:288-356`,
  `use-theme.tsx:6-14` e `theme-section.tsx:7-13`. Mudar uma cor hoje exige editar 3
  arquivos, o que confirma o sintoma relatado.
- `use-theme.tsx:56` aplica `document.documentElement.style.setProperty("--finder-accent")`,
  um inline style que SEMPRE vence a classe `.theme-*`. Prova medida: ao alternar as 8
  classes de tema no DOM, `--finder-hover` e `--finder-accent-contrast` mudam, mas
  `--finder-accent` permanece `#0A84FF` (maiúsculas, valor vindo do JS) nos 8 temas. Os
  blocos de accent do CSS estão sem efeito prático.
- `.theme-pink` (globals.css:342) é órfão: não existe em `ThemeColor` (types/index.ts:4)
  nem em `THEME_COLORS`; o CSS tem 8 temas, o app tem 7.
- `ThemeListItem.hex` (types/index.ts:12) propaga o hex pelo tipo até a UI.

CONTEXT:
- Restrição técnica inegociável: a troca de tema é em runtime (classe `theme-*` no
  wrapper, `use-theme.tsx`). Valor estático em config não muda em runtime, então as CSS
  vars precisam EXISTIR. A correção não é eliminá-las: é fazer com que sejam GERADAS a
  partir dos hex declarados no `tailwind.config.ts`, nunca escritas à mão no CSS.
- Viabilidade confirmada na doc oficial do Tailwind v4 nesta sessão: `@config` carrega
  config JS legada e plugins com `addBase`, `addUtilities` e `theme()` são suportados.
  Limitação declarada pela doc: `safelist`, `corePlugins` e `separator` não funcionam via
  `@config` no v4. O projeto não usa `safelist` hoje.
- Versões verificadas no registry.npmjs.org nesta sessão:
  typescript latest 7.0; react/react-dom latest 19.2.8; tailwindcss latest 4.3.3;
  next latest estável 16.2.11 (16.3.0 existe SOMENTE como `preview.7` e `canary.92`).
- Decisão D1 (F8): Next fica em 16.2.11, a estável mais recente, porque 16.3.0 não tem
  release estável publicado e o push em main dispara deploy de produção na Vercel. O combo
  para trocar por `16.3.0-preview.7` é entregue na PARADA ÚNICA se o Fernando preferir.
- Decisão D2 (F8): permanece Tailwind v4 (4.3.3) com config JS via `@config`. É o que
  entrega "tudo na config" sem downgrade e sem quebrar o alpha sobre token
  (`bg-finder-sidebar/60` compila como `color-mix`, confirmado no bundle desta sessão).
- Assumpção A1: `@import` de CSS externo (fonte Modern DOS via CDN) não tem equivalente em
  config e permanece no `globals.css`.

REQUIREMENTS:
1. `tailwind.config.ts` passa a conter, como fonte única de verdade:
   a. `FINDER_BASE`: todos os hex/valores base (window, sidebar, sidebar-translucent,
      text, text-secondary, border, search, hover, header, icon, folder, control-close,
      control-minimize, control-maximize).
   b. `FINDER_THEMES`: os 8 temas (blue, red, orange, yellow, green, purple, pink, gray),
      cada um com `accent`, `accentContrast` e `hover`.
   c. `theme.extend.colors`: nomes semânticos apontando para `var(--finder-*)` (necessário
      para o runtime), incluindo `finder-accent-contrast`, `finder-header`, `finder-icon`.
   d. Plugin `addBase` que GERA `:root` (a partir de `FINDER_BASE`) e os 8 blocos
      `.theme-*` (a partir de `FINDER_THEMES`), mais os estilos base de `html`, `body`,
      `code/pre/kbd`, `button`, o bloco `prefers-reduced-motion` e o `@supports` do
      vibrancy.
   e. Plugin `addUtilities` que GERA as classes de componente ainda em uso:
      `.mac-window`, `.mac-window-titlebar`, `.mac-window-title`, `.scrollbar-finder`,
      `.sidebar-vibrancy`, `.spotlight-overlay`, `.spotlight-panel`, `.spotlight-input`,
      `.spotlight-item`, `.font-dos`, e as classes de `rotating-text` e `true-focus`.
2. `globals.css` fica reduzido ao essencial: `@import` da fonte externa,
   `@import "tailwindcss"` e `@config`. Nenhum hex, nenhum `:root` de cor, nenhum bloco
   `.theme-*`, nenhuma classe de componente. Alvo verificável: no máximo 15 linhas e
   zero ocorrências de `#` seguido de 3 ou 6 dígitos hex.
3. Código morto removido (não migrar o que ninguém usa): `.traffic-light`, `.sidebar-item`,
   `.sidebar-icon`, `.text-theme`, `.icon-theme`, `.section-title`, `.selected-item`,
   `.window-controls`, `.window-control*`, `.close`, `.minimize`, `.maximize`,
   `--finder-accent-rgb`, `--finder-accent-filter`, `--finder-control-*-hover`,
   `--finder-folder-top`, `--finder-folder-border`, `--background`.
4. Colisão resolvida: `w-sidebar` passa a existir APENAS via `spacing.sidebar` na config.
5. Componentes deixam de usar `[var(--finder-*)]` e hex: todos passam a usar os tokens
   semânticos (`bg-finder-sidebar`, `text-finder-accent`, `text-finder-accent-contrast`,
   `border-finder-border`, `bg-finder-hover`, `bg-finder-header`, `text-finder-icon`).
   Alvo verificável: zero ocorrências de `[var(--finder-` em `src/**/*.tsx`.
5b. Eliminar as outras duas fontes de hex, na raiz e não por sincronização:
   a. `use-theme.tsx` deixa de conhecer hex. `THEME_COLORS` vira a lista de ids de tema
      (sem valores) e a linha 56 (`style.setProperty`) é REMOVIDA: o accent passa a vir
      exclusivamente da classe `.theme-*` gerada pela config. O hook só troca a classe.
   b. `theme-section.tsx` deixa de ter `CONTROL_COLOR`. A bolinha de cada tema usa uma
      classe de swatch gerada por `addBase` a partir de `FINDER_THEMES` (addBase não passa
      por purge, então template literal é seguro), mapeada por um Record explícito.
   c. `ThemeListItem.hex` (types/index.ts:12) é removido do tipo.
   d. `.theme-pink` é removido (órfão) OU `pink` é adicionado a `ThemeColor`. Decisão D3
      (F8): remover, porque o app expõe 7 temas e nada referencia pink.
   e. O script de pré-pintura citado em use-theme.tsx:48-49, se existir em layout.tsx,
      passa a aplicar somente a classe, nunca o valor.
6. Upgrade de dependências: `next` 16.2.11, `react`/`react-dom` 19.2.8,
   `@types/react`/`@types/react-dom` compatíveis, `typescript` 7.0.2, `tailwindcss` e
   `@tailwindcss/postcss` 4.3.3. Área sensível: exige `sensitive_area` no plano.
7. Nenhuma mudança visual perceptível. A verificação é comparação de screenshots por
   seção e por tema, antes e depois.

FILES INVOLVED:
- MODIFY: tailwind.config.ts
- MODIFY: src/app/globals.css
- MODIFY: package.json
- MODIFY: src/components/main-content/main-content.tsx
- MODIFY: src/components/main-content/spotlight.tsx
- MODIFY: src/components/main-content/sections/home.tsx
- MODIFY: src/components/main-content/sections/about.tsx
- MODIFY: src/components/main-content/sections/skills.tsx
- MODIFY: src/components/main-content/sections/projects.tsx
- MODIFY: src/components/main-content/sections/contact.tsx
- MODIFY: src/components/main-content/contact/crosshair.tsx
- MODIFY: src/components/main-content/contact/true-focus.tsx
- MODIFY: src/components/sidebar/favorites-section.tsx
- MODIFY: src/components/sidebar/theme-section.tsx
- MODIFY: src/components/top-bar/top-bar.tsx
- MODIFY: src/components/top-bar/info-modal.tsx
- MODIFY: src/components/top-bar/share-modal.tsx
- MODIFY: src/components/footer/footer.tsx
- MODIFY: src/components/ui/mac-card.tsx
- MODIFY: src/components/ui/project-card.tsx
- MODIFY: src/components/ui/modal.tsx
- MODIFY: src/components/ui/rotating-text.tsx
- MODIFY: src/components/ui/true-focus.tsx
- MODIFY: src/app/layout.tsx (script de pré-pintura e qualquer var/hex)
- MODIFY: src/app/page.tsx (somente se contiver var/hex)
- MODIFY: src/hooks/use-theme.tsx (remover hex e o inline style do accent)
- MODIFY: src/types/index.ts (remover `hex` de ThemeListItem)

RESTRICTIONS:
- Regras 1-6 do perfil. Regra 3 (área sensível) acionada por `package.json` e
  `tailwind.config.ts`: autorização explícita do Fernando dada nesta sessão.
- Identidade Finder/macOS preservada (invariante 7). Zero regressão visual.
- Nenhuma dependência nova além do upgrade das existentes.
- Git de escrita continua exclusivo do Fernando (invariante 1).

EXPECTED DELIVERY:
- `globals.css` com no máximo 15 linhas e zero hex.
- `tailwind.config.ts` como fonte única: trocar um hex lá muda o tema inteiro.
- Zero `[var(--finder-` nos componentes.
- bun run lint: PASS · bunx tsc --noEmit: PASS · bun run build: PASS.
- Screenshots comparativos por seção e por tema sem diferença visual.

VERIFICATION:
$ bun run lint
$ bunx tsc --noEmit
$ bun run build
$ grep -c "var(--finder-" src/app/globals.css   # esperado: 0
$ grep -roE "\[var\(--finder-" src | wc -l      # esperado: 0
$ grep -rnE "#[0-9A-Fa-f]{6}" src/ | wc -l      # esperado: 0 (nenhum hex em src/)

BASELINE DE NÃO-REGRESSÃO (medido nesta sessão, antes de qualquer edição; o valor de
`--finder-accent` abaixo é o do inline style do JS, que será substituído pelo valor
equivalente vindo da config):
theme-blue   accent=#0A84FF contrast=#fff hover=#0a84ff1a
theme-red    accent=#FF5F57 contrast=#fff hover=#ff5f571a
theme-orange accent=#FEBC2E contrast=#000 hover=#ff95001a
theme-yellow accent=#FFE08C contrast=#000 hover=#ffd60a1a
theme-green  accent=#28C840 contrast=#000 hover=#28c8401a
theme-purple accent=#BF5AF2 contrast=#fff hover=#bf5af21a
theme-gray   accent=#98989D contrast=#000 hover=#98989d1a
base: window=#1e1e1e sidebar=#252526 text=#fff text-secondary=#a0a0a0
      border=#3e3e3e search=#ffffff1a header=#262627 icon=#9a9a9f
      sidebar-translucent=#252526d1

NOTA sobre `--finder-hover`: os valores atuais do CSS divergem do accent em orange
(#ff9500 vs accent #febc2e) e yellow (#ffd60a vs accent #ffe08c). São valores herdados,
não erro de digitação desta sessão. Decisão D4 (F8): preservar os valores EXATOS acima na
config para garantir zero regressão visual; unificar hover=accent seria mudança de design
e é decisão do Fernando, registrada no estacionamento.
