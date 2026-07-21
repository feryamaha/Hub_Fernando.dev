# Finder Skills UI, About Folder e Temas macOS — Plano de Implementacao

> **Para agentes**: Use nemesis-subagent-driven-development para executar este plano.

**Objetivo**: Adicionar toggle list/icon com drag-and-drop e Quick Look modal em Skills, interacao de pasta pulsante em About, e refatorar temas para 9 ícones de pasta macOS com paleta oficial.

**Spec**: `.devin/specs/SPEC_005_finder-skills-themes.md`

**Modulos Afetados**: `src/components/main-content/sections/`, `src/components/sidebar/`, `src/hooks/`, `src/types/`, `src/app/`, `tailwind.config.ts`

**Arquitetura**: Skills ganha estado de view mode (list/icon) e usa framer-motion `Reorder` para drag-and-drop. About ganha estado de "pasta aberta" com animacao pulse. Temas trocam swatches CSS por `<img>` 16px e atualizam `FINDER_THEMES` para 9 cores oficiais macOS.

**Tech Stack**: React 19, TypeScript strict, Tailwind CSS 4, framer-motion (Reorder), AOS, Bun/Biome/Next

---

## TASK 1: Atualizar tipos de tema (ThemeColor + ThemeListItem)

**Modulo**: `src/types/`

**Arquivos**:
- MODIFY: `src/types/index.ts` (linhas 4, 7-13)

**Depende de**: nenhuma

**Verificacao**: `bunx tsc --noEmit`

**Descricao Detalhada**:
Atualizar `ThemeColor` para incluir `green-lime` e `black`. Remover `swatchClass` de `ThemeListItem` pois o seletor usara `<img>` em vez de CSS swatch.

**Implementacao**:
Linha 4, substituir:
```typescript
export type ThemeColor = "red" | "orange" | "yellow" | "green" | "blue" | "purple" | "gray";
```
por:
```typescript
export type ThemeColor = "blue" | "green" | "green-lime" | "yellow" | "orange" | "red" | "purple" | "gray" | "black";
```

Linhas 7-13, substituir a interface `ThemeListItem`:
```typescript
export interface ThemeListItem {
  id: string;
  name: string;
  color: ThemeColor;
  className: string;
  swatchClass: string;
}
```
por:
```typescript
export interface ThemeListItem {
  id: string;
  name: string;
  color: ThemeColor;
  className: string;
  iconPath: string;
}
```

---

## TASK 2: Atualizar FINDER_THEMES e remover swatchBlocks no tailwind.config.ts

**Modulo**: raiz

**Arquivos**:
- MODIFY: `tailwind.config.ts` (linhas 28-55, 133)

**Depende de**: nenhuma

**Verificacao**: `bunx tsc --noEmit`

**Descricao Detalhada**:
`sensitive_area`: tema de cores. Atualizar `FINDER_THEMES` para 9 temas com cores oficiais macOS. Remover `swatchBlocks` (nao usado apos R5). Atualizar `:root` default para blue novo.

**Implementacao**:
Linhas 28-36, substituir todo o bloco `FINDER_THEMES`:
```typescript
export const FINDER_THEMES = {
  blue: { accent: '#73D7FF', accentContrast: '#000000', hover: 'rgba(115, 215, 255, 0.1)' },
  green: { accent: '#72E2AD', accentContrast: '#000000', hover: 'rgba(114, 226, 173, 0.1)' },
  'green-lime': { accent: '#7CF08E', accentContrast: '#000000', hover: 'rgba(124, 240, 142, 0.1)' },
  yellow: { accent: '#FCDB65', accentContrast: '#000000', hover: 'rgba(252, 219, 101, 0.1)' },
  orange: { accent: '#FBBC66', accentContrast: '#000000', hover: 'rgba(251, 188, 102, 0.1)' },
  red: { accent: '#FF685F', accentContrast: '#000000', hover: 'rgba(255, 104, 95, 0.1)' },
  purple: { accent: '#CA81E4', accentContrast: '#000000', hover: 'rgba(202, 129, 228, 0.1)' },
  gray: { accent: '#C6C6C6', accentContrast: '#000000', hover: 'rgba(198, 198, 198, 0.1)' },
  black: { accent: '#575757', accentContrast: '#ffffff', hover: 'rgba(87, 87, 87, 0.1)' },
} as const
```

Linhas 52-55, remover o bloco `swatchBlocks` inteiro:
```typescript
// REMOVER:
const swatchBlocks = Object.fromEntries(
  themeEntries.map(([name, value]) => [`.swatch-${name}`, { 'background-color': value.accent }])
)
```

Linha 138, remover `...swatchBlocks,` do `addBase`.

Linhas 133-135, atualizar default do `:root`:
```typescript
          '--finder-accent': FINDER_THEMES.blue.accent,
          '--finder-accent-contrast': FINDER_THEMES.blue.accentContrast,
          '--finder-hover': FINDER_THEMES.blue.hover,
```
(estes ja referenciam `FINDER_THEMES.blue`, mas os valores mudaram; confirmar que continuam referenciando apos a atualizacao do objeto)

---

## TASK 3: Atualizar use-theme.tsx (THEME_IDS + THEME_LIST)

**Modulo**: `src/hooks/`

**Arquivos**:
- MODIFY: `src/hooks/use-theme.tsx` (linhas 10, 74-80)

**Depende de**: TASK 1

**Verificacao**: `bunx tsc --noEmit`

**Descricao Detalhada**:
Atualizar `THEME_IDS` para 9 temas na ordem `blue, green, green-lime, yellow, orange, red, purple, gray, black`. Atualizar `THEME_LIST` para gerar `iconPath` em vez de `swatchClass`.

**Implementacao**:
Linha 10, substituir:
```typescript
const THEME_IDS = ["red", "orange", "yellow", "green", "blue", "purple", "gray"] as const;
```
por:
```typescript
const THEME_IDS = ["blue", "green", "green-lime", "yellow", "orange", "red", "purple", "gray", "black"] as const;
```

