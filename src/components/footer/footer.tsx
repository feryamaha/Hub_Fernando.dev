"use client";

import { GitHubIcon, LinkedInIcon } from "@/components/ui/social-icons";
import { EMAIL, SOCIAL_LINKS } from "@/lib/constants";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import type { ReactNode } from "react";

interface FooterLink {
  name: string;
  href: string;
  icon: ReactNode;
}

const SOCIAL_ICONS: Partial<Record<string, ReactNode>> = {
  GitHub: <GitHubIcon className="w-5 h-5" />,
  LinkedIn: <LinkedInIcon className="w-5 h-5" />,
};

const links: FooterLink[] = [
  ...SOCIAL_LINKS.filter((link) => link.name === "GitHub" || link.name === "LinkedIn").map(
    (link) => ({
      name: link.name,
      href: link.url,
      icon: SOCIAL_ICONS[link.name],
    }),
  ),
  {
    name: "E-mail",
    href: `mailto:${EMAIL}`,
    icon: <EnvelopeIcon className="w-5 h-5" />,
  },
];

const Footer = () => {
  return (
    <footer className="w-full bg-finder-sidebar border-t border-finder-border px-4 py-3 flex items-center justify-between hidden md:flex">
      <p className="w-max text-finder-text-secondary text-xs">
        © {new Date().getFullYear()} Fernando Moreira | Full-Stack TypeScript | Rust | Segurança |
      </p>
      <nav aria-label="Contato e redes sociais">
        <ul className="w-max flex items-center gap-4">
          {links.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                aria-label={link.name}
                title={link.name}
                className="flex items-center gap-1.5 text-finder-text-secondary hover:text-finder-accent focus-visible:text-finder-accent focus-visible:outline-2 focus-visible:outline-finder-accent rounded transition-colors"
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
