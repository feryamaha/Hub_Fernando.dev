# Design system 100% no tailwind.config — Plano de Implementação

> **Para agentes**: Use nemesis-subagent-driven-development para executar este plano.

**Objetivo**: `tailwind.config.ts` vira a única fonte de verdade de estilo; `globals.css`
fica só com o que o Tailwind não suporta; zero hex fora da config; stack atualizada.

**Spec**: .devin/specs/SPEC_002_tokens-no-tailwind-config.md

**Módulos Afetados**: raiz (config, package.json), src/app, src/components, src/hooks, src/types

**Arquitetura**: Wave 1 é sequencial e carrega todo o risco (upgrade, mecanismo de plugin,
esvaziamento do CSS, eliminação do hex no JS). Wave 2 é paralela e puramente mecânica
(troca de `[var(--x)]` por token semântico), com arquivos disjuntos por tarefa. Wave 3 é a
varredura final e a comparação com o baseline.

**Tech Stack**: Next 16.2.11, React 19.2.8, TypeScript 7.0.2, Tailwind 4.3.3, Biome, Bun.

**Decisões declaradas (F8)**:
- D1: Next em 16.2.11 (estável). 16.3.0 só existe como preview/canary e o push dispara
  deploy de produção. Combo alternativo entregue na PARADA ÚNICA.
- D2: permanece Tailwind v4 com config JS via `@config` (suportado, confirmado na doc).
- D3: `.theme-pink` removido (órfão, não existe em `ThemeColor`).
- D4: valores de `--finder-hover` preservados EXATAMENTE como hoje, inclusive as
  divergências herdadas em orange e yellow, para garantir zero regressão.

**Contrato de tokens (todas as waves usam exatamente estes nomes)**:
| Antigo | Novo |
|---|---|
| `bg-[var(--finder-window)]` | `bg-finder-window` |
| `bg-[var(--finder-sidebar)]` | `bg-finder-sidebar` |
| `bg-[var(--finder-header)]` | `bg-finder-header` |
| `bg-[var(--finder-hover)]` | `bg-finder-hover` |
| `bg-[var(--finder-search)]` | `bg-finder-search` |
| `bg-[var(--finder-accent)]` | `bg-finder-accent` |
| `text-[var(--finder-text)]` | `text-finder-text` |
| `text-[var(--finder-text-secondary)]` | `text-finder-text-secondary` |
| `text-[var(--finder-accent)]` | `text-finder-accent` |
| `text-[var(--finder-accent-contrast)]` | `text-finder-accent-contrast` |
| `text-[var(--finder-icon)]` | `text-finder-icon` |
| `border-[var(--finder-border)]` | `border-finder-border` |
| `border-[var(--finder-accent)]` | `border-finder-accent` |
| `outline-[var(--finder-accent)]` | `outline-finder-accent` |
| `divide-[var(--finder-border)]` | `divide-finder-border` |
Sufixo de alpha é preservado: `bg-[var(--finder-accent)]/10` vira `bg-finder-accent/10`.

---

## WAVE 1 (sequencial: risco primeiro, uma tarefa por vez)

## TASK 1: Upgrade da stack

**Módulo**: raiz
**Arquivos**: MODIFY: `package.json`
**Depende de**: nenhuma
**Flag**: `sensitive_area` (package.json; autorização explícita do Fernando nesta sessão)
**Verificação**: `bun install` && `bunx tsc --noEmit` && `bun run lint` && `bun run build`

**Descrição Detalhada**:
Fixar as versões verificadas no registry nesta sessão:
- `next`: `16.2.11` (exato, sem caret)
- `react` e `react-dom`: `19.2.8`
- `typescript`: `7.0.2`
- `tailwindcss` e `@tailwindcss/postcss`: `4.3.3`
- `@types/react` e `@types/react-dom`: alinhar à major 19 (usar o que o `bun install`
  resolver como latest da 19; registrar a versão literal resolvida no relatório)
Rodar `bun install` e a suite completa.