Linhas 74-80, substituir:
```typescript
export const THEME_LIST: ThemeListItem[] = THEME_IDS.map((color) => ({
  id: `theme-${color}`,
  name: `${color.charAt(0).toUpperCase() + color.slice(1)} Theme`,
  color,
  className: `theme-${color}`,
  swatchClass: `swatch-${color}`,
}));
```
por:
```typescript
export const THEME_LIST: ThemeListItem[] = THEME_IDS.map((color) => ({
  id: `theme-${color}`,
  name: `${color.charAt(0).toUpperCase() + color.slice(1)} Theme`,
  color,
  className: `theme-${color}`,
  iconPath: `/icons/icon-macos-folder-${color}.webp`,
}));
```

---

## TASK 4: Atualizar script de pre-pintura em layout.tsx

**Modulo**: `src/app/`

**Arquivos**:
- MODIFY: `src/app/layout.tsx` (linhas 57-66)

**Depende de**: nenhuma

**Verificacao**: `bunx tsc --noEmit`

**Descricao Detalhada**:
`sensitive_area`: script de pre-pintura. Atualizar o array de theme IDs no script inline para os 9 temas.

**Implementacao**:
Linhas 57-66, substituir:
```typescript
const themeInitScript = `
(function () {
  try {
    var ids = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'gray'];
    var t = localStorage.getItem('theme') || 'blue';
    if (ids.indexOf(t) === -1) t = 'blue';
    document.documentElement.classList.add('theme-' + t);
  } catch (e) {}
})();
`;
```
por:
```typescript
const themeInitScript = `
(function () {
  try {
    var ids = ['blue', 'green', 'green-lime', 'yellow', 'orange', 'red', 'purple', 'gray', 'black'];
    var t = localStorage.getItem('theme') || 'blue';
    if (ids.indexOf(t) === -1) t = 'blue';
    document.documentElement.classList.add('theme-' + t);
  } catch (e) {}
})();
`;
```

---

## TASK 5: Refatorar theme-section.tsx (ícones de pasta 16px, sem texto)

**Modulo**: `src/components/sidebar/`

**Arquivos**:
- MODIFY: `src/components/sidebar/theme-section.tsx` (linhas 1-37)

**Depende de**: TASK 3

**Verificacao**: `bunx tsc --noEmit`

**Descricao Detalhada**:
Substituir esferas de cor (`swatchClass`, `rounded-full`) por `<img>` dos ícones de pasta macOS com `width=16 height=16`. Remover o texto/nome do tema. Manter `aria-label` para acessibilidade.

**Implementacao**:
Substituir todo o conteudo do arquivo:
```tsx
"use client";

import { THEME_LIST, useTheme } from "@/hooks/use-theme";

const ThemeSection = () => {
  const [theme, changeTheme] = useTheme();

  return (
    <div className="mb-6">
      <h2 className="text-finder-text-secondary text-[11px] font-medium uppercase px-2 mb-1">
        Theme
      </h2>
      <nav className="space-y-px">
        {THEME_LIST.map(({ id, name, color, iconPath }) => (
          <button
            type="button"
            key={id}
            onClick={() => changeTheme(color)}
            aria-label={name}
            className={`flex items-center w-full px-2 py-1 rounded-md focus-visible:outline-2 focus-visible:outline-finder-accent ${
              theme === color ? "bg-finder-accent/15" : "hover:bg-finder-hover"
            }`}
          >
            <div className="flex gap-2 p-2">
              <img
                src={iconPath}
                width={16}
                height={16}
                alt=""
                className="rounded-sm"
              />
            </div>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ThemeSection;
```

---

## TASK 6: Refatorar about.tsx (interacao pasta pulsante)

**Modulo**: `src/components/main-content/sections/`

**Arquivos**:
- MODIFY: `src/components/main-content/sections/about.tsx` (linhas 1-158)

**Depende de**: TASK 3

**Verificacao**: `bunx tsc --noEmit`

**Descricao Detalhada**:
Ao clicar em um topico da sidebar, o painel de conteudo mostra um ícone de pasta macOS pulsando. Ao clicar na pasta (ou clicar novamente no topico), a pasta abre e revela o texto. Usa `useTheme` para obter a cor do tema ativo e construir o path do ícone. Respeita `prefers-reduced-motion`.

