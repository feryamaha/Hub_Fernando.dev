"use client";

import Modal from "@/components/ui/modal";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/social-icons";
import type { ModalBaseProps } from "@/types";
import { CodeBracketIcon, CommandLineIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface Feature {
  icon: typeof CodeBracketIcon;
  title: string;
  description: string;
}

const InfoModal = ({ isOpen, onClose }: ModalBaseProps) => {
  const features: Feature[] = [
    {
      icon: CodeBracketIcon,
      title: "Interface Finder",
      description:
        "Janelas com titlebar e semáforos SVG oficiais, sidebar com vibrancy, tipografia de sistema e 8 temas de accent dinâmicos.",
    },
    {
      icon: CommandLineIcon,
      title: "Interações macOS",
      description:
        "Semáforos funcionais (fechar, minimizar, maximizar), busca Spotlight com ⌘K e navegação SPA por seções.",
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sobre o Portfolio">
      <div className="space-y-6 h-max-content overflow-y-auto">
        <div className="text-finder-text-secondary">
          <p className="mb-4">
            Este é o meu Portfolio pessoal inspirado na interface do Finder do macOS.
          </p>
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
            alt="Foto de Fernando Moreira"
            width={100}
            height={100}
            className="max-w-[100px] h-auto rounded-lg object-cover"
          />
          <div>
            <p>Versão: 1.0.0</p>
            <p>Desenvolvido por: Fernando Moreira</p>
            <p>Full-Stack TypeScript · Rust · Segurança</p>
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
