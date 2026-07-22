# PLAN_006 — Sete melhorias de UI/UX mobile

> Spec: `.devin/specs/SPEC_006_mobile-recruiter-7-melhorias.md`
> Verificação por tarefa: `bunx tsc --noEmit` (perfil do repo)
> Suite final: `bun run lint` + `bunx tsc --noEmit` + `bun run build`

## Global Constraints

- TypeScript strict; nenhuma dependência nova; nenhum toolchain paralelo.
- Tokens `--finder-*` via classes `bg-finder-*` / `text-finder-*`; nenhum HEX solto fora de
  `tailwind.config.ts`.
- Identidade Finder/macOS preservada: janelas, semáforos, sidebar, metáfora de pastas.
  Sem carrossel, sem navegação por gesto.
- Nenhuma tarefa executa git de escrita.
- `public/favicon.svg` NÃO é deletado (lei F4, classe C).
- A mudança pré-existente do Fernando em `skills.tsx` (semáforos do Quick Look, ~linha 914)
  é preservada; nenhuma tarefa toca esse trecho.
- Estados completos em todo controle novo: `hover`, `focus-visible:outline-2
  focus-visible:outline-finder-accent`, e `aria-*` quando houver estado.

## Mapa de arquivos

```
CREATE: public/favicon-fm.svg
CREATE: src/components/dock/dock.tsx
MODIFY: src/app/layout.tsx            (sensitive_area: metadata/SEO)
MODIFY: src/app/page.tsx
MODIFY: src/components/ui/mac-card.tsx
MODIFY: src/components/ui/project-card.tsx
MODIFY: src/components/main-content/sections/projects.tsx
MODIFY: src/components/main-content/sections/skills.tsx
MODIFY: src/components/main-content/main-content.tsx
MODIFY: src/components/top-bar/top-bar.tsx
```

## Waves de execução

```
WAVE 1 (arquivos disjuntos, sem dependência): TASK 1, TASK 2, TASK 3, TASK 4, TASK 5
WAVE 2 (dependem da wave 1):                  TASK 6, TASK 7, TASK 8
```

---

## TASK 1 — Criar favicon SVG leve com as iniciais FM

**FILE:** `public/favicon-fm.svg` (CREATE)
**DEPENDE_DE:** nenhuma
**VERIFICACAO:** `bunx tsc --noEmit` (arquivo estático, verificação é a suite não quebrar)

Criar o arquivo com exatamente este conteúdo (paths geométricos, sem raster, sem `<text>`
para não depender de fonte do sistema):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="FM">
  <rect width="64" height="64" rx="14" fill="#1E1E1E"/>
  <path d="M10 18 h16 v5 h-11 v6 h9 v5 h-9 v12 h-5 z" fill="#73D7FF"/>
  <path d="M30 46 v-28 h6 l6 11 l6-11 h6 v28 h-5 v-19 l-7 13 l-7-13 v19 z" fill="#73D7FF"/>
</svg>
```

`#1E1E1E` é `FINDER_BASE.window` e `#73D7FF` é o accent do tema blue (default), ambos
copiados de `tailwind.config.ts`. São valores dentro de um asset SVG estático, não CSS de
componente, por isso não violam a regra de tokens.

**Critério de aceite:** arquivo existe, abaixo de 2 KB, sem `<image>`, sem `xlink:href`,
sem `<pattern>`.

---

## TASK 2 — Semáforos do MacCard com lazy e estado inicial configurável

**FILE:** `src/components/ui/mac-card.tsx` (MODIFY)
**DEPENDE_DE:** nenhuma
**VERIFICACAO:** `bunx tsc --noEmit`

Duas mudanças no mesmo arquivo:

1. Adicionar `loading="lazy"` nos três `<img>` de semáforo (linhas ~46, ~54, ~62). Nada mais
   nesses elementos muda.
2. Exportar o tipo de estado, para o `ProjectCard` consumir sem duplicar o union
   (linha 5: `type CardState` passa a `export type CardState`).
3. Tornar o estado inicial configurável, preservando `"full"` como default:

```tsx
interface MacCardProps {
  // ... props existentes inalteradas
  /** Estado inicial do card. Default "full" (comportamento atual). */
  initialState?: CardState;
}

const MacCard = ({ /* ...props existentes */, initialState = "full" }: MacCardProps) => {
  const [state, setState] = useState<CardState>(initialState);
```

