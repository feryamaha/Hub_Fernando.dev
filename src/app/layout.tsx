import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Providers } from "./providers";

// URL canônica do site. Sobrescreva com NEXT_PUBLIC_SITE_URL no deploy
// (ex.: domínio da Vercel) sem precisar tocar no código.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://feryamaha.github.io/Hub_Fernando.dev";

const title = "Fernando Moreira | Full-Stack TypeScript · Rust · Segurança";
const description =
  "Desenvolvedor Full-Stack TypeScript (React 19, Next.js) · Rust · Segurança. Autor do Nemesis Defender, framework open-source de enforcement em Rust com camada de kernel em eBPF.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "Fernando Moreira",
    "Desenvolvedor Full-Stack",
    "Full-Stack TypeScript",
    "TypeScript",
    "React",
    "Next.js",
    "Rust",
    "eBPF",
    "Segurança",
    "Nemesis Defender",
  ],
  authors: [{ name: "Fernando Moreira", url: "https://github.com/feryamaha" }],
  creator: "Fernando Moreira",
  icons: { icon: "/favicon.svg" },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Fernando Moreira",
    title,
    description,
    images: [
      {
        url: "/icons/img_profile.webp",
        width: 100,
        height: 100,
        alt: "Fernando Moreira — Full-Stack TypeScript · Rust · Segurança",
      },
    ],
  },
  twitter: {
    card: "summary",
    title,
    description,
    creator: "@_feryamaha",
    images: ["/icons/img_profile.webp"],
  },
};

// Aplica o tema salvo (classe + variável de accent) antes da pintura,
// evitando flash e divergência de hidratação.
const themeInitScript = `
(function () {
  try {
    var colors = { red: '#FF5F57', orange: '#FEBC2E', yellow: '#FFE08C', green: '#28C840', blue: '#0A84FF', purple: '#BF5AF2', gray: '#98989D' };
    var t = localStorage.getItem('theme') || 'blue';
    if (!colors[t]) t = 'blue';
    document.documentElement.classList.add('theme-' + t);
    document.documentElement.style.setProperty('--finder-accent', colors[t]);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: script de tema pré-hidratação */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
