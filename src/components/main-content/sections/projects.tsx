"use client";

import MacCard from "@/components/ui/mac-card";
import ProjectCard from "@/components/ui/project-card";
import Image from "next/image";
import type { ReactNode } from "react";

interface ProjectLink {
  label: string;
  url: string;
}

interface FeaturedProject {
  title: string;
  /** Rótulo curto exibido na barra de título da janela. */
  windowTitle: string;
  /** Resumo curto (2–3 linhas) para leitura rápida. */
  summary: string;
  /** Detalhamento técnico completo, exibido abaixo do resumo. */
  details: string;
  technologies: string[];
  date: string;
  links: ProjectLink[];
  imageSrc?: string;
  imageAlt?: string;
}

interface Project {
  title: string;
  windowTitle?: string;
  description: string;
  technologies: string[];
  date: string;
  link: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
}

interface CardProject {
  title: string;
  windowTitle?: string;
  description: string;
  technologies: string[];
  date: string;
  codeUrl?: string;
  demoUrl?: string;
  demoLabel?: string;
  imageSrc?: string;
  imageAlt?: string;
  extraNote?: ReactNode;
}

const featuredProjects: FeaturedProject[] = [
  {
    title: "NEMESIS DEFENDER v0",
    windowTitle: "nemesis-defender — rust · ebpf",
    summary:
      "Enforcement determinístico contra comandos destrutivos e malware de supply-chain em fluxos de desenvolvimento assistido por agentes LLM. Intercepta e bloqueia antes da execução via hooks de pre-tool (multi-IDE), scanner com 6 camadas (AST, byte, regex, denylist, entropia, decoder) e camada eBPF/BPF LSM no Linux como backstop de kernel.",
    details:
      "Arquitetura em 3 camadas independentes: Pretool/Posttool Hook (interceptação antes de Bash.run()/file-write), Nemesis Defender (scanner com 36 categorias na deny-list embutida e 14 visitors AST despachados) e eBPF Kernel LSM (Linux, opt-in). Quarentena por corroboração (move, não deleta) com reversibilidade via restore/purge. Suporta Claude Code, OpenAI Codex, Cursor, GitHub Copilot, VS Code, Devin e Gemini/Agents. Inclui Nemesis Doctor (7 verificações estruturadas) e suíte de pentest como gate de CI. Design fail-closed: qualquer panic vira exit 2 (bloqueio).",
    technologies: ["Rust", "eBPF", "BPF LSM", "tree-sitter", "Linux", "macOS", "AGPL-3.0"],
    date: "Em produção desde 2024 · Autor e mantenedor único",
    imageSrc: "/icons/img-nemesis-defender.jpg",
    imageAlt: "Arquitetura do Nemesis Defender",
    links: [
      {
        label: "Repositório: github.com/feryamaha/Nemesis_Defender_v0",
        url: "https://github.com/feryamaha/Nemesis_Defender_v0",
      },
      {
        label: "Documentação viva (site)",
        url: "https://feryamaha.github.io/Nemesis_Defender_v0/",
      },
    ],
  },
  {
    title: "MAPHUNTER",
    windowTitle: "maphunter — next.js · typescript",
    summary:
      "Plataforma de prospecção de leads B2B que agrega fontes públicas gratuitas (OpenStreetMap/Nominatim, ViaCEP, BrasilAPI e dados abertos da Receita Federal) para gerar, qualificar e enriquecer leads com CNPJ, e-mail e situação cadastral — sem depender de APIs pagas.",
    details:
      "Pipeline em etapas: busca agregada com geocoding e fallback entre provedores; qualificação por regras que descarta órgãos públicos, grandes redes e nichos fora do perfil antes de gastar consultas; enriquecimento de CNPJ com cache local e rate limiting; e exportação CSV/XLSX. Next.js 16 (App Router), React 19, TypeScript strict, Zod e React Hook Form, com arquitetura em camadas (UI → Hooks → Services → Types).",
    technologies: ["Next.js 16", "React 19", "TypeScript", "Zod", "Tailwind"],
    date: "2026 · Projeto pessoal",
    imageSrc: "/icons/img-map-hunter.png",
    imageAlt: "Interface da plataforma MapHunter",
    links: [
      {
        label: "Repositório: github.com/feryamaha/MapHunter",
        url: "https://github.com/feryamaha/MapHunter",
      },
      {
        label: "Deploy: map-hunter-xi.vercel.app",
        url: "https://map-hunter-xi.vercel.app/",
      },
    ],
  },
];

