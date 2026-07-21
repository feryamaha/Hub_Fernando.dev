# SPEC_001 — Polimento profissional do portfólio (visão Designer + Recruiter)

REQUEST: Executar o plano de melhorias da análise de 2026-07-20 (Designer sênior +
Recruiter técnico): elevar primeira impressão, clareza para recrutador, consistência
visual, acessibilidade e micro-interações, preservando a identidade Finder/macOS.

CATEGORY: Feature + Refactor (UI)

PROBLEM (sintomas observáveis, verificados no código e no site ao vivo em 2026-07-20):
- Hero com dois focos concorrentes e `min-h-[40vh] md:min-h-[60vh]` (home.tsx:33) empurra
  os CTAs para fora da primeira dobra; texto de 73px gera overflow horizontal em larguras
  médias (scrollbar horizontal observada no browser).
- Nome "Moreira" permanece borrado na alternância do TrueFocus (screenshot da sessão).
- Não existe download de CV em nenhum componente; use-download.ts órfão (sem imports).
- Dois e-mails divergentes: contact.tsx:105 `feryamaha@hotmail.com` vs top-bar.tsx:113 e
  footer.tsx:45 `feryamaha@hotmail.com`.
- Traffic light vermelho/amarelo do main-content.tsx:107-128 esconde o conteúdo
  (`renderContent()` retorna null) sem caminho óbvio de volta.
- Cards de projeto sem imagem e com links sublinhados pequenos como único CTA;
  img_project_*.webp existentes em public/icons/ sem uso na seção.
