"use client";

import skills from "@/data/i18n/skills.json";
import { useLocale } from "@/hooks/use-locale";
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

/** Dados estruturais (sem texto localizável); a description é hidratada a partir do JSON. */
type SkillFileData = Omit<SkillFile, "description">;

interface SkillCategoryData {
  name: string;
  files: SkillFileData[];
}

const skillCategoriesData: SkillCategoryData[] = [
  {
    name: "Linguagens",
    files: [
      {
        name: "TypeScript",
        extension: "ts",
        size: "3.4 KB",
        modDate: "2026",
        kind: "TypeScript File",
      },
      {
        name: "JavaScript",
        extension: "js",
        size: "2.9 KB",
        modDate: "2026",
        kind: "JavaScript File",
      },
      {
        name: "Rust",
        extension: "rs",
        size: "5.1 KB",
        modDate: "2026",
        kind: "Rust Source",
      },
      {
        name: "HTML5",
        extension: "html",
        size: "1.8 KB",
        modDate: "2026",
        kind: "HTML Document",
      },
      {
        name: "CSS3",
        extension: "css",
        size: "2.0 KB",
        modDate: "2026",
        kind: "CSS File",
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
      },
      {
        name: "Next.js",
        extension: "ts",
        size: "3.2 KB",
        modDate: "2026",
        kind: "Next.js App",
      },
      {
        name: "React Hook Form",
        extension: "ts",
        size: "1.4 KB",
        modDate: "2026",
        kind: "TypeScript File",
      },
      {
        name: "Zod",
        extension: "ts",
        size: "1.2 KB",
        modDate: "2026",
        kind: "TypeScript File",
      },
      {
        name: "Tailwind CSS",
        extension: "css",
        size: "2.3 KB",
        modDate: "2026",
        kind: "Tailwind Config",
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
      },
      {
        name: "Design Systems",
        extension: "fig",
        size: "6.4 MB",
        modDate: "2026",
        kind: "Design System",
      },
      {
        name: "BFF",
        extension: "ts",
        size: "2.1 KB",
        modDate: "2026",
        kind: "TypeScript File",
      },
      {
        name: "Contracts",
        extension: "d.ts",
        size: "1.1 KB",
        modDate: "2026",
        kind: "TypeScript Decl",
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
      },
      {
        name: "Cache & Rate limit",
        extension: "ts",
        size: "1.6 KB",
        modDate: "2026",
        kind: "TypeScript File",
      },
      {
        name: "Pipelines de dados",
        extension: "ts",
        size: "2.2 KB",
        modDate: "2026",
        kind: "TypeScript File",
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
      },
      {
        name: "OWASP for LLM",
        extension: "md",
        size: "2.4 KB",
        modDate: "2026",
        kind: "Security Doc",
      },
      {
        name: "CSP Level 3",
        extension: "conf",
        size: "1.6 KB",
        modDate: "2026",
        kind: "Security Header",
      },
      {
        name: "Threat Modeling",
        extension: "md",
        size: "2.0 KB",
        modDate: "2026",
        kind: "Security Doc",
      },
      {
        name: "Supply-chain",
        extension: "md",
        size: "1.9 KB",
        modDate: "2026",
        kind: "Security Doc",
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
      },
      {
        name: "AST",
        extension: "ts",
        size: "2.7 KB",
        modDate: "2026",
        kind: "Parser",
      },
      {
        name: "Fail-closed",
        extension: "rs",
        size: "1.5 KB",
        modDate: "2026",
        kind: "Rust Source",
      },
      {
        name: "Linux",
        extension: "sh",
        size: "1.0 KB",
        modDate: "2026",
        kind: "Shell Script",
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
      },
      {
        name: "Lighthouse",
        extension: "json",
        size: "1.3 KB",
        modDate: "2026",
        kind: "Report",
      },
      {
        name: "Playwright",
        extension: "ts",
        size: "2.0 KB",
        modDate: "2026",
        kind: "E2E Test",
      },
      {
        name: "Quality Gates",
        extension: "ts",
        size: "1.4 KB",
        modDate: "2026",
        kind: "Config",
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
      },
      {
        name: "VSCode",
        extension: "ts",
        size: "1.6 KB",
        modDate: "2026",
        kind: "Editor Config",
      },
      {
        name: "Cursor",
        extension: "ts",
        size: "1.5 KB",
        modDate: "2026",
        kind: "Editor Config",
      },
      {
        name: "Antigravity",
        extension: "ts",
        size: "1.7 KB",
        modDate: "2026",
        kind: "Agent Config",
      },
      {
        name: "Claude",
        extension: "ts",
        size: "1.6 KB",
        modDate: "2026",
        kind: "Agent Config",
      },
      {
        name: "OpenCode",
        extension: "ts",
        size: "1.3 KB",
        modDate: "2026",
        kind: "Agent Config",
      },
      {
        name: "Codex",
        extension: "ts",
        size: "1.4 KB",
        modDate: "2026",
        kind: "Agent Config",
      },
      {
        name: "Grok",
        extension: "ts",
        size: "1.2 KB",
        modDate: "2026",
        kind: "Agent Config",
      },
      {
        name: "Harness",
        extension: "md",
        size: "2.1 KB",
        modDate: "2026",
        kind: "Process File",
      },
      {
        name: "Skills",
        extension: "md",
        size: "1.9 KB",
        modDate: "2026",
        kind: "Process File",
      },
      {
        name: "Rules",
        extension: "md",
        size: "1.7 KB",
        modDate: "2026",
        kind: "Process File",
      },
      {
        name: "Workflows",
        extension: "md",
        size: "1.8 KB",
        modDate: "2026",
        kind: "Process File",
      },
      {
        name: "Hooks Pretool/Posttool Use",
        extension: "md",
        size: "1.5 KB",
        modDate: "2026",
        kind: "Process File",
      },
    ],
  },
];

