"use client";

import Sidebar from "@/components/sidebar/sidebar";
import { useNavigation } from "@/hooks/use-navigation";
import useScreenSize from "@/hooks/use-screen-size";
import { useTheme } from "@/hooks/use-theme";
import type { SectionPath } from "@/types";
import { useEffect, useState } from "react";
import Search from "./search";
import About from "./sections/about";
import Contact from "./sections/contact";
import Home from "./sections/home";
import Projects from "./sections/projects";
import Skills from "./sections/skills";

type ContentState = "normal" | "minimized" | "maximized" | "hidden";

const TITLES: Record<SectionPath, string> = {
  "/": "Home",
  "/about": "Sobre",
  "/skills": "Habilidades",
  "/projects": "Projetos",
  "/contact": "Contato",
};

const MainContent = () => {
  const [contentState, setContentState] = useState<ContentState>("normal");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { section } = useNavigation();
  const [theme] = useTheme();
  const screenSize = useScreenSize();
  const [, setSearchTerm] = useState("");

  // Fecha o menu lateral no mobile sempre que a seção muda (ao clicar num item
  // do menu), revelando imediatamente o conteúdo da seção escolhida.
  // biome-ignore lint/correctness/useExhaustiveDependencies: `section` é gatilho intencional do efeito
  useEffect(() => {
    if (screenSize.isMobile) {
      setIsSidebarOpen(false);
    }
  }, [section, screenSize.isMobile]);

  const getTitle = (): string => TITLES[section] ?? "Home";

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const renderSection = () => {
    switch (section) {
      case "/about":
        return <About />;
      case "/skills":
        return <Skills />;
      case "/projects":
        return <Projects />;
      case "/contact":
        return <Contact />;
      default:
        return <Home />;
    }
  };

  const renderContent = () => {
    if (contentState === "hidden" || contentState === "minimized") {
      return null;
    }

    return (
      <div
        className={`flex-1 bg-finder-window overflow-y-auto scrollbar-finder ${
          contentState === "maximized" ? "fixed inset-0 mt-[38px] ml-[200px] z-50" : ""
        }`}
      >
        <div className="p-2 md:p-6 mx-auto">{renderSection()}</div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen bg-finder-window font-finder theme-${theme}`}>
      {/* Barra de título do Finder */}
      <div className="bg-finder-sidebar border-b border-finder-border h-[38px] flex items-center">
        <div className="flex items-center px-2 space-x-2">
          <button
            type="button"
            aria-label="Ocultar conteúdo"
            onClick={() => setContentState((prev) => (prev === "hidden" ? "normal" : "hidden"))}
            className="w-3 h-3 rounded-full bg-[#FF5F57] hover:bg-[#FF5F57]/80 transition-colors"
          />
          <button
            type="button"
            aria-label="Minimizar conteúdo"
            onClick={() =>
              setContentState((prev) => (prev === "minimized" ? "normal" : "minimized"))
            }
            className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:bg-[#FFBD2E]/80 transition-colors"
          />
          <button
            type="button"
            aria-label="Maximizar conteúdo"
            onClick={() =>
              setContentState((prev) => (prev === "maximized" ? "normal" : "maximized"))
            }
            className="w-3 h-3 rounded-full bg-[#28C840] hover:bg-[#28C840]/80 transition-colors"
          />
        </div>
        <div className="flex-1 text-center text-finder-text text-finder">{getTitle()}</div>
        <div className="px-2">
          <Search onSearch={handleSearch} />
        </div>
      </div>

      {/* Container principal */}
      <div className="flex h-[calc(100vh-38px)]">
        <div
          className={`${
            screenSize.isMobile
              ? "fixed inset-0 z-40 transform transition-transform duration-300"
              : "w-sidebar"
          } ${
            screenSize.isMobile && !isSidebarOpen ? "-translate-x-full" : ""
          } bg-finder-sidebar border-r border-finder-border flex flex-col`}
        >
          <Sidebar />
        </div>

        {renderContent()}
      </div>

      {/* Menu hambúrguer para mobile */}
      {screenSize.isMobile && (
        <button
          type="button"
          aria-label="Alternar menu"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed bottom-4 right-4 bg-finder-accent text-finder-text p-3 rounded-full shadow-lg z-50"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            role="img"
            aria-label="Menu"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default MainContent;
