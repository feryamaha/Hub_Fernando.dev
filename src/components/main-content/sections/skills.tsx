"use client";

import { useTheme } from "@/hooks/use-theme";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  DocumentIcon,
  ListBulletIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import AOS from "aos";
import { AnimatePresence, Reorder, motion } from "framer-motion";
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
          "Uso TypeScript em strict mode como contrato entre camadas: modelo domínio com generics, tipo os limites de UI, hooks, services e types, e trato o compilador como primeiro revisor. Foi assim que mantive centenas de componentes tipados no portal multi-perfil da Auclan sem perder rastreabilidade.",
      },
      {
        name: "JavaScript",
        extension: "js",
        size: "2.9 KB",
        modDate: "2026",
        kind: "JavaScript File",
        description:
          "Recorro a JavaScript puro quando o contexto não comporta build: scripts de browser, manipulação direta de DOM e o script de pré-pintura de tema deste portfólio, que evita o flash de tema errado antes do React hidratar.",
      },
      {
        name: "Rust",
        extension: "rs",
        size: "5.1 KB",
        modDate: "2026",
        kind: "Rust Source",
        description:
          "Escrevi o Nemesis Defender inteiro em Rust: scanner com deny-list de 36 categorias, 14 visitors de AST e design fail-closed onde qualquer panic vira bloqueio. Uso Rust quando errar em silêncio não é aceitável.",
      },
      {
        name: "HTML5",
        extension: "html",
        size: "1.8 KB",
        modDate: "2026",
        kind: "HTML Document",
        description:
          "Estruturo HTML semântico pensando em quem lê depois: leitor de tela, crawler e preview de link. Neste portfólio todas as seções ficam no HTML mesmo ocultas, para o export estático carregar conteúdo real e não uma casca vazia.",
      },
      {
        name: "CSS3",
        extension: "css",
        size: "2.0 KB",
        modDate: "2026",
        kind: "CSS File",
        description:
          "Trabalho CSS por token, não por valor solto. Reduzi o globals.css deste projeto de 484 para 4 linhas movendo cor, tema e utilitário para uma fonte única, com os 9 temas gerados a partir dela.",
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
          "Componho interfaces com Server Components e hooks, separando estado de apresentação. Construí um design system de mais de 160 componentes reutilizáveis e tipados, usado para acelerar entrega de features sem duplicar padrão.",
      },
      {
        name: "Next.js",
        extension: "ts",
        size: "3.2 KB",
        modDate: "2026",
        kind: "Next.js App",
        description:
          "Uso App Router com RSC e Route Handlers como BFF, escolhendo por rota entre SSR, SSG e ISR. Aplico em produção na Auclan e neste portfólio, que é export estático com deploy contínuo.",
      },
      {
        name: "React Hook Form",
        extension: "ts",
        size: "1.4 KB",
        modDate: "2026",
        kind: "TypeScript File",
        description:
          "Monto formulários com React Hook Form ligado a schema, evitando re-render desnecessário e mantendo mensagem de erro derivada do mesmo contrato que valida no servidor.",
      },
      {
        name: "Zod",
        extension: "ts",
        size: "1.2 KB",
        modDate: "2026",
        kind: "TypeScript File",
        description:
          "Uso Zod como fronteira de runtime: valido o que entra de API externa e de formulário, e derivo o tipo do schema para não manter validação e tipo desalinhados. É a checagem que o TypeScript sozinho não faz depois do build.",
      },
      {
        name: "Tailwind CSS",
        extension: "css",
        size: "2.3 KB",
        modDate: "2026",
        kind: "Tailwind Config",
        description:
          "Faço 100% da estilização em Tailwind com tokens semânticos. Neste projeto os HEX vivem só no config e o resto do app fala por token, então trocar um tema não exige tocar em componente.",
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
          "Organizo em UI → Hooks → Services → Types com contrato explícito em cada fronteira. Baixa tolerância a ambiguidade: cada limite é declarado, não presumido, o que vem de 17 anos medindo tolerância em metrologia antes de programar.",
      },
      {
        name: "Design Systems",
        extension: "fig",
        size: "6.4 MB",
        modDate: "2026",
        kind: "Design System",
        description:
          "Construo design system com token semântico e componente tipado, não com coleção de classes. O UIKit que mantenho passou de 160 componentes e sustenta entrega de features sem retrabalho de estilo.",
      },
      {
        name: "BFF",
        extension: "ts",
        size: "2.1 KB",
        modDate: "2026",
        kind: "TypeScript File",
        description:
          "Implemento BFF em Route Handlers para manter credencial e regra sensível fora do cliente. O browser recebe resultado, nunca a chave que o produziu.",
      },
      {
        name: "Contracts",
        extension: "d.ts",
        size: "1.1 KB",
        modDate: "2026",
        kind: "TypeScript Decl",
        description:
          "Trato interface TypeScript como documentação executável: se o contrato muda, o build quebra antes do usuário perceber. É o que permite refatorar camada sem auditar o app inteiro na mão.",
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
          "No MapHunter agrego OpenStreetMap/Nominatim, ViaCEP, BrasilAPI e dados abertos da Receita Federal com geocoding e fallback entre provedores, para gerar lead qualificado sem depender de API paga.",
      },
      {
        name: "Cache & Rate limit",
        extension: "ts",
        size: "1.6 KB",
        modDate: "2026",
        kind: "TypeScript File",
        description:
          "Implemento cache local e rate limiting para respeitar limite de API gratuita: no MapHunter a consulta de CNPJ só acontece depois da qualificação, então a cota vai para lead que interessa e o custo fica previsível.",
      },
      {
        name: "Pipelines de dados",
        extension: "ts",
        size: "2.2 KB",
        modDate: "2026",
        kind: "TypeScript File",
        description:
          "Desenho pipeline em etapas com descarte cedo: filtro órgão público e nicho fora do perfil antes de gastar enriquecimento, e entrego o resultado em CSV e XLSX. Filtrar antes de enriquecer é o que segura o custo.",
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
          "Trato o OWASP Top 10 como checagem contínua do design ao deploy, não como auditoria no fim. Segurança entra como padrão de projeto, com o sistema falhando fechado.",
      },
      {
        name: "OWASP for LLM",
        extension: "md",
        size: "2.4 KB",
        modDate: "2026",
        kind: "Security Doc",
        description:
          "Sou certificado pela OWASP Foundation em Top 10 for LLM. Prompt injection, exfiltração de credencial e abuso de agente são exatamente as ameaças que o Nemesis Defender intercepta antes da execução.",
      },
      {
        name: "CSP Level 3",
        extension: "conf",
        size: "1.6 KB",
        modDate: "2026",
        kind: "Security Header",
        description:
          "Aplico CSP Level 3 com nonce dinâmico, HSTS, X-Frame-Options e Permissions-Policy como configuração padrão de projeto, não como ajuste posterior.",
      },
      {
        name: "Threat Modeling",
        extension: "md",
        size: "2.0 KB",
        modDate: "2026",
        kind: "Security Doc",
        description:
          "Modelo ameaça declarando escopo e limite: digo o que o sistema protege e o que ele não protege. No Nemesis isso está escrito, porque garantia vaga em segurança é pior que ausência de garantia.",
      },
      {
        name: "Supply-chain",
        extension: "md",
        size: "1.9 KB",
        modDate: "2026",
        kind: "Security Doc",
        description:
          "Defendo supply-chain com enforcement em runtime: o Nemesis bloqueia malware em pacote antes de ele executar, e move para quarentena em vez de deletar, mantendo a ação reversível.",
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
          "Escrevi a camada de kernel do Nemesis em eBPF com BPF LSM, cobrindo bprm_check_security e egress por socket_connect. É o backstop para o caso de a checagem em user space ser contornada.",
      },
      {
        name: "AST",
        extension: "ts",
        size: "2.7 KB",
        modDate: "2026",
        kind: "Parser",
        description:
          "Faço análise estática com tree-sitter percorrendo AST para detectar padrão malicioso antes da execução. São 14 visitors despachados no scanner do Nemesis, porque regex sozinho não entende estrutura de código.",
      },
      {
        name: "Fail-closed",
        extension: "rs",
        size: "1.5 KB",
        modDate: "2026",
        kind: "Rust Source",
        description:
          "Projeto para falhar fechado: no Nemesis qualquer panic vira exit 2, ou seja, bloqueio. A quarentena exige corroboração de sinais antes de agir, o que segura falso positivo sem abrir a porta.",
      },
      {
        name: "Linux",
        extension: "sh",
        size: "1.0 KB",
        modDate: "2026",
        kind: "Shell Script",
        description:
          "Uso Linux como ambiente de desenvolvimento e de enforcement, trabalhando com syscall, permissão e processo. É onde o Nemesis roda e onde depuro o que acontece abaixo da aplicação.",
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
          "Escolho estratégia de renderização por rota para reduzir bundle e melhorar carregamento: no UIKit isso rendeu Lighthouse na faixa de 90+ e queda de 20 a 30% no bundle.",
      },
      {
        name: "Lighthouse",
        extension: "json",
        size: "1.3 KB",
        modDate: "2026",
        kind: "Report",
        description:
          "Meço LCP e TTI e versiono o resultado, tratando performance como contrato verificável. Número medido, não impressão de que 'está rápido'.",
      },
      {
        name: "Playwright",
        extension: "ts",
        size: "2.0 KB",
        modDate: "2026",
        kind: "E2E Test",
        description:
          "Escrevo E2E em Playwright cobrindo os fluxos que não podem quebrar. No portal multi-perfil da Auclan são 5 perfis de usuário, então o teste precisa provar o comportamento de cada um.",
      },
      {
        name: "Quality Gates",
        extension: "ts",
        size: "1.4 KB",
        modDate: "2026",
        kind: "Config",
        description:
          "Coloco o gate antes do merge, não depois: lint com regra custom, tipo estrito, validação de runtime e checagem de segurança e arquitetura em pre-commit. O que não passa no gate não entra.",
      },
    ],
  },
  {
    name: "IA & Agentic Coding",
    files: [
      {
        name: "Devin",
        extension: "ts",
        size: "1.8 KB",
        modDate: "2026",
        kind: "Agent Config",
        description:
          "Integrei o Nemesis ao Devin para que a execução autônoma passe pelo mesmo enforcement dos demais fluxos. Autonomia maior exige contenção maior, não confiança maior.",
      },
      {
        name: "VSCode",
        extension: "ts",
        size: "1.6 KB",
        modDate: "2026",
        kind: "Editor Config",
        description:
          "Mantenho o hook de pre-tool do Nemesis funcionando no VS Code e no Copilot, para que a proteção acompanhe o editor em vez de depender de qual ferramenta abri no dia.",
      },
      {
        name: "Cursor",
        extension: "ts",
        size: "1.5 KB",
        modDate: "2026",
        kind: "Editor Config",
        description:
          "Uso Cursor para feature e refactor com contrato de atuação declarado, e com o mesmo hook de pre-tool interceptando write e exec antes da ação.",
      },
      {
        name: "Antigravity",
        extension: "ts",
        size: "1.7 KB",
        modDate: "2026",
        kind: "Agent Config",
        description:
          "Uso a plataforma agent-first do Google com Gemini para distribuir trabalho entre agentes. O harness continua sendo meu, a plataforma é intercambiável.",
      },
      {
        name: "Claude",
        extension: "ts",
        size: "1.6 KB",
        modDate: "2026",
        kind: "Agent Config",
        description:
          "Conduzo o Claude Code pelo meu SDD Pipeline: 7 skills em sequência com HARD-GATE antes de gravar spec, de executar e de liberar release. O agente executa, eu decido.",
      },
      {
        name: "OpenCode",
        extension: "ts",
        size: "1.3 KB",
        modDate: "2026",
        kind: "Agent Config",
        description:
          "Uso agente open-source quando quero controle total do fluxo e da execução local, sem depender de decisão de produto de terceiro sobre o que o agente pode fazer.",
      },
      {
        name: "Codex",
        extension: "ts",
        size: "1.4 KB",
        modDate: "2026",
        kind: "Agent Config",
        description:
          "Integrei o Codex ao meu fluxo com o enforcement do Nemesis por cima, para que a sugestão do agente passe pela mesma checagem de comando destrutivo que aplico nas outras IDEs.",
      },
      {
        name: "Grok",
        extension: "ts",
        size: "1.2 KB",
        modDate: "2026",
        kind: "Agent Config",
        description:
          "Uso para raciocínio sobre código e leitura rápida de trecho desconhecido, sempre com o resultado passando pela mesma revisão que aplico a qualquer saída de agente.",
      },
      {
        name: "Harness",
        extension: "md",
        size: "2.1 KB",
        modDate: "2026",
        kind: "Process File",
        description:
          "Construí um harness de processo próprio: regras, skills e workflows que governam o que o agente pode fazer. É o que transforma 'usar IA' em processo auditável em vez de tentativa e erro.",
      },
      {
        name: "Skills",
        extension: "md",
        size: "1.9 KB",
        modDate: "2026",
        kind: "Process File",
        description:
          "Escrevo skill em markdown com contrato de handoff completo, porque subagente nasce sem memória da conversa: objetivo, arquivos, invariantes, o que não fazer e formato do resultado.",
      },
      {
        name: "Rules",
        extension: "md",
        size: "1.7 KB",
        modDate: "2026",
        kind: "Process File",
        description:
          "Escrevo regra canônica com verificador mecânico junto. Lei sem verificador é intenção, não lei, então cada regra do meu harness diz como provar que está sendo cumprida.",
      },
      {
        name: "Workflows",
        extension: "md",
        size: "1.8 KB",
        modDate: "2026",
        kind: "Process File",
        description:
          "Encadeio as skills em workflow sequencial e determinístico, com gate automático entre fases e uma única parada para decisão humana. O caminho é auditável do pedido até a entrega.",
      },
      {
        name: "Hooks Pretool/Posttool Use",
        extension: "md",
        size: "1.5 KB",
        modDate: "2026",
        kind: "Process File",
        description:
          "Implementei hooks que interceptam a tool call antes da execução, com controle de path em três níveis e exit 2 como bloqueio determinístico. O agente é contido pela máquina, não pela boa vontade dele.",
      },
    ],
  },
];

