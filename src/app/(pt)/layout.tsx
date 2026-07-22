import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../globals.css";
import { Providers } from "../providers";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hub-fernando-dev.vercel.app/";

const title = "Fernando Moreira | Full-Stack TypeScript · Rust · Segurança";
const description =
  "Desenvolvedor Full-Stack TypeScript (React, Next.js) · Rust · Segurança. Autor do Nemesis Defender, framework open-source de enforcement em Rust com camada de kernel em eBPF.";

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
  icons: { icon: "/favicon-fm.svg" },
  alternates: { canonical: "/", languages: { "pt-BR": "/", en: "/en/" } },
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
        width: 1404,
        height: 1395,
        alt: "Fernando Moreira — Full-Stack TypeScript · Rust · Segurança",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@_feryamaha",
    images: ["/icons/img_profile.webp"],
  },
};

const themeInitScript = `
(function () {
  try {
    var ids = ['blue', 'green', 'green-lime', 'yellow', 'orange', 'red', 'purple', 'gray', 'black'];
    var t = localStorage.getItem('theme') || 'blue';
    if (ids.indexOf(t) === -1) t = 'blue';
    document.documentElement.classList.add('theme-' + t);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <Providers locale="pt">{children}</Providers>
      </body>
    </html>
  );
}