const currentWork: Project[] = [
  {
    title: "Desenvolvedor Full-Stack na Auclan Design",
    windowTitle: "auclan-design — next.js · typescript",
    description:
      "Aplicações web, dashboards e portais com Next.js (App Router), React 19 e TypeScript em strict mode. BFF via Route Handlers mantendo credenciais e regras sensíveis no servidor, arquitetura em camadas (UI → Hooks → Services → Types) com contratos explícitos e segurança por padrão (CSP Level 3 com nonce, HSTS, X-Frame-Options e validação em runtime com Zod). Atualmente no desenvolvimento de um portal multi-perfil (5 perfis de usuário) para uma operadora de plano odontológico: centenas de componentes tipados, testes E2E com Playwright e gates de segurança e arquitetura em pre-commit.",
    technologies: ["Next.js", "React 19", "TypeScript", "Tailwind", "Zod", "Playwright"],
    date: "Nov 2024 – Presente",
    imageSrc: "/icons/img-auclan-design.png",
    imageAlt: "Interface de projeto da Auclan Design",
    link: (
      <a
        href="https://auclandesign.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-finder-accent underline"
      >
        auclandesign.com
      </a>
    ),
  },
  {
    title: "UIKit Design System",
    windowTitle: "uikit — design system · tailwind",
    description:
      "Design System em Tailwind CSS com tokens semânticos e mais de 160 componentes TypeScript reutilizáveis, com foco em escalabilidade, acessibilidade e consistência visual — acelerando a entrega de features. Otimização de performance (RSC, SSR, SSG, ISR) com scores Lighthouse na faixa de 90+ e redução de ~20–30% no bundle.",
    technologies: ["React", "TypeScript", "Tailwind", "Next.js", "Design System"],
    date: "Em andamento (2025)",
    imageSrc: "/icons/img-auclan-design.png",
    imageAlt: "Componentes do UIKit Design System",
    link: (
      <a
        href="https://auclandesign.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-finder-accent underline"
      >
        auclandesign.com
      </a>
    ),
  },
];

const personalProjects: CardProject[] = [
  {
    title: "HARVESTIN",
    windowTitle: "harvestin — next.js · typescript",
    description:
      "Ferramenta pessoal de busca de emprego: agrega vagas de quadros públicos gratuitos e feeds de ATS, calcula score de compatibilidade do currículo com shortlist por limiar e acompanha candidaturas em interface autenticada. Projeto proprietário de uso individual.",
    technologies: ["Next.js", "React 19", "TypeScript", "Tailwind CSS 4", "Bun", "next-intl"],
    date: "2026 · Projeto pessoal",
    codeUrl: "https://github.com/feryamaha/Harvestin",
    demoUrl: "https://harvestin.vercel.app",
    demoLabel: "Ver site",
    imageSrc: "/icons/img-harvesting.png",
    imageAlt: "Interface do Harvestin",
    extraNote: "Interface autenticada, uso pessoal",
  },
  {
    title: "CIFRA-TOM",
    windowTitle: "cifra-tom — next.js · typescript",
    description:
      "Plataforma de cifras para violão sem anúncios no meio da leitura: shape do acorde ao passar o mouse, transposição de tom com cálculo automático de capotraste, leitura da progressão por números da escala, dicionário de acordes, metrônomo e afinador.",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Drizzle ORM", "Playwright", "Bun"],
    date: "2026 · Projeto pessoal",
    codeUrl: "https://github.com/feryamaha/Cifra-Tom",
    demoUrl: "https://cifra-tom.vercel.app",
    demoLabel: "Ver site",
    imageSrc: "/icons/img-cifra-tom.png",
    imageAlt: "Interface do Cifra-Tom",
  },
];