**Risco declarado e tratamento**: TypeScript 7 é major nova (compilador nativo). Se
`bunx tsc --noEmit` ou `bun run build` falharem por incompatibilidade de TS 7 com
`@types/*` ou com o type-check do Next, NÃO tentar contornar com `skipLibCheck` nem
downgrade silencioso: PARAR e reportar a saída literal do erro. Esta é uma parada de
emergência legítima e o Fernando decide entre manter TS 5.7 ou seguir com TS 7.

## TASK 2: tailwind.config.ts vira a fonte única (aditivo)

**Módulo**: raiz
**Arquivos**: MODIFY: `tailwind.config.ts`
**Depende de**: TASK 1
**Flag**: `sensitive_area` (tailwind.config.ts)
**Verificação**: `bun run build` && inspeção do CSS compilado

**Descrição Detalhada**:
Reescrever a config com esta estrutura. Nesta tarefa o `globals.css` NÃO é tocado: as
declarações vão existir em duplicidade (idênticas), o que mantém o site funcionando e
permite provar o mecanismo isoladamente.

1. Constantes no topo do arquivo, exportadas como named exports:
```ts
export const FINDER_BASE = {
  window: '#1e1e1e',
  sidebar: '#252526',
  sidebarTranslucent: 'rgba(37, 37, 38, 0.82)',
  header: '#262627',
  text: '#ffffff',
  textSecondary: '#a0a0a0',
  border: '#3e3e3e',
  search: 'rgba(255, 255, 255, 0.1)',
  icon: '#9a9a9f',
  folder: '#2196f3',
  controlClose: '#ff5f57',
  controlMinimize: '#febc2e',
  controlMaximize: '#28c840',
} as const

export const FINDER_THEMES = {
  blue:   { accent: '#0A84FF', accentContrast: '#ffffff', hover: 'rgba(10, 132, 255, 0.1)' },
  red:    { accent: '#FF5F57', accentContrast: '#ffffff', hover: 'rgba(255, 95, 87, 0.1)' },
  orange: { accent: '#FEBC2E', accentContrast: '#000000', hover: 'rgba(255, 149, 0, 0.1)' },
  yellow: { accent: '#FFE08C', accentContrast: '#000000', hover: 'rgba(255, 214, 10, 0.1)' },
  green:  { accent: '#28C840', accentContrast: '#000000', hover: 'rgba(40, 200, 64, 0.1)' },
  purple: { accent: '#BF5AF2', accentContrast: '#ffffff', hover: 'rgba(191, 90, 242, 0.1)' },
  gray:   { accent: '#98989D', accentContrast: '#000000', hover: 'rgba(152, 152, 157, 0.1)' },
} as const
```
Os valores acima são cópia literal do baseline da spec. Não alterar nenhum.

2. `theme.extend.colors`: manter os nomes atuais e ACRESCENTAR
   `'finder-accent-contrast': 'var(--finder-accent-contrast)'`,
   `'finder-header': 'var(--finder-header)'`, `'finder-icon': 'var(--finder-icon)'`,
   `'finder-folder': 'var(--finder-folder)'`. Os valores continuam sendo `var(...)`:
   isso é o que torna a troca de tema possível em runtime.

3. Plugin `addBase` que gera, a partir das constantes acima:
   - `:root` com todas as `--finder-*` de `FINDER_BASE` (incluindo
     `--finder-sidebar-translucent`) e os valores do tema `blue` como padrão.
   - um bloco `.theme-<nome>` por entrada de `FINDER_THEMES`, com `--finder-accent`,
     `--finder-accent-contrast` e `--finder-hover`.
   - uma classe de swatch por tema (`.swatch-<nome> { background-color: <accent> }`),
     para a bolinha da lista de temas (addBase não sofre purge).
   - os estilos base hoje em `@layer base` do globals.css: `html` (font-family de sistema
     e background), `body` (margin, font-smoothing, background, color), `code/pre/kbd`
     (mono), `button { cursor: pointer }`.
   - o bloco `@media (prefers-reduced-motion: reduce)` idêntico ao atual.
   - o `@supports not (backdrop-filter: blur(1px))` do vibrancy.

