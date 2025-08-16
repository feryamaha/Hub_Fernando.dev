"use client";

import { useTheme } from "../../../hooks/useTheme";

const pastProjects = [
  {
    title: "AUTODATAF",
    description:
      "Projeto pessoal que organiza cursos gratuitos do YouTube para estudo focado de programação, com backend e frontend integrados para uma experiência fluida.",
    technologies: ["React", "CSS", "Node.js", "PostgreSQL"],
    date: "Março de 2024",
  },
  {
    title: "MLX CAPITAL",
    description:
      "Construção de interfaces frontend para um cliente da Auclan Design, com ênfase em performance e design pixel perfect, integrando layouts dinâmicos.",
    technologies: ["HTML", "CSS", "JavaScript"],
    date: "Novembro de 2024",
  },
  {
    title: "ALPHA",
    description:
      "Desenvolvimento do frontend para um cliente da Auclan Design, criando interfaces modernas e responsivas com foco em usabilidade e fidelidade ao design.",
    technologies: ["HTML", "CSS", "JavaScript"],
    date: "Dezembro de 2024",
  },
  {
    title: "VEGA",
    description:
      "Desenvolvimento frontend para um sistema da Auclan Design, utilizando SCSS para estilização avançada e garantindo responsividade e acessibilidade.",
    technologies: ["HTML", "SCSS", "JavaScript"],
    date: "Janeiro de 2025",
  },
  {
    title: "WHFF-enD",
    description:
      "Projeto pessoal de aprendizado em React, funcionando como um hub de conhecimento com foco em conceitos fundamentais, Webpack e Babel para robustez.",
    technologies: ["React", "SCSS", "JavaScript"],
    date: "Abril de 2025",
  },
];

const currentWork = [
  {
    title: "Trabalho Atual na Auclan Design",
    description:
      "Desenvolvendo componentes para o design system e frontend de sites utilizando Next.js, React, TypeScript e Tailwind. Integração de APIs para funcionalidades dinâmicas, colaborando com equipes de design e desenvolvedores front-end e back-end na Auclan Design.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind", "API Integration"],
    date: "Em andamento (2025)",
  },
  {
    title: "UIKit Design System",
    description:
      "Contribuição na criação e manutenção de um design system na Auclan Design, desenvolvendo componentes reutilizáveis com foco em escalabilidade, acessibilidade e consistência visual.",
    technologies: ["React", "TypeScript", "Tailwind", "Next.js"],
    date: "Em andamento (2025)",
  },
];

const Projects = () => {
  const [theme] = useTheme();

  return (
    <div className={`w-full p-8 theme-${theme}`}>
      {/* Seção: O que andei fazendo... */}
      <h2 className="text-2xl font-bold text-[var(--finder-accent)] mb-6">
        O que andei fazendo...
      </h2>
      <div className="flex flex-col gap-6 max-w-3xl mx-auto mb-12">
        {pastProjects.map((project, index) => (
          <div
            key={index}
            className="border-l-4 border-[var(--finder-accent)] pl-4"
          >
            <h3 className="text-xl font-semibold text-[var(--finder-accent)]">
              {project.title}
            </h3>
            <p className="text-sm text-[var(--finder-text)] mt-1">
              {project.description}
            </p>
            <p className="text-sm text-[var(--finder-text)]/80 mt-2">
              {project.date} |{" "}
              {project.technologies.map((tech) => `#${tech.toLowerCase()}`).join(" ")}
            </p>
          </div>
        ))}
      </div>

      {/* Seção: O que ando fazendo... */}
      <h2 className="text-2xl font-bold text-[var(--finder-accent)] mb-6">
        O que ando fazendo...
      </h2>
      <div className="flex flex-col gap-6 max-w-3xl mx-auto">
        {currentWork.map((work, index) => (
          <div
            key={index}
            className="border-l-4 border-[var(--finder-accent)] pl-4"
          >
            <h3 className="text-xl font-semibold text-[var(--finder-accent)]">
              {work.title}
            </h3>
            <p className="text-sm text-[var(--finder-text)] mt-1">
              {work.description}
            </p>
            <p className="text-sm text-[var(--finder-text)]/80 mt-2">
              {work.date} |{" "}
              {work.technologies.map((tech) => `#${tech.toLowerCase()}`).join(" ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;