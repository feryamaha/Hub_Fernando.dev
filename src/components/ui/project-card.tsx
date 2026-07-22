"use client";

import MacCard, { type CardState } from "@/components/ui/mac-card";
import sidebar from "@/data/i18n/sidebar.json";
import { useLocale } from "@/hooks/use-locale";
import Image from "next/image";
import type { ReactNode } from "react";

interface ProjectCardProps {
  title: string;
  /** Rótulo curto exibido na barra de título da janela macOS. */
  windowTitle?: string;
  description: string;
  technologies: string[];
  date: string;
  /** Ex.: /icons/img_project_mlx.webp */
  imageSrc?: string;
  imageAlt?: string;
  /** Botão primário "Ver código". */
  codeUrl?: string;
  /** Botão secundário "Ver demo". */
  demoUrl?: string;
  /** Texto do botão secundário (padrão vem do idioma). */
  demoLabel?: string;
  /** Ex.: "Projeto confidencial da auclandesign.com". */
  extraNote?: ReactNode;
  /** Versão /60 do bg (linha do tempo). */
  muted?: boolean;
  /** Estado inicial do card. Default "full". */
  initialState?: CardState;
}

const ProjectCard = ({
  title,
  windowTitle,
  description,
  technologies,
  date,
  imageSrc,
  imageAlt,
  codeUrl,
  demoUrl,
  demoLabel,
  extraNote,
  muted = false,
  initialState,
}: ProjectCardProps) => {
  const locale = useLocale();
  const t = sidebar[locale];
  const image = imageSrc ? (
    <Image
      src={imageSrc}
      alt={imageAlt ?? ""}
      width={640}
      height={360}
      className="w-full h-64 object-cover object-left-top bg-finder-sidebar"
    />
  ) : undefined;

  const titleNode = (
    <h3 className="text-base md:text-lg font-semibold text-finder-text">{title}</h3>
  );

  const descriptionNode = (
    <p className="text-[13px] md:text-sm text-finder-text-secondary mt-2 leading-relaxed">
      {description}
    </p>
  );

  const technologiesNode = (
    <ul className="flex flex-wrap gap-2 mt-3" aria-label={t.projectTechnologiesAriaLabel}>
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

  const dateNode = <p className="text-xs text-finder-text-secondary mt-3">{date}</p>;

  const actionsNode =
    codeUrl || demoUrl ? (
      <div className="flex flex-wrap gap-3 mt-4">
        {codeUrl && (
          <a
            href={codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-finder-accent text-finder-accent-contrast text-[13px] font-medium hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-finder-accent"
          >
            {t.projectViewCodeLabel}
          </a>
        )}
        {demoUrl && (
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-finder-border text-finder-text text-[13px] font-medium hover:bg-finder-hover transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-finder-accent"
          >
            {demoLabel ?? t.projectViewDemoLabel}
          </a>
        )}
      </div>
    ) : undefined;

  const extraNoteNode = extraNote ? (
    <p className="text-xs italic text-finder-text-secondary mt-3">{extraNote}</p>
  ) : undefined;

  return (
    <MacCard
      windowTitle={windowTitle ?? title}
      title={titleNode}
      muted={muted}
      image={image}
      description={descriptionNode}
      technologies={technologiesNode}
      date={dateNode}
      actions={actionsNode}
      extraNote={extraNoteNode}
      initialState={initialState}
    />
  );
};

export default ProjectCard;
