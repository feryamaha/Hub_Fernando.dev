import React, { useState, useEffect } from 'react';
import { FolderIcon, DocumentIcon, ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Skills = () => {
  const [expandedFolders, setExpandedFolders] = useState(new Set(['Linguagens', 'Frameworks']));
  const [activeTooltip, setActiveTooltip] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true
    });
  }, []);

  const skillCategories = [
    {
      name: 'Linguagens',
      files: [
        {
          name: 'index',
          extension: 'html',
          size: '2.1 KB',
          modDate: '14 Mar 2024',
          kind: 'HTML Document',
          description: 'HTML5 com foco em semântica e acessibilidade. Estruturação moderna de documentos web com as melhores práticas de SEO e performance.'
        },
        {
          name: 'styles',
          extension: 'css',
          size: '1.8 KB',
          modDate: '14 Mar 2024',
          kind: 'CSS File',
          description: 'CSS3 com layouts responsivos usando Flexbox e Grid. Animações suaves e transições para melhor experiência do usuário.'
        },
        {
          name: 'main',
          extension: 'scss',
          size: '2.4 KB',
          modDate: '14 Mar 2024',
          kind: 'SCSS File',
          description: 'SCSS para estilização avançada com mixins, variáveis e nesting. Organização modular de estilos com arquitetura BEM.'
        },
        {
          name: 'app',
          extension: 'js',
          size: '3.2 KB',
          modDate: '14 Mar 2024',
          kind: 'JavaScript File',
          description: 'JavaScript ES6+ com promises, async/await e módulos. Manipulação avançada do DOM e APIs modernas.'
        },
        {
          name: 'types',
          extension: 'ts',
          size: '1.5 KB',
          modDate: '14 Mar 2024',
          kind: 'TypeScript File',
          description: 'TypeScript para tipagem estática, interfaces e generics. Desenvolvimento mais seguro e manutenível.'
        }
      ]
    },
    {
      name: 'Frameworks',
      files: [
        {
          name: 'App',
          extension: 'jsx',
          size: '4.2 KB',
          modDate: '14 Mar 2024',
          kind: 'React Component',
          description: 'React com Hooks, Context API e componentes funcionais. Gerenciamento de estado com Redux e React Query.'
        },
        {
          name: 'next.config',
          extension: 'js',
          size: '0.8 KB',
          modDate: '14 Mar 2024',
          kind: 'Next.js Config',
          description: 'Next.js para SSR e SSG. Otimização de imagens, rotas dinâmicas e API routes para melhor performance.'
        },
        {
          name: 'tailwind.config',
          extension: 'js',
          size: '1.2 KB',
          modDate: '14 Mar 2024',
          kind: 'Tailwind Config',
          description: 'Tailwind CSS para estilização utility-first. Design system consistente e responsivo com tema customizado.'
        }
      ]
    },
    {
      name: 'Build & Automação',
      files: [
        {
          name: 'webpack.config',
          extension: 'js',
          size: '1.6 KB',
          modDate: '14 Mar 2024',
          kind: 'Webpack Config',
          description: 'Webpack para bundling otimizado. Code splitting, tree shaking e configuração avançada de assets.'
        },
        {
          name: 'babel.config',
          extension: 'js',
          size: '0.5 KB',
          modDate: '14 Mar 2024',
          kind: 'Babel Config',
          description: 'Babel para transpilação moderna. Suporte a features mais recentes do JavaScript com polyfills automáticos.'
        },
        {
          name: 'package',
          extension: 'json',
          size: '2.8 KB',
          modDate: '14 Mar 2024',
          kind: 'JSON File',
          description: 'Gerenciamento de dependências com npm/yarn. Scripts automatizados e configuração de desenvolvimento.'
        }
      ]
    },
    {
      name: 'UI/UX',
      files: [
        {
          name: 'design-system',
          extension: 'fig',
          size: '5.2 MB',
          modDate: '14 Mar 2024',
          kind: 'Figma File',
          description: 'Design System completo no Figma. Componentes reutilizáveis, tokens de design e guia de estilos.'
        },
        {
          name: 'animations',
          extension: 'css',
          size: '1.8 KB',
          modDate: '14 Mar 2024',
          kind: 'CSS File',
          description: 'Animações e transições suaves. Micro-interações e feedback visual para melhor experiência do usuário.'
        },
        {
          name: 'theme',
          extension: 'js',
          size: '0.9 KB',
          modDate: '14 Mar 2024',
          kind: 'JavaScript File',
          description: 'Sistema de temas dark/light. Persistência de preferências e transições suaves entre temas.'
        }
      ]
    },
    {
      name: 'SEO & Performance',
      files: [
        {
          name: 'robots',
          extension: 'txt',
          size: '0.2 KB',
          modDate: '14 Mar 2024',
          kind: 'Text File',
          description: 'Configuração de robots.txt para SEO. Controle de crawling e indexação por search engines.'
        },
        {
          name: 'sitemap',
          extension: 'xml',
          size: '1.4 KB',
          modDate: '14 Mar 2024',
          kind: 'XML File',
          description: 'Sitemap XML dinâmico. Melhoria da descoberta de conteúdo e indexação por buscadores.'
        },
        {
          name: 'bundle-analyzer',
          extension: 'json',
          size: '3.1 KB',
          modDate: '14 Mar 2024',
          kind: 'JSON File',
          description: 'Análise de bundle size e performance. Otimização de carregamento e code splitting inteligente.'
        }
      ]
    }
  ];

  const toggleFolder = (folderName) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(folderName)) {
        newSet.delete(folderName);
      } else {
        newSet.add(folderName);
      }
      return newSet;
    });
  };

  const totalItems = skillCategories.reduce((acc, category) => acc + category.files.length + 1, 0);

  return (
    <div className="h-full bg-[var(--finder-background)]">
      <div className="h-full">
        <div className="h-full bg-[var(--finder-window)] shadow-lg">
          {/* Header */}
          <div 
            className="border-b border-[var(--finder-border)] px-3 py-1.5 flex items-center justify-between bg-[var(--finder-header)]"
            data-aos="fade-down"
            data-aos-duration="500"
          >
            <h2 className="text-[var(--finder-text)] text-sm font-medium">Skills</h2>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[var(--finder-text-secondary)]">{totalItems} items</span>
            </div>
          </div>

          {/* Column Headers */}
          <div 
            className="flex items-center h-[24px] px-3 bg-[var(--finder-header)] border-b border-[var(--finder-border)] text-[11px] text-[var(--finder-text-secondary)] font-medium"
            data-aos="fade-down"
            data-aos-delay="100"
            data-aos-duration="500"
          >
            <div className="flex-1">Name</div>
            <div className="w-32 text-right">Date Modified</div>
            <div className="w-20 text-right">Size</div>
            <div className="w-32 text-right">Kind</div>
          </div>

          {/* List */}
          <div className="divide-y divide-[var(--finder-border)]">
            {skillCategories.map((category, categoryIndex) => {
              const isExpanded = expandedFolders.has(category.name);
              return (
                <div key={category.name}>
                  {/* Folder */}
                  <div 
                    className="group cursor-default select-none"
                    onClick={() => toggleFolder(category.name)}
                    data-aos="fade-right"
                    data-aos-delay={categoryIndex * 100}
                    data-aos-duration="600"
                  >
                    <div className="flex items-center h-[24px] px-3 hover:bg-[var(--finder-hover)]">
                      <div className="flex-1 flex items-center min-w-0">
                        {isExpanded ? (
                          <ChevronDownIcon className="w-3 h-3 text-[var(--finder-text-secondary)] mr-1" />
                        ) : (
                          <ChevronRightIcon className="w-3 h-3 text-[var(--finder-text-secondary)] mr-1" />
                        )}
                        <FolderIcon className="w-4 h-4 text-[var(--finder-folder)] mr-2 flex-shrink-0" />
                        <span className="text-[13px] text-[var(--finder-text)] font-normal truncate">
                          {category.name}
                        </span>
                      </div>
                      <div className="w-32 text-right">
                        <span className="text-[12px] text-[var(--finder-text-secondary)]">
                          {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      <div className="w-20 text-right">
                        <span className="text-[12px] text-[var(--finder-text-secondary)]">--</span>
                      </div>
                      <div className="w-32 text-right">
                        <span className="text-[12px] text-[var(--finder-text-secondary)]">Folder</span>
                      </div>
                    </div>
                  </div>

                  {/* Files inside folder */}
                  {isExpanded && category.files.map((file, fileIndex) => (
                    <div 
                      key={`${file.name}.${file.extension}`}
                      className="group cursor-default select-none relative"
                      data-aos="fade-left"
                      data-aos-delay={fileIndex * 50}
                      data-aos-duration="500"
                      onMouseEnter={() => setActiveTooltip(`${category.name}-${file.name}`)}
                      onMouseLeave={() => setActiveTooltip(null)}
                    >
                      <div className="flex items-center h-[24px] pl-7 pr-3 hover:bg-[var(--finder-hover)]">
                        <div className="flex-1 flex items-center min-w-0">
                          <DocumentIcon className="w-4 h-4 text-[var(--finder-icon)] mr-2 flex-shrink-0" />
                          <span className="text-[13px] text-[var(--finder-text)] font-normal truncate">
                            {file.name}.{file.extension}
                          </span>
                        </div>
                        <div className="w-32 text-right">
                          <span className="text-[12px] text-[var(--finder-text-secondary)]">
                            {file.modDate}
                          </span>
                        </div>
                        <div className="w-20 text-right">
                          <span className="text-[12px] text-[var(--finder-text-secondary)]">
                            {file.size}
                          </span>
                        </div>
                        <div className="w-32 text-right">
                          <span className="text-[12px] text-[var(--finder-text-secondary)]">
                            {file.kind}
                          </span>
                        </div>
                      </div>

                      {/* Tooltip */}
                      {activeTooltip === `${category.name}-${file.name}` && (
                        <div 
                          className="fixed top-1/2 left-1/3 transform -translate-y-1/2 translate-x-0 z-50 w-80 p-3 rounded-lg shadow-lg border border-gray-200"
                          style={{
                            backgroundColor: '#ffffff',
                            boxShadow: '0 8px 16px -4px rgba(0, 0, 0, 0.1), 0 4px 8px -4px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.1)',
                            marginLeft: '10px'
                          }}
                          data-aos="fade-left"
                          data-aos-duration="300"
                        >
                          <div className="flex items-start gap-3">
                            <DocumentIcon className="w-8 h-8 text-gray-800 flex-shrink-0 mt-0.5" />
                            <div>
                              <h3 className="text-black font-medium mb-1">
                                {file.name}.{file.extension}
                              </h3>
                              <p className="text-gray-700 text-sm leading-relaxed">
                                {file.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills; 