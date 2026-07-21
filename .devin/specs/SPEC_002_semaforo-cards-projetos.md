# SPEC_002: Semáforo funcional nos cards de projeto

## REQUEST

Implementar semáforo macOS funcional nos cards de projeto da seção Projects, com 3 estados visuais controlados pelos botões close/minimize/maximize da titlebar.

## CATEGORY

Feature

## PROBLEM

- Atual: os semáforos dos cards de projeto são puramente decorativos (`<span>` sem onClick)
- Esperado: 3 estados interativos que controlam quanto conteúdo o card exibe

## CONTEXT

- Componentes afetados:
  - `src/components/ui/project-card.tsx` (cards de "Projetos pessoais" e "Linha do tempo")
  - `src/components/main-content/sections/projects.tsx` (cards inline de "Projetos em destaque" e "Atuação profissional")
- 3 tipos de card com estruturas de conteúdo diferentes:
  - **Featured** (mac-window inline): imagem + título + summary + details + chips + data + 2 botões de link
  - **Atuação profissional** (mac-window inline): imagem + título + descrição + chips + data + link
  - **ProjectCard** (componente reutilizável): imagem + título + descrição + chips + data + botões code/demo + extraNote
- Estados solicitados pelo Fernando:
  - **Vermelho (close)**: fecha o card, mostra apenas titlebar + título do projeto + botões/CTAs. Sem imagem, sem descrição, sem chips, sem data.
  - **Amarelo (minimize)**: expansão parcial. Titlebar + título + chips de tecnologias (badges) + botões/CTAs. Sem imagem e sem descrição.
  - **Verde (maximize)**: card completo com todo o conteúdo. Estado padrão (default).
- Assumpções:
  - A1: o estado inicial de cada card é "maximize" (verde), mostrando o conteúdo completo ao carregar a página
  - A2: transição instantânea (show/hide), sem animação de height, para simplicidade e robustez
  - A3: os semáforos passam a ser `<button>` com `aria-label` para acessibilidade
  - A4: o `extraNote` do ProjectCard só aparece no estado "maximize" (junto com a descrição)

## REQUIREMENTS

1. Criar `src/components/ui/mac-card.tsx` com um componente wrapper que encapsula:
   - Estado local `"full" | "compact" | "collapsed"` (default: `"full"`)
   - Titlebar `mac-window-titlebar` com 3 semáforos funcionais (`<button>` com `aria-label`)
   - Render condicional das seções de conteúdo conforme o estado:
     - `"full"` (verde): imagem + título + descrição + chips + data + botões + extraNote
     - `"compact"` (amarelo): título + chips + botões (sem imagem, sem descrição, sem data, sem extraNote)
     - `"collapsed"` (vermelho): título + botões (sem imagem, sem descrição, sem chips, sem data, sem extraNote)
   - Props: `windowTitle`, `title`, `muted`, e children estruturados via slots ou props nomeadas
2. Refatorar `ProjectCard` para usar `MacCard` internamente, mantendo a mesma API de props
3. Refatorar os cards inline de "Projetos em destaque" e "Atuação profissional" em `projects.tsx` para usar `MacCard`
4. Semáforos como `<button type="button">` com `aria-label` descritivo ("Fechar card", "Minimizar card", "Maximizar card")
5. Preservar todas as classes visuais existentes (mac-window, traffic-light, tokens --finder-*)
6. Estado independente por card (cada card controla o seu próprio estado)

## FILES INVOLVED

- `src/components/ui/mac-card.tsx` (create)
- `src/components/ui/project-card.tsx` (modify: usar MacCard internamente)
- `src/components/main-content/sections/projects.tsx` (modify: refatorar cards inline para MacCard)

## RESTRICTIONS

- Regras 1-6 do perfil do repo (TypeScript strict, toolchain Bun/Biome/Next, áreas sensíveis, escopo, git, artefatos)
- Não quebrar build nem alterar a aparência visual no estado "full" (deve ser idêntico ao atual)
- Não introduzir dependência nova
- Identidade Finder/macOS preservada (titlebar, traffic-lights, mac-window)
- Acessibilidade: semáforos funcionais precisam de aria-label e ser focusable

## EXPECTED DELIVERY

- Semáforos dos cards de projeto funcionais com 3 estados (collapsed/compact/full)
- Estado padrão "full" mostra o card completo (visual idêntico ao atual)
- `bunx tsc --noEmit`: PASS
- `bun run lint`: PASS
- `bun run build`: PASS

## VERIFICATION

```bash
bunx tsc --noEmit
bun run lint
bun run build
```
