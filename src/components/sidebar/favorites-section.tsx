"use client";

import { useNavigation } from "@/hooks/use-navigation";
import type { SectionPath } from "@/types";
import type { ReactNode } from "react";

interface FavoriteItem {
  path: SectionPath;
  label: string;
  icon: ReactNode;
}

const FavoritesSection = () => {
  const { section, navigate } = useNavigation();

  const favorites: FavoriteItem[] = [
    {
      path: "/",
      label: "Home",
      icon: (
        <svg
          className="w-4 h-4"
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
          className="w-4 h-4"
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
          className="w-4 h-4"
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
          className="w-4 h-4"
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
          className="w-4 h-4"
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
    <div className="mb-10">
      <h2 className="text-finder-text-secondary text-[12px] font-medium uppercase px-2 pt-6 mb-2">
        Favorites
      </h2>
      <nav className="space-y-px">
        {favorites.map((item) => {
          const isActive = section === item.path;

          return (
            <div key={item.label} className="flex items-center group px-2">
              <button
                type="button"
                onClick={() => navigate(item.path)}
                className={`flex-1 flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[var(--finder-accent)] ${
                  isActive
                    ? "bg-[var(--finder-accent)] text-[var(--finder-accent-contrast)]"
                    : "text-finder-text hover:bg-[var(--finder-hover)]"
                }`}
              >
                <span
                  className={`w-4 h-4 ${isActive ? "" : "text-[var(--finder-accent)]"}`}
                  style={isActive ? { color: "var(--finder-accent-contrast)" } : undefined}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default FavoritesSection;