**O QUE NÃO FAZER:** não alterar a máquina de estados, os três botões de semáforo, o
`paddingClass` nem a renderização condicional existente.

---

## TASK 3 — Skills em acordeão com uma categoria aberta

**FILE:** `src/components/main-content/sections/skills.tsx` (MODIFY)
**DEPENDE_DE:** nenhuma
**VERIFICACAO:** `bunx tsc --noEmit`

1. Estado inicial (linha ~465): apenas a primeira categoria expandida.

```tsx
const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["Linguagens"]));
```

2. `toggleFolder` (linha ~494) vira exclusivo: abrir uma categoria fecha a que estava aberta;
   clicar na que já está aberta a fecha (permitindo nenhuma aberta, como no Finder real).

```tsx
const toggleFolder = (folderName: string) => {
  setExpandedFolders((prev) => (prev.has(folderName) ? new Set() : new Set([folderName])));
};
```

**O QUE NÃO FAZER:** não alterar a UI da árvore (ícones, indentação `pl-7`, alturas
`h-[26px]`, chevrons), não tocar `viewMode`, `selectedId`, `quickLookFile`, `lastClickTime`
nem o bloco do Quick Look (~linha 900 em diante, que contém mudança não commitada do
Fernando). A metáfora de pastas e arquivos permanece idêntica: só o número de pastas abertas
simultaneamente muda.

---

## TASK 4 — Criar o Dock inferior

**FILE:** `src/components/dock/dock.tsx` (CREATE)
**DEPENDE_DE:** nenhuma
**VERIFICACAO:** `bunx tsc --noEmit`

Componente cliente que reaproveita os mesmos cinco destinos e ícones da sidebar
(`favorites-section.tsx`), com rótulo curto sob o ícone, no idioma já usado lá (EN, rótulos
do cromo Finder). Renderiza apenas em mobile.

```tsx
"use client";

import { useNavigation } from "@/hooks/use-navigation";
import useScreenSize from "@/hooks/use-screen-size";
import type { SectionPath } from "@/types";
import type { ReactNode } from "react";

interface DockItem {
  path: SectionPath;
  label: string;
  icon: ReactNode;
}
```

Requisitos exatos:

- Itens, na ordem: `/` Home, `/about` About, `/skills` Skills, `/projects` Projects,
  `/contact` Contact. Os cinco `svg` são cópia fiel dos de `favorites-section.tsx`
  (mesmos `path`/`circle`/`rect`, `className="w-5 h-5"`).
- Container: `<nav aria-label="Navegação principal">` com
  `bg-finder-sidebar border-t border-finder-border shrink-0`, `flex`, cinco itens
  `flex-1`, altura total do dock de 56 px (`h-14`).
- Cada item é `<button type="button">` com `flex flex-col items-center justify-center gap-0.5
  h-14 w-full text-[10px]`, `aria-current={isActive ? "page" : undefined}`.
- Ativo: `text-finder-accent`. Inativo: `text-finder-text-secondary`.
  Hover: `hover:bg-finder-hover`. Foco:
  `focus-visible:outline-2 focus-visible:outline-finder-accent`.
- `const screenSize = useScreenSize(); if (!screenSize.isMobile) return null;`

**O QUE NÃO FAZER:** não usar `next/link` nem `router` (a navegação é por estado, via
`useNavigation`); não criar tokens ou cores novas; não adicionar animação de gesto.

---

## TASK 5 — Área de toque de 44 px nos controles do topo

**FILE:** `src/components/top-bar/top-bar.tsx` (MODIFY)
**DEPENDE_DE:** nenhuma
**VERIFICACAO:** `bunx tsc --noEmit`

Nos seis controles somente-ícone (GitHub, LinkedIn, E-mail, CV compacto, Compartilhar,
Informações), trocar `p-1 md:p-2` por área de toque fixa, mantendo o tamanho visual do ícone:

```
inline-flex items-center justify-center w-11 h-11 shrink-0
```

O ícone interno permanece `w-4 h-4 md:w-5 md:h-5`. As classes de cor e transição existentes
não mudam.

No botão CV com texto (`hidden sm:inline-flex`), acrescentar `min-h-11` mantendo
`px-3 py-1.5`.

No container dos controles, trocar `space-x-2 md:space-x-4` por `space-x-0 md:space-x-1`
para caber a largura maior (6 alvos de 44 px somam 264 px de 375 px).