/** Id estável de um arquivo na lista (categoria + nome). */
const fileId = (category: string, file: SkillFile) => `${category}/${file.name}.${file.extension}`;

type ViewMode = "list" | "icon";

const Skills = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["Linguagens"]));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [categories, setCategories] = useState<SkillCategory[]>(skillCategories);
  const [openIconFolder, setOpenIconFolder] = useState<string | null>(null);
  const [quickLookFile, setQuickLookFile] = useState<{ category: string; file: SkillFile } | null>(
    null,
  );
  const [lastClickTime, setLastClickTime] = useState<Record<string, number>>({});
  const [theme] = useTheme();
  const folderIconPath = `/icons/icon-macos-folder-${theme}.webp`;

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
    });
  }, []);

  useEffect(() => {
    if (!quickLookFile) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setQuickLookFile(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [quickLookFile]);

  const toggleFolder = (folderName: string) => {
    setExpandedFolders((prev) => (prev.has(folderName) ? new Set() : new Set([folderName])));
  };

  const handleFileClick = (category: string, file: SkillFile) => {
    const id = fileId(category, file);
    const now = Date.now();
    const lastTime = lastClickTime[id] ?? 0;
    const isDoubleClick = now - lastTime < 350;

    if (isDoubleClick) {
      setQuickLookFile({ category, file });
      setSelectedId(null);
      setLastClickTime({});
    } else {
      setSelectedId((prev) => (prev === id ? null : id));
      setLastClickTime({ ...lastClickTime, [id]: now });
    }
  };

  const handleReorderCategories = (newOrder: SkillCategory[]) => {
    setCategories(newOrder);
  };

  const handleReorderFiles = (categoryName: string, newFiles: SkillFile[]) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.name === categoryName ? { ...cat, files: newFiles } : cat)),
    );
  };

  const totalItems = categories.reduce((acc, category) => acc + category.files.length + 1, 0);

  const selected = (() => {
    for (const category of categories) {
      for (const file of category.files) {
        if (fileId(category.name, file) === selectedId) {
          return { category: category.name, file };
        }
      }
    }
    return null;
  })();

  return (
    <div className="h-full">
      <div className="mac-window h-full flex flex-col md:max-w-[980px] mx-auto">
        <div className="mac-window-titlebar">
          <img src="/icons/icon-close.svg" width={12} height={12} alt="" />
          <img src="/icons/icon-mac-minimize.svg" width={12} height={12} alt="" />
          <img src="/icons/icon-mac-maximize.svg" width={12} height={12} alt="" />
          <span className="mac-window-title">Skills — {totalItems} items</span>
          <div className="flex items-center gap-1 ml-auto mr-1">
            <button
              type="button"
              aria-label="Visualização em lista"
              onClick={() => setViewMode("list")}
              className={`p-1 rounded ${viewMode === "list" ? "bg-finder-accent/20 text-finder-accent" : "text-finder-text-secondary hover:text-finder-text"}`}
            >
              <ListBulletIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              aria-label="Visualização em ícones"
              onClick={() => setViewMode("icon")}
              className={`p-1 rounded ${viewMode === "icon" ? "bg-finder-accent/20 text-finder-accent" : "text-finder-text-secondary hover:text-finder-text"}`}
            >
              <Squares2X2Icon className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 min-h-0">
          {viewMode === "list" ? (
            <>
              <div className="flex-1 min-w-0 overflow-y-auto scrollbar-finder">
                <div className="sticky top-0 z-10 flex items-center h-[24px] px-3 bg-finder-header border-b border-finder-border text-[11px] text-finder-text-secondary font-medium">
                  <div className="flex-1">Name</div>
                  <div className="hidden lg:block w-20 text-right">Size</div>
                  <div className="hidden lg:block w-32 text-right">Kind</div>
                </div>

                <Reorder.Group
                  axis="y"
                  values={categories}
                  onReorder={handleReorderCategories}
                  className="divide-y divide-finder-border"
                >
                  {categories.map((category, categoryIndex) => {
                    const isExpanded = expandedFolders.has(category.name);
                    return (
                      <Reorder.Item
                        key={category.name}
                        value={category}
                        layout="position"
                        className="cursor-grab active:cursor-grabbing"
                      >
                        <div>
                          <button
                            type="button"
                            className="group cursor-default select-none w-full text-left"
                            onClick={() => toggleFolder(category.name)}
                            data-aos="fade-right"
                            data-aos-delay={categoryIndex * 60}
                            data-aos-duration="500"
                          >
                            <div className="flex items-center h-[26px] px-3 hover:bg-finder-hover">
                              <div className="flex-1 flex items-center min-w-0">
                                {isExpanded ? (
                                  <ChevronDownIcon className="w-3 h-3 text-finder-text-secondary mr-1" />
                                ) : (
                                  <ChevronRightIcon className="w-3 h-3 text-finder-text-secondary mr-1" />
                                )}
                                <img
                                  src={folderIconPath}
                                  width={16}
                                  height={16}
                                  alt=""
                                  className="mr-2 flex-shrink-0"
                                />
                                <span className="text-[13px] text-finder-text font-normal truncate">
                                  {category.name}
                                </span>
                              </div>
                              <div className="hidden lg:block w-20 text-right">
                                <span className="text-[12px] text-finder-text-secondary">--</span>
                              </div>
                              <div className="hidden lg:block w-32 text-right">
                                <span className="text-[12px] text-finder-text-secondary">
                                  Folder
                                </span>
                              </div>
                            </div>
                          </button>

                          {isExpanded && (
                            <Reorder.Group
                              axis="y"
                              values={category.files}
                              onReorder={(newFiles) => handleReorderFiles(category.name, newFiles)}
                            >
                              {category.files.map((file) => {
                                const id = fileId(category.name, file);
                                const isSelected = selectedId === id;
                                return (
                                  <Reorder.Item
                                    key={id}
                                    value={file}
                                    layout="position"
                                    className="cursor-grab active:cursor-grabbing"
                                  >
                                    <div>
                                      <button
                                        type="button"
                                        className="w-full text-left cursor-default select-none"
                                        aria-pressed={isSelected}
                                        onClick={() => handleFileClick(category.name, file)}
                                      >
                                        <div
                                          className={`flex items-center h-[26px] pl-7 pr-3 ${
                                            isSelected
                                              ? "bg-finder-accent text-finder-accent-contrast"
                                              : "hover:bg-finder-hover"
                                          }`}
                                        >
                                          <div className="flex-1 flex items-center min-w-0">
                                            <DocumentIcon
                                              className={`w-4 h-4 mr-2 flex-shrink-0 ${
                                                isSelected
                                                  ? "text-finder-accent-contrast"
                                                  : "text-finder-icon"
                                              }`}
                                            />
                                            <span
                                              className={`text-[13px] font-normal truncate ${
                                                isSelected
                                                  ? "text-finder-accent-contrast"
                                                  : "text-finder-text"
                                              }`}
                                            >
                                              {file.name}.{file.extension}
                                            </span>
                                          </div>
                                          <div className="hidden lg:block w-20 text-right">
                                            <span
                                              className={`text-[12px] ${
                                                isSelected
                                                  ? "text-finder-accent-contrast/80"
                                                  : "text-finder-text-secondary"
                                              }`}
                                            >
                                              {file.size}
                                            </span>
                                          </div>
                                          <div className="hidden lg:block w-32 text-right">
                                            <span
                                              className={`text-[12px] ${
                                                isSelected
                                                  ? "text-finder-accent-contrast/80"
                                                  : "text-finder-text-secondary"
                                              }`}
                                            >
                                              {file.kind}
                                            </span>
                                          </div>
                                        </div>
                                      </button>

                                      {isSelected && (
                                        <div className="md:hidden px-7 py-3 bg-finder-header border-y border-finder-border">
                                          <p className="text-[13px] leading-relaxed text-finder-text-secondary">
                                            {file.description}
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  </Reorder.Item>
                                );
                              })}
                            </Reorder.Group>
                          )}
                        </div>
                      </Reorder.Item>
                    );
                  })}
                </Reorder.Group>

                <p className="px-3 py-2 text-[11px] text-finder-text-secondary">
                  Clique em um arquivo para ver os detalhes. Duplo-clique para Quick Look.
                </p>
              </div>

              <aside className="hidden md:flex w-[280px] shrink-0 border-l border-finder-border bg-finder-header flex-col items-center px-5 py-8 overflow-y-auto scrollbar-finder">
                {selected ? (
                  <>
                    <div className="flex items-center justify-center w-20 h-20 rounded-xl bg-finder-accent/10 mb-4">
                      <DocumentIcon className="w-12 h-12 text-finder-accent" />
                    </div>
                    <h3 className="text-[14px] font-semibold text-finder-text text-center break-all">
                      {selected.file.name}.{selected.file.extension}
                    </h3>
                    <p className="text-[11px] text-finder-text-secondary mb-4">
                      {selected.file.kind} · {selected.file.size}
                    </p>
                    <p className="text-[13px] leading-relaxed text-finder-text-secondary text-left">
                      {selected.file.description}
                    </p>
                    <dl className="w-full mt-6 pt-4 border-t border-finder-border text-[11px] space-y-1.5">
                      <div className="flex justify-between gap-2">
                        <dt className="text-finder-text-secondary">Pasta</dt>
                        <dd className="text-finder-text text-right">{selected.category}</dd>
                      </div>
                      <div className="flex justify-between gap-2">
                        <dt className="text-finder-text-secondary">Modificado</dt>
                        <dd className="text-finder-text">{selected.file.modDate}</dd>
                      </div>
                    </dl>
                  </>
                ) : (
                  <div className="m-auto text-center text-finder-text-secondary">
                    <DocumentIcon className="w-10 h-10 mx-auto mb-3 opacity-40" />
                    <p className="text-[12px]">Selecione um arquivo para ver o preview.</p>
                  </div>
                )}
              </aside>
            </>
          ) : (
            <>
              <div className="flex-1 min-w-0 overflow-y-auto scrollbar-finder p-4">
                {openIconFolder === null ? (
                  <Reorder.Group
                    axis="y"
                    values={categories}
                    onReorder={handleReorderCategories}
                    className="flex flex-wrap gap-4"
                  >
                    {categories.map((category) => (
                      <Reorder.Item
                        key={category.name}
                        value={category}
                        className="cursor-grab active:cursor-grabbing"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenIconFolder(category.name)}
                          className="flex flex-col items-center gap-2 w-[100px] p-3 rounded-lg hover:bg-finder-hover focus-visible:outline-2 focus-visible:outline-finder-accent"
                        >
                          <img src={folderIconPath} width={48} height={48} alt="" />
                          <span className="text-[12px] text-finder-text text-center truncate w-full">
                            {category.name}
                          </span>
                          <span className="text-[10px] text-finder-text-secondary">
                            {category.files.length} items
                          </span>
                        </button>
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>
                ) : (
                  <div>
                    <button
                      type="button"
                      onClick={() => setOpenIconFolder(null)}
                      className="flex items-center gap-1 mb-4 text-[13px] text-finder-text-secondary hover:text-finder-text"
                    >
                      <ChevronRightIcon className="w-4 h-4 rotate-180" />
                      Voltar
                    </button>
                    <Reorder.Group
                      axis="y"
                      values={categories.find((c) => c.name === openIconFolder)?.files ?? []}
                      onReorder={(newFiles) => handleReorderFiles(openIconFolder, newFiles)}
                      className="flex flex-wrap gap-4"
                    >
                      {(categories.find((c) => c.name === openIconFolder)?.files ?? []).map(
                        (file) => {
                          const id = fileId(openIconFolder, file);
                          const isSelected = selectedId === id;
                          return (
                            <Reorder.Item
                              key={id}
                              value={file}
                              className="cursor-grab active:cursor-grabbing"
                            >
                              <button
                                type="button"
                                onClick={() => handleFileClick(openIconFolder, file)}
                                className={`flex flex-col items-center gap-2 w-[100px] p-3 rounded-lg focus-visible:outline-2 focus-visible:outline-finder-accent ${
                                  isSelected ? "bg-finder-accent/15" : "hover:bg-finder-hover"
                                }`}
                              >
                                <DocumentIcon
                                  className={`w-12 h-12 ${isSelected ? "text-finder-accent" : "text-finder-icon"}`}
                                />
                                <span
                                  className={`text-[12px] text-center truncate w-full ${
                                    isSelected ? "text-finder-accent" : "text-finder-text"
                                  }`}
                                >
                                  {file.name}.{file.extension}
                                </span>
                                <span className="text-[10px] text-finder-text-secondary">
                                  {file.size}
                                </span>
                              </button>
                            </Reorder.Item>
                          );
                        },
                      )}
                    </Reorder.Group>
                  </div>
                )}
                <p className="mt-4 text-[11px] text-finder-text-secondary">
                  Duplo-clique em um arquivo para Quick Look.
                </p>
              </div>

              <aside className="hidden md:flex w-[280px] shrink-0 border-l border-finder-border bg-finder-header flex-col items-center px-5 py-8 overflow-y-auto scrollbar-finder">
                {selected ? (
                  <>
                    <div className="flex items-center justify-center w-20 h-20 rounded-xl bg-finder-accent/10 mb-4">
                      <DocumentIcon className="w-12 h-12 text-finder-accent" />
                    </div>
                    <h3 className="text-[14px] font-semibold text-finder-text text-center break-all">
                      {selected.file.name}.{selected.file.extension}
                    </h3>
                    <p className="text-[11px] text-finder-text-secondary mb-4">
                      {selected.file.kind} · {selected.file.size}
                    </p>
                    <p className="text-[13px] leading-relaxed text-finder-text-secondary text-left">
                      {selected.file.description}
                    </p>
                    <dl className="w-full mt-6 pt-4 border-t border-finder-border text-[11px] space-y-1.5">
                      <div className="flex justify-between gap-2">
                        <dt className="text-finder-text-secondary">Pasta</dt>
                        <dd className="text-finder-text text-right">{selected.category}</dd>
                      </div>
                      <div className="flex justify-between gap-2">
                        <dt className="text-finder-text-secondary">Modificado</dt>
                        <dd className="text-finder-text">{selected.file.modDate}</dd>
                      </div>
                    </dl>
                  </>
                ) : (
                  <div className="m-auto text-center text-finder-text-secondary">
                    <DocumentIcon className="w-10 h-10 mx-auto mb-3 opacity-40" />
                    <p className="text-[12px]">Selecione um arquivo para ver o preview.</p>
                  </div>
                )}
              </aside>
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {quickLookFile && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setQuickLookFile(null)}
          >
            <motion.div
              className="bg-finder-window rounded-lg shadow-xl max-w-lg w-full mx-4 overflow-hidden"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mac-window-titlebar">
                <button
                  type="button"
                  aria-label="Fechar Quick Look"
                  onClick={() => setQuickLookFile(null)}
                  className="hover:opacity-80 transition-opacity"
                >
                  <img src="/icons/icon-mac-close_button.svg" width={12} height={12} alt="" />
                </button>
                <img src="/icons/icon-mac-minimize_button.svg" width={12} height={12} alt="" />
                <img src="/icons/icon-mac-maximize_button.svg" width={12} height={12} alt="" />
                <span className="mac-window-title">
                  {quickLookFile.file.name}.{quickLookFile.file.extension}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-finder-accent/10 shrink-0">
                    <DocumentIcon className="w-10 h-10 text-finder-accent" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-semibold text-finder-text break-all">
                      {quickLookFile.file.name}.{quickLookFile.file.extension}
                    </h3>
                    <p className="text-[11px] text-finder-text-secondary">
                      {quickLookFile.file.kind} · {quickLookFile.file.size}
                    </p>
                  </div>
                </div>
                <p className="text-[14px] leading-relaxed text-finder-text-secondary mb-4">
                  {quickLookFile.file.description}
                </p>
                <dl className="pt-4 border-t border-finder-border text-[11px] space-y-1.5">
                  <div className="flex justify-between gap-2">
                    <dt className="text-finder-text-secondary">Pasta</dt>
                    <dd className="text-finder-text text-right">{quickLookFile.category}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-finder-text-secondary">Modificado</dt>
                    <dd className="text-finder-text">{quickLookFile.file.modDate}</dd>
                  </div>
                </dl>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Skills;
