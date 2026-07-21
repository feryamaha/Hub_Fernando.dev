# Polimento profissional do portfólio — Plano de Implementação

> **Para agentes**: Use nemesis-subagent-driven-development para executar este plano.

**Objetivo**: Implementar as 13 melhorias da SPEC_001 preservando a identidade Finder.

**Spec**: .devin/specs/SPEC_001_polimento-recruiter-finder.md

**Módulos Afetados**: src/app, src/lib, src/components (top-bar, footer, sidebar,
main-content, ui)

**Arquitetura**: Wave 1 cria as fundações (tokens CSS, constants, ícones, card, spotlight)
sem tocar componentes existentes; Wave 2 refatora os componentes consumindo as fundações.
Arquivos disjuntos por tarefa; paralelismo por wave.

**Tech Stack**: Next.js 16, React 19, TS strict, Tailwind 4 (classes utilitárias +
globals.css), heroicons. Nenhuma dependência nova.

**Decisões declaradas (F8)**:
- `--finder-accent-contrast`: preto nos temas yellow/orange/green/gray, branco nos temas
  blue/red/purple/pink (contraste calculado; atinge AA-large em todos; AA-normal estrito
  exigiria abandonar o padrão visual macOS: decisão final é do Fernando).
- E-mail canônico: fmoreirayamaha@gmail.com (assumpção A1 da spec, flagada).
- CV_PATH: /cv-fernando-moreira.pdf (asset pendente, assumpção A2).

---

## WAVE 1 (sem dependências, arquivos disjuntos)

## TASK 1: Tokens e base CSS

**Módulo**: src/app
**Arquivos**: MODIFY: `src/app/globals.css`
**Depende de**: nenhuma
**Verificação**: bunx tsc --noEmit && bun run build (CSS não passa no tsc; build valida)

**Descrição Detalhada**:
1. Em `:root` adicionar `--finder-accent-contrast: #ffffff;` e
   `--finder-sidebar-translucent: rgba(37, 37, 38, 0.82);`.
2. Em cada bloco `.theme-*` adicionar `--finder-accent-contrast`: `#000000` para
   `.theme-yellow`, `.theme-orange`, `.theme-green`, `.theme-gray`; `#ffffff` para
   `.theme-blue`, `.theme-red`, `.theme-purple`, `.theme-pink`.
3. Nova classe utilitária em `@layer components`:
   `.sidebar-vibrancy { background-color: var(--finder-sidebar-translucent);
   backdrop-filter: blur(18px) saturate(1.4); -webkit-backdrop-filter: blur(18px)
   saturate(1.4); }` com fallback `@supports not (backdrop-filter: blur(1px)) {
   .sidebar-vibrancy { background-color: var(--finder-sidebar); } }`.
4. Bloco global no fim do arquivo:
   `@media (prefers-reduced-motion: reduce) { [data-aos] { opacity: 1 !important;
   transform: none !important; transition: none !important; animation: none !important; }
   * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }`
5. Estilos do Spotlight (classes usadas pela TASK 5): `.spotlight-overlay` (fixed inset-0,
   rgba(0,0,0,0.45), backdrop-filter blur(2px), z-index 80, flex, align start center,
   padding-top 18vh), `.spotlight-panel` (width min(560px, 92vw), mac-window-like: bg
   var(--finder-sidebar), border var(--finder-border), radius 12px, shadow forte),
   `.spotlight-input` (transparente, sem outline, fonte 15px), `.spotlight-item` e
   `.spotlight-item.active { background: var(--finder-accent); color:
   var(--finder-accent-contrast); }`.
6. Não remover nada existente.

## TASK 2: Fonte única de dados de contato

**Módulo**: src/lib
**Arquivos**: CREATE: `src/lib/constants.ts`
**Depende de**: nenhuma
**Verificação**: bunx tsc --noEmit

