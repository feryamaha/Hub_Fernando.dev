"use client";

import { useTheme } from "@/hooks/use-theme";
import {
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
