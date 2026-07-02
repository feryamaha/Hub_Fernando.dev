"use client";

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
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  date: string;
  link: ReactNode;
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
    links: [
      {
        label: "Repositório: github.com/feryamaha/MapHunter",
        url: "https://github.com/feryamaha/MapHunter",
      },
    ],
  },
];

const currentWork: Project[] = [
  {
    title: "Desenvolvedor Full-Stack na Auclan Design",
    description:
      "Aplicações web, dashboards e portais com Next.js (App Router), React 19 e TypeScript em strict mode. BFF via Route Handlers mantendo credenciais e regras sensíveis no servidor, arquitetura em camadas (UI → Hooks → Services → Types) com contratos explícitos e segurança por padrão (CSP Level 3 com nonce, HSTS, X-Frame-Options e validação em runtime com Zod). Atualmente no desenvolvimento de um portal multi-perfil (5 perfis de usuário) para uma operadora de plano odontológico: centenas de componentes tipados, testes E2E com Playwright e gates de segurança e arquitetura em pre-commit.",
    technologies: ["Next.js", "React 19", "TypeScript", "Tailwind", "Zod", "Playwright"],
    date: "Nov 2024 – Presente",
    link: (
      <a
        href="https://auclandesign.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--finder-accent)] underline"
      >
        auclandesign.com
      </a>
    ),
  },
  {
    title: "UIKit Design System",
    description:
      "Design System em Tailwind CSS com tokens semânticos e mais de 160 componentes TypeScript reutilizáveis, com foco em escalabilidade, acessibilidade e consistência visual — acelerando a entrega de features. Otimização de performance (RSC, SSR, SSG, ISR) com scores Lighthouse na faixa de 90+ e redução de ~20–30% no bundle.",
    technologies: ["React", "TypeScript", "Tailwind", "Next.js", "Design System"],
    date: "Em andamento (2025)",
    link: (
      <a
        href="https://auclandesign.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--finder-accent)] underline"
      >
        auclandesign.com
      </a>
    ),
  },
];

const pastProjects: Project[] = [
  {
    title: "MLX CAPITAL",
    description:
      "Construção de interfaces frontend para um cliente da Auclan Design, com ênfase em performance e design pixel perfect, integrando layouts dinâmicos.",
    technologies: ["HTML", "CSS", "JavaScript"],
    date: "Novembro de 2024",
    link: (
      <span className="flex gap-2">
        <a
          href="https://mlxcapital.com.br/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--finder-accent)] underline"
        >
          mlxcapital.com.br
        </a>
      </span>
    ),
  },
  {
    title: "ALPHA",
    description:
      "Desenvolvimento do frontend para um cliente da Auclan Design, criando interfaces modernas e responsivas com foco em usabilidade e fidelidade ao design.",
    technologies: ["HTML", "CSS", "JavaScript"],
    date: "Dezembro de 2024",
    link: (
      <span className="flex gap-2">
        <span className="no-underline italic text-[var(--finder-text-secondary)]">
          Projeto confidencial da
        </span>
        <a
          href="https://auclandesign.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--finder-accent)] underline"
        >
          auclandesign.com
        </a>
      </span>
    ),
  },
  {
    title: "VEGA",
    description:
      "Desenvolvimento frontend para um sistema da Auclan Design, utilizando SCSS para estilização avançada e garantindo responsividade e acessibilidade.",
    technologies: ["HTML", "SCSS", "JavaScript"],
    date: "Janeiro de 2025",
    link: (
      <a
        href="https://www.vegasat.com.br/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--finder-accent)] underline"
      >
        vegasat.com.br
      </a>
    ),
  },
  {
    title: "WHFF-enD",
    description:
      "Projeto pessoal de aprendizado em React, funcionando como um hub de conhecimento com foco em conceitos fundamentais, Webpack e Babel para robustez.",
    technologies: ["React", "SCSS", "JavaScript"],
    date: "Abril de 2025",
    link: (
      <a
        href="https://feryamaha.github.io/WHFF-enD/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--finder-accent)] underline"
      >
        feryamaha.github.io/WHFF-enD
      </a>
    ),
  },
  {
    title: "NFTs CodeBoost",
    description:
      "Site didático para aprendizado de Next.js (App Router) no curso CodeBoost, com tema de NFTs: carrosséis interativos, componentes acessíveis (Radix UI) e Tailwind CSS.",
    technologies: ["Next.js", "React", "Tailwind", "Radix UI"],
    date: "Maio de 2025",
    link: (
      <a
        href="https://nf-ts-code-boost.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--finder-accent)] underline"
      >
        nf-ts-code-boost.vercel.app
      </a>
    ),
  },
];