4. Plugin `addUtilities` que gera as classes de componente EM USO (copiar as declarações
   exatas de globals.css, trocando literais por `theme()` quando houver token):
   `.font-dos`, `.mac-window`, `.mac-window-titlebar`, `.mac-window-title`,
   `.scrollbar-finder` (com os três seletores `::-webkit-scrollbar*`),
   `.sidebar-vibrancy`, `.spotlight-overlay`, `.spotlight-panel`, `.spotlight-input`
   (com `::placeholder`), `.spotlight-item` e `.spotlight-item.active`,
   `.text-rotate`, `.text-rotate-sr-only`, `.text-rotate-word`, `.text-rotate-lines`,
   `.text-rotate-element`, `.text-rotate-space`,
   `.focus-container`, `.focus-word`, `.focus-word.active`, `.focus-frame`, `.corner`,
   `.top-left`, `.top-right`, `.bottom-left`, `.bottom-right`.

5. NÃO migrar (código morto, some junto com o globals na TASK 3): `.traffic-light`,
   `.sidebar-item`, `.sidebar-icon`, `.text-theme`, `.icon-theme`, `.section-title`,
   `.selected-item`, `.window-controls`, `.window-control*`, `.close`, `.minimize`,
   `.maximize`, `.w-sidebar` (já vem de `spacing.sidebar`).

**Prova exigida nesta tarefa**: após `bun run build`, localizar o CSS compilado em
`.next/static/chunks/*.css` e confirmar por grep que ele contém `--finder-accent` dentro
de um bloco `.theme-red` (ou seja, que o addBase gerou os temas). Colar a saída literal.

## TASK 3: globals.css reduzido ao essencial

**Módulo**: src/app
**Arquivos**: MODIFY: `src/app/globals.css`
**Depende de**: TASK 2
**Verificação**: `bun run build` && `grep -cE "#[0-9A-Fa-f]{3,6}" src/app/globals.css`

**Descrição Detalhada**:
Substituir todo o conteúdo do arquivo por exatamente estas linhas (nada mais):
```css
@import url("https://fonts.cdnfonts.com/css/modern-dos");
@import "tailwindcss";

@config '../../tailwind.config.ts';
```
Justificativa por linha: o `@import` da fonte externa é CSS puro sem equivalente em
config; `@import "tailwindcss"` e `@config` são as diretivas obrigatórias do motor.
Todo o resto passou para a config na TASK 2.

**Critério objetivo**: o arquivo final tem no máximo 15 linhas e zero ocorrências de hex.

## TASK 4: eliminar o hex do JavaScript e o inline style do accent

**Módulo**: src/hooks, src/components/sidebar, src/types
**Arquivos**:
- MODIFY: `src/hooks/use-theme.tsx`
- MODIFY: `src/components/sidebar/theme-section.tsx`
- MODIFY: `src/types/index.ts`
- MODIFY: `src/app/layout.tsx` (somente o script de pré-pintura, se existir)
**Depende de**: TASK 2
**Verificação**: `bunx tsc --noEmit` && `bun run build` && troca de tema no browser

**Descrição Detalhada**:
1. `use-theme.tsx`: `THEME_COLORS` deixa de mapear hex e passa a ser a lista de ids:
   `const THEME_IDS = ["red","orange","yellow","green","blue","purple","gray"] as const`.
   REMOVER a linha `document.documentElement.style.setProperty("--finder-accent", ...)`.
   O efeito passa a só remover/adicionar a classe `theme-<cor>` e persistir no localStorage.
   `THEME_LIST` deixa de expor `hex` e passa a expor `swatchClass: \`swatch-${color}\``.
2. `theme-section.tsx`: remover `CONTROL_COLOR` e o `style={{ backgroundColor }}`; a
   bolinha usa `className={item.swatchClass}` com as dimensões atuais.