**Efeito esperado e aceito (medido na análise crítica, R2):** a barra cresce de 35 px para
44 px e a largura do título cai para cerca de 111 px em 375 px. O `h1` já tem `min-w-0`,
`overflow-hidden` e `text-ellipsis`, então trunca sem gerar overflow horizontal.

**O QUE NÃO FAZER:** não remover controles, não mudar a ordem, não alterar o efeito de
digitação nem o cursor piscante.

---

## TASK 6 — Apontar favicon e corrigir OpenGraph

**FILE:** `src/app/layout.tsx` (MODIFY) — **sensitive_area:** metadata/SEO, alterando
identidade de aba e preview de compartilhamento
**DEPENDE_DE:** TASK 1
**VERIFICACAO:** `bunx tsc --noEmit`

1. `icons: { icon: "/favicon.svg" }` passa a `icons: { icon: "/favicon-fm.svg" }`.
2. Em `openGraph.images[0]`, corrigir as dimensões declaradas para as reais do arquivo
   referenciado (`public/icons/img_profile.webp`, medido: 1404x1395):
   `width: 1404, height: 1395`.
3. `twitter.card` passa de `"summary"` para `"summary_large_image"`.

**O QUE NÃO FAZER:** não deletar `public/favicon.svg`; não alterar `title`, `description`,
`keywords`, `metadataBase`, `alternates`, `authors` nem o `themeInitScript`; não adicionar
`themeColor` (fora do escopo da spec).

**Pendência declarada (não é tarefa):** `summary_large_image` rende melhor com um asset
1200x630. O arquivo atual é quadrado (1404x1395). O asset correto é fornecido pelo Fernando
(invariante 6 do `AGENTS.md`).

---

## TASK 7 — Um card aberto na seção Projetos

**FILE:** `src/components/ui/project-card.tsx` (MODIFY) e
`src/components/main-content/sections/projects.tsx` (MODIFY)
**DEPENDE_DE:** TASK 2
**VERIFICACAO:** `bunx tsc --noEmit`

1. `ProjectCard` ganha a prop opcional `initialState?: CardState`, importando o tipo de
   `@/components/ui/mac-card` (exportado na TASK 2), e a repassa para `MacCard`.
2. Em `projects.tsx`, o card do `NEMESIS DEFENDER v0` permanece em `full` e todos os demais
   passam a `compact`:
   - `featuredProjects.map`: `initialState={project.title === "NEMESIS DEFENDER v0" ? "full" : "compact"}`
   - `currentWork.map` (2 cards): `initialState="compact"`
   - `personalProjects.map` (2 cards): `initialState="compact"`
   - `pastProjects.map` (5 cards): `initialState="compact"`

**O QUE NÃO FAZER:** não remover nenhum projeto, não alterar textos, imagens, chips de
tecnologia, links nem a ordem das quatro subseções. O recrutador continua podendo expandir
qualquer card pelo semáforo verde, comportamento que já existe.

---

## TASK 8 — Montar o dock e reposicionar o botão de menu

**FILE:** `src/app/page.tsx` (MODIFY) e
`src/components/main-content/main-content.tsx` (MODIFY)
**DEPENDE_DE:** TASK 4
**VERIFICACAO:** `bunx tsc --noEmit`

1. Em `page.tsx`, montar o dock no fluxo, entre `MainContent` e `Footer`:

```tsx
<TopBar />
<MainContent />
<Dock />
<Footer />
```

2. Em `main-content.tsx`, o botão flutuante de menu (linha ~207) muda de `bottom-20` para
   `bottom-[150px]`, ficando acima do dock (56 px) somado ao rodapé (85 px medidos em
   375x812). O botão continua existindo porque a sidebar é o único acesso ao seletor de
   temas em mobile.

**O QUE NÃO FAZER:** não remover o botão de menu, não alterar a sidebar, não mexer no
`Footer`, não alterar a lógica de `contentState` nem o `Spotlight`.

---

## Verificação final (após todas as tarefas)

```bash
bun run lint
bunx tsc --noEmit
bun run build
```

## Medições a coletar para a PARADA ÚNICA

- Peso do `favicon-fm.svg` versus 1,6 MB do anterior.
- Altura total da seção Projetos antes (8213 px) e depois.
- Altura da Home versus área útil após o dock (risco R1: a Home pode passar a exigir rolagem).
- Altura da topbar e largura restante do título (risco R2).
- Contagem de `<img>` sem `loading` na seção Projetos.
