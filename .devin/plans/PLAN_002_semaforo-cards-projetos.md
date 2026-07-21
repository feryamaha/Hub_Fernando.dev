# Semáforo funcional nos cards de projeto — Plano de Implementação

> **Para agentes**: Use nemesis-subagent-driven-development para executar este plano.

**Objetivo**: Implementar semáforo macOS funcional nos cards de projeto com 3 estados (collapsed/compact/full).

**Spec**: .devin/specs/SPEC_002_semaforo-cards-projetos.md

**Módulos Afetados**: src/components/ui, src/components/main-content/sections

**Arquitetura**: Criar `MacCard` como wrapper de janela macOS com estado local e semáforos funcionais. `ProjectCard` e os cards inline de `projects.tsx` passam a usar `MacCard`. O estado controla render condicional das seções de conteúdo.

**Tech Stack**: Next.js 16, React 19, TypeScript strict, Tailwind 4. Nenhuma dependência nova.

**Decisões declaradas (F8)**:
- Estado local `"full" | "compact" | "collapsed"` por card, default `"full"`.
- Transição instantânea (show/hide), sem animação de height.
- Semáforos viram `<button type="button">` com `aria-label`.
- `MacCard` usa slots (children nomeados) para flexibilidade entre os 3 tipos de card.

---

## TASK 1: Criar MacCard com semáforo funcional

**Módulo**: src/components/ui
**Arquivos**: CREATE: `src/components/ui/mac-card.tsx`
**Depende de**: nenhuma
**Verificação**: bunx tsc --noEmit

**Descrição Detalhada**:
Componente client que encapsula a janela macOS com titlebar, 3 semáforos funcionais e render condicional. Props:

```tsx
"use client";

import type { ReactNode } from "react";

type CardState = "full" | "compact" | "collapsed";

interface MacCardProps {
  windowTitle: string;
  title: ReactNode;
  muted?: boolean;
  /** Imagem: só renderiza no estado "full". */
  image?: ReactNode;
  /** Descrição/resumo: renderiza em "full". */
  description?: ReactNode;
  /** Chips de tecnologias: renderiza em "full" e "compact". */
  technologies?: ReactNode;
  /** Data: só renderiza no estado "full". */
  date?: ReactNode;
  /** Botões/CTAs: renderiza em todos os estados. */
  actions?: ReactNode;
  /** Nota extra: só renderiza no estado "full". */
  extraNote?: ReactNode;
}
```

Estado local `const [state, setState] = useState<CardState>("full")`.

Semáforos são `<button type="button">` com onClick:
- close (vermelho): `setState("collapsed")`, aria-label="Fechar card"
- minimize (amarelo): `setState("compact")`, aria-label="Minimizar card"
- maximize (verde): `setState("full")`, aria-label="Maximizar card"

Render condicional:
- `image`: `{state === "full" && image}`
- `description`: `{state === "full" && description}`
- `technologies`: `{(state === "full" || state === "compact") && technologies}`
- `date`: `{state === "full" && date}`
- `actions`: sempre renderiza
- `extraNote`: `{state === "full" && extraNote}`

O `<article>` mantém `className="mac-window"` + bg muted quando aplicável. A titlebar é idêntica à atual mas com `<button>` no lugar de `<span>`. O conteúdo fica em `<div className="p-4 md:p-5">` (ou `p-5 md:p-6` conforme o caller).

**Implementação**:
```tsx
"use client";

import { useState, type ReactNode } from "react";

type CardState = "full" | "compact" | "collapsed";

interface MacCardProps {
  windowTitle: string;
  title: ReactNode;
  muted?: boolean;
  image?: ReactNode;
  description?: ReactNode;
  technologies?: ReactNode;
  date?: ReactNode;
  actions?: ReactNode;
  extraNote?: ReactNode;
  /** Padding do corpo: "default" (p-4 md:p-5) ou "featured" (p-5 md:p-6). */
  padding?: "default" | "featured";
}

const MacCard = ({
  windowTitle,
  title,
  muted = false,
  image,
  description,
  technologies,
  date,
  actions,
  extraNote,
  padding = "default",
}: MacCardProps) => {
  const [state, setState] = useState<CardState>("full");

  const paddingClass = padding === "featured" ? "p-5 md:p-6" : "p-4 md:p-5";

  return (
    <article
      className={`mac-window ${
        muted ? "bg-[var(--finder-sidebar)]/60" : "bg-[var(--finder-sidebar)]"
      }`}
    >
      <div className="mac-window-titlebar">
        <button
          type="button"
          aria-label="Fechar card"
          onClick={() => setState("collapsed")}
          className="traffic-light close"
        />
        <button
          type="button"
          aria-label="Minimizar card"
          onClick={() => setState("compact")}
          className="traffic-light minimize"
        />
        <button
          type="button"
          aria-label="Maximizar card"
          onClick={() => setState("full")}
          className="traffic-light maximize"
        />
        <span className="mac-window-title">{windowTitle}</span>
      </div>

      {state === "full" && image}

      <div className={paddingClass}>
        {title}

        {state === "full" && description}

        {(state === "full" || state === "compact") && technologies}

        {state === "full" && date}

        {actions}

        {state === "full" && extraNote}
      </div>
    </article>
  );
};

export default MacCard;
```