**Implementação** (código completo):
```ts
export const EMAIL = "fmoreirayamaha@gmail.com";
export const PHONE_DISPLAY = "+55 14 99601-0696";
export const CV_PATH = "/cv-fernando-moreira.pdf";
export const CV_FILENAME = "cv-fernando-moreira.pdf";
export const SITE_REPO_URL = "https://github.com/feryamaha/Hub_Fernando.dev";

export interface SocialLink {
  name: "GitHub" | "LinkedIn" | "X" | "Instagram" | "WhatsApp";
  url: string;
  hoverColor?: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/feryamaha", hoverColor: "#181717" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/feryamaha/", hoverColor: "#0077B5" },
  { name: "X", url: "https://x.com/_feryamaha", hoverColor: "#000000" },
  { name: "Instagram", url: "https://www.instagram.com/fm_frontend/" },
  { name: "WhatsApp", url: "https://wa.me/5514996010696", hoverColor: "#25D366" },
];
```

## TASK 3: Ícones sociais compartilhados

**Módulo**: src/components/ui
**Arquivos**: CREATE: `src/components/ui/social-icons.tsx`
**Depende de**: nenhuma
**Verificação**: bunx tsc --noEmit

**Descrição Detalhada**: Componente com os 5 SVGs sociais já existentes no repo (copiar
os paths EXATOS de: GitHub e LinkedIn de `src/components/footer/footer.tsx`; X,
Instagram e WhatsApp de `src/components/main-content/sections/contact.tsx`). Exportar:
`GitHubIcon`, `LinkedInIcon`, `XIcon`, `InstagramIcon`, `WhatsAppIcon`, cada um
`({ className }: { className?: string })` retornando `<svg>` com `viewBox="0 0 24 24"
fill="currentColor" role="img" aria-label="<nome>"` e o path copiado. Exportar também
`SOCIAL_ICON_MAP: Record<SocialLink["name"], ComponentType<{ className?: string }>>`
(importar o tipo de `@/lib/constants`... ATENÇÃO: para manter a wave disjunta, NÃO
importar de constants.ts; tipar a chave como union literal local
`"GitHub" | "LinkedIn" | "X" | "Instagram" | "WhatsApp"`).

## TASK 4: ProjectCard reutilizável

**Módulo**: src/components/ui
**Arquivos**: CREATE: `src/components/ui/project-card.tsx`
**Depende de**: nenhuma
**Verificação**: bunx tsc --noEmit

**Descrição Detalhada**: Componente client de card de projeto no idioma visual do repo:
```ts
interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  date: string;
  imageSrc?: string;        // ex.: /icons/img_project_mlx.webp
  imageAlt?: string;
  codeUrl?: string;         // botão primário "Ver código"
  demoUrl?: string;         // botão secundário "Ver demo"
  demoLabel?: string;       // texto do secundário (default "Ver demo")
  extraNote?: ReactNode;    // ex.: "Projeto confidencial da auclandesign.com"
  muted?: boolean;          // versão /60 do bg (linha do tempo)
}
```
Layout: `article` com `border border-[var(--finder-border)] rounded-xl overflow-hidden
bg-[var(--finder-sidebar)]` (`/60` quando muted); se `imageSrc`, `next/image` com width
640 height 360, `className="w-full h-36 object-cover"`, `alt` obrigatório; corpo com
padding 4/5: título (`text-base md:text-lg font-semibold text-[var(--finder-text)]`),
descrição (`text-[13px] md:text-sm text-[var(--finder-text-secondary)] leading-relaxed`),
chips de tecnologia (reproduzir o padrão TechChips de projects.tsx: li com
`text-xs font-medium text-[var(--finder-accent)] border border-[var(--finder-accent)]/40
bg-[var(--finder-accent)]/10 rounded-full px-2.5 py-1`), data em `text-xs`, e linha de
CTAs: primário `inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg
bg-[var(--finder-accent)] text-[var(--finder-accent-contrast)] text-[13px] font-medium
hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2
focus-visible:outline-[var(--finder-accent)]` com texto "Ver código"; secundário igual mas
`border border-[var(--finder-border)] text-[var(--finder-text)]
hover:bg-[var(--finder-hover)]` e texto demoLabel. Ambos `<a target="_blank"
rel="noopener noreferrer">`, renderizados só se a URL existir. `extraNote` em text-xs
itálico secundário.

