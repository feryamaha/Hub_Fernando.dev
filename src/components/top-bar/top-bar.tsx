"use client";

import { useTheme } from "@/hooks/use-theme";
import {
  EnvelopeIcon,
  InformationCircleIcon as InfoIconOutline,
  ShareIcon as ShareIconOutline,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import InfoModal from "./info-modal";
import ShareModal from "./share-modal";

interface TopBarProps {
  title?: string;
}

const TopBar = ({ title }: TopBarProps) => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [theme] = useTheme();
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [cursorVisible, setCursorVisible] = useState(true);
  const fullText = title || "fernando.dev / full-stack...";

  // Efeito para animar o cursor piscando
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  // Efeito para controlar a digitação e apagamento
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseDuration = 1000;

    if (isTyping) {
      if (displayedText.length < fullText.length) {
        timeout = setTimeout(() => {
          setDisplayedText(fullText.slice(0, displayedText.length + 1));
        }, typeSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, pauseDuration);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, deleteSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(true);
        }, pauseDuration);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isTyping, fullText]);

  return (
    <>
      <div className="h-topbar bg-finder-window border-b border-finder-border flex items-center justify-between select-none px-2 md:px-4">
        <div className="flex items-center flex-1">
          <h1
            className="text-finder text-left flex-1 pr-8 md:pr-32 text-sm md:text-base text-2xl md:text-3xl p-[3px]"
            style={{ color: theme }}
          >
            <span>{displayedText}</span>
            <span style={{ opacity: cursorVisible ? 1 : 0 }}>|</span>
          </h1>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* CTAs de contato sempre visíveis no topo */}
          <a
            href="https://github.com/feryamaha"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub"
            className="p-1 md:p-2 text-finder-text-secondary hover:text-finder-text transition-colors"
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ color: theme }}
              role="img"
              aria-label="GitHub"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/feryamaha/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            className="p-1 md:p-2 text-finder-text-secondary hover:text-finder-text transition-colors"
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ color: theme }}
              role="img"
              aria-label="LinkedIn"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037c-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85c3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065c0-1.138.92-2.063 2.063-2.063c1.14 0 2.064.925 2.064 2.063c0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="mailto:fmoreirayamaha@gmail.com"
            aria-label="E-mail"
            title="E-mail"
            className="p-1 md:p-2 text-finder-text-secondary hover:text-finder-text transition-colors"
          >
            <EnvelopeIcon style={{ color: theme }} className="w-4 h-4 md:w-5 md:h-5" />
          </a>
          <button
            type="button"
            onClick={() => setIsShareModalOpen(true)}
            className="p-1 md:p-2 text-finder-text-secondary hover:text-finder-text transition-colors"
            title="Compartilhar"
          >
            <ShareIconOutline style={{ color: theme }} className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button
            type="button"
            onClick={() => setIsInfoModalOpen(true)}
            className="p-1 md:p-2 text-finder-text-secondary hover:text-finder-text transition-colors"
            title="Informações"
          >
            <InfoIconOutline style={{ color: theme }} className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>

      <InfoModal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} />
      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
    </>
  );
};

export default TopBar;
