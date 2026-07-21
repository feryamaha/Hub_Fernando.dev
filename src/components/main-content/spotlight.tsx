"use client";

import { useNavigation } from "@/hooks/use-navigation";
import type { SectionPath } from "@/types";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useId, useMemo, useRef, useState } from "react";

interface SpotlightProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SpotlightItem {
  label: string;
  hint: string;
  path: SectionPath;
  keywords: string;
}

/** Índice estático de destinos navegáveis (seções, projetos, skills). */
const SPOTLIGHT_INDEX: SpotlightItem[] = [
  // Seções
  { label: "Home", hint: "Seção", path: "/", keywords: "home início inicio principal" },
  { label: "Sobre", hint: "Seção", path: "/about", keywords: "sobre about mim quem sou perfil" },
  {
    label: "Habilidades",
    hint: "Seção",
    path: "/skills",
    keywords: "habilidades skills competências competencias stack tecnologias",
  },
  {
    label: "Projetos",
    hint: "Seção",
    path: "/projects",
    keywords: "projetos projects portfólio portfolio trabalhos",
  },
  {
    label: "Contato",
    hint: "Seção",
    path: "/contact",
    keywords: "contato contact email e-mail telefone whatsapp linkedin github",
  },
  // Projetos
  {
    label: "Nemesis Defender",
    hint: "Projeto",
    path: "/projects",
    keywords: "nemesis defender rust ebpf segurança seguranca llm agentes",
  },
  {
    label: "MapHunter",
    hint: "Projeto",
    path: "/projects",
    keywords: "maphunter leads b2b prospecção prospeccao next.js",
  },
  {
    label: "Harvestin",
    hint: "Projeto",
    path: "/projects",
    keywords: "harvestin vagas emprego ats currículo curriculo",
  },
  {
    label: "Cifra-Tom",
    hint: "Projeto",
    path: "/projects",
    keywords: "cifra tom violão violao acordes música musica",
  },
  {
    label: "MLX Capital",
    hint: "Projeto",
    path: "/projects",
    keywords: "mlx capital frontend interface auclan",
  },
  {
    label: "Alpha",
    hint: "Projeto",
    path: "/projects",
    keywords: "alpha frontend auclan confidencial",
  },
  {
    label: "Vega",
    hint: "Projeto",
    path: "/projects",
    keywords: "vega frontend scss auclan",
  },
  {
    label: "WHFF-enD",
    hint: "Projeto",
    path: "/projects",
    keywords: "whff-end whffend react webpack babel aprendizado",
  },
  {
    label: "NFTs CodeBoost",
    hint: "Projeto",
    path: "/projects",
    keywords: "nfts codeboost next.js radix ui curso",
  },
  // Skills
  {
    label: "TypeScript",
    hint: "Skill",
    path: "/skills",
    keywords: "typescript ts tipagem strict",
  },
  {
    label: "React",
    hint: "Skill",
    path: "/skills",
    keywords: "react 19 hooks server components jsx tsx",
  },
  {
    label: "Next.js",
    hint: "Skill",
    path: "/skills",
    keywords: "next.js nextjs app router rsc ssr ssg isr",
  },
  {
    label: "Rust",
    hint: "Skill",
    path: "/skills",
    keywords: "rust sistemas baixo nível nivel nemesis",
  },
  {
    label: "eBPF",
    hint: "Skill",
    path: "/skills",
    keywords: "ebpf bpf lsm kernel linux",
  },
  {
    label: "Tailwind",
    hint: "Skill",
    path: "/skills",
    keywords: "tailwind css estilização estilizacao design tokens",
  },
  {
    label: "Zod",
    hint: "Skill",
    path: "/skills",
    keywords: "zod validação validacao runtime schema type-safe",
  },
  {
    label: "Playwright",
    hint: "Skill",
    path: "/skills",
    keywords: "playwright e2e testes regressão regressao",
  },
  {
    label: "Segurança",
    hint: "Skill",
    path: "/skills",
    keywords: "segurança seguranca owasp csp threat modeling supply-chain",
  },
  {
    label: "Clean Architecture",
    hint: "Skill",
    path: "/skills",
    keywords: "clean architecture arquitetura camadas contratos bff",
  },
];

