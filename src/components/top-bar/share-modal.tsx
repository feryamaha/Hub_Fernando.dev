"use client";

import Modal from "@/components/ui/modal";
import topbar from "@/data/i18n/topbar.json";
import { useLocale } from "@/hooks/use-locale";
import type { ModalBaseProps } from "@/types";
import { CheckIcon, ClipboardDocumentIcon, LinkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const ShareModal = ({ isOpen, onClose }: ModalBaseProps) => {
  const locale = useLocale();
  const t = topbar[locale].shareModal;
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(t.copyError, err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t.title}>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <LinkIcon className="w-5 h-5 text-finder-text-secondary " />
          <span className="text-finder-text">{t.urlLabel}</span>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={currentUrl}
            readOnly
            className="flex-1 bg-black text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
          <button
            type="button"
            onClick={handleCopy}
            className="p-2 bg-finder-accent text-white rounded-lg hover:bg-opacity-90 transition-colors"
            title={t.copyTitle}
          >
            {copied ? (
              <CheckIcon className="w-5 h-5" />
            ) : (
              <ClipboardDocumentIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="text-sm text-finder-text-secondary">
          <p>{t.shareText}</p>
        </div>
      </div>
    </Modal>
  );
};

export default ShareModal;
