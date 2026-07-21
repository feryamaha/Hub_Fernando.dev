# Semáforos SVG oficiais macOS — Plano de Implementação

> **Para agentes**: Use nemesis-subagent-driven-development para executar este plano.

**Objetivo**: Substituir semáforos CSS por SVGs oficiais macOS, distinguindo funcionais (com ícone) de cosméticos (sem ícone).

**Spec**: .devin/specs/SPEC_003_semaforos-svg-oficiais.md

**Módulos Afetados**: src/components/main-content, src/components/ui, src/components/main-content/sections

**Arquitetura**: Substituir círculos CSS (`traffic-light`/`bg-[#...]`) por `<img>` apontando para SVGs em `public/icons/`. Funcionais usam SVGs com ícone (`_button`), cosméticos usam SVGs limpos. Tamanho 12x12px.

**Tech Stack**: Next.js 16, React 19, TypeScript strict, Tailwind 4. Nenhuma dependência nova.

**Decisões declaradas (F8)**:
- `<img>` em vez de `next/image`: ícones decorativos de 12px, sem necessidade de otimização.
- Classes CSS `.traffic-light`/`.close`/`.minimize`/`.maximize` não removidas do `globals.css`.

---

## TASK 1: Substituir semáforos funcionais e cosméticos em main-content.tsx

**Módulo**: src/components/main-content
**Arquivos**: MODIFY: `src/components/main-content/main-content.tsx`
**Depende de**: nenhuma
**Verificação**: bunx tsc --noEmit

**Descrição Detalhada**:
Dois locais no mesmo arquivo:

### Local 1: Barra fixa (linhas 138-162), funcionais
Substituir os 3 `<button>` com `bg-[#FF5F57]`/`bg-[#FFBD2E]`/`bg-[#28C840]` por `<button>` contendo `<img>`. Preservar `type`, `aria-label`, `onClick`. Adicionar `hover:opacity-80 transition-opacity`. Remover `rounded-full` e `bg-[#...]`.

### Local 2: Janela minimizada (linhas 108-112), cosméticos
Substituir os 3 `<span className="traffic-light ...">` por `<img>` com os SVGs limpos.

**Implementação** (Local 1, barra fixa):
```tsx
<button
  type="button"
  aria-label="Fechar seção e voltar à Home"
  onClick={() => {
    setContentState("normal");
    navigate("/");
  }}
  className="hover:opacity-80 transition-opacity"
>
  <img src="/icons/icon-mac-close_button.svg" width={12} height={12} alt="" />
</button>
<button
  type="button"
  aria-label="Minimizar conteúdo"
  onClick={() =>
    setContentState((prev) => (prev === "minimized" ? "normal" : "minimized"))
  }
  className="hover:opacity-80 transition-opacity"
>
  <img src="/icons/icon-mac-minimize_button.svg" width={12} height={12} alt="" />
</button>
<button
  type="button"
  aria-label="Maximizar conteúdo"
  onClick={() =>
    setContentState((prev) => (prev === "maximized" ? "normal" : "maximized"))
  }
  className="hover:opacity-80 transition-opacity"
>
  <img src="/icons/icon-mac-maximize-button.svg" width={12} height={12} alt="" />
</button>
```

**Implementação** (Local 2, janela minimizada):
```tsx
<img src="/icons/icon-close.svg" width={12} height={12} alt="" />
<img src="/icons/icon-mac-minimize.svg" width={12} height={12} alt="" />
<img src="/icons/icon-mac-maximize.svg" width={12} height={12} alt="" />
```

## TASK 2: Substituir semáforos funcionais em mac-card.tsx

**Módulo**: src/components/ui
**Arquivos**: MODIFY: `src/components/ui/mac-card.tsx`
**Depende de**: nenhuma
**Verificação**: bunx tsc --noEmit

**Descrição Detalhada**:
Substituir os 3 `<button className="traffic-light close/minimize/maximize">` por `<button>` contendo `<img>` com SVGs funcionais (`_button`). Preservar `type`, `aria-label`, `onClick`. Adicionar `hover:opacity-80 transition-opacity`.

**Implementação**:
```tsx
<button
  type="button"
  aria-label="Fechar card"
  onClick={() => setState("collapsed")}
  className="hover:opacity-80 transition-opacity"
>
  <img src="/icons/icon-mac-close_button.svg" width={12} height={12} alt="" />
</button>
<button
  type="button"
  aria-label="Minimizar card"
  onClick={() => setState("compact")}
  className="hover:opacity-80 transition-opacity"
>
  <img src="/icons/icon-mac-minimize_button.svg" width={12} height={12} alt="" />
</button>
<button
  type="button"
  aria-label="Maximizar card"
  onClick={() => setState("full")}
  className="hover:opacity-80 transition-opacity"
>
  <img src="/icons/icon-mac-maximize-button.svg" width={12} height={12} alt="" />
</button>
```

## TASK 3: Substituir semáforos cosméticos em skills.tsx

**Módulo**: src/components/main-content/sections
**Arquivos**: MODIFY: `src/components/main-content/sections/skills.tsx`
**Depende de**: nenhuma
**Verificação**: bunx tsc --noEmit

**Descrição Detalhada**:
Substituir os 3 `<span className="traffic-light close/minimize/maximize">` por `<img>` cosméticos.

**Implementação**:
```tsx
<img src="/icons/icon-close.svg" width={12} height={12} alt="" />
<img src="/icons/icon-mac-minimize.svg" width={12} height={12} alt="" />
<img src="/icons/icon-mac-maximize.svg" width={12} height={12} alt="" />
```

## TASK 4: Substituir semáforos cosméticos em about.tsx

**Módulo**: src/components/main-content/sections
**Arquivos**: MODIFY: `src/components/main-content/sections/about.tsx`
**Depende de**: nenhuma
**Verificação**: bunx tsc --noEmit

**Descrição Detalhada**:
Substituir os 3 `<span className="traffic-light close/minimize/maximize">` por `<img>` cosméticos.

**Implementação**:
```tsx
<img src="/icons/icon-close.svg" width={12} height={12} alt="" />
<img src="/icons/icon-mac-minimize.svg" width={12} height={12} alt="" />
<img src="/icons/icon-mac-maximize.svg" width={12} height={12} alt="" />
```

---

## Verificação final (suite do perfil)

```bash
bun run lint
bunx tsc --noEmit
bun run build
```
