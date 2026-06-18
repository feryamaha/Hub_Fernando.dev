"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import { NavigationProvider } from "@/hooks/use-navigation";
import { ThemeProvider } from "@/hooks/use-theme";
import { type ReactNode, useEffect } from "react";

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <ThemeProvider>
      <NavigationProvider>{children}</NavigationProvider>
    </ThemeProvider>
  );
}