const pastProjects: CardProject[] = [
  {
    title: "MLX CAPITAL",
    windowTitle: "mlx-capital — frontend",
    description:
      "Construção de interfaces frontend para um cliente da Auclan Design, com ênfase em performance e design pixel perfect, integrando layouts dinâmicos.",
    technologies: ["HTML", "CSS", "JavaScript"],
    date: "Novembro de 2024",
    demoUrl: "https://mlxcapital.com.br/",
    demoLabel: "Ver site",
    imageSrc: "/icons/img_project_mlx.webp",
    imageAlt: "Interface do site MLX Capital",
  },
  {
    title: "ALPHA",
    windowTitle: "alpha — frontend",
    description:
      "Desenvolvimento do frontend para um cliente da Auclan Design, criando interfaces modernas e responsivas com foco em usabilidade e fidelidade ao design.",
    technologies: ["HTML", "CSS", "JavaScript"],
    date: "Dezembro de 2024",
    demoUrl: "https://auclandesign.com/",
    demoLabel: "auclandesign.com",
    imageSrc: "/icons/img_project_alpha.webp",
    imageAlt: "Interface do projeto Alpha da Auclan Design",
    extraNote: "Projeto confidencial da Auclan Design",
  },
  {
    title: "VEGA",
    windowTitle: "vega — frontend · scss",
    description:
      "Desenvolvimento frontend para um sistema da Auclan Design, utilizando SCSS para estilização avançada e garantindo responsividade e acessibilidade.",
    technologies: ["HTML", "SCSS", "JavaScript"],
    date: "Janeiro de 2025",
    demoUrl: "https://www.vegasat.com.br/",
    demoLabel: "Ver site",
    imageSrc: "/icons/img_project_vega.webp",
    imageAlt: "Interface do sistema Vega",
  },
  {
    title: "WHFF-enD",
    windowTitle: "whff-end — react",
    description:
      "Projeto pessoal de aprendizado em React, funcionando como um hub de conhecimento com foco em conceitos fundamentais, Webpack e Babel para robustez.",
    technologies: ["React", "SCSS", "JavaScript"],
    date: "Abril de 2025",
    demoUrl: "https://feryamaha.github.io/WHFF-enD/",
    demoLabel: "Ver site",
    imageSrc: "/icons/img_projetc_whffend.webp",
    imageAlt: "Interface do hub de conhecimento WHFF-enD",
  },
  {
    title: "NFTs CodeBoost",
    windowTitle: "nfts-codeboost — next.js",
    description:
      "Site didático para aprendizado de Next.js (App Router) no curso CodeBoost, com tema de NFTs: carrosséis interativos, componentes acessíveis (Radix UI) e Tailwind CSS.",
    technologies: ["Next.js", "React", "Tailwind", "Radix UI"],
    date: "Maio de 2025",
    demoUrl: "https://nf-ts-code-boost.vercel.app/",
    demoLabel: "Ver demo",
    imageSrc: "/icons/img-nft-boost.png",
    imageAlt: "Interface do site NFTs CodeBoost",
  },
];

const TechChips = ({ technologies }: { technologies: string[] }) => (
  <ul className="flex flex-wrap gap-2" aria-label="Principais tecnologias">
    {technologies.map((tech) => (
      <li
        key={tech}
        className="text-xs font-medium text-finder-accent border border-finder-accent/40 bg-finder-accent/10 rounded-full px-2.5 py-1"
      >
        {tech}
      </li>
    ))}
  </ul>
);

