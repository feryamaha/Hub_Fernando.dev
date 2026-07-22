"use client";

import layout from "@/data/i18n/layout.json";
import { useLocale } from "@/hooks/use-locale";
import { useNavigation } from "@/hooks/use-navigation";
import type { SectionPath } from "@/types";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useId, useMemo, useRef, useState } from "react";

interface SpotlightProps {
  isOpen: boolean;
  onClose: () => void;
}

/** Item já resolvido no locale ativo (label e hint prontos para exibição). */
interface SpotlightItem {
  label: string;
  hint: string;
  path: SectionPath;
  keywords: string;
}

/**
 * Item bruto do índice: `label` é omitido para `kind: "section"` porque o
 * rótulo real vem de `layout.json > titles` (mesma fonte da barra de título),
 * garantindo que "Home"/"Início" etc. fiquem coerentes com o idioma ativo.
 * Para "project"/"skill" o `label` é nome próprio/termo técnico e permanece
 * igual nos dois idiomas (não traduzido).
 */
interface SpotlightIndexEntry {
  label?: string;
  kind: "section" | "project" | "skill";
  path: SectionPath;
  /** Termos de busca nos dois idiomas concatenados numa única string, para a busca funcionar em qualquer idioma. */
  keywords: string;
}

/** Índice estático de destinos navegáveis (seções, projetos, skills). */
const SPOTLIGHT_INDEX: SpotlightIndexEntry[] = [
  // Seções (rótulo resolvido via t.titles no locale ativo)
  { kind: "section", path: "/", keywords: "home início inicio principal main" },
  { kind: "section", path: "/about", keywords: "sobre about mim quem sou perfil profile" },
  {
    kind: "section",
    path: "/skills",
    keywords: "habilidades skills competências competencias stack tecnologias technologies",
  },
  {
    kind: "section",
    path: "/projects",
    keywords: "projetos projects portfólio portfolio trabalhos works",
  },
  {
    kind: "section",
    path: "/contact",
    keywords: "contato contact email e-mail telefone phone whatsapp linkedin github",
  },
  // Projetos
  {
    label: "Nemesis Defender",
    kind: "project",
    path: "/projects",
    keywords: "nemesis defender rust ebpf segurança seguranca security llm agentes agents",
  },
  {
    label: "MapHunter",
    kind: "project",
    path: "/projects",
    keywords: "maphunter leads b2b prospecção prospeccao prospecting next.js",
  },
  {
    label: "Harvestin",
    kind: "project",
    path: "/projects",
    keywords: "harvestin vagas emprego jobs ats currículo curriculo resume cv",
  },
  {
    label: "Cifra-Tom",
    kind: "project",
    path: "/projects",
    keywords: "cifra tom violão violao guitar acordes chords música musica music",
  },
  {
    label: "MLX Capital",
    kind: "project",
    path: "/projects",
    keywords: "mlx capital frontend interface auclan",
  },
  {
    label: "Alpha",
    kind: "project",
    path: "/projects",
    keywords: "alpha frontend auclan confidencial confidential",
  },
  {
    label: "Vega",
    kind: "project",
    path: "/projects",
    keywords: "vega frontend scss auclan",
  },
  {
    label: "WHFF-enD",
    kind: "project",
    path: "/projects",
    keywords: "whff-end whffend react webpack babel aprendizado learning",
  },
  {
    label: "NFTs CodeBoost",
    kind: "project",
    path: "/projects",
    keywords: "nfts codeboost next.js radix ui curso course",
  },
  // Skills
  {
    label: "TypeScript",
    kind: "skill",
    path: "/skills",
    keywords: "typescript ts tipagem typing strict",
  },
  {
    label: "React",
    kind: "skill",
    path: "/skills",
    keywords: "react hooks server components jsx tsx",
  },
  {
    label: "Next.js",
    kind: "skill",
    path: "/skills",
    keywords: "next.js nextjs app router rsc ssr ssg isr",
  },
  {
    label: "Rust",
    kind: "skill",
    path: "/skills",
    keywords: "rust sistemas systems baixo nível nivel low-level nemesis",
  },
  {
    label: "eBPF",
    kind: "skill",
    path: "/skills",
    keywords: "ebpf bpf lsm kernel linux",
  },
  {
    label: "Tailwind",
    kind: "skill",
    path: "/skills",
    keywords: "tailwind css estilização estilizacao styling design tokens",
  },
  {
    label: "Zod",
    kind: "skill",
    path: "/skills",
    keywords: "zod validação validacao validation runtime schema type-safe",
  },
  {
    label: "Playwright",
    kind: "skill",
    path: "/skills",
    keywords: "playwright e2e testes tests regressão regressao regression",
  },
  {
    label: "Segurança",
    kind: "skill",
    path: "/skills",
    keywords: "segurança seguranca security owasp csp threat modeling supply-chain",
  },
  {
    label: "Clean Architecture",
    kind: "skill",
    path: "/skills",
    keywords: "clean architecture arquitetura camadas layers contratos contracts bff",
  },
];

const MAX_RESULTS = 8;

export default function Spotlight({ isOpen, onClose }: SpotlightProps) {
  const { navigate } = useNavigation();
  const locale = useLocale();
  const t = layout[locale];
  // Nome curto só para caber a tag <ul> numa única linha (mantém o biome-ignore adjacente).
  const resultsAria = t.spotlight.resultsLabel;
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();

  // Resolve label/hint de cada item no locale ativo: seções vêm de t.titles,
  // projetos/skills mantêm o rótulo fixo (nome próprio/termo técnico).
  const localizedIndex = useMemo<SpotlightItem[]>(
    () =>
      SPOTLIGHT_INDEX.map((entry) => ({
        label: entry.kind === "section" ? t.titles[entry.path] : (entry.label ?? ""),
        hint:
          entry.kind === "section"
            ? t.spotlight.hintSection
            : entry.kind === "project"
              ? t.spotlight.hintProject
              : t.spotlight.hintSkill,
        path: entry.path,
        keywords: entry.keywords,
      })),
    [t],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const pool = q
      ? localizedIndex.filter(
          (item) => item.label.toLowerCase().includes(q) || item.keywords.toLowerCase().includes(q),
        )
      : localizedIndex;
    return pool.slice(0, MAX_RESULTS);
  }, [query, localizedIndex]);

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
        aria-label={t.spotlight.closeSearch}
        className="absolute inset-0 h-full w-full cursor-default border-0 bg-transparent"
        onClick={onClose}
      />
      <div
        // biome-ignore lint/a11y/useSemanticElements: painel de busca custom controlado por estado; o <dialog> nativo imporia posicionamento e estilos do UA indesejados
        role="dialog"
        aria-modal="true"
        aria-label={t.spotlight.dialogLabel}
        className="spotlight-panel relative z-10"
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-finder-border">
          <MagnifyingGlassIcon className="w-5 h-5 text-finder-text-secondary flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            className="spotlight-input flex-1"
            placeholder={t.spotlight.placeholder}
            aria-label={t.spotlight.searchLabel}
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
          <ul id={listboxId} role="listbox" aria-label={resultsAria} tabIndex={-1} className="py-1">
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
                        isActive ? "" : "text-finder-text-secondary"
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
          <p className="px-4 py-6 text-sm text-finder-text-secondary text-center">
            {t.spotlight.noResults}
          </p>
        )}
      </div>
    </div>
  );
}
