"use client";

import MacCard from "@/components/ui/mac-card";
import ProjectCard from "@/components/ui/project-card";
import projects from "@/data/i18n/projects.json";
import { useLocale } from "@/hooks/use-locale";
import Image from "next/image";
import type { ReactNode } from "react";

interface ProjectLink {
  label: string;
  url: string;
}

/** Chaves estáveis (título original em PT, nunca traduzido) de cada subseção. */
type FeaturedProjectKey = "NEMESIS DEFENDER v0" | "MAPHUNTER";
type CurrentWorkKey = "Desenvolvedor Full-Stack na Auclan Design" | "UIKit Design System";
type CardProjectKey =
  | "HARVESTIN"
  | "CIFRA-TOM"
  | "MLX CAPITAL"
  | "ALPHA"
  | "VEGA"
  | "WHFF-enD"
  | "NFTs CodeBoost";

interface FeaturedProject {
  /** Chave estável usada para casar com `t.items` e na comparação de estado do card — nunca o título traduzido. */
  id: FeaturedProjectKey;
  /** Rótulo curto exibido na barra de título da janela. */
  windowTitle: string;
  technologies: string[];
  links: ProjectLink[];
  imageSrc?: string;
}

interface Project {
  id: CurrentWorkKey;
  windowTitle?: string;
  technologies: string[];
  link: ReactNode;
  imageSrc?: string;
}

interface CardProject {
  id: CardProjectKey;
  windowTitle?: string;
  technologies: string[];
  codeUrl?: string;
  demoUrl?: string;
  demoLabel?: string;
  imageSrc?: string;
}

const featuredProjects: FeaturedProject[] = [
  {
    id: "NEMESIS DEFENDER v0",
    windowTitle: "nemesis-defender — rust · ebpf",
    technologies: ["Rust", "eBPF", "BPF LSM", "tree-sitter", "Linux", "macOS", "AGPL-3.0"],
    imageSrc: "/icons/img-nemesis-defender.jpg",
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
    id: "MAPHUNTER",
    windowTitle: "maphunter — next.js · typescript",
    technologies: ["Next.js 16", "React 19", "TypeScript", "Zod", "Tailwind"],
    imageSrc: "/icons/img-map-hunter.png",
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
    id: "Desenvolvedor Full-Stack na Auclan Design",
    windowTitle: "auclan-design — next.js · typescript",
    technologies: ["Next.js", "React 19", "TypeScript", "Tailwind", "Zod", "Playwright"],
    imageSrc: "/icons/img-auclan-design.png",
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
    id: "UIKit Design System",
    windowTitle: "uikit — design system · tailwind",
    technologies: ["React", "TypeScript", "Tailwind", "Next.js", "Design System"],
    imageSrc: "/icons/img-auclan-design.png",
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
    id: "HARVESTIN",
    windowTitle: "harvestin — next.js · typescript",
    technologies: ["Next.js", "React 19", "TypeScript", "Tailwind CSS 4", "Bun", "next-intl"],
    codeUrl: "https://github.com/feryamaha/Harvestin",
    demoUrl: "https://harvestin.vercel.app",
    demoLabel: "Ver site",
    imageSrc: "/icons/img-harvesting.png",
  },
  {
    id: "CIFRA-TOM",
    windowTitle: "cifra-tom — next.js · typescript",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Drizzle ORM", "Playwright", "Bun"],
    codeUrl: "https://github.com/feryamaha/Cifra-Tom",
    demoUrl: "https://cifra-tom.vercel.app",
    demoLabel: "Ver site",
    imageSrc: "/icons/img-cifra-tom.png",
  },
];

