# Hub Fernando.dev

Este é o meu portfolio pessoal como desenvolvedor Full-Stack TypeScript com foco em Rust e segurança. A interface imita o Finder do macOS: janelas com traffic lights, sidebar, barra superior e troca de tema por pastas coloridas. O objetivo é apresentar projetos, habilidades e experiência de forma interativa e com identidade visual própria.

**Demo:** https://hub-fernando-dev.vercel.app/

## Sobre mim

Sou desenvolvedor Full-Stack TypeScript (React/Next.js) com foco em segurança por padrão e governança determinística de agentes de IA. Construo desde interfaces e design systems até camadas de backend (BFF) e enforcement de baixo nível. Sou autor e mantenedor único do Nemesis Defender, um framework open-source de segurança escrito em Rust com camada de kernel em eBPF.

## Skills

- **Linguagens:** TypeScript (strict mode), JavaScript (ES6+), Rust, HTML5, CSS3
- **Frameworks e Bibliotecas:** React 19, Next.js (App Router, RSC), React Hook Form, Zod, Tailwind CSS
- **Arquitetura:** Clean Architecture, Design Systems com tokens semânticos, BFF via Route Handlers, contratos TypeScript explícitos
- **Dados e APIs:** Integração de APIs públicas com fallback entre provedores, cache local e rate limiting, pipelines de qualificação e enriquecimento
- **Segurança:** OWASP Top 10, OWASP for LLM, CSP Level 3 com nonce dinâmico, HSTS, modelagem de ameaças, defesa de supply-chain
- **Sistemas e Baixo Nível:** eBPF/BPF LSM, análise de AST com tree-sitter, design fail-closed, Linux e syscalls
- **Performance e Qualidade:** RSC/SSR/SSG/ISR, Lighthouse 90+, testes E2E com Playwright, quality gates em pre-commit
- **IA e Agentic Coding:** Claude Code, Cursor, Devin, Codex, OpenCode, Antigravity, com governança arquitetural explícita (SDD Pipeline)


### Atuação profissional

**Desenvolvedor Full-Stack na Auclan Design** (Nov 2024 até o momento)

Aplicações web, dashboards e portais com Next.js (App Router), React 19 e TypeScript em strict mode. BFF via Route Handlers, arquitetura em camadas (UI, Hooks, Services, Types) e segurança por padrão (CSP Level 3, HSTS, validação com Zod). Atualmente no desenvolvimento de um portal multi-perfil para uma operadora de plano odontológico, com testes E2E em Playwright e gates de segurança em pre-commit.

**UIKit Design System** (em andamento)

Design System em Tailwind CSS com tokens semânticos e mais de 160 componentes TypeScript reutilizáveis, com foco em escalabilidade, acessibilidade e consistência visual. Otimização de performance com RSC, SSR, SSG e ISR, com scores Lighthouse na faixa de 90+.

### Projetos pessoais

**Nemesis Defender v0** (Rust, eBPF, tree-sitter)

Framework de enforcement determinístico contra comandos destrutivos e malware de supply-chain em fluxos de desenvolvimento assistido por agentes LLM. Arquitetura em 3 camadas independentes: hooks de pre-tool multi-IDE, scanner com 6 camadas de análise e camada eBPF/BPF LSM no Linux. Em produção há 1,5 ano com zero incidentes.

- Código: https://github.com/feryamaha/Nemesis_Defender_v0
- Documentação: https://feryamaha.github.io/Nemesis_Defender_v0/


**Harvestin** (Next.js, React 19, TypeScript, Tailwind CSS 4, Bun)

Ferramenta pessoal de busca de emprego: agrega vagas de quadros públicos gratuitos, calcula score de compatibilidade do currículo e acompanha candidaturas em interface autenticada.

- Código: https://github.com/feryamaha/Harvestin
- Deploy: https://harvestin.vercel.app

**Cifra-Tom** (Next.js, TypeScript, Tailwind, Drizzle ORM, Playwright, Bun)

