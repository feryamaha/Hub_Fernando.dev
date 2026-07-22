"use client";

import { useNavigation } from "@/hooks/use-navigation";
import useScreenSize from "@/hooks/use-screen-size";
import type { SectionPath } from "@/types";
import type { ReactNode } from "react";

interface DockItem {
  path: SectionPath;
  label: string;
  icon: ReactNode;
}

const Dock = () => {
  const screenSize = useScreenSize();
  const { section, navigate } = useNavigation();

  if (!screenSize.isMobile) return null;

  const items: DockItem[] = [
    {
      path: "/",
      label: "Home",
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Home"
        >
          <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" fill="currentColor" />
        </svg>
      ),
    },
    {
      path: "/about",
      label: "About",
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="About"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      path: "/skills",
      label: "Skills",
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Skills"
        >
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      path: "/projects",
      label: "Projects",
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Projects"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M3 9h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      path: "/contact",
      label: "Contact",
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Contact"
        >
          <path
            d="M21 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2m18 0v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8m18 0H3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M7 10h10M7 14h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <nav
      aria-label="Navegação principal"
      className="shrink-0 flex bg-finder-sidebar border-t border-finder-border py-2"
    >
      {items.map((item) => {
        const isActive = section === item.path;

        return (
          <button
            key={item.path}
            type="button"
            onClick={() => navigate(item.path)}
            aria-current={isActive ? "page" : undefined}
            className={`flex-1 flex flex-col items-center justify-center gap-0.5 h-14 text-[10px] transition-colors focus-visible:outline-2 focus-visible:outline-finder-accent ${
              isActive ? "text-finder-accent" : "text-finder-text-secondary hover:bg-finder-hover"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default Dock;
