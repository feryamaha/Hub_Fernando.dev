# SPEC_005: Finder Skills UI, About Folder Interaction e Temas macOS

## REQUEST

Adicionar modo de visualização em ícones (Finder icon view) à página Skills com
drag-and-drop para reordenar pastas e arquivos em ambos os modos (list e icon),
duplo-clique para abrir modal Quick Look com a descrição da habilidade, interação
de "abrir pasta" na página About antes de revelar o conteúdo, e refatoração
completa do sistema de temas substituindo esferas de cor por ícones de pasta macOS
(16px, sem texto) com paleta de cores oficiais do macOS (9 temas).

## CATEGORY

Feature + Refactor

## PROBLEM

- **Skills:** a página oferece apenas visualização em lista. Não há modo de
  ícones, não há drag-and-drop para reordenar, e não há modal de Quick Look.
- **About:** clicar em um tópico da sidebar revela o conteúdo instantaneamente,
  sem a metáfora de "abrir pasta" do macOS.
- **Temas:** o seletor usa esferas de cor com texto, não ícones de pasta macOS. A
  paleta tem 7 cores que não correspondem às oficiais do macOS. Faltam
  `green-lime` e `black`.

## CONTEXT

### Módulos afetados

- `src/components/main-content/sections/skills.tsx` (676 linhas): lista de
  categorias (`skillCategories: SkillCategory[]`) com pastas expansíveis e painel
  de preview à direita. Estado: `expandedFolders` (Set), `selectedId` (string).
- `src/components/main-content/sections/about.tsx` (158 linhas): sidebar de
  tópicos (`topics: Topic[]`) com conteúdo lateral. Estado: `activeTopic` (number).
- `src/components/sidebar/theme-section.tsx` (37 linhas): renderiza
  `THEME_LIST` com esferas de cor (`swatchClass`) e texto.
- `src/hooks/use-theme.tsx` (81 linhas): `THEME_IDS` com 7 cores, `THEME_LIST`
  com `swatchClass`.
- `src/types/index.ts` (28 linhas): `ThemeColor` com 7 valores, `ThemeListItem`
  com `swatchClass`.
- `tailwind.config.ts` (381 linhas): `FINDER_THEMES` com 7 temas, `swatchBlocks`
  gerando `.swatch-<name>`.
- `src/app/layout.tsx` (80 linhas): script de pré-pintura com array de 7 temas.

### Assets disponíveis (confirmados no disco)

9 ícones de pasta macOS em `public/icons/`:
`icon-macos-folder-{blue,green,green-lime,yellow,orange,red,purple,gray,black}.webp`

### Stack e dependências

- React 19, Next.js 16, TypeScript strict, Tailwind CSS 4, Biome, Bun.
- `framer-motion` (^11.18.2) já é dependência: oferece `Reorder.Group`,
  `Reorder.Item` e `motion.div` com `drag` para implementar drag-and-drop sem
  nova dependência.
- `@heroicons/react` já é dependência: ícones de pasta/documento para list view.

### Assumpções

