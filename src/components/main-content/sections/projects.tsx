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

const featuredProjects: Project[] = [
  {
    title: "NEMESIS DEFENDER v2.0",
    description:
      "Framework open-source de enforcement de segurança escrito em Rust com camada de kernel em eBPF/BPF LSM no Linux. Três camadas independentes (pre-tool hooks, scanner de conteúdo e LSM no kernel) bloqueiam comandos destrutivos e malware de supply-chain antes da execução. Em produção há ~1,5 ano com agentes LLM operando sobre o código: zero comandos destrutivos executados e zero acessos não autorizados. Inclui pipeline de varredura em 6 estágios (AST via tree-sitter, byte-level, regex, deny-list, entropia e decoder recursivo), 18 visitors, +2.000 bloqueios reais em syscalls perigosas e uma suíte autoral de 184 testes em 26 módulos. Design fail-closed, quarentena por corroboração e arquitetura agnóstica de IDE.",
    technologies: ["Rust", "eBPF", "BPF LSM", "tree-sitter", "Linux", "AGPL-3.0"],
    date: "Em produção desde 2024 · Autor e mantenedor único",
    link: (
      <a
        href="https://github.com/feryamaha/Nemesis_Defender_v2.0"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--finder-accent)] underline"
      >
        github.com/feryamaha/Nemesis_Defender_v2.0
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
      <a
        href="https://mlxcapital.com.br/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--finder-accent)] underline flex gap-2"
      >
        mlxcapital.com.br{" "}
        <a
          href="https://auclandesign.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--finder-accent)] underline"
        >
          auclandesign.com
        </a>
      </a>
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
      {/* Seção: Projeto em destaque */}
      <h2 className="text-2xl font-bold text-[var(--finder-accent)] mb-6">
        Projeto em destaque...
      </h2>
      <div className="flex flex-col gap-6 max-w-3xl mx-auto mb-12">
        {featuredProjects.map((project) => (
          <div
            key={project.title}
            className="border-l-4 border-[var(--finder-accent)] pl-4 bg-[var(--finder-accent)]/5 rounded-r-lg py-3 pr-3"
          >
            <h3 className="text-xl font-semibold text-[var(--finder-accent)]">{project.title}</h3>
            <p className="text-sm text-[var(--finder-text)] mt-1">{project.description}</p>
            <p className="text-sm text-[var(--finder-text)]/80 mt-2">
              {project.date} |{" "}
              {project.technologies.map((tech) => `#${tech.toLowerCase()}`).join(" ")}
            </p>
            <span className="flex gap-2">
              {" "}
              Repositório: <p> {project.link} </p>{" "}
            </span>
          </div>
        ))}
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
            <span className="flex gap-2">
              {" "}
              Deploy: <p> {project.link} </p>{" "}
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
            <span className="flex gap-2">
              {" "}
              Auclan: <p> {work.link} </p>{" "}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