**Implementacao**:
Substituir todo o conteudo do arquivo:
```tsx
"use client";

import {
  BoltIcon,
  ClockIcon,
  CodeBracketIcon,
  CpuChipIcon,
  CubeTransparentIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import AOS from "aos";
import { AnimatePresence, motion } from "framer-motion";
import type { ComponentType, SVGProps } from "react";
import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/use-theme";

interface Topic {
  title: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  content: string;
}

const topics: Topic[] = [
  {
    title: "Apresentação",
    icon: UserIcon,
    content:
      "Sou desenvolvedor Full-Stack TypeScript (React/Next.js) com foco em segurança por padrão e governança determinística de agentes de IA. Construo desde interfaces e design systems até camadas de backend (BFF) e enforcement de baixo nível. Sou autor e mantenedor único do Nemesis Defender, um framework open-source de segurança escrito em Rust com camada de kernel em eBPF. Sigo me aprofundando em fundamentos formais, unindo prática de produção à teoria.",
  },
  {
    title: "Trajetória",
    icon: ClockIcon,
    content:
      "Antes do software, foram 17 anos em metrologia dimensional (GD&T avançado, CMM, engenharia reversa) garantindo precisão milimétrica e conformidade de qualidade. Essa base molda meu trabalho até hoje: contratos explícitos, baixa tolerância a ambiguidade e qualidade verificável. Migrei para o desenvolvimento de software como autodidata desde 2022 e hoje atuo como Full-Stack na Auclan Design.",
  },
  {
    title: "Especialidade",
    icon: CodeBracketIcon,
    content:
      "Minha especialidade é levar uma ideia ao produto digital completo: TypeScript em strict mode, React 19 e Next.js com App Router e React Server Components, Tailwind e design systems com contratos explícitos. Trabalho com arquitetura em camadas (UI → Hooks → Services → Types) e BFF via Route Handlers, mantendo credenciais e regras sensíveis exclusivamente no servidor. Da interface fiel ao design até a API, entrego software que funciona e que se mantém.",
  },
  {
    title: "Arquitetura",
    icon: CubeTransparentIcon,
    content:
      "Penso projetos para serem escaláveis e fáceis de evoluir. Uso Clean Architecture, separação rigorosa de responsabilidades e contratos TypeScript explícitos entre as camadas. No frontend, design systems com tokens semânticos e componentes tipados; no backend, BFF mantendo o que é sensível fora do cliente. Baixa tolerância a ambiguidade: cada limite do sistema é declarado, não presumido.",
  },
  {
    title: "Segurança",
    icon: ShieldCheckIcon,
    content:
      "Segurança não é etapa final, é padrão de projeto. Aplico OWASP, CSP Level 3 com nonce dinâmico, HSTS, X-Frame-Options e Permissions-Policy, além de validação em runtime com Zod, modelagem de ameaças e segurança de supply-chain. Penso em enforcement em runtime e design fail-closed: o sistema falha fechado, nunca aberto.",
  },
  {
    title: "Nemesis Defender",
    icon: ShieldExclamationIcon,
    content:
      "Projetei e implementei sozinho o Nemesis Defender: Um Framework de enforcement determinístico em Rust que bloqueia comandos destrutivos e malware de supply-chain antes da execução em ambientes com agentes LLM. Arquitetura em 3 camadas independentes. Em produção há 1,5 ano com zero incidentes. Veja detalhes técnicos na seção Projetos.",
  },
  {
    title: "Performance",
    icon: BoltIcon,
    content:
      "Otimizo de bundle com Server Components, SSR, SSG e ISR. Monitoramento de scores Lighthouse para otimizações no bundle, de olho em LCP e TTI. Trato performance como contrato verificável, medido e versionado, não como impressão subjetiva. A mesma disciplina vale para o baixo nível: análise estática, parsing e enforcement em runtime com custo previsível.",
  },
  {
    title: "IA & Agentic",
    icon: CpuChipIcon,
    content:
      "Desenvolvo com IA sob governança arquitetural explícita via SDD Pipeline (Specification-Driven Development): workflow sequencial de 7 skills com HARD-GATEs em pontos críticos (antes de gravar spec, antes de executar, antes de build release). Aplico disciplina epistêmica anti-sycophancy: agente executa, não conduz; usuário é decisor único. Proteção da codebase via hooks de pre-tool (interceptam write/exec/read antes da ação) com enforcement determinístico (exit 2 = bloqueado). Controle de paths em três níveis (absolute_block, write_block, allowed_exceptions) e invariantes de segurança que impedem ações destrutivas irreversíveis. O Nemesis Defender nasceu dessa prática: governar autonomia de LLM via enforcement, não confiança cega.",
  },
];

const About = () => {
  const [activeTopic, setActiveTopic] = useState(0);
  const [folderOpen, setFolderOpen] = useState(false);
  const [motionOk, setMotionOk] = useState(true);
  const [theme] = useTheme();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
    });
    setMotionOk(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const handleTopicClick = (index: number) => {
    if (index !== activeTopic) {
      setActiveTopic(index);
      setFolderOpen(false);
    } else {
      setFolderOpen((prev) => !prev);
    }
  };

  const ActiveIcon = topics[activeTopic].icon;
  const folderIconPath = `/icons/icon-macos-folder-${theme}.webp`;

  return (
    <div className="w-full p-2 md:p-8">
      <div
        className="mac-window relative w-full md:max-w-[920px] md:min-h-[520px] mx-auto flex flex-col"
        data-aos="fade-up"
      >
        <div className="mac-window-titlebar">
          <img src="/icons/icon-close.svg" width={12} height={12} alt="" />
          <img src="/icons/icon-mac-minimize.svg" width={12} height={12} alt="" />
          <img src="/icons/icon-mac-maximize.svg" width={12} height={12} alt="" />
          <span className="mac-window-title">Sobre — Fernando Moreira</span>
        </div>

        <div className="flex flex-col md:flex-row flex-1 min-h-0">
          <nav
            aria-label="Tópicos sobre mim"
            className="flex md:flex-col gap-1 md:w-[210px] shrink-0 overflow-x-auto md:overflow-x-visible p-2 md:p-3 bg-finder-header md:border-r border-b md:border-b-0 border-finder-border"
          >
            {topics.map((topic, index) => {
              const Icon = topic.icon;
              const isActive = activeTopic === index;
              return (
                <button
                  type="button"
                  key={topic.title}
                  onClick={() => handleTopicClick(index)}
                  aria-pressed={isActive}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[13px] whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-finder-accent ${
                    isActive
                      ? "bg-finder-accent text-finder-accent-contrast"
                      : "text-finder-text hover:bg-finder-hover"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {topic.title}
                </button>
              );
            })}
          </nav>

          <div className="flex-1 min-w-0 px-5 py-6 md:px-8 md:py-8 overflow-y-auto scrollbar-finder">
            <AnimatePresence mode="wait">
              {!folderOpen ? (
                <motion.div
                  key={`folder-${activeTopic}`}
                  className="flex flex-col items-center justify-center min-h-[200px]"
                  initial={motionOk ? { opacity: 0 } : false}
                  animate={{ opacity: 1 }}
                  exit={motionOk ? { opacity: 0 } : undefined}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    type="button"
                    onClick={() => setFolderOpen(true)}
                    aria-label={`Abrir pasta ${topics[activeTopic].title}`}
                    className="focus-visible:outline-2 focus-visible:outline-finder-accent rounded-lg"
                  >
                    <motion.img
                      src={folderIconPath}
                      width={64}
                      height={64}
                      alt=""
                      className="drop-shadow-lg"
                      animate={
                        motionOk
                          ? { scale: [1, 1.08, 1] }
                          : undefined
                      }
                      transition={
                        motionOk
                          ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
                          : undefined
                      }
                    />
                  </button>
                  <p className="mt-4 text-[13px] text-finder-text-secondary">
                    Clique na pasta para abrir
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={`content-${activeTopic}`}
                  initial={motionOk ? { opacity: 0, y: 8 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  exit={motionOk ? { opacity: 0 } : undefined}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-finder-accent/15 text-finder-accent">
                      <ActiveIcon className="w-5 h-5" />
                    </span>
                    <h2 className="text-lg font-semibold text-finder-text">
                      {topics[activeTopic].title}
                    </h2>
                  </div>
                  <p className="max-w-[600px] text-[15px] leading-relaxed text-finder-text-secondary">
                    {topics[activeTopic].content}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="border-t border-finder-border bg-finder-header">
          <p className="w-full text-center text-finder-text-secondary italic text-xs px-4 py-3">
            "Precisão na interface. Segurança na arquitetura. Evidência em cada decisão."
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
```

