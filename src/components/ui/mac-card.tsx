"use client";

import { type ReactNode, useState } from "react";

type CardState = "full" | "compact" | "collapsed";

interface MacCardProps {
  windowTitle: string;
  title: ReactNode;
  muted?: boolean;
  image?: ReactNode;
  description?: ReactNode;
  technologies?: ReactNode;
  date?: ReactNode;
  actions?: ReactNode;
  extraNote?: ReactNode;
  /** Padding do corpo: "default" (p-4 md:p-5) ou "featured" (p-5 md:p-6). */
  padding?: "default" | "featured";
}

const MacCard = ({
  windowTitle,
  title,
  muted = false,
  image,
  description,
  technologies,
  date,
  actions,
  extraNote,
  padding = "default",
}: MacCardProps) => {
  const [state, setState] = useState<CardState>("full");

  const paddingClass = padding === "featured" ? "p-5 md:p-6" : "p-4 md:p-5";

  return (
    <article className={`mac-window ${muted ? "bg-finder-sidebar/60" : "bg-finder-sidebar"}`}>
      <div className="mac-window-titlebar">
        <button
          type="button"
          aria-label="Fechar card"
          onClick={() => setState("collapsed")}
          className="hover:opacity-80 transition-opacity"
        >
          <img src="/icons/icon-mac-close_button.svg" width={12} height={12} alt="" />
        </button>
        <button
          type="button"
          aria-label="Minimizar card"
          onClick={() => setState("compact")}
          className="hover:opacity-80 transition-opacity"
        >
          <img src="/icons/icon-mac-minimize_button.svg" width={12} height={12} alt="" />
        </button>
        <button
          type="button"
          aria-label="Maximizar card"
          onClick={() => setState("full")}
          className="hover:opacity-80 transition-opacity"
        >
          <img src="/icons/icon-mac-maximize-button.svg" width={12} height={12} alt="" />
        </button>
        <span className="mac-window-title">{windowTitle}</span>
      </div>

      {state === "full" && image}

      <div className={paddingClass}>
        {title}

        {state === "full" && description}

        {(state === "full" || state === "compact") && technologies}

        {state === "full" && date}

        {actions}

        {state === "full" && extraNote}
      </div>
    </article>
  );
};

export default MacCard;
