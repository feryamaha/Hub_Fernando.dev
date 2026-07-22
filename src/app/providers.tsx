"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import { type Locale, LocaleProvider } from "@/hooks/use-locale";
import { NavigationProvider } from "@/hooks/use-navigation";
import { ThemeProvider } from "@/hooks/use-theme";
import { type ReactNode, useEffect } from "react";

export function Providers({ locale, children }: { locale: Locale; children: ReactNode }) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <LocaleProvider locale={locale}>
      <ThemeProvider>
        <NavigationProvider>{children}</NavigationProvider>
      </ThemeProvider>
    </LocaleProvider>
  );
}
