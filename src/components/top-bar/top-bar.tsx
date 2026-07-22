"use client";

import { GitHubIcon, LinkedInIcon } from "@/components/ui/social-icons";
import useDownload from "@/hooks/use-download";
import { CV_FILENAME, CV_PATH, EMAIL } from "@/lib/constants";
import {
  ArrowDownTrayIcon,
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
  const [displayedText, setDisplayedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const fullText = title || "fernando.dev / full-stack...";
  const { downloadFile, progress, isDownloading } = useDownload();

  // Efeito para animar o cursor piscando
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  // Efeito para digitar o texto uma unica vez e parar (sem apagar/redigitar)
  useEffect(() => {
    setDisplayedText("");
    let index = 0;
    const typeSpeed = 100;
    const interval = setInterval(() => {
      index += 1;
      setDisplayedText(fullText.slice(0, index));
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, typeSpeed);

    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <>
      <div className="h-topbar shrink-0 bg-finder-window border-b border-finder-border flex items-center justify-between select-none px-2 md:px-4">
        <div className="flex items-center flex-1 min-w-0 hidden md:block">
          <h1 className="font-dos text-left flex-1 pr-8 md:pr-32 text-xl md:text-2xl p-[3px] text-finder-accent whitespace-nowrap overflow-hidden text-ellipsis">
            <span>{displayedText}</span>
            <span style={{ opacity: cursorVisible ? 1 : 0 }}>|</span>
          </h1>
        </div>
        <div className="w-full md:w-auto flex items-center justify-between md:space-x-0 md:space-x-1 py-2">
          {/* CTAs de contato sempre visíveis no topo */}
          <a
            href="https://github.com/feryamaha"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub"
            className="inline-flex items-center justify-center w-11 h-11 shrink-0 text-finder-text-secondary hover:text-finder-text transition-colors md:hidden"
          >
            <GitHubIcon className="w-4 h-4 md:w-5 md:h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/feryamaha/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            className="inline-flex items-center justify-center w-11 h-11 shrink-0 text-finder-text-secondary hover:text-finder-text transition-colors md:hidden"
          >
            <LinkedInIcon className="w-4 h-4 md:w-5 md:h-5" />
          </a>
          <a
            href={`mailto:${EMAIL}`}
            aria-label="E-mail"
            title="E-mail"
            className="inline-flex items-center justify-center w-11 h-11 shrink-0 text-finder-text-secondary hover:text-finder-text transition-colors md:hidden"
          >
            <EnvelopeIcon className="w-4 h-4 md:w-5 md:h-5" />
          </a>
          <button
            type="button"
            onClick={() => downloadFile(CV_PATH, CV_FILENAME)}
            disabled={isDownloading}
            aria-label="Baixar CV em PDF"
            title="Baixar CV (PDF)"
            className="hidden sm:inline-flex items-center gap-1.5 px-2 min-h-8 rounded-lg border border-finder-accent text-finder-accent-contrast text-xs font-medium hover:opacity-90 transition-opacity"
          >
            <ArrowDownTrayIcon className="w-4 h-4 text-finder-accent" />
            <span className="text-finder-accent">{isDownloading ? `${progress}%` : "CV"}</span>
          </button>
          <button
            type="button"
            onClick={() => downloadFile(CV_PATH, CV_FILENAME)}
            disabled={isDownloading}
            aria-label="Baixar CV em PDF"
            title="Baixar CV (PDF)"
            className="sm:hidden inline-flex items-center justify-center w-11 h-11 shrink-0 text-finder-accent hover:opacity-90 transition-opacity"
          >
            <ArrowDownTrayIcon className="w-4 h-4 md:w-5 md:h-5 text-finder-accent" />
          </button>
          <button
            type="button"
            onClick={() => setIsShareModalOpen(true)}
            className="inline-flex items-center justify-center w-11 h-11 shrink-0 text-finder-text-secondary hover:text-finder-text transition-colors"
            title="Compartilhar"
          >
            <ShareIconOutline className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button
            type="button"
            onClick={() => setIsInfoModalOpen(true)}
            className="inline-flex items-center justify-center w-11 h-11 shrink-0 text-finder-text-secondary hover:text-finder-text transition-colors"
            title="Informações"
          >
            <InfoIconOutline className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>

      <InfoModal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} />
      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
    </>
  );
};

export default TopBar;
