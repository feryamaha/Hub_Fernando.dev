"use client";

import Sidebar from "@/components/sidebar/sidebar";
import { useNavigation } from "@/hooks/use-navigation";
import useScreenSize from "@/hooks/use-screen-size";
import { useTheme } from "@/hooks/use-theme";
import type { SectionPath } from "@/types";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import AOS from "aos";
import { type ReactNode, useEffect, useState } from "react";
import About from "./sections/about";
import Contact from "./sections/contact";
import Home from "./sections/home";
import Projects from "./sections/projects";
import Skills from "./sections/skills";
import Spotlight from "./spotlight";

type ContentState = "normal" | "minimized" | "maximized";

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
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  const { section, navigate } = useNavigation();
  const [theme] = useTheme();
  const screenSize = useScreenSize();

  // Fecha o menu lateral no mobile sempre que a seção muda (ao clicar num item
  // do menu), revelando imediatamente o conteúdo da seção escolhida.
  // biome-ignore lint/correctness/useExhaustiveDependencies: `section` é gatilho intencional do efeito
  useEffect(() => {
    if (screenSize.isMobile) {
      setIsSidebarOpen(false);
    }
  }, [section, screenSize.isMobile]);

  // Como todas as seções ficam montadas (apenas ocultas via CSS) para o SEO,
  // recalculamos o AOS ao trocar de seção para que os elementos animados não
  // fiquem presos em opacity:0 quando a seção é revelada.
  // biome-ignore lint/correctness/useExhaustiveDependencies: `section` é gatilho intencional do efeito
  useEffect(() => {
    AOS.refreshHard();
  }, [section]);

  // Atalho global de busca estilo Spotlight (⌘K / ⌘F e equivalentes com Ctrl).
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && (event.key === "k" || event.key === "f")) {
        event.preventDefault();
        setIsSpotlightOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getTitle = (): string => TITLES[section] ?? "Home";

  // Todas as seções são renderizadas no HTML (importante para SEO, preview de
  // link e leitura automatizada — o export estático passa a conter todo o
  // conteúdo, não só a Home). A seção inativa é apenas ocultada via CSS,
  // preservando a navegação SPA estilo Finder.
  const renderSection = () => {
    const sections: { path: SectionPath; node: ReactNode }[] = [
      { path: "/", node: <Home /> },
      { path: "/about", node: <About /> },
      { path: "/skills", node: <Skills /> },
      { path: "/projects", node: <Projects /> },
      { path: "/contact", node: <Contact /> },
    ];

    return sections.map(({ path, node }) => (
      // m-auto centraliza a seção quando ela é menor que a área visível e
      // colapsa para 0 (rolagem normal) quando o conteúdo é maior. Sem forçar
      // altura, evitando estourar a viewport.
      <div
        key={path}
        hidden={section !== path}
        aria-hidden={section !== path}
        className="w-full p-2 md:p-6 m-auto"
      >
        {node}
      </div>
    ));
  };

  const renderContent = () => {
    // Quando minimizada, o conteúdo dá lugar a uma "janela" macOS clicável que
    // restaura a seção ao ser acionada (volta ao estado "normal").
    if (contentState === "minimized") {
      return (
        <div className="flex-1 min-h-0 flex items-center justify-center bg-finder-window p-6">
          <button
            type="button"
            aria-label="Restaurar seção minimizada"
            onClick={() => setContentState("normal")}
            className="mac-window w-full max-w-sm cursor-pointer text-left"
          >
            <div className="mac-window-titlebar">
              <img src="/icons/icon-close.svg" width={12} height={12} alt="" />
              <img src="/icons/icon-mac-minimize.svg" width={12} height={12} alt="" />
              <img src="/icons/icon-mac-maximize.svg" width={12} height={12} alt="" />
              <span className="mac-window-title">{getTitle()}</span>
            </div>
            <div className="px-4 py-6 text-center text-finder-text-secondary text-finder">
              Seção minimizada. Clique para restaurar.
            </div>
          </button>
        </div>
      );
    }

    return (
      <div
        className={`flex-1 min-h-0 flex flex-col bg-finder-window overflow-y-auto scrollbar-finder ${
          contentState === "maximized" ? "fixed inset-0 mt-[38px] ml-[200px] z-50" : ""
        }`}
      >
        {renderSection()}
      </div>
    );
  };

  return (
    <div className={`flex-1 min-h-0 flex flex-col bg-finder-window font-finder theme-${theme}`}>
      {/* Barra de título do Finder (fixa) */}
      <div className="bg-finder-sidebar border-b border-finder-border h-[38px] shrink-0 flex items-center">
        <div className="flex items-center px-2 space-x-2">
          <button
            type="button"
            aria-label="Fechar seção e voltar à Home"
            onClick={() => {
              setContentState("normal");
              navigate("/");
            }}
            className="hover:opacity-80 transition-opacity"
          >
            <img src="/icons/icon-mac-close_button.svg" width={12} height={12} alt="" />
          </button>
          <button
            type="button"
            aria-label="Minimizar conteúdo"
            onClick={() =>
              setContentState((prev) => (prev === "minimized" ? "normal" : "minimized"))
            }
            className="hover:opacity-80 transition-opacity"
          >
            <img src="/icons/icon-mac-minimize_button.svg" width={12} height={12} alt="" />
          </button>
          <button
            type="button"
            aria-label="Maximizar conteúdo"
            onClick={() =>
              setContentState((prev) => (prev === "maximized" ? "normal" : "maximized"))
            }
            className="hover:opacity-80 transition-opacity"
          >
            <img src="/icons/icon-mac-maximize-button.svg" width={12} height={12} alt="" />
          </button>
        </div>
        <div className="flex-1 text-center text-finder-text text-finder">{getTitle()}</div>
        <div className="px-2">
          <button
            type="button"
            aria-label="Abrir busca"
            onClick={() => setIsSpotlightOpen(true)}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--finder-search)] text-finder-text-secondary text-xs hover:text-finder-text"
          >
            <MagnifyingGlassIcon className="w-4 h-4" />
            <kbd>⌘K</kbd>
          </button>
        </div>
      </div>

      {/* Container principal (preenche o espaço restante; só o conteúdo rola) */}
      <div className="flex flex-1 min-h-0">
        <div
          className={`${
            screenSize.isMobile
              ? "fixed inset-0 z-40 transform transition-transform duration-300 bg-finder-sidebar"
              : "w-sidebar sidebar-vibrancy"
          } ${
            screenSize.isMobile && !isSidebarOpen ? "-translate-x-full" : ""
          } border-r border-finder-border flex flex-col min-h-0 overflow-y-auto`}
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
          className="fixed bottom-20 right-4 bg-finder-accent text-finder-text p-3 rounded-full shadow-lg z-50"
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

      <Spotlight isOpen={isSpotlightOpen} onClose={() => setIsSpotlightOpen(false)} />
    </div>
  );
};

export default MainContent;