## TASK 5: Spotlight (⌘K / ⌘F)

**Módulo**: src/components/main-content
**Arquivos**: CREATE: `src/components/main-content/spotlight.tsx`
**Depende de**: nenhuma (usa classes CSS da TASK 1, já mergeada quando a wave 2 integrar)
**Verificação**: bunx tsc --noEmit

**Descrição Detalhada**: Componente client `Spotlight` com props
`{ isOpen: boolean; onClose: () => void }`. Índice estático local:
```ts
interface SpotlightItem { label: string; hint: string; path: SectionPath; keywords: string }
```
(importar `SectionPath` de `@/types`; navegar com `useNavigation()` de
`@/hooks/use-navigation`). Itens: as 5 seções (Home, Sobre, Habilidades, Projetos,
Contato) + projetos (Nemesis Defender, MapHunter, Harvestin, Cifra-Tom, MLX Capital,
Alpha, Vega, WHFF-enD, NFTs CodeBoost → path "/projects") + grupos de skills
(TypeScript, React, Next.js, Rust, eBPF, Tailwind, Zod, Playwright, Segurança, Clean
Architecture → path "/skills") + atalhos (Baixar CV → executa window.open(CV_PATH)? NÃO:
manter só navegação por seção para escopo mínimo; "Contato" cobre o resto).
Comportamento: filtro case-insensitive por label+keywords; render em portal simples
(retornar null quando !isOpen); overlay `.spotlight-overlay` fecha no clique fora
(onClick no overlay, stopPropagation no painel); painel `.spotlight-panel` com input
autofocus (`.spotlight-input`, placeholder "Buscar seções, projetos, skills…", ícone
MagnifyingGlassIcon de heroicons) e lista de até 8 resultados `.spotlight-item`
(label + hint à direita em text-xs secundário); teclado: setas movem `activeIndex`,
Enter navega (`navigate(item.path)`) e fecha, Esc fecha; `useEffect` de keydown no
window somente enquanto aberto. Acessibilidade: `role="dialog" aria-modal="true"
aria-label="Busca"`, input com `aria-label`; lista `role="listbox"`, item ativo
`aria-selected`.

---

## WAVE 2A (dependem da Wave 1; arquivos disjuntos entre si)

## TASK 6: Top-bar (typing único, CV, ícones compartilhados)

**Módulo**: src/components/top-bar
**Arquivos**: MODIFY: `src/components/top-bar/top-bar.tsx`
**Depende de**: TASK 2, TASK 3
**Verificação**: bunx tsc --noEmit

**Descrição Detalhada**:
1. Typing: remover o loop apagar/redigitar; digitar `fullText` uma vez e parar (manter o
   cursor piscando). Envolver o `<h1>` com `whitespace-nowrap overflow-hidden
   text-ellipsis` para nunca quebrar em 2 linhas.
2. Substituir os SVGs inline de GitHub/LinkedIn por `GitHubIcon`/`LinkedInIcon` de
   `@/components/ui/social-icons`; e-mail via `EMAIL` de `@/lib/constants`.
3. Botão "CV" entre o e-mail e o share: usa `useDownload()` de `@/hooks/use-download`
   com `downloadFile(CV_PATH, CV_FILENAME)`; visual: `hidden sm:inline-flex items-center
   gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--finder-accent)]
   text-[var(--finder-accent-contrast)] text-xs font-medium hover:opacity-90
   transition-opacity` com `ArrowDownTrayIcon` (heroicons) e texto "CV"; `title="Baixar
   CV (PDF)"`; enquanto `isDownloading`, mostrar `progress`% no lugar do texto;
   `aria-label="Baixar CV em PDF"`. Em mobile (abaixo de sm) mostrar só o ícone.