- `text-white` sobre `--finder-accent` ilegível nos temas yellow (#ffe08c), orange
  (#febc2e) e green (#28c840): about.tsx:118, skills.tsx:491, home.tsx CTA; RotatingText
  usa `text-black` (home.tsx:61), inconsistente.
- Sidebar: hover aplica `opacity-50` (parece desabilitado) e ativo é só sublinhado
  (favorites-section.tsx:139-141); sem focus-visible; theme-section.tsx idem.
- Typing do top-bar em loop infinito digita/apaga e quebra em 2 linhas em larguras médias
  (observado no site ao vivo).
- Info-modal com texto genérico; usa react-icons duplicando SVGs já existentes inline.
- Telefone no contato exige hover palavra a palavra (TrueFocus manualMode,
  contact.tsx:209-218) para ficar legível.
- SVGs de GitHub/LinkedIn duplicados em top-bar, contact e footer.
- Search (search.tsx) registra ⌘F mas renderiza null e o termo é descartado
  (main-content.tsx:33): atalho morto.
- AOS do skills com `once:false, mirror:true` re-anima a cada scroll (distração).
- Sidebar sem vibrancy (Finder real tem translucidez).

CONTEXT:
- Repo: Hub_Fernando.dev (perfil em .devin/rules/nemesis-repo-profile.md).
- Todas as seções ficam montadas e ocultas via CSS (SEO), main-content.tsx.
- Temas por classe no <html> com vars --finder-accent etc. (globals.css).
- Assumpção A1 (decisão F8, flagada para confirmação do Fernando): e-mail canônico =
  feryamaha@hotmail.com (valor já usado em top-bar/footer e no cadastro da conta).
- Assumpção A2: o arquivo do CV NÃO existe no repo; o botão aponta para
  /cv-fernando-moreira.pdf e o Fernando adiciona o PDF em public/ antes do deploy
  (invariante 6 do AGENTS proposto: agente não fabrica asset). PENDÊNCIA declarada.
- ESCOPO EXCLUÍDO (estacionado, sem ação neste ciclo): (a) toggle i18n PT/EN completo
  (intersecta quase todos os arquivos; ciclo próprio); (b) self-host da fonte Modern DOS
  (exige download de asset externo, vedado; pendência para o Fernando); (c) remoção da
  dependência react-icons do package.json (área sensível; neste ciclo apenas o import
  deixa de ser usado); (d) thumbnails dos projetos em destaque (sem asset real).

REQUIREMENTS:
1. Tokens e base CSS (globals.css): criar `--finder-accent-contrast` por tema (preto nos
   accents claros yellow/orange/green/gray, branco nos escuros blue/red/purple/pink);
   vibrancy da sidebar (translucidez + backdrop-filter com fallback); bloco global
   `@media (prefers-reduced-motion: reduce)` neutralizando animações AOS/typing/rotating;
   estilos do Spotlight (overlay, resultado ativo).
2. Fonte única de dados: `src/lib/constants.ts` com EMAIL, PHONE_DISPLAY, PHONE_WA_URL,
   CV_PATH, SOCIAL (GitHub, LinkedIn, X, Instagram, WhatsApp) tipados e exportados.
3. Ícones sociais compartilhados: `src/components/ui/social-icons.tsx` exportando
   componentes SVG (GitHubIcon, LinkedInIcon, XIcon, InstagramIcon, WhatsAppIcon) com
   props de className; substituir os SVGs inline duplicados em top-bar, footer, contact e
   os react-icons do info-modal.
4. Hero (home.tsx): um único foco de identidade; nome nítido ao final da animação;
   sub-headline com proposta de valor concreta (autor do Nemesis Defender); CTAs na
   primeira dobra (remover min-h de 40/60vh); `fernando.dev` com font-size clamp();
   contraste dos CTAs via --finder-accent-contrast.
5. CV: botão "Download CV" no top-bar (usando use-download.ts + CV_PATH) e link na seção
   de contato.
6. Traffic lights do main-content: vermelho volta para Home (estado normal), amarelo
   minimiza com faixa de restauração visível ("dock" mínima com o título da seção),
   verde mantém maximizar; nunca deixar a área vazia sem affordance de retorno.
7. Spotlight ⌘K/⌘F: novo `src/components/main-content/spotlight.tsx` (substitui
   search.tsx, que é removido): overlay estilo Spotlight do macOS, busca estática sobre
   seções, skills e projetos, navegação por teclado (setas + Enter), Esc fecha; abre por
   ⌘K, ⌘F ou clique num campo de busca decorativo na barra de título.
8. Projetos (projects.tsx + novo ui/project-card.tsx): links viram botões CTA ("Ver
   código" primário, "Ver demo" secundário); cards da Linha do tempo usam as imagens
   existentes em public/icons/img_project_*.webp quando houver correspondência (mlx,
   alpha, vega, whffend); featured mantém janela mac-window com CTAs melhores.
9. Sidebar (favorites-section.tsx, theme-section.tsx): ativo = linha preenchida com
   accent + texto de contraste (padrão Finder real); hover = bg --finder-hover sem
   opacity; focus-visible em todos os botões.
10. Top-bar: typing digita UMA vez e mantém (cursor pisca); truncate sem quebra de linha;
    ícones via social-icons; botão CV.
11. About/Skills: texto sobre accent via --finder-accent-contrast (about.tsx tópico
    ativo, skills.tsx linha selecionada); AOS do skills com once:true sem mirror.
12. Contato: telefone em texto plano com botão copiar (mesmo padrão do e-mail); EMAIL e
    SOCIAL de constants.ts; Crosshair desativado sob prefers-reduced-motion; ícones via
    social-icons.
13. Info-modal: conteúdo "Sobre este portfólio" estilo About This Mac com stack real
    (Next.js 16, React 19, TS strict, Tailwind 4, Biome, Bun, export estático), link do
    repositório do portfólio, sem react-icons.

FILES INVOLVED:
- CREATE: src/lib/constants.ts
- CREATE: src/components/ui/social-icons.tsx
- CREATE: src/components/ui/project-card.tsx
- CREATE: src/components/main-content/spotlight.tsx
- MODIFY: src/app/globals.css
- MODIFY: src/components/top-bar/top-bar.tsx
- MODIFY: src/components/top-bar/info-modal.tsx
- MODIFY: src/components/footer/footer.tsx
- MODIFY: src/components/main-content/main-content.tsx
- MODIFY: src/components/main-content/sections/home.tsx
- MODIFY: src/components/main-content/sections/about.tsx
- MODIFY: src/components/main-content/sections/skills.tsx
- MODIFY: src/components/main-content/sections/projects.tsx
- MODIFY: src/components/main-content/sections/contact.tsx
- MODIFY: src/components/sidebar/favorites-section.tsx
- MODIFY: src/components/sidebar/theme-section.tsx
- DELETE: src/components/main-content/search.tsx (substituído pelo spotlight)

RESTRICTIONS:
- Regras 1-6 do perfil (TS strict, toolchain bun/biome, escopo, git só do Fernando, sem
  artefatos); nenhuma dependência nova; nenhum arquivo de área sensível tocado
  (package.json, next.config.ts, tailwind.config.ts, layout.tsx ficam intactos).
- Identidade Finder preservada (invariante 7); conteúdo em PT-BR na voz do Fernando.
- Nenhum dado inventado: textos novos derivam do conteúdo existente das seções.

EXPECTED DELIVERY:
- Todas as mudanças acima implementadas; visual coerente nos 8 temas de accent.
- bun run lint: PASS (sem erros novos; pré-existentes estacionados)
- bunx tsc --noEmit: PASS
- bun run build: PASS
- Verificação visual das seções afetadas no browser.

VERIFICATION:
$ bun run lint
$ bunx tsc --noEmit
$ bun run build