const TechChips = ({ technologies }: { technologies: string[] }) => (
  <ul className="flex flex-wrap gap-2" aria-label="Principais tecnologias">
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

const Projects = () => {
  return (
    <div className="w-full p-4 md:p-8 max-w-4xl mx-auto">
      {/* Seção: Projetos em destaque (janelas macOS) */}
      <h2 className="text-2xl font-bold text-[var(--finder-accent)] mb-6">Projetos em destaque</h2>
      <div className="flex flex-col gap-8 mb-14">
        {featuredProjects.map((project) => (
          <article key={project.title} className="mac-window">
            <div className="mac-window-titlebar">
              <span className="traffic-light close" />
              <span className="traffic-light minimize" />
              <span className="traffic-light maximize" />
              <span className="mac-window-title">{project.windowTitle}</span>
            </div>

            <div className="p-5 md:p-6">
              <h3 className="text-xl md:text-2xl font-bold text-[var(--finder-accent)]">
                {project.title}
              </h3>

              <p className="text-[15px] text-[var(--finder-text)] mt-3 leading-relaxed">
                {project.summary}
              </p>

              <p className="text-sm text-[var(--finder-text-secondary)] mt-3 leading-relaxed">
                {project.details}
              </p>

              <div className="mt-4">
                <TechChips technologies={project.technologies} />
              </div>

              <p className="text-xs text-[var(--finder-text-secondary)] mt-3">{project.date}</p>

              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4">
                {project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--finder-accent)] underline font-medium"
                  >
                    ↗ {link.label}
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Seção: Atuação profissional */}
      <h2 className="text-2xl font-bold text-[var(--finder-accent)] mb-6">Atuação profissional</h2>
      <div className="flex flex-col gap-6 mb-14">
        {currentWork.map((work) => (
          <article
            key={work.title}
            className="border border-[var(--finder-border)] rounded-xl p-5 bg-[var(--finder-sidebar)]"
          >
            <h3 className="text-lg font-semibold text-[var(--finder-text)]">{work.title}</h3>
            <p className="text-sm text-[var(--finder-text-secondary)] mt-2 leading-relaxed">
              {work.description}
            </p>
            <div className="mt-3">
              <TechChips technologies={work.technologies} />
            </div>
            <p className="text-xs text-[var(--finder-text-secondary)] mt-3">
              {work.date} · {work.link}
            </p>
          </article>
        ))}
      </div>

      {/* Seção: Linha do tempo (primeiros trabalhos e estudos) */}
      <h2 className="text-2xl font-bold text-[var(--finder-accent)] mb-2">Linha do tempo</h2>
      <p className="text-sm text-[var(--finder-text-secondary)] mb-6">
        Primeiros trabalhos profissionais e projetos de estudo que marcaram a transição de carreira.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {pastProjects.map((project) => (
          <article
            key={project.title}
            className="border border-[var(--finder-border)] rounded-xl p-4 bg-[var(--finder-sidebar)]/60"
          >
            <h3 className="text-base font-semibold text-[var(--finder-text)]">{project.title}</h3>
            <p className="text-[13px] text-[var(--finder-text-secondary)] mt-1 leading-relaxed">
              {project.description}
            </p>
            <p className="text-xs text-[var(--finder-text-secondary)] mt-2">
              {project.date} ·{" "}
              {project.technologies.map((tech) => `#${tech.toLowerCase()}`).join(" ")}
            </p>
            <span className="block text-[13px] mt-2">{project.link}</span>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Projects;