4. Não alterar os modais.

## TASK 7: Footer (constants + ícones)

**Módulo**: src/components/footer
**Arquivos**: MODIFY: `src/components/footer/footer.tsx`
**Depende de**: TASK 2, TASK 3
**Verificação**: bunx tsc --noEmit

**Descrição Detalhada**: Substituir SVGs inline por `GitHubIcon`/`LinkedInIcon`; montar
`links` a partir de `SOCIAL_LINKS` (GitHub, LinkedIn) + item E-mail com `mailto:${EMAIL}`.
Nada mais muda.

## TASK 8: Hero da Home

**Módulo**: src/components/main-content/sections
**Arquivos**: MODIFY: `src/components/main-content/sections/home.tsx`
**Depende de**: TASK 1
**Verificação**: bunx tsc --noEmit

**Descrição Detalhada**:
1. Remover `min-h-[40vh] md:min-h-[60vh]` do bloco central; o hero inteiro deve caber na
   primeira dobra em 1280x800 (usar espaçamentos `space-y-6 md:space-y-8`).
2. TrueFocus do nome: manter, mas com `blurAmount={2}` e `pauseBetweenAnimations={3}`
   (menos tempo borrado); manter o subtítulo.
3. Acrescentar sub-headline de valor logo abaixo do subtítulo (text-sm md:text-base,
   secundário, max-w-xl mx-auto): "Autor do Nemesis Defender, framework open-source de
   segurança para agentes de IA em Rust e eBPF. Construo interfaces, design systems e
   backends com segurança por padrão."
4. `fernando.dev`: trocar `text-3xl sm:text-4xl md:text-[73px]` por
   `style={{ fontSize: "clamp(2.25rem, 7vw, 4.5rem)" }}` (manter font-dos e cor accent);
   RotatingText: `text-3xl sm:text-4xl md:text-[53px]` vira
   `style` clamp(1.75rem, 5.5vw, 3.25rem) no mainClassName base e trocar `text-black`
   por `text-[var(--finder-accent-contrast)]`.
5. CTAs: manter os dois botões, com o primário usando
   `text-[var(--finder-accent-contrast)]` no lugar de `text-white`.
6. Garantir `overflow-x: hidden`? NÃO: o clamp resolve; não adicionar overflow hidden.

## TASK 9: About (contraste do tópico ativo)

**Módulo**: src/components/main-content/sections
**Arquivos**: MODIFY: `src/components/main-content/sections/about.tsx`
**Depende de**: TASK 1
**Verificação**: bunx tsc --noEmit

**Descrição Detalhada**: No botão de tópico ativo (linha ~118) trocar
`bg-[var(--finder-accent)] text-white` por `bg-[var(--finder-accent)]
text-[var(--finder-accent-contrast)]`. Nada mais muda.

## TASK 10: Skills (contraste da seleção + AOS calmo)

**Módulo**: src/components/main-content/sections
**Arquivos**: MODIFY: `src/components/main-content/sections/skills.tsx`
**Depende de**: TASK 1
**Verificação**: bunx tsc --noEmit

**Descrição Detalhada**:
1. `AOS.init({ duration: 800, once: false, mirror: true })` vira
   `AOS.init({ duration: 600, once: true })`.
2. Linha selecionada: trocar `bg-[var(--finder-accent)] text-white` e os `text-white`
   / `text-white/80` derivados por `text-[var(--finder-accent-contrast)]` (e
   `text-[var(--finder-accent-contrast)]/80` nos secundários). O DocumentIcon selecionado
   idem.

---

## WAVE 2B (dependem da Wave 1; arquivos disjuntos entre si e com a 2A)

## TASK 11: Projects (ProjectCard + imagens + CTAs)

**Módulo**: src/components/main-content/sections
**Arquivos**: MODIFY: `src/components/main-content/sections/projects.tsx`
**Depende de**: TASK 1, TASK 4
**Verificação**: bunx tsc --noEmit