3. `types/index.ts`: remover `hex` de `ThemeListItem` e acrescentar `swatchClass: string`.
4. `layout.tsx`: se houver script inline de pré-pintura que escreva `--finder-accent`,
   reduzir para aplicar somente a classe `theme-<cor>` lida do localStorage.

**Prova exigida**: no browser, alternar 3 temas e capturar `getComputedStyle` de
`--finder-accent` confirmando que muda e bate com o baseline da spec.

---

## WAVE 2 (paralela: troca mecânica de `[var(--x)]` por token; arquivos disjuntos)

Regra comum a TODAS as tarefas da wave: aplicar o Contrato de tokens do topo deste plano.
Não alterar layout, espaçamento, texto, estrutura ou lógica. A ÚNICA mudança permitida é a
forma de referenciar a cor. Preservar sufixos de alpha e todos os demais utilitários.

## TASK 5
**Arquivos**: MODIFY: `src/components/main-content/sections/home.tsx`,
`src/components/main-content/sections/about.tsx`
**Depende de**: TASK 3 · **Verificação**: `bunx tsc --noEmit && bun run lint`

## TASK 6
**Arquivos**: MODIFY: `src/components/main-content/sections/skills.tsx`,
`src/components/main-content/sections/projects.tsx`
**Depende de**: TASK 3 · **Verificação**: `bunx tsc --noEmit && bun run lint`

## TASK 7
**Arquivos**: MODIFY: `src/components/main-content/sections/contact.tsx`,
`src/components/main-content/contact/crosshair.tsx`,
`src/components/main-content/contact/true-focus.tsx`
**Depende de**: TASK 3 · **Verificação**: `bunx tsc --noEmit && bun run lint`

## TASK 8
**Arquivos**: MODIFY: `src/components/main-content/main-content.tsx`,
`src/components/main-content/spotlight.tsx`
**Depende de**: TASK 3 · **Verificação**: `bunx tsc --noEmit && bun run lint`

## TASK 9
**Arquivos**: MODIFY: `src/components/sidebar/favorites-section.tsx`,
`src/components/sidebar/sidebar.tsx`
**Depende de**: TASK 4 (theme-section já foi tocado lá; estes dois não)
**Verificação**: `bunx tsc --noEmit && bun run lint`

## TASK 10
**Arquivos**: MODIFY: `src/components/top-bar/top-bar.tsx`,
`src/components/top-bar/info-modal.tsx`, `src/components/top-bar/share-modal.tsx`,
`src/components/footer/footer.tsx`
**Depende de**: TASK 3 · **Verificação**: `bunx tsc --noEmit && bun run lint`

## TASK 11
**Arquivos**: MODIFY: `src/components/ui/mac-card.tsx`,
`src/components/ui/project-card.tsx`, `src/components/ui/modal.tsx`,
`src/components/ui/rotating-text.tsx`, `src/components/ui/true-focus.tsx`
**Depende de**: TASK 3 · **Verificação**: `bunx tsc --noEmit && bun run lint`

---

## WAVE 3

## TASK 12: Varredura final e prova de não-regressão

**Arquivos**: MODIFY: `src/app/layout.tsx`, `src/app/page.tsx` (somente se restar var/hex)
**Depende de**: TASKs 5 a 11
**Verificação**: suite completa + comparação com o baseline

**Descrição Detalhada**:
1. Rodar e colar a saída literal de:
   - `grep -roE "\[var\(--finder-" src | wc -l` (esperado 0)
   - `grep -rnE "#[0-9A-Fa-f]{6}" src/ | wc -l` (esperado 0)
   - `grep -cE "#[0-9A-Fa-f]{3,6}" src/app/globals.css` (esperado 0)
2. Corrigir qualquer resíduo encontrado nos dois arquivos permitidos.
3. Suite completa: `bun run lint`, `bunx tsc --noEmit`, `bun run build`.
4. No browser, recapturar o fingerprint de CSS computado dos 7 temas e comparar 1:1 com o
   baseline da spec. Divergência em qualquer valor = FAIL.

---

## Verificação final (suite do perfil)

```bash
bun run lint
bunx tsc --noEmit
bun run build
```
