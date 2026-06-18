"use client";

import {
  ChevronDownIcon,
  ChevronRightIcon,
  DocumentIcon,
  FolderIcon,
} from "@heroicons/react/24/outline";
import AOS from "aos";
import { type CSSProperties, useEffect, useState } from "react";

interface SkillFile {
  name: string;
  extension: string;
  size: string;
  modDate: string;
  kind: string;
  description: string;
}

interface SkillCategory {
  name: string;
  files: SkillFile[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Linguagens",
    files: [
      {
        name: "TypeScript",
        extension: "ts",
        size: "3.4 KB",
        modDate: "2026",
        kind: "TypeScript File",
        description:
          "TypeScript em strict mode como base de tudo: tipagem estática, generics, contratos explícitos entre camadas e validação de domínio. Menos ambiguidade, mais segurança em tempo de compilação.",
      },
      {
        name: "JavaScript",
        extension: "js",
        size: "2.9 KB",
        modDate: "2026",
        kind: "JavaScript File",
        description:
          "JavaScript ES6+ moderno: async/await, módulos, APIs do browser e manipulação avançada do DOM quando o contexto pede JS puro.",
      },
      {
        name: "Rust",
        extension: "rs",
        size: "5.1 KB",
        modDate: "2026",
        kind: "Rust Source",
        description:
          "Rust para sistemas de alta confiabilidade e baixo nível. Linguagem do Nemesis Defender: enforcement de segurança, parsing e design fail-closed com performance previsível.",
      },
      {
        name: "HTML5",
        extension: "html",
        size: "1.8 KB",
        modDate: "2026",
        kind: "HTML Document",
        description:
          "HTML5 semântico, acessível e otimizado para SEO. Estrutura sólida como fundação de qualquer interface.",
      },
      {
        name: "CSS3",
        extension: "css",
        size: "2.0 KB",
        modDate: "2026",
        kind: "CSS File",
        description:
          "CSS3 moderno com layouts responsivos (Flexbox/Grid), animações e tokens de design consistentes.",
      },
    ],
  },
  {
    name: "Frameworks & Bibliotecas",
    files: [
      {
        name: "React",
        extension: "tsx",
        size: "4.6 KB",
        modDate: "2026",
        kind: "React Component",
        description:
          "React 19 com Server Components, hooks e componentes funcionais. Foco em composição, estado previsível e UI desacoplada da lógica.",
      },
      {
        name: "Next.js",
        extension: "ts",
        size: "3.2 KB",
        modDate: "2026",
        kind: "Next.js App",
        description:
          "Next.js com App Router e RSC: SSR, SSG, ISR e Route Handlers (BFF). Performance e segurança como padrão de arquitetura.",
      },
      {
        name: "React Hook Form",
        extension: "ts",
        size: "1.4 KB",
        modDate: "2026",
        kind: "TypeScript File",
        description:
          "Formulários performáticos e tipados com React Hook Form, integrados a validação por schema.",
      },
      {
        name: "Zod",
        extension: "ts",
        size: "1.2 KB",
        modDate: "2026",
        kind: "TypeScript File",
        description:
          "Zod para validação em runtime e contratos de dados type-safe entre cliente, servidor e APIs externas.",
      },
      {
        name: "Tailwind CSS",
        extension: "css",
        size: "2.3 KB",
        modDate: "2026",
        kind: "Tailwind Config",
        description:
          "Tailwind CSS para 100% da estilização, com tokens semânticos e design systems escaláveis.",
      },
    ],
  },
  {
    name: "Arquitetura",
    files: [
      {
        name: "Clean Architecture",
        extension: "md",
        size: "2.6 KB",
        modDate: "2026",
        kind: "Architecture Doc",
        description:
          "Clean Architecture com separação rigorosa de responsabilidades: UI → Hooks → Services → Types, contratos explícitos e baixo acoplamento.",
      },
      {
        name: "Design Systems",
        extension: "fig",
        size: "6.4 MB",
        modDate: "2026",
        kind: "Design System",
        description:
          "Design systems em Tailwind com tokens semânticos e +160 componentes TypeScript reutilizáveis e acessíveis.",
      },
      {
        name: "BFF",
        extension: "ts",
        size: "2.1 KB",
        modDate: "2026",
        kind: "TypeScript File",
        description:
          "Backend for Frontend via Route Handlers, mantendo credenciais e regras sensíveis exclusivamente no servidor.",
      },
      {
        name: "Contracts",
        extension: "d.ts",
        size: "1.1 KB",
        modDate: "2026",
        kind: "TypeScript Decl",
        description:
          "Contratos TypeScript explícitos como fronteira entre camadas — interfaces como documentação executável.",
      },
    ],
  },
  {
    name: "Segurança",
    files: [
      {
        name: "OWASP Top 10",
        extension: "md",
        size: "2.2 KB",
        modDate: "2026",
        kind: "Security Doc",
        description:
          "Mitigação sistemática do OWASP Top 10 ao longo do ciclo de desenvolvimento, do design ao deploy.",
      },
      {
        name: "OWASP for LLM",
        extension: "md",
        size: "2.4 KB",
        modDate: "2026",
        kind: "Security Doc",
        description:
          "OWASP Top 10 for LLM: prompt injection, exfiltração de credenciais e abuso de agentes — base do Nemesis Defender. Certificado pela OWASP Foundation.",
      },
      {
        name: "CSP Level 3",
        extension: "conf",
        size: "1.6 KB",
        modDate: "2026",
        kind: "Security Header",
        description:
          "CSP Level 3 com nonce dinâmico, HSTS, X-Frame-Options e Permissions-Policy aplicados por padrão.",
      },
      {
        name: "Threat Modeling",
        extension: "md",
        size: "2.0 KB",
        modDate: "2026",
        kind: "Security Doc",
        description:
          "Modelagem de ameaças e declaração explícita de escopo e limites — honestidade sobre o que o sistema protege.",
      },
      {
        name: "Supply-chain",
        extension: "md",
        size: "1.9 KB",
        modDate: "2026",
        kind: "Security Doc",
        description:
          "Defesa de supply-chain: enforcement em runtime contra malware em pacotes antes que ele tente executar.",
      },
    ],
  },
  {
    name: "Sistemas & Baixo Nível",
    files: [
      {
        name: "eBPF",
        extension: "c",
        size: "4.0 KB",
        modDate: "2026",
        kind: "eBPF Program",
        description:
          "eBPF / BPF LSM no kernel Linux (bprm_check_security e egress via socket_connect) — rede de segurança no nível do kernel.",
      },
      {
        name: "AST",
        extension: "ts",
        size: "2.7 KB",
        modDate: "2026",
        kind: "Parser",
        description:
          "Análise de AST com tree-sitter e análise estática para detectar padrões maliciosos antes da execução.",
      },
      {
        name: "Fail-closed",
        extension: "rs",
        size: "1.5 KB",
        modDate: "2026",
        kind: "Rust Source",
        description:
          "Design fail-closed e quarentena por corroboração de sinais: na dúvida, o sistema bloqueia e segura a sessão.",
      },
      {
        name: "Linux",
        extension: "sh",
        size: "1.0 KB",
        modDate: "2026",
        kind: "Shell Script",
        description:
          "Linux, syscalls e ferramentas de baixo nível como ambiente de desenvolvimento e enforcement.",
      },
    ],
  },
  {
    name: "Performance & Qualidade",
    files: [
      {
        name: "RSC / SSR / SSG / ISR",
        extension: "ts",
        size: "2.5 KB",
        modDate: "2026",
        kind: "Next.js Strategy",
        description:
          "Estratégias de renderização (RSC, SSR, SSG, ISR) para Lighthouse 90+ e redução de ~20–30% no bundle.",
      },
      {
        name: "Lighthouse",
        extension: "json",
        size: "1.3 KB",
        modDate: "2026",
        kind: "Report",
        description:
          "Métricas LCP/TTI e auditorias Lighthouse como contrato de performance medido e versionado.",
      },
      {
        name: "Playwright",
        extension: "ts",
        size: "2.0 KB",
        modDate: "2026",
        kind: "E2E Test",
        description:
          "Testes E2E com Playwright e testes de regressão para garantir comportamento estável a cada mudança.",
      },
      {
        name: "Quality Gates",
        extension: "ts",
        size: "1.4 KB",
        modDate: "2026",
        kind: "Config",
        description:
          "ESLint com regras custom, tipagem estrita e validação em runtime com Zod como portões de qualidade.",
      },
    ],
  },
  {
    name: "IA & Agentic Coding",
    files: [
      {
        name: "Claude Code",
        extension: "ts",
        size: "1.6 KB",
        modDate: "2026",
        kind: "Agent Config",
        description:
          "Desenvolvimento assistido por Claude Code sob governança arquitetural explícita.",
      },
      {
        name: "Cursor / Windsurf",
        extension: "ts",
        size: "1.5 KB",
        modDate: "2026",
        kind: "Agent Config",
        description:
          "Cursor e Windsurf para features, refactors e documentação com contratos claros de atuação do agente.",
      },
      {
        name: "Codex",
        extension: "ts",
        size: "1.4 KB",
        modDate: "2026",
        kind: "Agent Config",
        description:
          "OpenAI Codex integrado ao fluxo, com enforcement de segurança sobre as ações do agente.",
      },
      {
        name: "Vercel AI SDK",
        extension: "ts",
        size: "1.7 KB",
        modDate: "2026",
        kind: "TypeScript File",
        description: "Vercel AI SDK para construir funcionalidades de IA com tipagem e streaming.",
      },
    ],
  },
];

