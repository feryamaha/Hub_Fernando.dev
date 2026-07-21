# SPEC_004: Titlebar macOS no Modal com semáforo funcional

## REQUEST

Substituir o botão de fechar não convencional (XMarkIcon do Heroicons) do componente Modal por uma titlebar macOS com os 3 semáforos SVG oficiais. Apenas o vermelho (close) tem ação: fecha o modal e navega para a Home. Amarelo e verde são cosméticos.

## CATEGORY

Refactor

## PROBLEM

- Atual: o Modal usa `XMarkIcon` (X genérico 24x24px do Heroicons) como botão de fechar, fora da metáfora macOS/Finder do projeto
- Esperado: titlebar macOS com semáforos SVG oficiais, mesmo padrão adotado em cards e seções

## CONTEXT

- Componente afetado: `src/components/ui/modal.tsx`, usado por `info-modal.tsx` e `share-modal.tsx`
- O `Modal` recebe `onClose: () => void` via `ModalBaseProps`. Hoje o `onClose` apenas fecha o modal (setIsXModalOpen(false))
- O hook `useNavigation()` em `src/hooks/use-navigation.tsx` expõe `navigate(section)` e está disponível dentro do `NavigationProvider`
- Assumpções:
  - A1: o `Modal` chama `useNavigation()` internamente e o botão vermelho faz `onClose()` + `navigate("/")`. O `Modal` passa a depender do `NavigationProvider` (já é o caso: top-bar está dentro do provider)
  - A2: semáforos amarelo e verde são cosméticos (SVGs limpos sem ícone), sem onClick
  - A3: o semáforo vermelho usa SVG com ícone (`icon-mac-close_button.svg`) pois tem ação
  - A4: a titlebar usa a classe `mac-window-titlebar` do `globals.css`, substituindo a div de header atual
  - A5: o container do modal recebe `overflow-hidden` para que a titlebar respeite o `rounded-lg`

## REQUIREMENTS

1. Em `modal.tsx`: substituir a div de header (`flex items-center justify-between p-4 border-b`) por `<div className="mac-window-titlebar">` com:
   - Botão vermelho funcional: `<button>` com `onClick={() => { onClose(); navigate("/"); }}`, `aria-label="Fechar e voltar à Home"`, contendo `<img src="/icons/icon-mac-close_button.svg" width={12} height={12} alt="" />`
   - Imagem amarela cosmética: `<img src="/icons/icon-mac-minimize.svg" width={12} height={12} alt="" />`
   - Imagem verde cosmética: `<img src="/icons/icon-mac-maximize.svg" width={12} height={12} alt="" />`
   - `<span className="mac-window-title">{title}</span>`
2. Importar `useNavigation` de `@/hooks/use-navigation`
3. Remover o import de `XMarkIcon` do Heroicons
4. Adicionar `overflow-hidden` ao container interno do modal (`bg-finder-window rounded-lg shadow-xl max-w-lg w-full mx-4`)
5. O `<h2>` do título é substituído pelo `<span className="mac-window-title">` (estilo consistente com as demais titlebars)

## FILES INVOLVED

- `src/components/ui/modal.tsx` (modify)

## RESTRICTIONS

- Regras 1-6 do perfil do repo
- Não quebrar build nem alterar o comportamento dos modais (abrir/fechar)
- Identidade Finder/macOS preservada
- Não introduzir dependência nova

## EXPECTED DELIVERY

- Modal com titlebar macOS e semáforos SVG
- Botão vermelho fecha o modal e navega para Home
- `bunx tsc --noEmit`: PASS
- `bun run lint`: PASS
- `bun run build`: PASS

## VERIFICATION

```bash
bunx tsc --noEmit
bun run lint
bun run build
```
