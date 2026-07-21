"use client";

import {
  ChevronDownIcon,
  ChevronRightIcon,
  DocumentIcon,
  FolderIcon,
} from "@heroicons/react/24/outline";
import AOS from "aos";
import { useEffect, useState } from "react";

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
          "Design systems em Tailwind com tokens semânticos, componentes tipados com TypeScript reutilizáveis e acessíveis.",
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
    name: "Dados & APIs",
    files: [
      {
        name: "Integração de APIs",
        extension: "ts",
        size: "2.8 KB",
        modDate: "2026",
        kind: "TypeScript File",
        description:
          "Agregação de APIs públicas com fallback entre provedores (OpenStreetMap/Nominatim, ViaCEP, BrasilAPI, dados abertos da Receita Federal) — base do MapHunter, meu motor de prospecção de leads.",
      },
      {
        name: "Cache & Rate limit",
        extension: "ts",
        size: "1.6 KB",
        modDate: "2026",
        kind: "TypeScript File",
        description:
          "Cache local de consultas e rate limiting para respeitar limites de APIs gratuitas e não desperdiçar chamadas — custo previsível por design.",
      },
      {
        name: "Pipelines de dados",
        extension: "ts",
        size: "2.2 KB",
        modDate: "2026",
        kind: "TypeScript File",
        description:
          "Pipelines de qualificação e enriquecimento de dados em etapas (filtrar antes de enriquecer), com exportação para CSV e XLSX.",
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
          "Lint com regras custom, tipagem estrita, validação em runtime com Zod e gates de segurança e arquitetura em pre-commit.",
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

/** Id estável de um arquivo na lista (categoria + nome). */
const fileId = (category: string, file: SkillFile) => `${category}/${file.name}.${file.extension}`;

const Skills = () => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(["Linguagens", "Frameworks & Bibliotecas"]),
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
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

  const selected = (() => {
    for (const category of skillCategories) {
      for (const file of category.files) {
        if (fileId(category.name, file) === selectedId) {
          return { category: category.name, file };
        }
      }
    }
    return null;
  })();

  return (
    <div className="h-full bg-[var(--finder-background)]">
      <div className="mac-window h-full flex flex-col md:max-w-[980px] mx-auto">
        {/* Barra de título da janela Finder */}
        <div className="mac-window-titlebar">
          <img src="/icons/icon-close.svg" width={12} height={12} alt="" />
          <img src="/icons/icon-mac-minimize.svg" width={12} height={12} alt="" />
          <img src="/icons/icon-mac-maximize.svg" width={12} height={12} alt="" />
          <span className="mac-window-title">Skills — {totalItems} items</span>
        </div>

        <div className="flex flex-1 min-h-0">
          {/* Coluna da lista (Finder list view) */}
          <div className="flex-1 min-w-0 overflow-y-auto scrollbar-finder">
            {/* Cabeçalho das colunas */}
            <div className="sticky top-0 z-10 flex items-center h-[24px] px-3 bg-[var(--finder-header)] border-b border-[var(--finder-border)] text-[11px] text-[var(--finder-text-secondary)] font-medium">
              <div className="flex-1">Name</div>
              <div className="hidden lg:block w-20 text-right">Size</div>
              <div className="hidden lg:block w-32 text-right">Kind</div>
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
                      data-aos-delay={categoryIndex * 60}
                      data-aos-duration="500"
                    >
                      <div className="flex items-center h-[26px] px-3 hover:bg-[var(--finder-hover)]">
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
                        <div className="hidden lg:block w-20 text-right">
                          <span className="text-[12px] text-[var(--finder-text-secondary)]">
                            --
                          </span>
                        </div>
                        <div className="hidden lg:block w-32 text-right">
                          <span className="text-[12px] text-[var(--finder-text-secondary)]">
                            Folder
                          </span>
                        </div>
                      </div>
                    </button>

                    {isExpanded &&
                      category.files.map((file) => {
                        const id = fileId(category.name, file);
                        const isSelected = selectedId === id;
                        return (
                          <div key={id}>
                            <button
                              type="button"
                              className="w-full text-left cursor-default select-none"
                              aria-pressed={isSelected}
                              onClick={() => setSelectedId(isSelected ? null : id)}
                            >
                              <div
                                className={`flex items-center h-[26px] pl-7 pr-3 ${
                                  isSelected
                                    ? "bg-[var(--finder-accent)] text-[var(--finder-accent-contrast)]"
                                    : "hover:bg-[var(--finder-hover)]"
                                }`}
                              >
                                <div className="flex-1 flex items-center min-w-0">
                                  <DocumentIcon
                                    className={`w-4 h-4 mr-2 flex-shrink-0 ${
                                      isSelected
                                        ? "text-[var(--finder-accent-contrast)]"
                                        : "text-[var(--finder-icon)]"
                                    }`}
                                  />
                                  <span
                                    className={`text-[13px] font-normal truncate ${
                                      isSelected
                                        ? "text-[var(--finder-accent-contrast)]"
                                        : "text-[var(--finder-text)]"
                                    }`}
                                  >
                                    {file.name}.{file.extension}
                                  </span>
                                </div>
                                <div className="hidden lg:block w-20 text-right">
                                  <span
                                    className={`text-[12px] ${
                                      isSelected
                                        ? "text-[var(--finder-accent-contrast)]/80"
                                        : "text-[var(--finder-text-secondary)]"
                                    }`}
                                  >
                                    {file.size}
                                  </span>
                                </div>
                                <div className="hidden lg:block w-32 text-right">
                                  <span
                                    className={`text-[12px] ${
                                      isSelected
                                        ? "text-[var(--finder-accent-contrast)]/80"
                                        : "text-[var(--finder-text-secondary)]"
                                    }`}
                                  >
                                    {file.kind}
                                  </span>
                                </div>
                              </div>
                            </button>

                            {/* Descrição inline no mobile (sem painel lateral) */}
                            {isSelected && (
                              <div className="md:hidden px-7 py-3 bg-[var(--finder-header)] border-y border-[var(--finder-border)]">
                                <p className="text-[13px] leading-relaxed text-[var(--finder-text-secondary)]">
                                  {file.description}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                );
              })}
            </div>

            <p className="px-3 py-2 text-[11px] text-[var(--finder-text-secondary)]">
              Clique em um arquivo para ver os detalhes.
            </p>
          </div>

          {/* Painel de preview (estilo Finder), apenas desktop */}
          <aside className="hidden md:flex w-[280px] shrink-0 border-l border-[var(--finder-border)] bg-[var(--finder-header)] flex-col items-center px-5 py-8 overflow-y-auto scrollbar-finder">
            {selected ? (
              <>
                <div className="flex items-center justify-center w-20 h-20 rounded-xl bg-[var(--finder-accent)]/10 mb-4">
                  <DocumentIcon className="w-12 h-12 text-[var(--finder-accent)]" />
                </div>
                <h3 className="text-[14px] font-semibold text-[var(--finder-text)] text-center break-all">
                  {selected.file.name}.{selected.file.extension}
                </h3>
                <p className="text-[11px] text-[var(--finder-text-secondary)] mb-4">
                  {selected.file.kind} · {selected.file.size}
                </p>
                <p className="text-[13px] leading-relaxed text-[var(--finder-text-secondary)] text-left">
                  {selected.file.description}
                </p>
                <dl className="w-full mt-6 pt-4 border-t border-[var(--finder-border)] text-[11px] space-y-1.5">
                  <div className="flex justify-between gap-2">
                    <dt className="text-[var(--finder-text-secondary)]">Pasta</dt>
                    <dd className="text-[var(--finder-text)] text-right">{selected.category}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-[var(--finder-text-secondary)]">Modificado</dt>
                    <dd className="text-[var(--finder-text)]">{selected.file.modDate}</dd>
                  </div>
                </dl>
              </>
            ) : (
              <div className="m-auto text-center text-[var(--finder-text-secondary)]">
                <DocumentIcon className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <p className="text-[12px]">Selecione um arquivo para ver o preview.</p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Skills;
