"use client";

import type { ThemeColor, ThemeListItem } from "@/types";
import { type ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";

/**
 * Ids dos temas suportados. Os HEX correspondentes vivem SOMENTE em
 * `tailwind.config.ts`; aqui só existe o identificador da classe.
 */
const THEME_IDS = [
  "blue",
  "green",
  "green-lime",
  "yellow",
  "orange",
  "red",
  "purple",
  "gray",
  "black",
] as const;

interface ThemeContextValue {
  theme: ThemeColor;
  changeTheme: (theme: ThemeColor) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Provider único de tema. Mantém o tema em estado compartilhado, aplica a
 * classe `theme-<cor>` no <html> e persiste em localStorage. A troca é
 * instantânea (sem recarregar a página). As variáveis de cor vêm da classe.
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
    if (saved && (THEME_IDS as readonly string[]).includes(saved)) {
      setTheme(saved);
    }
    setHydrated(true);
  }, []);

  // Aplica o tema no DOM apenas depois de hidratar, evitando sobrescrever o
  // valor que o script de pré-pintura já definiu.
  useEffect(() => {
    if (!hydrated) return;
    for (const color of THEME_IDS) {
      document.documentElement.classList.remove(`theme-${color}`);
    }
    document.documentElement.classList.add(`theme-${theme}`);
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

export const THEME_LIST: ThemeListItem[] = THEME_IDS.map((color) => ({
  id: `theme-${color}`,
  name: `${color.charAt(0).toUpperCase() + color.slice(1)} Theme`,
  color,
  className: `theme-${color}`,
  iconPath: `/icons/icon-macos-folder-${color}.webp`,
}));
