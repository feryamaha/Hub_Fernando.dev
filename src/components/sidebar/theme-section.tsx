"use client";

import { THEME_LIST, useTheme } from "@/hooks/use-theme";

const ThemeSection = () => {
  const [theme, changeTheme] = useTheme();

  return (
    <div className="mb-6">
      <h2 className="text-finder-text-secondary text-[11px] font-medium uppercase px-2 mb-1">
        Theme
      </h2>
      <nav className="grid grid-cols-3 gap-2">
        {THEME_LIST.map(({ id, name, color, iconPath }) => (
          <button
            type="button"
            key={id}
            onClick={() => changeTheme(color)}
            aria-label={name}
            className={`flex items-center justify-center py-3 mt-4 w-full rounded-md focus-visible:outline-2 focus-visible:outline-finder-accent ${
              theme === color ? "bg-finder-accent/15" : "hover:bg-finder-hover"
            }`}
          >
            <img
              src={iconPath}
              width={32}
              height={32}
              alt="mac-folders"
              className="brightness-150"
            />
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ThemeSection;