Plataforma de cifras para violão sem anúncios no meio da leitura: shape do acorde ao passar o mouse, transposição de tom com cálculo automático de capotraste, dicionário de acordes, metrônomo e afinador.

- Código: https://github.com/feryamaha/Cifra-Tom
- Deploy: https://cifra-tom.vercel.app

**MapHunter** (Next.js 16, React 19, TypeScript)

Plataforma de prospecção de leads B2B que agrega fontes públicas gratuitas (OpenStreetMap, ViaCEP, BrasilAPI, Receita Federal) para gerar, qualificar e enriquecer leads com CNPJ, e-mail e situação cadastral, sem depender de APIs pagas.

- Código: https://github.com/feryamaha/MapHunter
- Deploy: https://map-hunter-xi.vercel.app/

### Linha do tempo

- **MLX Capital** (Nov 2024): frontend com foco em performance e design pixel perfect. https://mlxcapital.com.br/
- **Alpha** (Dez 2024): frontend para cliente da Auclan Design, interfaces modernas e responsivas. https://auclandesign.com/
- **Vega** (Jan 2025): frontend com SCSS para sistema da Auclan Design. https://www.vegasat.com.br/
- **WHFF-enD** (Abr 2025): hub de conhecimento em React, projeto de aprendizado com Webpack e Babel. https://feryamaha.github.io/WHFF-enD/
- **NFTs CodeBoost** (Mai 2025): site didático com Next.js (App Router), Radix UI e Tailwind CSS. https://nf-ts-code-boost.vercel.app/

## Contato

- **Site:** https://hub-fernando-dev.vercel.app/
- **GitHub:** https://github.com/feryamaha
- **LinkedIn:** https://www.linkedin.com/in/feryamaha/
- **X (Twitter):** https://x.com/_feryamaha
- **Instagram:** https://www.instagram.com/fm_frontend/
- **WhatsApp:** https://wa.me/5514996010696

## Funcionalidades do site

- **Interface estilo Finder do macOS:** barra superior, sidebar com Favoritos e temas, janela central com traffic lights e conteúdo organizado em seções.
- **Navegação SPA por seção:** Home, About, Skills, Projects e Contact. Cada seção é montada no HTML para SEO e ocultada via CSS quando inativa.
- **Dock inferior no mobile:** barra de navegação fixa com os cinco destinos, no alcance do polegar, inspirada no Dock do macOS. Em telas maiores a navegação segue pela sidebar.
- **9 temas oficiais do macOS:** blue, green, green-lime, yellow, orange, red, purple, gray e black. O seletor de tema usa ícones de pasta WebP.
- **Skills interativa:** alternância entre visualização em lista e em ícones, reordenação por drag and drop, modal Quick Look e ícones de pasta dinâmicos.
- **About com interação de pasta:** ícone de pasta pulsante que revela o conteúdo do tópico ao ser clicado.
- **Animações:** framer-motion, AOS e GSAP para transições, digitação, foco de texto e movimento dos elementos.
- **Responsividade:** layout adaptado de 360 px a 1440 px, com `clamp()` para tipografia.
- **Acessibilidade:** estados de foco visíveis, preferência por movimento reduzido respeitada e rótulos ARIA nos controles.

## Stack

- **TypeScript 7.0.2** (strict mode)
- **Next.js 16.3.0** (App Router, export estático)
- **React 19.2.8**
- **Tailwind CSS 4.3.3** (tokens customizados e classes utilitárias)
- **Biome 1.9.4** (lint, format e organização de imports)
- **Bun** (runtime e gerenciador de pacotes)
- **framer-motion** (drag and drop, animações declarativas)
- **AOS** (animações de scroll)
- **GSAP** (animações avançadas)
- **@heroicons/react** e **react-icons** (iconografia)

## Scripts

```bash
bun run dev        # servidor de desenvolvimento
bun run build      # build estático, gera ./out
bun run start      # serve o build localmente (modo produção)
bun run lint       # verificação com Biome
bun run format     # formatação e correção automática com Biome
```