const pastProjects: CardProject[] = [
  {
    id: "MLX CAPITAL",
    windowTitle: "mlx-capital — frontend",
    technologies: ["HTML", "CSS", "JavaScript"],
    demoUrl: "https://mlxcapital.com.br/",
    demoLabel: "Ver site",
    imageSrc: "/icons/img_project_mlx.webp",
  },
  {
    id: "ALPHA",
    windowTitle: "alpha — frontend",
    technologies: ["HTML", "CSS", "JavaScript"],
    demoUrl: "https://auclandesign.com/",
    demoLabel: "auclandesign.com",
    imageSrc: "/icons/img_project_alpha.webp",
  },
  {
    id: "VEGA",
    windowTitle: "vega — frontend · scss",
    technologies: ["HTML", "SCSS", "JavaScript"],
    demoUrl: "https://www.vegasat.com.br/",
    demoLabel: "Ver site",
    imageSrc: "/icons/img_project_vega.webp",
  },
  {
    id: "WHFF-enD",
    windowTitle: "whff-end — react",
    technologies: ["React", "SCSS", "JavaScript"],
    demoUrl: "https://feryamaha.github.io/WHFF-enD/",
    demoLabel: "Ver site",
    imageSrc: "/icons/img_projetc_whffend.webp",
  },
  {
    id: "NFTs CodeBoost",
    windowTitle: "nfts-codeboost — next.js",
    technologies: ["Next.js", "React", "Tailwind", "Radix UI"],
    demoUrl: "https://nf-ts-code-boost.vercel.app/",
    demoLabel: "Ver demo",
    imageSrc: "/icons/img-nft-boost.png",
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
  const locale = useLocale();
  const t = projects[locale];

  return (
    <div className="w-full p-4 md:p-8 max-w-4xl mx-auto">
      {/* Seção: Projetos em destaque (janelas macOS) */}
      <h2 className="text-2xl font-bold text-finder-accent mb-6">{t.headings.featured}</h2>
      <div className="flex flex-col gap-8 mb-14">
        {featuredProjects.map((project) => {
          const item = t.items[project.id];
          return (
            <MacCard
              key={project.id}
              windowTitle={project.windowTitle}
              padding="featured"
              initialState={project.id === "NEMESIS DEFENDER v0" ? "full" : "compact"}
              title={
                <h3 className="text-xl md:text-2xl font-bold text-finder-accent">{item.title}</h3>
              }
              image={
                project.imageSrc ? (
                  <Image
                    src={project.imageSrc}
                    alt={item.imageAlt ?? ""}
                    width={640}
                    height={360}
                    className="w-full h-64 object-cover object-left-top bg-finder-sidebar"
                  />
                ) : undefined
              }
              description={
                <>
                  <p className="text-[15px] text-finder-text mt-3 leading-relaxed">
                    {item.summary}
                  </p>
                  <p className="text-sm text-finder-text-secondary mt-3 leading-relaxed">
                    {item.details}
                  </p>
                </>
              }
              technologies={<TechChips technologies={project.technologies} />}
              date={<p className="text-xs text-finder-text-secondary mt-3">{item.date}</p>}
              actions={
                <div className="flex flex-wrap gap-3 mt-4">
                  {project.links[0] && (
                    <a
                      href={project.links[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-finder-accent text-finder-accent-contrast text-[13px] font-medium hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-finder-accent"
                    >
                      {t.actions.code}
                    </a>
                  )}
                  {project.links[1] && (
                    <a
                      href={project.links[1].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-finder-border text-finder-text text-[13px] font-medium hover:bg-finder-hover transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-finder-accent"
                    >
                      {t.actions.site}
                    </a>
                  )}
                </div>
              }
            />
          );
        })}
      </div>

      {/* Seção: Atuação profissional */}
      <h2 className="text-2xl font-bold text-finder-accent mb-6">{t.headings.currentWork}</h2>
      <div className="flex flex-col gap-6 mb-14">
        {currentWork.map((work) => {
          const item = t.items[work.id];
          return (
            <MacCard
              key={work.id}
              windowTitle={work.windowTitle ?? work.id}
              initialState="compact"
              title={<h3 className="text-lg font-semibold text-finder-text">{item.title}</h3>}
              image={
                work.imageSrc ? (
                  <Image
                    src={work.imageSrc}
                    alt={item.imageAlt ?? ""}
                    width={640}
                    height={360}
                    className="w-full h-64 object-cover object-left-top"
                  />
                ) : undefined
              }
              description={
                <p className="text-sm text-finder-text-secondary mt-2 leading-relaxed">
                  {item.description}
                </p>
              }
              technologies={<TechChips technologies={work.technologies} />}
              date={
                <p className="text-xs text-finder-text-secondary mt-3">
                  {item.date} · {work.link}
                </p>
              }
            />
          );
        })}
      </div>

      {/* Seção: Projetos pessoais recentes */}
      <h2 className="text-2xl font-bold text-finder-accent mb-6">{t.headings.personal}</h2>
      <div className="flex flex-col gap-6 mb-14">
        {personalProjects.map((project) => {
          const item = t.items[project.id];
          const extraNote = "extraNote" in item ? item.extraNote : undefined;
          return (
            <ProjectCard
              key={project.id}
              title={item.title}
              windowTitle={project.windowTitle}
              description={item.description}
              technologies={project.technologies}
              date={item.date}
              codeUrl={project.codeUrl}
              demoUrl={project.demoUrl}
              demoLabel={project.demoLabel}
              imageSrc={project.imageSrc}
              imageAlt={item.imageAlt}
              extraNote={extraNote}
              initialState="compact"
            />
          );
        })}
      </div>

      {/* Seção: Linha do tempo (primeiros trabalhos e estudos) */}
      <h2 className="text-2xl font-bold text-finder-accent mb-2">{t.headings.timeline}</h2>
      <p className="text-sm text-finder-text-secondary mb-6">{t.timelineSubtitle}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {pastProjects.map((project) => {
          const item = t.items[project.id];
          const extraNote = "extraNote" in item ? item.extraNote : undefined;
          return (
            <ProjectCard
              key={project.id}
              muted
              title={item.title}
              windowTitle={project.windowTitle}
              description={item.description}
              technologies={project.technologies}
              date={item.date}
              codeUrl={project.codeUrl}
              demoUrl={project.demoUrl}
              demoLabel={project.demoLabel}
              imageSrc={project.imageSrc}
              imageAlt={item.imageAlt}
              extraNote={extraNote}
              initialState="compact"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
