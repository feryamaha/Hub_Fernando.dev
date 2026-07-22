"use client";

import { useLocale } from "@/hooks/use-locale";

/**
 * Seletor de idioma via bandeiras. São links reais (<a>) — o recarregamento
 * de página é intencional, pois `/` e `/en/` usam root layouts diferentes
 * (route groups `(pt)` e `(en)`).
 */
export function LanguageToggle() {
  const locale = useLocale();
  const isPt = locale === "pt";
  const isEn = locale === "en";

  return (
    <div className="flex items-center">
      <a
        href="/"
        aria-label="Ver em português"
        aria-current={isPt ? "true" : undefined}
        className={`inline-flex items-center justify-center w-11 h-11 rounded-md transition-opacity focus-visible:outline-2 focus-visible:outline-finder-accent ${
          isPt ? "opacity-100" : "opacity-50 hover:opacity-100"
        }`}
      >
        <svg viewBox="0 0 24 16" className="w-6 h-4 rounded-[2px]" aria-hidden="true">
          <rect width="24" height="16" fill="#009B3A" />
          <path d="M12 2.4 21.6 8 12 13.6 2.4 8Z" fill="#FFDF00" />
          <circle cx="12" cy="8" r="3.2" fill="#002776" />
        </svg>
        <span className="sr-only">Ver em português</span>
      </a>
      <a
        href="/en/"
        aria-label="View in English"
        aria-current={isEn ? "true" : undefined}
        className={`inline-flex items-center justify-center w-11 h-11 rounded-md transition-opacity focus-visible:outline-2 focus-visible:outline-finder-accent ${
          isEn ? "opacity-100" : "opacity-50 hover:opacity-100"
        }`}
      >
        <svg viewBox="0 0 24 16" className="w-6 h-4 rounded-[2px]" aria-hidden="true">
          <rect width="24" height="16" fill="#FFFFFF" />
          <rect x="0" y="0" width="24" height="2.29" fill="#B22234" />
          <rect x="0" y="4.57" width="24" height="2.29" fill="#B22234" />
          <rect x="0" y="9.14" width="24" height="2.29" fill="#B22234" />
          <rect x="0" y="13.71" width="24" height="2.29" fill="#B22234" />
          <rect width="10" height="8" fill="#3C3B6E" />
        </svg>
        <span className="sr-only">View in English</span>
      </a>
    </div>
  );
}

export default LanguageToggle;
