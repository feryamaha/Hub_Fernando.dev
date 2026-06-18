"use client";

import { useEffect, useRef, useState } from "react";

interface SearchProps {
  onSearch: (term: string) => void;
}

/**
 * Campo de busca do Finder. Mantém o comportamento original (atalhos ⌘F /
 * Esc) sem renderizar UI visível.
 */
const Search = ({ onSearch }: SearchProps) => {
  const [, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command/Control + F para focar a busca
      if ((e.metaKey || e.ctrlKey) && e.key === "f") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      // Escape para limpar a busca
      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        setValue("");
        onSearch("");
        inputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSearch]);

  return null;
};

export default Search;
