"use client";

import { type ReactNode, createContext, useContext } from "react";

/** Idiomas suportados pelo site. Cada um vive numa rota/root layout próprios. */
export type Locale = "pt" | "en";

const LocaleContext = createContext<Locale | undefined>(undefined);

/**
 * Provider de locale. O idioma é determinado pela ROTA (route group `(pt)`
 * ou `(en)`), não por estado do cliente — por isso não há setter, apenas o
 * valor fixo recebido do root layout correspondente.
 */
export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

/**
 * Acessa o locale atual da rota.
 */
export const useLocale = (): Locale => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
};