## TASK 2: Refatorar ProjectCard para usar MacCard

**Módulo**: src/components/ui
**Arquivos**: MODIFY: `src/components/ui/project-card.tsx`
**Depende de**: TASK 1
**Verificação**: bunx tsc --noEmit

**Descrição Detalhada**:
Substituir a estrutura inline do `ProjectCard` por `MacCard`. A API de props do `ProjectCard` não muda (mantém compatibilidade com os callers em `projects.tsx`). Internamente, `ProjectCard` monta os slots de `MacCard`:

- `image`: `<Image>` existente (se `imageSrc`)
- `title`: `<h3>` existente
- `description`: `<p>` da descrição
- `technologies`: `<ul>` de chips (TechChips inline)
- `date`: `<p>` da data
- `actions`: `<div>` com botões code/demo
- `extraNote`: `<p>` da nota extra

O `muted` repassa para `MacCard`.

**Implementação**:
```tsx
"use client";

import MacCard from "@/components/ui/mac-card";
import Image from "next/image";
import type { ReactNode } from "react";

interface ProjectCardProps {
  title: string;
  windowTitle?: string;
  description: string;
  technologies: string[];
  date: string;
  imageSrc?: string;
  imageAlt?: string;
  codeUrl?: string;
  demoUrl?: string;
  demoLabel?: string;
  extraNote?: ReactNode;
  muted?: boolean;
}

const ProjectCard = ({
  title,
  windowTitle,
  description,
  technologies,
  date,
  imageSrc,
  imageAlt,
  codeUrl,
  demoUrl,
  demoLabel = "Ver demo",
  extraNote,
  muted = false,
}: ProjectCardProps) => {
  const image = imageSrc ? (
    <Image
      src={imageSrc}
      alt={imageAlt ?? ""}
      width={640}
      height={360}
      className="w-full h-64 object-cover object-left-top bg-[var(--finder-sidebar)]"
    />
  ) : undefined;

  const titleNode = (
    <h3 className="text-base md:text-lg font-semibold text-[var(--finder-text)]">{title}</h3>
  );

  const descriptionNode = (
    <p className="text-[13px] md:text-sm text-[var(--finder-text-secondary)] mt-2 leading-relaxed">
      {description}
    </p>
  );

  const technologiesNode = (
    <ul className="flex flex-wrap gap-2 mt-3" aria-label="Principais tecnologias">
      {technologies.map((tech) => (
        <li
          key={tech}
          className="text-xs font-medium text-[var(--finder-accent)] border border-[var(--finder-accent)]/40 bg-[var(--finder-accent)]/10 rounded-full px-2.5 py-1"
        >
          {tech}
        </li>
      ))}
    </ul>
  );

  const dateNode = <p className="text-xs text-[var(--finder-text-secondary)] mt-3">{date}</p>;

  const actionsNode = (codeUrl || demoUrl) ? (
    <div className="flex flex-wrap gap-3 mt-4">
      {codeUrl && (
        <a
          href={codeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[var(--finder-accent)] text-[var(--finder-accent-contrast)] text-[13px] font-medium hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--finder-accent)]"
        >
          Ver código
        </a>
      )}
      {demoUrl && (
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[var(--finder-border)] text-[var(--finder-text)] text-[13px] font-medium hover:bg-[var(--finder-hover)] transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--finder-accent)]"
        >
          {demoLabel}
        </a>
      )}
    </div>
  ) : undefined;

  const extraNoteNode = extraNote ? (
    <p className="text-xs italic text-[var(--finder-text-secondary)] mt-3">{extraNote}</p>
  ) : undefined;

  return (
    <MacCard
      windowTitle={windowTitle ?? title}
      title={titleNode}
      muted={muted}
      image={image}
      description={descriptionNode}
      technologies={technologiesNode}
      date={dateNode}
      actions={actionsNode}
      extraNote={extraNoteNode}
    />
  );
};

export default ProjectCard;
```

## TASK 3: Refatorar cards inline de projects.tsx para usar MacCard

**Módulo**: src/components/main-content/sections
**Arquivos**: MODIFY: `src/components/main-content/sections/projects.tsx`
**Depende de**: TASK 1
**Verificação**: bunx tsc --noEmit