const Projects = () => {
  return (
    <div className="w-full p-4 md:p-8 max-w-4xl mx-auto">
      {/* Seção: Projetos em destaque (janelas macOS) */}
      <h2 className="text-2xl font-bold text-finder-accent mb-6">Projetos em destaque</h2>
      <div className="flex flex-col gap-8 mb-14">
        {featuredProjects.map((project) => (
          <MacCard
            key={project.title}
            windowTitle={project.windowTitle}
            padding="featured"
            title={
              <h3 className="text-xl md:text-2xl font-bold text-finder-accent">{project.title}</h3>
            }
            image={
              project.imageSrc ? (
                <Image
                  src={project.imageSrc}
                  alt={project.imageAlt ?? ""}
                  width={640}
                  height={360}
                  className="w-full h-64 object-cover object-left-top bg-finder-sidebar"
                />
              ) : undefined
            }
            description={
              <>
                <p className="text-[15px] text-finder-text mt-3 leading-relaxed">
                  {project.summary}
                </p>
                <p className="text-sm text-finder-text-secondary mt-3 leading-relaxed">
                  {project.details}
                </p>
              </>
            }
            technologies={<TechChips technologies={project.technologies} />}
            date={<p className="text-xs text-finder-text-secondary mt-3">{project.date}</p>}
            actions={
              <div className="flex flex-wrap gap-3 mt-4">
                {project.links[0] && (
                  <a
                    href={project.links[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-finder-accent text-finder-accent-contrast text-[13px] font-medium hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-finder-accent"
                  >
                    Ver código
                  </a>
                )}
                {project.links[1] && (
                  <a
                    href={project.links[1].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-finder-border text-finder-text text-[13px] font-medium hover:bg-finder-hover transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-finder-accent"
                  >
                    Ver site/docs
                  </a>
                )}
              </div>
            }
          />
        ))}
      </div>

      {/* Seção: Atuação profissional */}
      <h2 className="text-2xl font-bold text-finder-accent mb-6">Atuação profissional</h2>
      <div className="flex flex-col gap-6 mb-14">
        {currentWork.map((work) => (
          <MacCard
            key={work.title}
            windowTitle={work.windowTitle ?? work.title}
            title={<h3 className="text-lg font-semibold text-finder-text">{work.title}</h3>}
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
              <p className="text-sm text-finder-text-secondary mt-2 leading-relaxed">
                {work.description}
              </p>
            }
            technologies={<TechChips technologies={work.technologies} />}
            date={
              <p className="text-xs text-finder-text-secondary mt-3">
                {work.date} · {work.link}
              </p>
            }
          />
        ))}
      </div>

      {/* Seção: Projetos pessoais recentes */}
      <h2 className="text-2xl font-bold text-finder-accent mb-6">Projetos pessoais</h2>
      <div className="flex flex-col gap-6 mb-14">
        {personalProjects.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            windowTitle={project.windowTitle}
            description={project.description}
            technologies={project.technologies}
            date={project.date}
            codeUrl={project.codeUrl}
            demoUrl={project.demoUrl}
            demoLabel={project.demoLabel}
            imageSrc={project.imageSrc}
            imageAlt={project.imageAlt}
            extraNote={project.extraNote}
          />
        ))}
      </div>

      {/* Seção: Linha do tempo (primeiros trabalhos e estudos) */}
      <h2 className="text-2xl font-bold text-finder-accent mb-2">Linha do tempo</h2>
      <p className="text-sm text-finder-text-secondary mb-6">
        Primeiros trabalhos profissionais e projetos de estudo que marcaram a transição de carreira.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {pastProjects.map((project) => (
          <ProjectCard
            key={project.title}
            muted
            title={project.title}
            windowTitle={project.windowTitle}
            description={project.description}
            technologies={project.technologies}
            date={project.date}
            codeUrl={project.codeUrl}
            demoUrl={project.demoUrl}
            demoLabel={project.demoLabel}
            imageSrc={project.imageSrc}
            imageAlt={project.imageAlt}
            extraNote={project.extraNote}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;
