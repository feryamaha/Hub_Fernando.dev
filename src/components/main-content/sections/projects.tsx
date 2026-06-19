"use client";

import { useTheme } from "@/hooks/use-theme";
import type { ReactNode } from "react";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  date: string;
  link: ReactNode;
}

interface FeaturedProject {
  title: string;
  /** Resumo curto (2–3 linhas) para leitura rápida no card-herói. */
  summary: string;
  /** Detalhamento técnico completo, exibido abaixo do resumo. */
  details: string;
  technologies: string[];
  date: string;
  /** Repositório canônico do projeto. */
  repoUrl: string;
  repoLabel: string;
  /** Documentação viva (README/wiki) do projeto. */
  docsUrl: string;
  docsLabel: string;
}

const heroProject: FeaturedProject = {
  title: "NEMESIS DEFENDER v0",
  summary:
    "Framework open-source de enforcement de segurança em Rust, com camada de kernel em eBPF/BPF LSM no Linux. Bloqueia comandos destrutivos e malware de supply-chain antes da execução, em três camadas independentes e design fail-closed.",
  details:
    "Em produção há ~1,5 ano com agentes LLM operando sobre o código: zero comandos destrutivos executados e zero acessos não autorizados. Inclui pipeline de varredura em 6 estágios (AST via tree-sitter, byte-level, regex, deny-list, entropia e decoder recursivo), 18 visitors, +2.000 bloqueios reais em syscalls perigosas e uma suíte autoral de 184 testes em 26 módulos. Quarentena por corroboração e arquitetura agnóstica de IDE.",
  technologies: ["Rust", "eBPF", "BPF LSM", "tree-sitter", "Linux", "AGPL-3.0"],
  date: "Em produção desde 2024 · Autor e mantenedor único",
  repoUrl: "https://github.com/feryamaha/Nemesis_Defender_v0",
  repoLabel: "github.com/feryamaha/Nemesis_Defender_v0",
  docsUrl: "https://feryamaha.github.io/Nemesis_Defender_v0/",
  docsLabel: "Documentação viva (site)",
};

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
    title: "ALPHA",
    description:
      "Desenvolvimento do frontend para um cliente da Auclan Design, criando interfaces modernas e responsivas com foco em usabilidade e fidelidade ao design.",
    technologies: ["HTML", "CSS", "JavaScript"],
    date: "Dezembro de 2024",
    link: (
      <span className="flex gap-2">
        <span className="no-underline italic text-md text-gray-300">Projeto Confidencial da</span>
        <a
          href="https://auclandesign.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--finder-accent)] underline flex gap-2"
        >
          {" "}
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
      <span className="flex gap-2">
        <a
          href="https://www.vegasat.com.br/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--finder-accent)] underline flex gap-2"
        >
          {" "}
          vegasat.com.br
        </a>
        <a
          href="https://auclandesign.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--finder-accent)] underline flex gap-2"
        >
          {" "}
          auclandesign.com
        </a>
      </span>
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
        className="text-[var(--finder-accent)] underline flex gap-2"
      >
        {" "}
        feryamaha.github.io/WHFF-enD/
      </a>
    ),
  },
  {
    title: "NFTs CodeBoost",
    description:
      "Site didático para aprendizado de Next.js (App Router) no curso CodeBoost, com tema de NFTs. Inclui carrosséis interativos (Swiper), ícones modernos (Lucide), componentes acessíveis (Radix UI), e estilização com Tailwind CSS, otimizado por Turbopack e deploy no Vercel.",
    technologies: [
      "Next.js",
      "React",
      "Tailwind",
      "Radix UI",
      "Swiper",
      "Lucide Icons",
      "Turbopack",
    ],
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

const currentWork: Project[] = [
  {
    title: "Desenvolvedor Full-Stack na Auclan Design",
    description:
      "Aplicações web, dashboards e portais com Next.js (App Router), React 19 e TypeScript em strict mode. BFF via Route Handlers mantendo credenciais e regras sensíveis no servidor, arquitetura em camadas (UI → Hooks → Services → Types) com contratos explícitos e segurança por padrão (CSP Level 3 com nonce, HSTS, X-Frame-Options e validação em runtime com Zod).",
    technologies: ["Next.js", "React 19", "TypeScript", "Tailwind", "Zod", "Security"],
    date: "Nov 2024 – Presente",
    link: (
      <a
        href="https://auclandesign.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--finder-accent)] underline flex gap-2"
      >
        {" "}
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
        className="text-[var(--finder-accent)] underline flex gap-2"
      >
        {" "}
        auclandesign.com
      </a>
    ),
  },
];

const Projects = () => {
  const [theme] = useTheme();

  return (
    <div className={`w-full p-8 theme-${theme}`}>
      {/* Seção: Projeto em destaque (herói) */}
      <h2 className="text-2xl font-bold text-[var(--finder-accent)] mb-6">
        Projeto em destaque...
      </h2>
      <div className="max-w-3xl mx-auto mb-12">
        <article className="border-l-4 border-[var(--finder-accent)] pl-5 bg-[var(--finder-accent)]/5 rounded-r-lg py-4 pr-4">
          <h3 className="text-2xl font-bold text-[var(--finder-accent)]">{heroProject.title}</h3>

          {/* Resumo curto (2–3 linhas) */}
          <p className="text-base text-[var(--finder-text)] mt-2 leading-relaxed">
            {heroProject.summary}
          </p>

          {/* Detalhamento técnico */}
          <p className="text-sm text-[var(--finder-text)]/80 mt-3 leading-relaxed">
            {heroProject.details}
          </p>

          {/* Principais tecnologias */}
          <ul className="flex flex-wrap gap-2 mt-4" aria-label="Principais tecnologias">
            {heroProject.technologies.map((tech) => (
              <li
                key={tech}
                className="text-xs font-medium text-[var(--finder-accent)] border border-[var(--finder-accent)]/40 bg-[var(--finder-accent)]/10 rounded-full px-2.5 py-1"
              >
                {tech}
              </li>
            ))}
          </ul>

          <p className="text-xs text-[var(--finder-text)]/70 mt-3">{heroProject.date}</p>

          {/* Links: repositório canônico + documentação viva */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4">
            <a
              href={heroProject.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--finder-accent)] underline font-medium"
            >
              ↗ Repositório: {heroProject.repoLabel}
            </a>
            <a
              href={heroProject.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--finder-accent)] underline font-medium"
            >
              ↗ {heroProject.docsLabel}
            </a>
          </div>
        </article>
      </div>

      {/* Seção: O que andei fazendo... */}
      <h2 className="text-2xl font-bold text-[var(--finder-accent)] mb-6">
        O que andei fazendo...
      </h2>
      <div className="flex flex-col gap-6 max-w-3xl mx-auto mb-12">
        {pastProjects.map((project) => (
          <div key={project.title} className="border-l-4 border-[var(--finder-accent)] pl-4">
            <h3 className="text-xl font-semibold text-[var(--finder-accent)]">{project.title}</h3>
            <p className="text-sm text-[var(--finder-text)] mt-1">{project.description}</p>
            <p className="text-sm text-[var(--finder-text)]/80 mt-2">
              {project.date} |{" "}
              {project.technologies.map((tech) => `#${tech.toLowerCase()}`).join(" ")}
            </p>
            <span className="flex gap-2 text-sm text-[var(--finder-text)]/80 mt-2">
              Deploy: {project.link}
            </span>
          </div>
        ))}
      </div>

      {/* Seção: O que ando fazendo... */}
      <h2 className="text-2xl font-bold text-[var(--finder-accent)] mb-6">O que ando fazendo...</h2>
      <div className="flex flex-col gap-6 max-w-3xl mx-auto">
        {currentWork.map((work) => (
          <div key={work.title} className="border-l-4 border-[var(--finder-accent)] pl-4">
            <h3 className="text-xl font-semibold text-[var(--finder-accent)]">{work.title}</h3>
            <p className="text-sm text-[var(--finder-text)] mt-1">{work.description}</p>
            <p className="text-sm text-[var(--finder-text)]/80 mt-2">
              {work.date} | {work.technologies.map((tech) => `#${tech.toLowerCase()}`).join(" ")}
            </p>
            <span className="flex gap-2 text-sm text-[var(--finder-text)]/80 mt-2">
              Auclan: {work.link}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
