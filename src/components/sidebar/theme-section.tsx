"use client";

import { THEME_LIST, useTheme } from "@/hooks/use-theme";
import type { ThemeColor } from "@/types";

const CONTROL_COLOR: Record<ThemeColor, string> = {
  red: "#FF5F57",
  orange: "#FEBC2E",
  yellow: "#FFE08C",
  green: "#28C840",
  blue: "#0A84FF",
  purple: "#BF5AF2",
  gray: "#98989D",
};

const ThemeSection = () => {
  const [theme, changeTheme] = useTheme();

  return (
    <div className="mb-6">
      <h2 className="text-finder-text-secondary text-[11px] font-medium uppercase px-2 mb-1">
        Theme
      </h2>
      <nav className="space-y-px">
        {THEME_LIST.map(({ id, name, color }) => (
          <button
            type="button"
            key={id}
            onClick={() => changeTheme(color)}
            className={`flex items-center w-full px-2 py-1 rounded-md ${
              theme === color ? "bg-finder-accent bg-opacity-20" : "hover:bg-finder-hover"
            }`}
          >
            <div className="window-controls">
              <div
                className={`window-control ${
                  color === "red" ? "close" : color === "orange" ? "minimize" : "maximize"
                }`}
                style={{ backgroundColor: CONTROL_COLOR[color] }}
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
