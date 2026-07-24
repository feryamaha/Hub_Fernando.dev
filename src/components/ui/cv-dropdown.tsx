"use client";

import { CV_MANIFEST } from "@/data/cv-manifest";
import { ArrowDownTrayIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

interface CvDropdownProps {
  labels: {
    ariaLabel: string;
    title: string;
  };
  variant?: "compact" | "full";
  onDownload: (path: string, filename: string) => void;
  isDownloading?: boolean;
  progress?: number;
}

const CvDropdown = ({
  labels,
  variant = "compact",
  onDownload,
  isDownloading = false,
  progress = 0,
}: CvDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelect = (path: string) => {
    setIsOpen(false);
    const filename = path.split("/").pop() ?? path;
    onDownload(path, filename);
  };

  if (variant === "full") {
    return (
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          disabled={isDownloading}
          aria-label={labels.ariaLabel}
          title={labels.title}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-finder-accent text-finder-accent-contrast text-sm font-medium hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-finder-accent"
        >
          <ArrowDownTrayIcon className="w-4 h-4" />
          <span>{isDownloading ? `${progress}%` : labels.title}</span>
          <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>
        {isOpen && (
          <div
            role="menu"
            className="absolute left-1/2 -translate-x-1/2 mt-2 min-w-[160px] rounded-lg border border-finder-border bg-finder-window shadow-lg overflow-hidden z-50"
          >
            {CV_MANIFEST.map((cv) => (
              <button
                key={cv.path}
                type="button"
                role="menuitem"
                onClick={() => handleSelect(cv.path)}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-finder-text hover:bg-finder-hover transition-colors text-left"
              >
                <ArrowDownTrayIcon className="w-4 h-4 text-finder-accent shrink-0" />
                {cv.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        disabled={isDownloading}
        aria-label={labels.ariaLabel}
        title={labels.title}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="hidden sm:inline-flex items-center gap-1.5 px-2 min-h-8 rounded-lg border border-finder-accent text-finder-accent-contrast text-xs font-medium hover:opacity-90 transition-opacity"
      >
        <ArrowDownTrayIcon className="w-4 h-4 text-finder-accent" />
        <span className="text-finder-accent">{isDownloading ? `${progress}%` : "CV"}</span>
        <ChevronDownIcon className={`w-3 h-3 text-finder-accent transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        disabled={isDownloading}
        aria-label={labels.ariaLabel}
        title={labels.title}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="sm:hidden inline-flex items-center justify-center w-11 h-11 shrink-0 text-finder-accent hover:opacity-90 transition-opacity"
      >
        <ArrowDownTrayIcon className="w-4 h-4 md:w-5 md:h-5 text-finder-accent" />
      </button>
      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 min-w-[160px] rounded-lg border border-finder-border bg-finder-window shadow-lg overflow-hidden z-50"
        >
          {CV_MANIFEST.map((cv) => (
            <button
              key={cv.path}
              type="button"
              role="menuitem"
              onClick={() => handleSelect(cv.path)}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-finder-text hover:bg-finder-hover transition-colors text-left"
            >
              <ArrowDownTrayIcon className="w-4 h-4 text-finder-accent shrink-0" />
              {cv.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CvDropdown;