1. **Contraste dos temas:** o Fernando forneceu apenas o `accent` de cada tema.
   O `accentContrast` é determinado por contraste WCAG AA: todas as novas cores
   são claras (luminância alta) exceto `black` (#575757), que é escura. Portanto:
   `accentContrast` = `#000000` para todos exceto `black` = `#ffffff`.
2. **Hover:** `rgba(<r>, <g>, <b>, 0.1)` derivado de cada `accent`.
3. **Default theme:** permanece `blue`.
4. **Persistência de ordem:** o drag-and-drop é visual (estado React), sem
   persistência em localStorage. Recarregar a página restaura a ordem original.
5. **Modal Quick Look:** construído inline em `skills.tsx` (não reutiliza
   `Modal` de `ui/modal.tsx` porque aquele navega para "/" ao fechar).
6. **Icon view positioning:** grid com reordering via framer-motion `Reorder`
   (não posicionamento absoluto livre), para manter responsividade e
   compatibilidade mobile.

## REQUIREMENTS

### R1: Skills — Toggle de visualização

1. Adicionar toggle na barra de título da janela Skills com dois botões
   (estilo macOS Finder view switcher): **List** e **Icon**.
2. List view mantém o comportamento atual (pastas expansíveis, painel de
   preview, cabeçalho com colunas).
3. Icon view exibe categorias como pastas em grade (grid flex-wrap). Clique
   abre a pasta e mostra os arquivos internos também em grade. Painel de
   preview à direita continua funcionando em ambos os modos (desktop).
4. No mobile, o painel de preview é substituído por descrição inline (como
   hoje na list view) ou pelo modal Quick Look.

### R2: Skills — Drag-and-drop reordenar

5. **List view:** pastas (categorias) podem ser arrastadas verticalmente para
   reordenar a lista. Arquivos dentro de uma pasta podem ser arrastados
   verticalmente para reordenar dentro da sua pasta. Arquivos não cruzam
   pastas.
6. **Icon view:** pastas podem ser arrastadas para reordenar na grade. Arquivos
   dentro de uma pasta aberta podem ser arrastados para reordenar na grade.
7. Drag-and-drop usa `framer-motion` `Reorder.Group` + `Reorder.Item` (já
   dependência). Sem nova dependência.
8. Apenas reordenação visual (estado React). Sem nesting de pasta em pasta,
   sem persistência, sem mudança estrutural dos dados.

### R3: Skills — Quick Look modal

9. Duplo-clique (desktop) ou toque duplo (mobile) em um arquivo (habilidade)
   abre um modal "Quick Look" sobreposto com: ícone do documento, nome,
   kind/size, descrição completa e metadados (pasta, modDate).
10. Modal fecha ao clicar no botão close (semaphore vermelho), ao clicar no
    backdrop, ou ao pressionar Escape.
11. Modal não navega para outra seção (diferente do `Modal` de `ui/modal.tsx`).
12. Modal usa `mac-window` e `mac-window-titlebar` para manter identidade
    macOS.

### R4: About — Interação "abrir pasta"

13. Ao clicar em um tópico da sidebar, o painel de conteúdo mostra um ícone de
    pasta macOS pulsando (animação `pulse` via CSS/framer-motion) indicando
    que a pasta precisa ser aberta.
14. Ao clicar na pasta (ou segundo clique no tópico), a pasta "abre" e revela
    o conteúdo (texto do tópico) com uma transição suave.
15. Funciona em desktop e mobile.
16. A pasta pulsante usa o ícone
    `/icons/icon-macos-folder-${currentThemeColor}.webp` para integrar com o
    tema ativo.
17. Respeita `prefers-reduced-motion`: se reduzido, a pasta aparece sem pulso
    e abre imediatamente ao clicar.

### R5: Temas — Ícones de pasta no seletor

18. Substituir as esferas de cor (`swatchClass`, `rounded-full`) por ícones
    `<img>` de pasta macOS (`/icons/icon-macos-folder-${color}.webp`) com
    `width=16 height=16`.
19. Remover o texto/nome do tema da lista de temas. O ícone da pasta já
    identifica a cor.
20. Remover `swatchClass` de `ThemeListItem` e `THEME_LIST`. Remover
    `swatchBlocks` de `tailwind.config.ts` (cleanup do que fica sem uso).

### R6: Temas — Paleta oficial macOS (9 temas)

21. Atualizar `FINDER_THEMES` em `tailwind.config.ts` para 9 temas com as
    cores oficiais do macOS:

| Tema | accent | accentContrast | hover |
|---|---|---|---|
| blue | #73D7FF | #000000 | rgba(115,215,255,0.1) |
| green | #72E2AD | #000000 | rgba(114,226,173,0.1) |
| green-lime | #7CF08E | #000000 | rgba(124,240,142,0.1) |
| yellow | #FCDB65 | #000000 | rgba(252,219,101,0.1) |
| orange | #FBBC66 | #000000 | rgba(251,188,102,0.1) |
| red | #FF685F | #000000 | rgba(255,104,95,0.1) |
| purple | #CA81E4 | #000000 | rgba(202,129,228,0.1) |
| gray | #C6C6C6 | #000000 | rgba(198,198,198,0.1) |
| black | #575757 | #ffffff | rgba(87,87,87,0.1) |

22. Atualizar `ThemeColor` em `src/types/index.ts` para incluir `green-lime` e
    `black`.
23. Atualizar `THEME_IDS` em `src/hooks/use-theme.tsx` para os 9 temas na
    ordem: `blue, green, green-lime, yellow, orange, red, purple, gray, black`.
24. Atualizar o script de pré-pintura em `src/app/layout.tsx` com o array de
    9 temas.
25. O `:root` em `tailwind.config.ts` deve usar `blue` como default
    (`--finder-accent`, `--finder-accent-contrast`, `--finder-hover`).

## FILES INVOLVED

- `src/components/main-content/sections/skills.tsx` (modify, major)
- `src/components/main-content/sections/about.tsx` (modify)
- `src/components/sidebar/theme-section.tsx` (modify)
- `src/hooks/use-theme.tsx` (modify)
- `src/types/index.ts` (modify)
- `tailwind.config.ts` (modify, sensitive_area: tema de cores)
- `src/app/layout.tsx` (modify, sensitive_area: script de pré-pintura)

## RESTRICTIONS

1. Regras 1-6 do perfil do repo (TypeScript strict, toolchain Bun/Biome/Next,
   áreas sensíveis com flag, escopo da spec, git somente Fernando, sem artefato
   de build em diff).
2. Nenhuma nova dependência. `framer-motion` (já instalado) é usado para
   drag-and-drop e animações.
3. Identidade Finder/macOS preservada: `mac-window`, `mac-window-titlebar`,
   traffic lights, sidebar, tipografia de sistema.
4. Tokens `--finder-*` em vez de valores soltos (hex hardcoded fora de
   `tailwind.config.ts`).
5. Estados completos: hover, active, focus-visible coerentes; contraste WCAG
   AA em todos os temas.
6. Responsividade: sem overflow horizontal em 360 a 1440 px.
7. Respeitar `prefers-reduced-motion`.
8. Git de escrita exclusivamente do Fernando.
9. Nenhum dado pessoal sensível novo em código.

## EXPECTED DELIVERY

- Skills com toggle List/Icon funcional, drag-and-drop reordenando pastas e
  arquivos em ambos os modos, Quick Look modal ao duplo-clique.
- About com interação de pasta pulsante antes de revelar conteúdo.
- Temas com 9 ícones de pasta macOS (16px, sem texto) e paleta oficial macOS.
- `bunx tsc --noEmit`: PASS
- `bun run lint`: PASS
- `bun run build`: PASS
- Verificação visual: toggle funciona, drag responde, modal abre/fecha, pasta
  pulsante aparece e abre, temas trocam corretamente, sem regressão visual em
  outras seções.

## VERIFICATION

```bash
bunx tsc --noEmit   # tipos
bun run lint        # Biome
bun run build       # export estático Next
```

Verificação visual no browser: navegar por Skills (list + icon + drag +
modal), About (pasta pulsante), e sidebar (trocar todos os 9 temas).
