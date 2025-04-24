import React from 'react';
import Modal from '../../shared/Modal/Modal';
import {
  CodeBracketIcon,
  CommandLineIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import { FaLinkedin, FaGithub } from 'react-icons/fa'; // Importando ícones do react-icons
import imgProfile from '../../../assets/img_profile.webp';

const InfoModal = ({ isOpen, onClose }) => {
  const features = [
    {
      icon: CodeBracketIcon,
      title: 'Desenvolvimento',
      description: 'Portfolio desenvolvido com React, Tailwind CSS e outras tecnologias modernas.'
    },
    {
      icon: CommandLineIcon,
      title: 'Funcionalidades',
      description: 'Interface inspirada no Finder do macOS com navegação intuitiva e busca integrada.'
    },
    {
      icon: GlobeAltIcon,
      title: 'Responsividade',
      description: 'Design adaptativo que funciona em diferentes tamanhos de tela.'
    },
    {
      icon: DocumentTextIcon,
      title: 'Documentação',
      description: 'Código bem documentado e organizado seguindo as melhores práticas.'
    }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sobre o Portfolio">
      <div className="space-y-6 h-max-content overflow-y-auto">
        <div className="text-finder-text-secondary">
          <p className="mb-4">
            Este portfolio foi desenvolvido para demonstrar minhas habilidades e projetos.
            A interface foi inspirada no Finder do macOS, proporcionando uma experiência
            familiar e intuitiva.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-finder-sidebar rounded-lg p-4 border border-finder-border"
            >
              <div className="flex items-start space-x-3">
                <feature.icon className="w-6 h-6 text-finder-accent flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-finder-text mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-finder-text-secondary">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="text-sm text-finder-text-secondary flex items-center space-x-4 border border-finder-border p-4 rounded-lg"
        >
          <img
            src={imgProfile}
            alt="Profile"
            className="max-w-[100px] rounded-lg object-cover"

          />
          <div>
            <p>Versão: 1.0.0</p>
            <p>Desenvolvido por: Fernando Moreira</p>
            <p>Desenvolvedor frontend</p>
            <div className="flex items-center space-x-4 mt-2">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/feryamaha/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-finder-text-secondary hover:text-finder-accent"
              >
                <FaLinkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
              {/* GitHub */}
              <a
                href="https://github.com/feryamaha"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-finder-text-secondary hover:text-finder-accent"
              >
                <FaGithub className="w-5 h-5" />
                <span>GitHub</span>
              </a>
              {/* WhatsApp */}
              {/*               <a
                href="https://wa.me/5514996010696"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-finder-text-secondary hover:text-finder-accent"
              >
                <PhoneIcon className="w-5 h-5" />
                <span>WhatsApp</span>
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default InfoModal;