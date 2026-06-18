"use client";

import { useEffect, useState } from "react";

export interface ScreenSize {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isLaptop: boolean;
  isDesktop: boolean;
}

const computeScreenSize = (width: number, height: number): ScreenSize => ({
  width,
  height,
  isMobile: width <= 640,
  isTablet: width > 640 && width <= 768,
  isLaptop: width > 768 && width <= 1024,
  isDesktop: width > 1024,
});

const useScreenSize = (): ScreenSize => {
  // Valores padrão (desktop) para o prerender estático; ajustados no cliente.
  const [screenSize, setScreenSize] = useState<ScreenSize>(() => computeScreenSize(1280, 800));

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(computeScreenSize(window.innerWidth, window.innerHeight));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
};

export default useScreenSize;