---

## TASK 7: Refatorar skills.tsx — toggle, drag-and-drop e Quick Look modal

**Modulo**: `src/components/main-content/sections/`

**Arquivos**:
- MODIFY: `src/components/main-content/sections/skills.tsx` (linhas 1-676)

**Depende de**: nenhuma

**Verificacao**: `bunx tsc --noEmit`

**Descricao Detalhada**:
Mudanca major em Skills. Adicionar:
1. Estado `viewMode` ("list" | "icon") com toggle na titlebar.
2. Estado `categories` (array mutavel para reordering) inicializado de `skillCategories`.
3. Drag-and-drop com framer-motion `Reorder.Group` + `Reorder.Item` para pastas e arquivos.
4. Modal Quick Look ao duplo-clique em arquivo.
5. Icon view: grade de pastas, clique abre pasta mostrando arquivos em grade.
6. Painel de preview mantido em ambos os modos (desktop).

O arquivo e grande (676 linhas). A refatoracao substitui o componente inteiro preservando os dados (`skillCategories`, `SkillFile`, `SkillCategory`, `fileId`).

**Implementacao**:
Substituir todo o conteudo do arquivo:
```tsx
"use client";

import {
  ChevronDownIcon,
  ChevronRightIcon,
  DocumentIcon,
  FolderIcon,
  Squares2X2Icon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";
import AOS from "aos";
import { AnimatePresence, motion, Reorder } from "framer-motion";
import { useEffect, useState } from "react";

interface SkillFile {
  name: string;
  extension: string;
  size: string;
  modDate: string;
  kind: string;
  description: string;
}

interface SkillCategory {
  name: string;
  files: SkillFile[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Linguagens",
    files: [
      {
        name: "TypeScript",
        extension: "ts",
        size: "3.4 KB",
        modDate: "2026",
        kind: "TypeScript File",
        description:
          "TypeScript em strict mode como base de tudo: tipagem estática, generics, contratos explícitos entre camadas e validação de domínio. Menos ambiguidade, mais segurança em tempo de compilação.",
      },
      {
        name: "JavaScript",
        extension: "js",
        size: "2.9 KB",
        modDate: "2026",
        kind: "JavaScript File",
        description:
          "JavaScript ES6+ moderno: async/await, módulos, APIs do browser e manipulação avançada do DOM quando o contexto pede JS puro.",
      },
      {
        name: "Rust",
        extension: "rs",
        size: "5.1 KB",
        modDate: "2026",
        kind: "Rust Source",
        description:
          "Rust para sistemas de alta confiabilidade e baixo nível. Linguagem do Nemesis Defender: enforcement de segurança, parsing e design fail-closed com performance previsível.",
      },
      {
        name: "HTML5",
        extension: "html",
        size: "1.8 KB",
        modDate: "2026",
        kind: "HTML Document",
        description:
          "HTML5 semântico, acessível e otimizado para SEO. Estrutura sólida como fundação de qualquer interface.",
      },
      {
        name: "CSS3",
        extension: "css",
        size: "2.0 KB",
        modDate: "2026",
        kind: "CSS File",
        description:
          "CSS3 moderno com layouts responsivos (Flexbox/Grid), animações e tokens de design consistentes.",
      },
    ],
  },
  {
    name: "Frameworks & Bibliotecas",
    files: [
      {
        name: "React",
        extension: "tsx",
        size: "4.6 KB",
        modDate: "2026",
        kind: "React Component",
        description:
          "React 19 com Server Components, hooks e componentes funcionais. Foco em composição, estado previsível e UI desacoplada da lógica.",
      },
      {
        name: "Next.js",
        extension: "ts",
        size: "3.2 KB",
        modDate: "2026",
        kind: "Next.js App",
        description:
          "Next.js com App Router e RSC: SSR, SSG, ISR e Route Handlers (BFF). Performance e segurança como padrão de arquitetura.",
      },
      {
        name: "React Hook Form",
        extension: "ts",
        size: "1.4 KB",
        modDate: "2026",
        kind: "TypeScript File",
        description:
          "Formulários performáticos e tipados com React Hook Form, integrados a validação por schema.",
      },
      {
        name: "Zod",
        extension: "ts",
        size: "1.2 KB",
        modDate: "2026",
        kind: "TypeScript File",
        description:
          "Zod para validação em runtime e contratos de dados type-safe entre cliente, servidor e APIs externas.",
      },
      {
        name: "Tailwind CSS",
        extension: "css",
        size: "2.3 KB",
        modDate: "2026",
        kind: "Tailwind Config",
        description:
          "Tailwind CSS para 100% da estilização, com tokens semânticos e design systems escaláveis.",
      },
    ],
  },
  {
    name: "Arquitetura",
    files: [
      {
        name: "Clean Architecture",
        extension: "md",
        size: "2.6 KB",
        modDate: "2026",
        kind: "Architecture Doc",
        description:
          "Clean Architecture com separação rigorosa de responsabilidades: UI → Hooks → Services → Types, contratos explícitos e baixo acoplamento.",
      },
      {
        name: "Design Systems",
        extension: "fig",
        size: "6.4 MB",
        modDate: "2026",
        kind: "Design System",
        description:
          "Design systems em Tailwind com tokens semânticos, componentes tipados com TypeScript reutilizáveis e acessíveis.",
      },
      {
        name: "BFF",
        extension: "ts",
        size: "2.1 KB",
        modDate: "2026",
        kind: "TypeScript File",
        description:
          "Backend for Frontend via Route Handlers, mantendo credenciais e regras sensíveis exclusivamente no servidor.",
      },
      {
        name: "Contracts",
        extension: "d.ts",
        size: "1.1 KB",
        modDate: "2026",
        kind: "TypeScript Decl",
        description:
          "Contratos TypeScript explícitos como fronteira entre camadas, interfaces como documentação executável.",
      },
    ],
  },
  {
    name: "Dados & APIs",
    files: [
      {
        name: "Integração de APIs",
        extension: "ts",
        size: "2.8 KB",
        modDate: "2026",
        kind: "TypeScript File",
        description:
          "Agregação de APIs públicas com fallback entre provedores (OpenStreetMap/Nominatim, ViaCEP, BrasilAPI, dados abertos da Receita Federal), base do MapHunter, meu motor de prospecção de leads.",
      },
      {
        name: "Cache & Rate limit",
        extension: "ts",
        size: "1.6 KB",
        modDate: "2026",
        kind: "TypeScript File",
        description:
          "Cache local de consultas e rate limiting para respeitar limites de APIs gratuitas e não desperdiçar chamadas, custo previsível por design.",
      },
      {
        name: "Pipelines de dados",
        extension: "ts",
        size: "2.2 KB",
        modDate: "2026",
        kind: "TypeScript File",
        description:
          "Pipelines de qualificação e enriquecimento de dados em etapas (filtrar antes de enriquecer), com exportação para CSV e XLSX.",
      },
    ],
  },
  {
    name: "Segurança",
    files: [
      {
        name: "OWASP Top 10",
        extension: "md",
        size: "2.2 KB",
        modDate: "2026",
        kind: "Security Doc",
        description:
          "Mitigação sistemática do OWASP Top 10 ao longo do ciclo de desenvolvimento, do design ao deploy.",
      },
      {
        name: "OWASP for LLM",
        extension: "md",
        size: "2.4 KB",
        modDate: "2026",
        kind: "Security Doc",
        description:
          "OWASP Top 10 for LLM: prompt injection, exfiltração de credenciais e abuso de agentes, base do Nemesis Defender. Certificado pela OWASP Foundation.",
      },
      {
        name: "CSP Level 3",
        extension: "conf",
        size: "1.6 KB",
        modDate: "2026",
        kind: "Security Header",
        description:
          "CSP Level 3 com nonce dinâmico, HSTS, X-Frame-Options e Permissions-Policy aplicados por padrão.",
      },
      {
        name: "Threat Modeling",
        extension: "md",
        size: "2.0 KB",
        modDate: "2026",
        kind: "Security Doc",
        description:
          "Modelagem de ameaças e declaração explícita de escopo e limites, honestidade sobre o que o sistema protege.",
      },
      {
        name: "Supply-chain",
        extension: "md",
        size: "1.9 KB",
        modDate: "2026",
        kind: "Security Doc",
        description:
          "Defesa de supply-chain: enforcement em runtime contra malware em pacotes antes que ele tente executar.",
      },
    ],
  },
  {
    name: "Sistemas & Baixo Nível",
    files: [
      {
        name: "eBPF",
        extension: "c",
        size: "4.0 KB",
        modDate: "2026",
        kind: "eBPF Program",
        description:
          "eBPF / BPF LSM no kernel Linux (bprm_check_security e egress via socket_connect), rede de segurança no nível do kernel.",
      },
      {
        name: "AST",
        extension: "ts",
        size: "2.7 KB",
        modDate: "2026",
        kind: "Parser",
        description:
          "Análise de AST com tree-sitter e análise estática para detectar padrões maliciosos antes da execução.",
      },
      {
        name: "Fail-closed",
        extension: "rs",
        size: "1.5 KB",
        modDate: "2026",
        kind: "Rust Source",
        description:
          "Design fail-closed e quarentena por corroboração de sinais: na dúvida, o sistema bloqueia e segura a sessão.",
      },
      {
        name: "Linux",
        extension: "sh",
        size: "1.0 KB",
        modDate: "2026",
        kind: "Shell Script",
        description:
          "Linux, syscalls e ferramentas de baixo nível como ambiente de desenvolvimento e enforcement.",
      },
    ],
  },
  {
    name: "Performance & Qualidade",
    files: [
      {
        name: "RSC / SSR / SSG / ISR",
        extension: "ts",
        size: "2.5 KB",
        modDate: "2026",
        kind: "Next.js Strategy",
        description:
          "Estratégias de renderização (RSC, SSR, SSG, ISR) para Lighthouse 90+ e redução de ~20-30% no bundle.",
      },
      {
        name: "Lighthouse",
        extension: "json",
        size: "1.3 KB",
        modDate: "2026",
        kind: "Report",
        description:
          "Métricas LCP/TTI e auditorias Lighthouse como contrato de performance medido e versionado.",
      },
      {
        name: "Playwright",
        extension: "ts",
        size: "2.0 KB",
        modDate: "2026",
        kind: "E2E Test",
        description:
          "Testes E2E com Playwright e testes de regressão para garantir comportamento estável a cada mudança.",
      },
      {
        name: "Quality Gates",
        extension: "ts",
        size: "1.4 KB",
        modDate: "2026",
        kind: "Config",
        description:
          "Lint com regras custom, tipagem estrita, validação em runtime com Zod e gates de segurança e arquitetura em pre-commit.",
      },
    ],
  },
  {
    name: "IA & Agentic Coding",
    files: [
      {
        name: "Devin",
        extension: "ts",
        size: "1.8 KB",
        modDate: "2026",
        kind: "Agent Config",
        description:
          "Devin (Cognition) para engenharia autônoma de software com delegação de tarefas complexas.",
      },
      {
        name: "VSCode",
        extension: "ts",
        size: "1.6 KB",
        modDate: "2026",
        kind: "Editor Config",
        description:
          "VSCode com extensões de IA para desenvolvimento assistido e integração com agents.",
      },
      {
        name: "Cursor",
        extension: "ts",
        size: "1.5 KB",
        modDate: "2026",
        kind: "Editor Config",
        description:
          "Cursor, editor AI-first, para features, refactors e documentação com contratos claros de atuação do agente.",
      },
      {
        name: "Antigravity",
        extension: "ts",
        size: "1.7 KB",
        modDate: "2026",
        kind: "Agent Config",
        description:
          "Google Antigravity, plataforma agent-first com Gemini, para orquestrar múltiplos agentes em paralelo.",
      },
      {
        name: "Claude",
        extension: "ts",
        size: "1.6 KB",
        modDate: "2026",
        kind: "Agent Config",
        description:
          "Claude Code (Anthropic) sob governança arquitetural explícita com contratos de atuação.",
      },
      {
        name: "OpenCode",
        extension: "ts",
        size: "1.3 KB",
        modDate: "2026",
        kind: "Agent Config",
        description:
          "OpenCode, agente open-source para codação assistida com controle total do fluxo.",
      },
      {
        name: "Codex",
        extension: "ts",
        size: "1.4 KB",
        modDate: "2026",
        kind: "Agent Config",
        description:
          "OpenAI Codex integrado ao fluxo, com enforcement de segurança sobre as ações do agente.",
      },
      {
        name: "Grok",
        extension: "ts",
        size: "1.2 KB",
        modDate: "2026",
        kind: "Agent Config",
        description: "Grok (xAI) para codação assistida e raciocínio sobre código em tempo real.",
      },
      {
        name: "Harness",
        extension: "md",
        size: "2.1 KB",
        modDate: "2026",
        kind: "Process File",
        description:
          "Harness de processo: framework de regras, skills e workflows que governa a atuação de agentes de IA.",
      },
      {
        name: "Skills",
        extension: "md",
        size: "1.9 KB",
        modDate: "2026",
        kind: "Process File",
        description:
          "Skills em markdown que definem capacidades específicas do agente com contrato de handoff completo.",
      },
      {
        name: "Rules",
        extension: "md",
        size: "1.7 KB",
        modDate: "2026",
        kind: "Process File",
        description:
          "Regras canônicas que restringem e guiam o comportamento do agente com verificadores mecânicos.",
      },
      {
        name: "Workflows",
        extension: "md",
        size: "1.8 KB",
        modDate: "2026",
        kind: "Process File",
        description:
          "Workflows sequenciais de skills que governam o desenvolvimento de forma determinística e auditável.",
      },
      {
        name: "Hooks Pretool/Posttool Use",
        extension: "md",
        size: "1.5 KB",
        modDate: "2026",
        kind: "Process File",
        description:
          "Hooks que interceptam tool calls antes e depois da execução para enforcement de segurança e validação.",
      },
    ],
  },
];

const fileId = (category: string, file: SkillFile) => `${category}/${file.name}.${file.extension}`;

type ViewMode = "list" | "icon";

const Skills = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(["Linguagens", "Frameworks & Bibliotecas"]),
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [categories, setCategories] = useState<SkillCategory[]>(skillCategories);
  const [openIconFolder, setOpenIconFolder] = useState<string | null>(null);
  const [quickLookFile, setQuickLookFile] = useState<{ category: string; file: SkillFile } | null>(null);
  const [lastClickTime, setLastClickTime] = useState<Record<string, number>>({});

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
    });
  }, []);

  useEffect(() => {
    if (!quickLookFile) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setQuickLookFile(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [quickLookFile]);

  const toggleFolder = (folderName: string) => {
    setExpandedFolders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(folderName)) {
        newSet.delete(folderName);
      } else {
        newSet.add(folderName);
      }
      return newSet;
    });
  };

  const handleFileClick = (category: string, file: SkillFile) => {
    const id = fileId(category, file);
    const now = Date.now();
    const lastTime = lastClickTime[id] ?? 0;
    const isDoubleClick = now - lastTime < 350;

    if (isDoubleClick) {
      setQuickLookFile({ category, file });
      setSelectedId(null);
      setLastClickTime({});
    } else {
      setSelectedId((prev) => (prev === id ? null : id));
      setLastClickTime({ ...lastClickTime, [id]: now });
    }
  };

  const handleReorderCategories = (newOrder: SkillCategory[]) => {
    setCategories(newOrder);
  };

  const handleReorderFiles = (categoryName: string, newFiles: SkillFile[]) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.name === categoryName ? { ...cat, files: newFiles } : cat)),
    );
  };

  const totalItems = categories.reduce((acc, category) => acc + category.files.length + 1, 0);

  const selected = (() => {
    for (const category of categories) {
      for (const file of category.files) {
        if (fileId(category.name, file) === selectedId) {
          return { category: category.name, file };
        }
      }
    }
    return null;
  })();

  return (
    <div className="h-full">
      <div className="mac-window h-full flex flex-col md:max-w-[980px] mx-auto">
        <div className="mac-window-titlebar">
          <img src="/icons/icon-close.svg" width={12} height={12} alt="" />
          <img src="/icons/icon-mac-minimize.svg" width={12} height={12} alt="" />
          <img src="/icons/icon-mac-maximize.svg" width={12} height={12} alt="" />
          <span className="mac-window-title">Skills — {totalItems} items</span>
          <div className="flex items-center gap-1 ml-auto mr-1">
            <button
              type="button"
              aria-label="Visualização em lista"
              onClick={() => setViewMode("list")}
              className={`p-1 rounded ${viewMode === "list" ? "bg-finder-accent/20 text-finder-accent" : "text-finder-text-secondary hover:text-finder-text"}`}
            >
              <ListBulletIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              aria-label="Visualização em ícones"
              onClick={() => setViewMode("icon")}
              className={`p-1 rounded ${viewMode === "icon" ? "bg-finder-accent/20 text-finder-accent" : "text-finder-text-secondary hover:text-finder-text"}`}
            >
              <Squares2X2Icon className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 min-h-0">
          {viewMode === "list" ? (
            <>
              <div className="flex-1 min-w-0 overflow-y-auto scrollbar-finder">
                <div className="sticky top-0 z-10 flex items-center h-[24px] px-3 bg-finder-header border-b border-finder-border text-[11px] text-finder-text-secondary font-medium">
                  <div className="flex-1">Name</div>
                  <div className="hidden lg:block w-20 text-right">Size</div>
                  <div className="hidden lg:block w-32 text-right">Kind</div>
                </div>

                <Reorder.Group
                  axis="y"
                  values={categories}
                  onReorder={handleReorderCategories}
                  className="divide-y divide-finder-border"
                >
                  {categories.map((category, categoryIndex) => {
                    const isExpanded = expandedFolders.has(category.name);
                    return (
                      <Reorder.Item
                        key={category.name}
                        value={category}
                        className="cursor-grab active:cursor-grabbing"
                      >
                        <div>
                          <button
                            type="button"
                            className="group cursor-default select-none w-full text-left"
                            onClick={() => toggleFolder(category.name)}
                            data-aos="fade-right"
                            data-aos-delay={categoryIndex * 60}
                            data-aos-duration="500"
                          >
                            <div className="flex items-center h-[26px] px-3 hover:bg-finder-hover">
                              <div className="flex-1 flex items-center min-w-0">
                                {isExpanded ? (
                                  <ChevronDownIcon className="w-3 h-3 text-finder-text-secondary mr-1" />
                                ) : (
                                  <ChevronRightIcon className="w-3 h-3 text-finder-text-secondary mr-1" />
                                )}
                                <FolderIcon className="w-4 h-4 text-finder-folder mr-2 flex-shrink-0" />
                                <span className="text-[13px] text-finder-text font-normal truncate">
                                  {category.name}
                                </span>
                              </div>
                              <div className="hidden lg:block w-20 text-right">
                                <span className="text-[12px] text-finder-text-secondary">--</span>
                              </div>
                              <div className="hidden lg:block w-32 text-right">
                                <span className="text-[12px] text-finder-text-secondary">Folder</span>
                              </div>
                            </div>
                          </button>

                          {isExpanded && (
                            <Reorder.Group
                              axis="y"
                              values={category.files}
                              onReorder={(newFiles) => handleReorderFiles(category.name, newFiles)}
                            >
                              {category.files.map((file) => {
                                const id = fileId(category.name, file);
                                const isSelected = selectedId === id;
                                return (
                                  <Reorder.Item
                                    key={id}
                                    value={file}
                                    className="cursor-grab active:cursor-grabbing"
                                  >
                                    <div>
                                      <button
                                        type="button"
                                        className="w-full text-left cursor-default select-none"
                                        aria-pressed={isSelected}
                                        onClick={() => handleFileClick(category.name, file)}
                                      >
                                        <div
                                          className={`flex items-center h-[26px] pl-7 pr-3 ${
                                            isSelected
                                              ? "bg-finder-accent text-finder-accent-contrast"
                                              : "hover:bg-finder-hover"
                                          }`}
                                        >
                                          <div className="flex-1 flex items-center min-w-0">
                                            <DocumentIcon
                                              className={`w-4 h-4 mr-2 flex-shrink-0 ${
                                                isSelected
                                                  ? "text-finder-accent-contrast"
                                                  : "text-finder-icon"
                                              }`}
                                            />
                                            <span
                                              className={`text-[13px] font-normal truncate ${
                                                isSelected
                                                  ? "text-finder-accent-contrast"
                                                  : "text-finder-text"
                                              }`}
                                            >
                                              {file.name}.{file.extension}
                                            </span>
                                          </div>
                                          <div className="hidden lg:block w-20 text-right">
                                            <span
                                              className={`text-[12px] ${
                                                isSelected
                                                  ? "text-finder-accent-contrast/80"
                                                  : "text-finder-text-secondary"
                                              }`}
                                            >
                                              {file.size}
                                            </span>
                                          </div>
                                          <div className="hidden lg:block w-32 text-right">
                                            <span
                                              className={`text-[12px] ${
                                                isSelected
                                                  ? "text-finder-accent-contrast/80"
                                                  : "text-finder-text-secondary"
                                              }`}
                                            >
                                              {file.kind}
                                            </span>
                                          </div>
                                        </div>
                                      </button>

                                      {isSelected && (
                                        <div className="md:hidden px-7 py-3 bg-finder-header border-y border-finder-border">
                                          <p className="text-[13px] leading-relaxed text-finder-text-secondary">
                                            {file.description}
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  </Reorder.Item>
                                );
                              })}
                            </Reorder.Group>
                          )}
                        </div>
                      </Reorder.Item>
                    );
                  })}
                </Reorder.Group>

                <p className="px-3 py-2 text-[11px] text-finder-text-secondary">
                  Clique em um arquivo para ver os detalhes. Duplo-clique para Quick Look.
                </p>
              </div>

              <aside className="hidden md:flex w-[280px] shrink-0 border-l border-finder-border bg-finder-header flex-col items-center px-5 py-8 overflow-y-auto scrollbar-finder">
                {selected ? (
                  <>
                    <div className="flex items-center justify-center w-20 h-20 rounded-xl bg-finder-accent/10 mb-4">
                      <DocumentIcon className="w-12 h-12 text-finder-accent" />
                    </div>
                    <h3 className="text-[14px] font-semibold text-finder-text text-center break-all">
                      {selected.file.name}.{selected.file.extension}
                    </h3>
                    <p className="text-[11px] text-finder-text-secondary mb-4">
                      {selected.file.kind} · {selected.file.size}
                    </p>
                    <p className="text-[13px] leading-relaxed text-finder-text-secondary text-left">
                      {selected.file.description}
                    </p>
                    <dl className="w-full mt-6 pt-4 border-t border-finder-border text-[11px] space-y-1.5">
                      <div className="flex justify-between gap-2">
                        <dt className="text-finder-text-secondary">Pasta</dt>
                        <dd className="text-finder-text text-right">{selected.category}</dd>
                      </div>
                      <div className="flex justify-between gap-2">
                        <dt className="text-finder-text-secondary">Modificado</dt>
                        <dd className="text-finder-text">{selected.file.modDate}</dd>
                      </div>
                    </dl>
                  </>
                ) : (
                  <div className="m-auto text-center text-finder-text-secondary">
                    <DocumentIcon className="w-10 h-10 mx-auto mb-3 opacity-40" />
                    <p className="text-[12px]">Selecione um arquivo para ver o preview.</p>
                  </div>
                )}
              </aside>
            </>
          ) : (
            <>
              <div className="flex-1 min-w-0 overflow-y-auto scrollbar-finder p-4">
                {openIconFolder === null ? (
                  <Reorder.Group
                    axis="y"
                    values={categories}
                    onReorder={handleReorderCategories}
                    className="flex flex-wrap gap-4"
                  >
                    {categories.map((category) => (
                      <Reorder.Item
                        key={category.name}
                        value={category}
                        className="cursor-grab active:cursor-grabbing"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenIconFolder(category.name)}
                          className="flex flex-col items-center gap-2 w-[100px] p-3 rounded-lg hover:bg-finder-hover focus-visible:outline-2 focus-visible:outline-finder-accent"
                        >
                          <FolderIcon className="w-12 h-12 text-finder-folder" />
                          <span className="text-[12px] text-finder-text text-center truncate w-full">
                            {category.name}
                          </span>
                          <span className="text-[10px] text-finder-text-secondary">
                            {category.files.length} items
                          </span>
                        </button>
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>
                ) : (
                  <div>
                    <button
                      type="button"
                      onClick={() => setOpenIconFolder(null)}
                      className="flex items-center gap-1 mb-4 text-[13px] text-finder-text-secondary hover:text-finder-text"
                    >
                      <ChevronRightIcon className="w-4 h-4 rotate-180" />
                      Voltar
                    </button>
                    <Reorder.Group
                      axis="y"
                      values={categories.find((c) => c.name === openIconFolder)?.files ?? []}
                      onReorder={(newFiles) => handleReorderFiles(openIconFolder, newFiles)}
                      className="flex flex-wrap gap-4"
                    >
                      {(categories.find((c) => c.name === openIconFolder)?.files ?? []).map((file) => {
                        const id = fileId(openIconFolder, file);
                        const isSelected = selectedId === id;
                        return (
                          <Reorder.Item
                            key={id}
                            value={file}
                            className="cursor-grab active:cursor-grabbing"
                          >
                            <button
                              type="button"
                              onClick={() => handleFileClick(openIconFolder, file)}
                              className={`flex flex-col items-center gap-2 w-[100px] p-3 rounded-lg focus-visible:outline-2 focus-visible:outline-finder-accent ${
                                isSelected ? "bg-finder-accent/15" : "hover:bg-finder-hover"
                              }`}
                            >
                              <DocumentIcon
                                className={`w-12 h-12 ${isSelected ? "text-finder-accent" : "text-finder-icon"}`}
                              />
                              <span
                                className={`text-[12px] text-center truncate w-full ${
                                  isSelected ? "text-finder-accent" : "text-finder-text"
                                }`}
                              >
                                {file.name}.{file.extension}
                              </span>
                              <span className="text-[10px] text-finder-text-secondary">
                                {file.size}
                              </span>
                            </button>
                          </Reorder.Item>
                        );
                      })}
                    </Reorder.Group>
                  </div>
                )}
                <p className="mt-4 text-[11px] text-finder-text-secondary">
                  Duplo-clique em um arquivo para Quick Look.
                </p>
              </div>

              <aside className="hidden md:flex w-[280px] shrink-0 border-l border-finder-border bg-finder-header flex-col items-center px-5 py-8 overflow-y-auto scrollbar-finder">
                {selected ? (
                  <>
                    <div className="flex items-center justify-center w-20 h-20 rounded-xl bg-finder-accent/10 mb-4">
                      <DocumentIcon className="w-12 h-12 text-finder-accent" />
                    </div>
                    <h3 className="text-[14px] font-semibold text-finder-text text-center break-all">
                      {selected.file.name}.{selected.file.extension}
                    </h3>
                    <p className="text-[11px] text-finder-text-secondary mb-4">
                      {selected.file.kind} · {selected.file.size}
                    </p>
                    <p className="text-[13px] leading-relaxed text-finder-text-secondary text-left">
                      {selected.file.description}
                    </p>
                    <dl className="w-full mt-6 pt-4 border-t border-finder-border text-[11px] space-y-1.5">
                      <div className="flex justify-between gap-2">
                        <dt className="text-finder-text-secondary">Pasta</dt>
                        <dd className="text-finder-text text-right">{selected.category}</dd>
                      </div>
                      <div className="flex justify-between gap-2">
                        <dt className="text-finder-text-secondary">Modificado</dt>
                        <dd className="text-finder-text">{selected.file.modDate}</dd>
                      </div>
                    </dl>
                  </>
                ) : (
                  <div className="m-auto text-center text-finder-text-secondary">
                    <DocumentIcon className="w-10 h-10 mx-auto mb-3 opacity-40" />
                    <p className="text-[12px]">Selecione um arquivo para ver o preview.</p>
                  </div>
                )}
              </aside>
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {quickLookFile && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setQuickLookFile(null)}
          >
            <motion.div
              className="bg-finder-window rounded-lg shadow-xl max-w-lg w-full mx-4 overflow-hidden"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mac-window-titlebar">
                <button
                  type="button"
                  aria-label="Fechar Quick Look"
                  onClick={() => setQuickLookFile(null)}
                  className="hover:opacity-80 transition-opacity"
                >
                  <img src="/icons/icon-close.svg" width={12} height={12} alt="" />
                </button>
                <img src="/icons/icon-mac-minimize.svg" width={12} height={12} alt="" />
                <img src="/icons/icon-mac-maximize.svg" width={12} height={12} alt="" />
                <span className="mac-window-title">
                  {quickLookFile.file.name}.{quickLookFile.file.extension}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-finder-accent/10 shrink-0">
                    <DocumentIcon className="w-10 h-10 text-finder-accent" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-semibold text-finder-text break-all">
                      {quickLookFile.file.name}.{quickLookFile.file.extension}
                    </h3>
                    <p className="text-[11px] text-finder-text-secondary">
                      {quickLookFile.file.kind} · {quickLookFile.file.size}
                    </p>
                  </div>
                </div>
                <p className="text-[14px] leading-relaxed text-finder-text-secondary mb-4">
                  {quickLookFile.file.description}
                </p>
                <dl className="pt-4 border-t border-finder-border text-[11px] space-y-1.5">
                  <div className="flex justify-between gap-2">
                    <dt className="text-finder-text-secondary">Pasta</dt>
                    <dd className="text-finder-text text-right">{quickLookFile.category}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-finder-text-secondary">Modificado</dt>
                    <dd className="text-finder-text">{quickLookFile.file.modDate}</dd>
                  </div>
                </dl>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Skills;
```

---

## Resumo de Waves

```
WAVE 1: TASK 1 (types), TASK 2 (tailwind), TASK 4 (layout) — arquivos disjuntos, sem dependencias entre si
WAVE 2: TASK 3 (use-theme, depende de TASK 1), TASK 7 (skills, independente)
WAVE 3: TASK 5 (theme-section, depende de TASK 3), TASK 6 (about, depende de TASK 3)
```

## Verificacao Final (suite completa do perfil)

```bash
bun run lint
bunx tsc --noEmit
bun run build
```
