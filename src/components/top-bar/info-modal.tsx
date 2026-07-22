"use client";

import Modal from "@/components/ui/modal";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/social-icons";
import topbar from "@/data/i18n/topbar.json";
import { useLocale } from "@/hooks/use-locale";
import type { ModalBaseProps } from "@/types";
import { CodeBracketIcon, CommandLineIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface Feature {
  icon: typeof CodeBracketIcon;
  title: string;
  description: string;
}

const InfoModal = ({ isOpen, onClose }: ModalBaseProps) => {
  const locale = useLocale();
  const t = topbar[locale].infoModal;
  const features: Feature[] = [
    {
      icon: CodeBracketIcon,
      title: t.features[0].title,
      description: t.features[0].description,
    },
    {
      icon: CommandLineIcon,
      title: t.features[1].title,
      description: t.features[1].description,
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t.title}>
      <div className="space-y-6 h-max-content overflow-y-auto">
        <div className="text-finder-text-secondary">
          <p className="mb-4">{t.intro}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-finder-sidebar rounded-lg p-4 border border-finder-border"
            >
              <div className="flex items-start space-x-3">
                <feature.icon className="w-6 h-6 text-finder-accent flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-finder-text mb-1">{feature.title}</h3>
                  <p className="text-sm text-finder-text-secondary">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-sm text-finder-text-secondary flex items-center space-x-4 border border-finder-border p-4 rounded-lg">
          <Image
            src="/icons/img_profile.webp"
            alt={t.profileAlt}
            width={100}
            height={100}
            className="max-w-[100px] h-auto rounded-lg object-cover"
          />
          <div>
            <p>{t.versionLabel}: 1.0.0</p>
            <p>{t.builtByLabel}: Fernando Moreira</p>
            <p>{t.tagline}</p>
            <div className="flex items-center space-x-4 mt-2">
              <a
                href="https://www.linkedin.com/in/feryamaha/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-finder-text-secondary hover:text-finder-accent"
              >
                <LinkedInIcon className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/feryamaha"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-finder-text-secondary hover:text-finder-accent"
              >
                <GitHubIcon className="w-5 h-5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default InfoModal;
