"use client";

import { LanguageToggle } from "@/components/ui/language-toggle";
import CvDropdown from "@/components/ui/cv-dropdown";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/social-icons";
import topbar from "@/data/i18n/topbar.json";
import useDownload from "@/hooks/use-download";
import { useLocale } from "@/hooks/use-locale";
import { EMAIL } from "@/lib/constants";
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
  const locale = useLocale();
  const t = topbar[locale].topBar;
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const fullText = title || t.fullText;
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
          <h1 className="font-modern-dos-400 text-left flex-1 pr-8 md:pr-32 text-xl md:text-2xl p-[3px] text-finder-accent whitespace-nowrap overflow-hidden text-ellipsis">
            <span>{displayedText}</span>
            <span style={{ opacity: cursorVisible ? 1 : 0 }}>|</span>
          </h1>
        </div>
        <div className="w-full md:w-auto flex items-center justify-between md:space-x-0 md:space-x-1 py-2">
          <LanguageToggle />
          {/* CTAs de contato sempre visíveis no topo */}
          <a
            href="https://github.com/feryamaha"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.githubLabel}
            title={t.githubLabel}
            className="inline-flex items-center justify-center w-11 h-11 shrink-0 text-finder-text-secondary hover:text-finder-text transition-colors md:hidden"
          >
            <GitHubIcon className="w-4 h-4 md:w-5 md:h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/feryamaha/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.linkedinLabel}
            title={t.linkedinLabel}
            className="inline-flex items-center justify-center w-11 h-11 shrink-0 text-finder-text-secondary hover:text-finder-text transition-colors md:hidden"
          >
            <LinkedInIcon className="w-4 h-4 md:w-5 md:h-5" />
          </a>
          <a
            href={`mailto:${EMAIL}`}
            aria-label={t.emailLabel}
            title={t.emailLabel}
            className="inline-flex items-center justify-center w-11 h-11 shrink-0 text-finder-text-secondary hover:text-finder-text transition-colors md:hidden"
          >
            <EnvelopeIcon className="w-4 h-4 md:w-5 md:h-5" />
          </a>
          <CvDropdown
            labels={{
              ariaLabel: t.cvAriaLabel,
              title: t.cvTitle,
            }}
            onDownload={downloadFile}
            isDownloading={isDownloading}
            progress={progress}
          />
          <button
            type="button"
            onClick={() => setIsShareModalOpen(true)}
            className="inline-flex items-center justify-center w-11 h-11 shrink-0 text-finder-text-secondary hover:text-finder-text transition-colors"
            title={t.shareTitle}
          >
            <ShareIconOutline className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button
            type="button"
            onClick={() => setIsInfoModalOpen(true)}
            className="inline-flex items-center justify-center w-11 h-11 shrink-0 text-finder-text-secondary hover:text-finder-text transition-colors"
            title={t.infoTitle}
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
