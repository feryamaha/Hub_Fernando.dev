import React from 'react';
import { useTheme } from '../../../hooks/useTheme';
import './About.css';

const About = () => {
  const [theme] = useTheme();
  const folders = [
    {
      title: 'Apresentação',
      content: 'Desenvolvedor Front-End com foco em produto, UX/UI, Pixel Perfect, Detalhismo e Lógica.'
    },
    {
      title: 'Especialidade',
      content: 'Sou especialista em transformar ideias em produtos digitais de alto impacto, com interfaces modernas, responsivas e absolutamente fiéis ao design (pixel perfect).'
    },
    {
      title: 'Visão & Missão',
      content: 'Minha atuação é guiada por uma visão de produto, sempre priorizando a experiência do usuário, a performance e a escalabilidade.'
    },
    {
      title: 'Produto & UX',
      content: 'Entrego soluções que unem tecnologia, design e usabilidade, sempre pensando no valor para o usuário final e nos objetivos do negócio.'
    },
    {
      title: 'Pixel Perfect',
      content: 'Tenho olhar apurado para detalhes visuais, garantindo que cada componente seja fiel ao layout, com responsividade e acessibilidade impecáveis.'
    },
    {
      title: 'Análise & Lógica',
      content: 'Forte capacidade de análise, resolução de problemas e tomada de decisão baseada em dados e melhores práticas de engenharia.'
    },
    {
      title: 'Arquitetura',
      content: 'Estruturação de projetos modulares e escaláveis, com foco em manutenibilidade e crescimento sustentável.'
    },
    {
      title: 'Automação',
      content: 'Automação de processos de build, deploy e verificação de qualidade para garantir entregas consistentes.'
    }
  ];

  return (
    <div className={`w-full p-4 md:p-8 theme-${theme}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
        {folders.map((folder, index) => (
          <div
            key={index}
            className="w-full h-[250px] relative"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <svg
              viewBox="0 0 302 252"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
            >
              <path
                d="M281 251H21C9.95431 251 1 242.046 1 231V21C1 9.95431 9.95429 1 21 1H159.655C167.135 1 173.99 5.17407 177.423 11.8196L181.174 19.0782C184.607 25.7238 191.462 29.8979 198.942 29.8979H281C292.046 29.8979 301 38.8522 301 49.8979V231C301 242.046 292.046 251 281 251Z"
                fill="#000"
                stroke="#000"
              />
            </svg>
            <h3 className="absolute text-[var(--finder-accent)] font-medium text-base md:text-lg top-[10px] left-[35px]">
              {folder.title}
            </h3>
            <div className="absolute inset-0 flex flex-col px-6 md:px-12 pt-20 md:pt-24 pb-6 md:pb-10">
              <p className="text-white text-sm md:text-base leading-relaxed">
                {folder.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[var(--finder-window)] rounded-lg p-4 mt-8 max-w-2xl mx-auto">
        <p className="text-[var(--finder-text)] italic text-center text-base md:text-lg">
          "Meu objetivo é criar produtos digitais que encantam pelo visual, pela experiência e pela robustez técnica."
        </p>
      </div>
    </div>
  );
};

export default About;