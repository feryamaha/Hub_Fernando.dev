"use client";

import MacCard from "@/components/ui/mac-card";
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
  /** Texto do botão secundário (default "Ver demo"). */
  demoLabel?: string;
  /** Ex.: "Projeto confidencial da auclandesign.com". */
  extraNote?: ReactNode;
  /** Versão /60 do bg (linha do tempo). */
  muted?: boolean;
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
  demoLabel = "Ver demo",
  extraNote,
  muted = false,
}: ProjectCardProps) => {
  const image = imageSrc ? (
    <Image
      src={imageSrc}
      alt={imageAlt ?? ""}
      width={640}
      height={360}
      className="w-full h-64 object-cover object-left-top bg-[var(--finder-sidebar)]"
    />
  ) : undefined;

  const titleNode = (
    <h3 className="text-base md:text-lg font-semibold text-[var(--finder-text)]">{title}</h3>
  );

  const descriptionNode = (
    <p className="text-[13px] md:text-sm text-[var(--finder-text-secondary)] mt-2 leading-relaxed">
      {description}
    </p>
  );

  const technologiesNode = (
    <ul className="flex flex-wrap gap-2 mt-3" aria-label="Principais tecnologias">
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

  const dateNode = <p className="text-xs text-[var(--finder-text-secondary)] mt-3">{date}</p>;

  const actionsNode =
    codeUrl || demoUrl ? (
      <div className="flex flex-wrap gap-3 mt-4">
        {codeUrl && (
          <a
            href={codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[var(--finder-accent)] text-[var(--finder-accent-contrast)] text-[13px] font-medium hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--finder-accent)]"
          >
            Ver código
          </a>
        )}
        {demoUrl && (
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[var(--finder-border)] text-[var(--finder-text)] text-[13px] font-medium hover:bg-[var(--finder-hover)] transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--finder-accent)]"
          >
            {demoLabel}
          </a>
        )}
      </div>
    ) : undefined;

  const extraNoteNode = extraNote ? (
    <p className="text-xs italic text-[var(--finder-text-secondary)] mt-3">{extraNote}</p>
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
    />
  );
};

export default ProjectCard;
