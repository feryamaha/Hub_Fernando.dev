"use client";

import { SOCIAL_ICON_MAP } from "@/components/ui/social-icons";
import contact from "@/data/i18n/contact.json";
import { useLocale } from "@/hooks/use-locale";
import { useTheme } from "@/hooks/use-theme";
import { CV_PATH, EMAIL, PHONE_DISPLAY, SOCIAL_LINKS } from "@/lib/constants";
import {
  ArrowDownTrayIcon,
  CheckIcon,
  ClipboardIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import AOS from "aos";
import { type CSSProperties, type ComponentType, useEffect, useRef, useState } from "react";
import Crosshair from "../contact/crosshair";

type IconComponent = ComponentType<{ className?: string }>;

interface SocialItem {
  name: string;
  icon: IconComponent;
  url: string;
  color?: string;
}

const socialLinks: SocialItem[] = [
  ...SOCIAL_LINKS.map((link) => ({
    name: link.name,
    icon: SOCIAL_ICON_MAP[link.name],
    url: link.url,
    color: link.hoverColor,
  })),
  {
    name: "Email",
    icon: EnvelopeIcon,
    url: `mailto:${EMAIL}`,
    color: "#05317e",
  },
];

const whatsappUrl = SOCIAL_LINKS.find((link) => link.name === "WhatsApp")?.url ?? "";

type CopyField = "email" | "phone";

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [theme] = useTheme();
  const locale = useLocale();
  const t = contact[locale];
  const folderIconPath = `/icons/icon-macos-folder-${theme}.webp`;
  const [copiedField, setCopiedField] = useState<CopyField | null>(null);
  const [motionOk, setMotionOk] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
    setMotionOk(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const copyValue = async (value: string, field: CopyField) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // Clipboard indisponível (permissão/contexto): mantém o link como via principal.
    }
  };

  return (
    <div ref={containerRef} className={`p-8 theme-${theme} relative overflow-hidden`}>
      {motionOk && <Crosshair containerRef={containerRef} color="var(--finder-accent)" />}

      <div className="mt-0 max-w-max mx-auto">
        <h2
          className="text-4xl font-modern-dos-900 font-bold text-finder-accent mb-2 text-center"
          data-aos="fade-down"
          data-aos-delay="100"
        >
          {t.title}
        </h2>

        <p
          className="text-center text-sm text-finder-text-secondary max-w-md mx-auto"
          data-aos="fade-down"
          data-aos-delay="200"
        >
          {t.subtitle}
        </p>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                title={link.name}
                className="group flex items-center justify-center rounded-xl p-2 transition-transform duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-finder-accent"
                style={{ "--hover-color": link.color } as CSSProperties}
                data-aos="fade-right"
                data-aos-delay={`${index * 200 + 200}`}
              >
                <span className="relative inline-flex items-center justify-center w-24 h-24">
                  <img
                    src={folderIconPath}
                    alt=""
                    aria-hidden="true"
                    width={96}
                    height={82}
                    className="w-full h-auto drop-shadow-lg"
                  />
                  <Icon className="absolute left-1/2 top-[58%] w-7 h-7 -translate-x-1/2 -translate-y-1/2 text-finder-text drop-shadow group-hover:text-[var(--hover-color)] transition-colors duration-300" />
                </span>
              </a>
            );
          })}
        </div>

        <div className="w-full mx-auto flex flex-col justify-center gap-2">
          <div className="w-max mx-auto flex items-center gap-4 justify-center">
            {/* E-mail em texto, com cópia em um clique */}
            <div
              className="mt-0 flex items-center justify-center gap-2"
              data-aos="fade-up"
              data-aos-delay="250"
            >
              <a
                href={`mailto:${EMAIL}`}
                className="text-sm md:text-base text-finder-text underline decoration-finder-accent underline-offset-4 hover:text-finder-accent transition-colors"
              >
                {EMAIL}
              </a>
              <button
                type="button"
                onClick={() => copyValue(EMAIL, "email")}
                aria-label={copiedField === "email" ? t.emailCopiedLabel : t.copyEmail}
                title={copiedField === "email" ? t.copied : t.copyEmail}
                className="p-1.5 rounded-md text-finder-text-secondary hover:text-finder-accent hover:bg-finder-hover transition-colors"
              >
                {copiedField === "email" ? (
                  <CheckIcon className="w-4 h-4 text-finder-control-maximize" />
                ) : (
                  <ClipboardIcon className="w-4 h-4" />
                )}
              </button>
              <span aria-live="polite" className="sr-only">
                {copiedField === "email" ? t.emailCopiedSr : ""}
              </span>
            </div>

            {/* Telefone em texto, com cópia e link do WhatsApp */}
            <div
              className="mt-0 flex items-center justify-center gap-2"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-finder-text underline decoration-finder-accent underline-offset-4 hover:text-finder-accent transition-colors"
              >
                {PHONE_DISPLAY}
              </a>
              <button
                type="button"
                onClick={() => copyValue(PHONE_DISPLAY, "phone")}
                aria-label={copiedField === "phone" ? t.phoneCopiedLabel : t.copyPhone}
                title={copiedField === "phone" ? t.copied : t.copyPhone}
                className="p-1.5 rounded-md text-finder-text-secondary hover:text-finder-accent hover:bg-finder-hover transition-colors"
              >
                {copiedField === "phone" ? (
                  <CheckIcon className="w-4 h-4 text-finder-control-maximize" />
                ) : (
                  <ClipboardIcon className="w-4 h-4" />
                )}
              </button>
              <span aria-live="polite" className="sr-only">
                {copiedField === "phone" ? t.phoneCopiedSr : ""}
              </span>
            </div>
          </div>
          {/* Baixar CV (PDF): CTA primário */}
          <div className="mt-4 flex justify-center" data-aos="fade-up" data-aos-delay="275">
            <a
              href={CV_PATH}
              download
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-finder-accent text-finder-accent-contrast text-sm font-medium hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-finder-accent"
            >
              <ArrowDownTrayIcon className="w-4 h-4" />
              <span>{t.downloadCv}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
