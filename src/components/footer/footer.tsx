"use client";

import { EnvelopeIcon } from "@heroicons/react/24/outline";
import type { ReactNode } from "react";

interface FooterLink {
  name: string;
  href: string;
  icon: ReactNode;
}

const links: FooterLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/feryamaha",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="currentColor"
        role="img"
        aria-label="GitHub"
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/feryamaha/",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="currentColor"
        role="img"
        aria-label="LinkedIn"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037c-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85c3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065c0-1.138.92-2.063 2.063-2.063c1.14 0 2.064.925 2.064 2.063c0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "E-mail",
    href: "mailto:fmoreirayamaha@gmail.com",
    icon: <EnvelopeIcon className="w-5 h-5" />,
  },
];

const Footer = () => {
  return (
    <footer className="bg-finder-sidebar border-t border-finder-border px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
      <p className="text-finder-text-secondary text-xs">
        © {new Date().getFullYear()} Fernando Moreira — Full-Stack TypeScript · Rust · Segurança
      </p>
      <nav aria-label="Contato e redes sociais">
        <ul className="flex items-center gap-4">
          {links.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                aria-label={link.name}
                title={link.name}
                className="flex items-center gap-1.5 text-finder-text-secondary hover:text-[var(--finder-accent)] focus-visible:text-[var(--finder-accent)] focus-visible:outline-2 focus-visible:outline-[var(--finder-accent)] rounded transition-colors"
              >
                {link.icon}
                <span className="text-xs">{link.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
