"use client";

import type { SectionPath } from "@/types";
import { type ReactNode, createContext, useContext, useState } from "react";

interface NavigationContextValue {
  /** Seção/rota ativa (equivalente a location.pathname). */
  section: SectionPath;
  /** Navega para uma seção (equivalente a <Link to> / navigate). */
  navigate: (section: SectionPath) => void;
}

const NavigationContext = createContext<NavigationContextValue | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [section, setSection] = useState<SectionPath>("/");

  return (
    <NavigationContext.Provider value={{ section, navigate: setSection }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation(): NavigationContextValue {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}