/** Id estável de um arquivo na lista (categoria + nome). */
const fileId = (category: string, file: SkillFile) => `${category}/${file.name}.${file.extension}`;

/** Chave de descrição casada com o JSON de i18n (nome + extensão do arquivo). */
const descriptionKey = (file: SkillFileData) => `${file.name}.${file.extension}`;

type ViewMode = "list" | "icon";

const Skills = () => {
  const locale = useLocale();
  const t = skills[locale];
  /** Rótulo exibido de uma categoria; o identificador interno (chave) fica em PT. */
  const categoryLabel = (name: string) => (t.categories as Record<string, string>)[name] ?? name;
  /** Descrição do arquivo casada pela chave "Nome.extensao" do JSON de i18n. */
  const descriptionFor = (file: SkillFileData) =>
    (t.descriptions as Record<string, string>)[descriptionKey(file)] ?? "";

  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["Linguagens"]));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [categories, setCategories] = useState<SkillCategory[]>(() =>
    skillCategoriesData.map((category) => ({
      name: category.name,
      files: category.files.map((file) => ({
        ...file,
        description: descriptionFor(file),
      })),
    })),
  );
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
          <span className="mac-window-title">
            {t.ui.windowTitle} — {t.ui.itemsCount.replace("{n}", String(totalItems))}
          </span>
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
                                  {categoryLabel(category.name)}
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

                <p className="px-3 py-2 text-[11px] text-finder-text-secondary">{t.ui.clickHint}</p>
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
                        <dt className="text-finder-text-secondary">{t.ui.folder}</dt>
                        <dd className="text-finder-text text-right">
                          {categoryLabel(selected.category)}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-2">
                        <dt className="text-finder-text-secondary">{t.ui.modified}</dt>
                        <dd className="text-finder-text">{selected.file.modDate}</dd>
                      </div>
                    </dl>
                  </>
                ) : (
                  <div className="m-auto text-center text-finder-text-secondary">
                    <DocumentIcon className="w-10 h-10 mx-auto mb-3 opacity-40" />
                    <p className="text-[12px]">{t.ui.selectHint}</p>
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
                            {categoryLabel(category.name)}
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
                      {t.ui.back}
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
                  {t.ui.doubleClickHint}
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
                        <dt className="text-finder-text-secondary">{t.ui.folder}</dt>
                        <dd className="text-finder-text text-right">
                          {categoryLabel(selected.category)}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-2">
                        <dt className="text-finder-text-secondary">{t.ui.modified}</dt>
                        <dd className="text-finder-text">{selected.file.modDate}</dd>
                      </div>
                    </dl>
                  </>
                ) : (
                  <div className="m-auto text-center text-finder-text-secondary">
                    <DocumentIcon className="w-10 h-10 mx-auto mb-3 opacity-40" />
                    <p className="text-[12px]">{t.ui.selectHint}</p>
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
                    <dt className="text-finder-text-secondary">{t.ui.folder}</dt>
                    <dd className="text-finder-text text-right">
                      {categoryLabel(quickLookFile.category)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-finder-text-secondary">{t.ui.modified}</dt>
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