**Descrição Detalhada**:
1. Featured (mac-window): manter as janelas; substituir os links `↗ label` por botões no
   padrão do ProjectCard (primário "Ver código" para o repositório, secundário "Ver
   site/docs" para o segundo link quando houver), reutilizando as MESMAS classes de CTA
   (copiar classes, não importar o card aqui).
2. "Atuação profissional": manter como está (cards de texto), só trocar link sublinhado
   por nada novo (fora de escopo).
3. "Projetos pessoais" (Harvestin, Cifra-Tom): renderizar com `ProjectCard`
   (codeUrl=repo, demoUrl=site, demoLabel="Ver site"; Harvestin com extraNote
   "Interface autenticada, uso pessoal").
4. "Linha do tempo": renderizar com `ProjectCard muted` usando as imagens existentes:
   MLX CAPITAL → `/icons/img_project_mlx.webp`; ALPHA → `/icons/img_project_alpha.webp`;
   VEGA → `/icons/img_project_vega.webp`; WHFF-enD → `/icons/img_projetc_whffend.webp`
   (atenção ao typo real do arquivo: "projetc"); NFTs CodeBoost → sem imagem. Mapear os
   links atuais para codeUrl/demoUrl/extraNote equivalentes (ALPHA: sem URL própria,
   extraNote "Projeto confidencial da Auclan Design" + demoUrl auclandesign.com,
   demoLabel "auclandesign.com").
5. Manter os dados (títulos, descrições, datas, technologies) EXATAMENTE como estão.

## TASK 12: Contact (telefone plano, constants, ícones, reduced-motion)

**Módulo**: src/components/main-content/sections
**Arquivos**: MODIFY: `src/components/main-content/sections/contact.tsx`
**Depende de**: TASK 1, TASK 2, TASK 3
**Verificação**: bunx tsc --noEmit

**Descrição Detalhada**:
1. `const EMAIL` local sai; importar `EMAIL`, `PHONE_DISPLAY`, `SOCIAL_LINKS`, `CV_PATH`
   de `@/lib/constants`.
2. socialLinks: montar de `SOCIAL_LINKS` + Email (mailto) usando `SOCIAL_ICON_MAP` da
   TASK 3 (ícones com a MESMA classe atual `w-6 h-6 group-hover:animate-shake`).
3. Telefone: remover o TrueFocus manual; renderizar `PHONE_DISPLAY` em texto
   (`text-sm text-[var(--finder-text)]`) com botão copiar idêntico ao do e-mail
   (ClipboardIcon/CheckIcon, aria-live) e link `href` do WhatsApp ao lado.
4. Link "Baixar CV (PDF)" abaixo do e-mail: `<a href={CV_PATH} download>` estilizado como
   botão primário (mesmas classes de CTA da Home) com ArrowDownTrayIcon.
5. Crosshair: renderizar apenas se `!window.matchMedia("(prefers-reduced-motion:
   reduce)").matches` (via estado em useEffect; default renderiza).
6. Remover import do TrueFocus se ficar sem uso.

## TASK 13: Sidebar (estados Finder reais + focus)

**Módulo**: src/components/sidebar
**Arquivos**: MODIFY: `src/components/sidebar/favorites-section.tsx`,
`src/components/sidebar/theme-section.tsx`
**Depende de**: TASK 1
**Verificação**: bunx tsc --noEmit

**Descrição Detalhada**:
1. favorites-section: botão vira
   `flex-1 flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] transition-colors
   duration-150 focus-visible:outline-2 focus-visible:outline-[var(--finder-accent)]`;
   ativo: `bg-[var(--finder-accent)] text-[var(--finder-accent-contrast)]`; inativo:
   `text-finder-text hover:bg-[var(--finder-hover)]`. Remover `hover:border-b-2`,
   `hover:opacity-50` e `border-b-2` do ativo. Nos ícones: quando ativo, trocar a cor
   via `[&_svg_path]:fill-current`? NÃO (os SVGs usam fill/stroke var(--finder-accent)):
   manter os ícones como estão (accent sobre accent fica invisível), então no item ativo
   aplicar `style={{ color: "var(--finder-accent-contrast)" }}` no span do ícone e
   envolver os SVGs para herdarem `currentColor`: trocar `fill="var(--finder-accent)"` e
   `stroke="var(--finder-accent)"` por `fill="currentColor"`/`stroke="currentColor"` e
   no botão inativo aplicar `text-[var(--finder-accent)]` SOMENTE no span do ícone
   (mantém o visual atual) e no ativo o contraste.
2. theme-section: adicionar `focus-visible:outline-2
   focus-visible:outline-[var(--finder-accent)]` e trocar o ativo
   `bg-finder-accent bg-opacity-20` por `bg-[var(--finder-accent)]/15` (Tailwind 4 não
   tem bg-opacity-*; usar a sintaxe moderna) mantendo o texto normal.

## TASK 14: Info-modal "Sobre este portfólio"

**Módulo**: src/components/top-bar
**Arquivos**: MODIFY: `src/components/top-bar/info-modal.tsx`
**Depende de**: TASK 3
**Verificação**: bunx tsc --noEmit

**Descrição Detalhada**:
1. Remover `react-icons` (FaGithub/FaLinkedin) e usar `GitHubIcon`/`LinkedInIcon`.
2. features passa a specs reais (estilo About This Mac): card "Stack" (Next.js 16 App
   Router com export estático, React 19, TypeScript strict, Tailwind CSS 4) e card
   "Engenharia" (Biome, Bun, deploy Vercel, arquitetura por seções com temas dinâmicos
   via CSS vars). Texto de abertura: "Este portfólio recria a interface do Finder do
   macOS. Ele próprio é um projeto: código aberto, tipado e com deploy contínuo."
3. Adicionar linha com link para o repositório: `SITE_REPO_URL` de `@/lib/constants`
   ("Ver código-fonte deste portfólio").
4. Manter foto e links sociais existentes.

## TASK 15: Main-content (traffic lights seguros + Spotlight + vibrancy)

**Módulo**: src/components/main-content
**Arquivos**: MODIFY: `src/components/main-content/main-content.tsx`;
DELETE: `src/components/main-content/search.tsx`
**Depende de**: TASK 1, TASK 5
**Verificação**: bunx tsc --noEmit

**Descrição Detalhada**:
1. Remover import/uso de `Search` e deletar `search.tsx`; remover o estado
   `setSearchTerm`/`handleSearch`.
2. Novo estado `isSpotlightOpen`; keydown global (⌘K, ⌘F e Ctrl equivalentes) abre;
   renderizar `<Spotlight isOpen onClose>` no fim do container.
3. Na barra de título, no lugar do Search: botão de busca decorativo estilo Finder
   (`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-md
   bg-[var(--finder-search)] text-finder-text-secondary text-xs hover:text-finder-text`)
   com MagnifyingGlassIcon + kbd "⌘K", `aria-label="Abrir busca"`, onClick abre o
   Spotlight.
4. Traffic lights: vermelho → `setContentState("normal")` E `navigate("/")` (fecha a
   "janela" voltando à Home; aria-label "Fechar seção e voltar à Home"); amarelo →
   minimiza como hoje, MAS quando `contentState === "minimized"` renderizar no lugar do
   conteúdo uma faixa central clicável (mac-window pequena com o título da seção e texto
   "Seção minimizada. Clique para restaurar.", onClick volta a "normal"); verde mantém o
   comportamento atual; estado "hidden" deixa de existir (remover do tipo).
5. Sidebar: adicionar a classe `sidebar-vibrancy` ao container da sidebar (junto das
   classes atuais, substituindo `bg-finder-sidebar` no desktop; manter bg sólido no
   mobile overlay para legibilidade).
6. `navigate` já disponível via `useNavigation()`.

---

## Verificação final (suite do perfil)

```bash
bun run lint
bunx tsc --noEmit
bun run build
```
