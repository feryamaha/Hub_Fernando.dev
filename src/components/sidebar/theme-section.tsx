"use client";

import { THEME_LIST, useTheme } from "@/hooks/use-theme";

const ThemeSection = () => {
  const [theme, changeTheme] = useTheme();

  return (
    <div className="mb-6">
      <h2 className="text-finder-text-secondary text-[11px] font-medium uppercase px-2 mb-1">
        Theme
      </h2>
      <nav className="space-y-px">
        {THEME_LIST.map(({ id, name, color, swatchClass }) => (
          <button
            type="button"
            key={id}
            onClick={() => changeTheme(color)}
            className={`flex items-center w-full px-2 py-1 rounded-md focus-visible:outline-2 focus-visible:outline-finder-accent ${
              theme === color ? "bg-finder-accent/15" : "hover:bg-finder-hover"
            }`}
          >
            <div className="flex gap-2 p-2">
              <div
                className={`w-3 h-3 rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.1)] ${swatchClass}`}
              />
            </div>
            <span className="text-finder-text">{name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ThemeSection;