const MAX_RESULTS = 8;

export default function Spotlight({ isOpen, onClose }: SpotlightProps) {
  const { navigate } = useNavigation();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const pool = q
      ? SPOTLIGHT_INDEX.filter(
          (item) => item.label.toLowerCase().includes(q) || item.keywords.toLowerCase().includes(q),
        )
      : SPOTLIGHT_INDEX;
    return pool.slice(0, MAX_RESULTS);
  }, [query]);

  // Reseta a busca sempre que abre; mantém foco no input.
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setActiveIndex(0);
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Mantém o índice ativo dentro do range dos resultados.
  useEffect(() => {
    setActiveIndex((prev) => (prev >= results.length ? 0 : prev));
  }, [results.length]);

  // Listeners de teclado somente enquanto aberto.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((prev) => (results.length === 0 ? 0 : (prev + 1) % results.length));
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((prev) =>
          results.length === 0 ? 0 : (prev - 1 + results.length) % results.length,
        );
        return;
      }
      if (event.key === "Enter") {
        event.preventDefault();
        const item = results[activeIndex];
        if (item) {
          navigate(item.path);
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, activeIndex, navigate, onClose]);

  if (!isOpen) return null;

  const handleSelect = (item: SpotlightItem) => {
    navigate(item.path);
    onClose();
  };

  return (
    <div className="spotlight-overlay">
      {/* Backdrop clicável: botão nativo garante acessibilidade por teclado ao fechar. */}
      <button
        type="button"
        aria-label="Fechar busca"
        className="absolute inset-0 h-full w-full cursor-default border-0 bg-transparent"
        onClick={onClose}
      />
      <div
        // biome-ignore lint/a11y/useSemanticElements: painel de busca custom controlado por estado; o <dialog> nativo imporia posicionamento e estilos do UA indesejados
        role="dialog"
        aria-modal="true"
        aria-label="Busca"
        className="spotlight-panel relative z-10"
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--finder-border)]">
          <MagnifyingGlassIcon className="w-5 h-5 text-[var(--finder-text-secondary)] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            className="spotlight-input flex-1"
            placeholder="Buscar seções, projetos, skills…"
            aria-label="Buscar seções, projetos, skills"
            aria-controls={listboxId}
            aria-activedescendant={
              results[activeIndex] ? `${listboxId}-option-${activeIndex}` : undefined
            }
            value={query}
            // biome-ignore lint/a11y/noAutofocus: foco imediato é o comportamento esperado de um spotlight
            autoFocus
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        {results.length > 0 ? (
          // biome-ignore lint/a11y/useSemanticElements: padrão listbox do WAI-ARIA exige role explícito; <select> não suporta aria-activedescendant custom
          // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: idem — a lista segue o padrão listbox do WAI-ARIA com foco no input
          <ul id={listboxId} role="listbox" aria-label="Resultados" tabIndex={-1} className="py-1">
            {results.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <li
                  key={`${item.label}-${item.path}`}
                  // biome-ignore lint/a11y/useSemanticElements: role="option" faz parte do padrão listbox do WAI-ARIA
                  // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: role="option" faz parte do padrão listbox do WAI-ARIA
                  role="option"
                  id={`${listboxId}-option-${index}`}
                  aria-selected={isActive}
                  tabIndex={-1}
                >
                  <button
                    type="button"
                    className={`spotlight-item flex w-full items-center justify-between px-4 py-2 cursor-default border-0 bg-transparent text-left ${
                      isActive ? "active" : ""
                    }`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => handleSelect(item)}
                  >
                    <span className="text-sm font-medium truncate">{item.label}</span>
                    <span
                      className={`text-xs ml-3 flex-shrink-0 ${
                        isActive ? "" : "text-[var(--finder-text-secondary)]"
                      }`}
                    >
                      {item.hint}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="px-4 py-6 text-sm text-[var(--finder-text-secondary)] text-center">
            Nenhum resultado encontrado.
          </p>
        )}
      </div>
    </div>
  );
}
