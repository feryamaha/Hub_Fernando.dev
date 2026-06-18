import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Fernando Moreira | Front-end",
  description: "Portfolio pessoal de Fernando Moreira — Desenvolvedor Front-end",
  icons: { icon: "/favicon.svg" },
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
