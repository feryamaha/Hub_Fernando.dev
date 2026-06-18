"use client";

import type { ThemeColor, ThemeListItem } from "@/types";
import { type ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";

const THEME_COLORS: Record<ThemeColor, string> = {
  red: "#FF5F57",
  orange: "#FEBC2E",
  yellow: "#FFE08C",
  green: "#28C840",
  blue: "#0A84FF",
  purple: "#BF5AF2",
  gray: "#98989D",
};

interface ThemeContextValue {
  theme: ThemeColor;
  changeTheme: (theme: ThemeColor) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Provider único de tema. Mantém o tema em estado compartilhado, aplica a
 * classe `theme-<cor>` e a variável `--finder-accent` no <html> e persiste em
 * localStorage. A troca é instantânea (sem recarregar a página).
 */
export function ThemeProvider({
  children,
  initialTheme = "blue",
}: {
  children: ReactNode;
  initialTheme?: ThemeColor;
}) {
  // Inicia com o padrão para o primeiro render no cliente bater com o servidor.
  const [theme, setTheme] = useState<ThemeColor>(initialTheme);
  const [hydrated, setHydrated] = useState(false);

  // Lê o tema salvo uma única vez após a montagem.
  useEffect(() => {
    const saved = localStorage.getItem("theme") as ThemeColor | null;
    if (saved && THEME_COLORS[saved]) {
      setTheme(saved);
    }
    setHydrated(true);
  }, []);

  // Aplica o tema no DOM apenas depois de hidratar, evitando sobrescrever o
  // valor que o script de pré-pintura já definiu.
  useEffect(() => {
    if (!hydrated) return;
    for (const color of Object.keys(THEME_COLORS) as ThemeColor[]) {
      document.documentElement.classList.remove(`theme-${color}`);
    }
    document.documentElement.classList.add(`theme-${theme}`);
    document.documentElement.style.setProperty("--finder-accent", THEME_COLORS[theme]);
    localStorage.setItem("theme", theme);
  }, [theme, hydrated]);

  const changeTheme = useCallback((newTheme: ThemeColor) => {
    setTheme(newTheme);
  }, []);

  return <ThemeContext.Provider value={{ theme, changeTheme }}>{children}</ThemeContext.Provider>;
}

/**
 * Acessa o tema atual e a função de troca.
 * Mantém a API em tupla `[theme, changeTheme]`.
 */
export const useTheme = (): [ThemeColor, (t: ThemeColor) => void] => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return [context.theme, context.changeTheme];
};

export const THEME_LIST: ThemeListItem[] = (
  Object.entries(THEME_COLORS) as [ThemeColor, string][]
).map(([color, hex]) => ({
  id: `theme-${color}`,
  name: `${color.charAt(0).toUpperCase() + color.slice(1)} Theme`,
  color,
  className: `theme-${color}`,
  hex,
}));