const Skills = () => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(["Linguagens", "Frameworks & Bibliotecas"]),
  );
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });
  }, []);

  const toggleFolder = (folderName: string) => {
    setExpandedFolders((prev) => {
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

  const tooltipLeft = typeof window !== "undefined" && window.innerWidth < 640 ? "8%" : "35%";

  return (
    <div className="h-full bg-[var(--finder-background)]">
      <div className="h-full">
        <div className="h-full bg-[var(--finder-window)] shadow-lg">
          {/* Cabeçalho da seção Skills */}
          <div
            className="border-b border-[var(--finder-border)] px-3 py-1.5 flex items-center justify-between bg-[var(--finder-header)]"
            data-aos="fade-down"
            data-aos-duration="500"
          >
            <h2 className="text-[var(--finder-text)] text-sm font-medium">Skills</h2>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[var(--finder-text-secondary)]">
                {totalItems} items
              </span>
            </div>
          </div>

          {/* Cabeçalho das colunas */}
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

          {/* Lista de pastas e arquivos */}
          <div className="divide-y divide-[var(--finder-border)]">
            {skillCategories.map((category, categoryIndex) => {
              const isExpanded = expandedFolders.has(category.name);
              return (
                <div key={category.name}>
                  <button
                    type="button"
                    className="group cursor-default select-none w-full text-left"
                    onClick={() => toggleFolder(category.name)}
                    data-aos="fade-right"
                    data-aos-delay={categoryIndex * 100}
                    data-aos-duration="600"
                  >
                    <div className="flex items-center h-[24px] px-3">
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
                          {new Date().toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="w-20 text-right">
                        <span className="text-[12px] text-[var(--finder-text-secondary)]">--</span>
                      </div>
                      <div className="w-32 text-right">
                        <span className="text-[12px] text-[var(--finder-text-secondary)]">
                          Folder
                        </span>
                      </div>
                    </div>
                  </button>

                  {isExpanded &&
                    category.files.map((file, fileIndex) => (
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

                        {activeTooltip === `${category.name}-${file.name}` && (
                          <div
                            className="fixed top-1/2 transform -translate-y-1/2 translate-x-0 z-[9999] w-80 p-3 rounded-lg border border-gray-200"
                            style={
                              {
                                left: tooltipLeft,
                                backgroundColor: "#ffffff",
                                opacity: 1,
                                boxShadow:
                                  "0 8px 16px -4px rgba(0, 0, 0, 0), 0 4px 8px -4px rgba(0, 0, 0, 0), 0 0 0 1px rgba(0, 0, 0, 0)",
                                marginLeft: "10px",
                              } as CSSProperties
                            }
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
