// Caminho completo do arquivo: src/components/Skills/Skills.jsx

// Este arquivo gerencia a seção de habilidades (Skills) do portfólio, exibindo uma interface no estilo de um gerenciador de arquivos (Finder).
// Ele organiza as habilidades em categorias (pastas) e arquivos, com interações dinâmicas como expansão de pastas e exibição de tooltips.
// O componente não utiliza rotas diretamente, mas gerencia estado local para controlar:
// - A expansão de pastas (expandedFolders): Um Set que rastreia quais pastas estão expandidas.
// - A exibição de tooltips (activeTooltip): Um identificador único para mostrar detalhes de arquivos ao passar o mouse.
// O componente utiliza a biblioteca AOS para animações suaves e Heroicons para ícones.

import React, { useState, useEffect } from 'react';
import { FolderIcon, DocumentIcon, ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Componente principal Skills, responsável por exibir e gerenciar a seção de habilidades.
const Skills = () => {
  // Estado para controlar quais pastas estão expandidas. Inicialmente, 'Linguagens' e 'Frameworks' estão expandidas.
  const [expandedFolders, setExpandedFolders] = useState(new Set(['Linguagens', 'Frameworks']));
  // Estado para controlar qual tooltip está ativo ao passar o mouse sobre um arquivo.
  const [activeTooltip, setActiveTooltip] = useState(null);

  // Hook useEffect para inicializar a biblioteca AOS, que adiciona animações de rolagem.
  // Configurações: duração de 800ms, animações ocorrem repetidamente (once: false), e espelham ao rolar para cima (mirror: true).
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true
    });
  }, []);

  // Dados das categorias de habilidades, organizadas em pastas (categorias) e arquivos (habilidades específicas).
  // Cada pasta contém arquivos com detalhes como nome, extensão, tamanho, data de modificação, tipo e descrição.
  const skillCategories = [
    {
      name: 'Linguagens',
      files: [
        {
          name: 'HTML',
          extension: 'html',
          size: '2.1 KB',
          modDate: '14 Mar 2024',
          kind: 'HTML Document',
          description: 'HTML5 com foco em semântica e acessibilidade. Estruturação moderna de documentos web com as melhores práticas de SEO e performance.'
        },
        {
          name: 'CSS',
          extension: 'css',
          size: '1.8 KB',
          modDate: '14 Mar 2024',
          kind: 'CSS File',
          description: 'CSS3 com layouts responsivos usando Flexbox e Grid. Animações suaves e transições para melhor experiência do usuário.'
        },
        /*         {
                  name: 'SCSS',
                  extension: 'scss',
                  size: '2.4 KB',
                  modDate: '14 Mar 2024',
                  kind: 'SCSS File',
                  description: 'SCSS para estilização avançada com mixins, variáveis e nesting. Organização modular de estilos com arquitetura BEM.'
                }, */
        {
          name: 'JAVASCRIPT',
          extension: 'js',
          size: '3.2 KB',
          modDate: '14 Mar 2024',
          kind: 'JavaScript File',
          description: 'JavaScript ES6+ com promises, async/await e módulos. Manipulação avançada do DOM e APIs modernas.'
        },
        {
          name: 'TYPESCRIPT',
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
          name: 'REACT',
          extension: 'jsx',
          size: '4.2 KB',
          modDate: '14 Mar 2024',
          kind: 'React Component',
          description: 'React com Hooks, Context API e componentes funcionais. Gerenciamento de estado com Redux e React Query.'
        },
        {
          name: 'NEXT.JS',
          extension: 'js',
          size: '0.8 KB',
          modDate: '14 Mar 2024',
          kind: 'Next.js Config',
          description: 'Next.js para SSR e SSG. Otimização de imagens, rotas dinâmicas e API routes para melhor performance.'
        },
        {
          name: 'TAILWIND',
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
          name: 'WEBPACK',
          extension: 'js',
          size: '1.6 KB',
          modDate: '14 Mar 2024',
          kind: 'Webpack Config',
          description: 'Webpack para bundling otimizado. Code splitting, tree shaking e configuração avançada de assets.'
        },
        {
          name: 'BABEL',
          extension: 'js',
          size: '0.5 KB',
          modDate: '14 Mar 2024',
          kind: 'Babel Config',
          description: 'Babel para transpilação moderna. Suporte a features mais recentes do JavaScript com polyfills automáticos.'
        },
        {
          name: 'PACKAGE',
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
          name: 'DESIGN SYSTEM',
          extension: 'fig',
          size: '5.2 MB',
          modDate: '14 Mar 2024',
          kind: 'Figma File',
          description: 'Design System completo no Figma. Componentes reutilizáveis, tokens de design e guia de estilos.'
        },
        {
          name: 'ANIMATIONS',
          extension: 'css',
          size: '1.8 KB',
          modDate: '14 Mar 2024',
          kind: 'CSS File',
          description: 'Animações e transições suaves. Micro-interações e feedback visual para melhor experiência do usuário.'
        },
        /*        {
                 name: 'theme',
                 extension: 'js',
                 size: '0.9 KB',
                 modDate: '14 Mar 2024',
                 kind: 'JavaScript File',
                 description: 'Sistema de temas dark/light. Persistência de preferências e transições suaves entre temas.'
               } */
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
          description: 'Arquivo robots.txt usado para controlar o rastreamento de buscadores. Permite bloquear páginas irrelevantes, direcionando robôs como o Googlebot a conteúdos prioritários, melhorando a indexação.'
        },
        {
          name: 'sitemap',
          extension: 'xml',
          size: '1.4 KB',
          modDate: '14 Mar 2024',
          kind: 'XML File',
          description: 'Sitemap XML que lista páginas do site para buscadores. Facilita a descoberta e indexação de conteúdos, acelerando a aparição de novas páginas nos resultados de busca.'
        },
        {
          name: 'bundle-analyzer',
          extension: 'json',
          size: '3.1 KB',
          modDate: '14 Mar 2024',
          kind: 'JSON File',
          description: 'Relatório do Webpack Bundle Analyzer para análise de performance. Mostra o tamanho de arquivos JavaScript, ajudando a otimizar o tempo de carregamento e os Core Web Vitals para SEO.'
        }
      ]
    }
  ];

  // Função para alternar a expansão de pastas.
  // Recebe o nome da pasta e atualiza o estado `expandedFolders`, adicionando ou removendo a pasta do Set.
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

  // Calcula o número total de itens (pastas + arquivos) para exibir no cabeçalho.
  // Soma 1 para cada pasta (category) e o número de arquivos dentro de cada pasta.
  const totalItems = skillCategories.reduce((acc, category) => acc + category.files.length + 1, 0);

  return (
    // Contêiner principal que define o fundo e a altura total da seção.
    <div className="h-full bg-[var(--finder-background)]">
      <div className="h-full">
        <div className="h-full bg-[var(--finder-window)] shadow-lg">
          {/* Cabeçalho da seção Skills, com título e contagem de itens */}
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

          {/* Cabeçalho das colunas, exibindo os rótulos "Name", "Date Modified", "Size" e "Kind" */}
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

          {/* Lista de pastas e arquivos, organizada em uma estrutura de tabela */}
          <div className="divide-y divide-[var(--finder-border)]">
            {skillCategories.map((category, categoryIndex) => {
              const isExpanded = expandedFolders.has(category.name);
              return (
                <div key={category.name}>
                  {/* Pasta (categoria de habilidade) */}
                  <div
                    className="group cursor-default select-none"
                    onClick={() => toggleFolder(category.name)}
                    data-aos="fade-right"
                    data-aos-delay={categoryIndex * 100}
                    data-aos-duration="600"
                  >
                    <div className="flex items-center h-[24px] px-3 ">
                      <div className="flex-1 flex items-center min-w-0">
                        {/* Ícone de expansão/retração da pasta */}
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

                  {/* Arquivos dentro da pasta, exibidos apenas se a pasta estiver expandida */}
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

                      {/* Tooltip que aparece ao passar o mouse sobre um arquivo */}
                      {activeTooltip === `${category.name}-${file.name}` && (
                        <div
                          className="fixed top-1/2 transform -translate-y-1/2 translate-x-0 z-9999 w-80 p-3 rounded-lg  border border-gray-200"
                          style={{
                            left: window.innerWidth < 640 ? '8%' : '35%', // Ajusta a posição com base no tamanho da tela
                            backgroundColor: '#ffffff', // Fundo sólido branco
                            opacity: 1, // Garante que o card seja completamente opaco
                            boxShadow: '0 8px 16px -4px rgba(0, 0, 0, 0), 0 4px 8px -4px rgba(0, 0, 0, 0), 0 0 0 1px rgba(0, 0, 0, 0)',
                            marginLeft: '10px',
                            zIndex: 9999, // Garante que o tooltip fique acima de outros elementos
                          }}
                          data-aos="fade-left"
                          data-aos-duration="300"
                        >
                          <div className="flex items-start gap-3">
                            <DocumentIcon className="w-8 h-8 text-gray-800 flex-shrink-0 mt-0.5" />
                            <div>
                              <h3 className="text-black font-medium mb-1"
                              >
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