**Descrição Detalhada**:
Refatorar os 2 tipos de card inline ("Projetos em destaque" e "Atuação profissional") para usar `MacCard` no lugar de `<article className="mac-window">` com titlebar e semáforos decorativos.

### Featured projects (linhas 255-316)
Cada `featuredProjects.map` usa `MacCard` com:
- `windowTitle`: `project.windowTitle`
- `title`: `<h3 className="text-xl md:text-2xl font-bold text-[var(--finder-accent)]">{project.title}</h3>`
- `image`: `<Image>` existente (se `project.imageSrc`)
- `description`: fragment com `<p>` summary + `<p>` details
- `technologies`: `<TechChips technologies={project.technologies} />`
- `date`: `<p className="text-xs text-[var(--finder-text-secondary)] mt-3">{project.date}</p>`
- `actions`: `<div>` com os 2 botões de link (Ver código + Ver site/docs)
- `padding`: "featured"

### Atuação profissional (linhas 322-355)
Cada `currentWork.map` usa `MacCard` com:
- `windowTitle`: `work.windowTitle ?? work.title`
- `title`: `<h3 className="text-lg font-semibold text-[var(--finder-text)]">{work.title}</h3>`
- `image`: `<Image>` existente (se `work.imageSrc`)
- `description`: `<p className="text-sm text-[var(--finder-text-secondary)] mt-2 leading-relaxed">{work.description}</p>`
- `technologies`: `<TechChips technologies={work.technologies} />`
- `date`: `<p className="text-xs text-[var(--finder-text-secondary)] mt-3">{work.date} · {work.link}</p>`
- `actions`: `undefined` (não tem botões separados; o link está no date)
- `padding`: "default"

Importar `MacCard` no topo do arquivo. Remover o import de `Image` se não houver mais uso direto (verificar: featured e atuação usam `Image` diretamente; com MacCard, a imagem é passada como node, então `Image` ainda é importado para construir o node).

**Implementação** (trecho dos featured):
```tsx
import MacCard from "@/components/ui/mac-card";

// Featured:
{featuredProjects.map((project) => (
  <MacCard
    key={project.title}
    windowTitle={project.windowTitle}
    padding="featured"
    title={
      <h3 className="text-xl md:text-2xl font-bold text-[var(--finder-accent)]">
        {project.title}
      </h3>
    }
    image={
      project.imageSrc ? (
        <Image
          src={project.imageSrc}
          alt={project.imageAlt ?? ""}
          width={640}
          height={360}
          className="w-full h-64 object-cover object-left-top bg-[var(--finder-sidebar)]"
        />
      ) : undefined
    }
    description={
      <>
        <p className="text-[15px] text-[var(--finder-text)] mt-3 leading-relaxed">
          {project.summary}
        </p>
        <p className="text-sm text-[var(--finder-text-secondary)] mt-3 leading-relaxed">
          {project.details}
        </p>
      </>
    }
    technologies={<TechChips technologies={project.technologies} />}
    date={<p className="text-xs text-[var(--finder-text-secondary)] mt-3">{project.date}</p>}
    actions={
      <div className="flex flex-wrap gap-3 mt-4">
        {project.links[0] && (
          <a
            href={project.links[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[var(--finder-accent)] text-[var(--finder-accent-contrast)] text-[13px] font-medium hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--finder-accent)]"
          >
            Ver código
          </a>
        )}
        {project.links[1] && (
          <a
            href={project.links[1].url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[var(--finder-border)] text-[var(--finder-text)] text-[13px] font-medium hover:bg-[var(--finder-hover)] transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--finder-accent)]"
          >
            Ver site/docs
          </a>
        )}
      </div>
    }
  />
))}
```

**Implementação** (trecho da atuação profissional):
```tsx
{currentWork.map((work) => (
  <MacCard
    key={work.title}
    windowTitle={work.windowTitle ?? work.title}
    title={
      <h3 className="text-lg font-semibold text-[var(--finder-text)]">{work.title}</h3>
    }
    image={
      work.imageSrc ? (
        <Image
          src={work.imageSrc}
          alt={work.imageAlt ?? ""}
          width={640}
          height={360}
          className="w-full h-64 object-cover object-left-top"
        />
      ) : undefined
    }
    description={
      <p className="text-sm text-[var(--finder-text-secondary)] mt-2 leading-relaxed">
        {work.description}
      </p>
    }
    technologies={<TechChips technologies={work.technologies} />}
    date={
      <p className="text-xs text-[var(--finder-text-secondary)] mt-3">
        {work.date} · {work.link}
      </p>
    }
  />
))}
```

---

## Verificação final (suite do perfil)

```bash
bun run lint
bunx tsc --noEmit
bun run build
```
