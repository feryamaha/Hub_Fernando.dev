export const EMAIL = "feryamaha@hotmail.com";
export const PHONE_DISPLAY = "+55 14 99601-0696";
export const CV_PATH = "/cv-fernando-moreira.pdf";
export const CV_FILENAME = "cv-fernando-moreira.pdf";
export const SITE_REPO_URL = "https://github.com/feryamaha/Hub_Fernando.dev";

export interface SocialLink {
  name: "GitHub" | "LinkedIn" | "X" | "Instagram" | "WhatsApp";
  url: string;
  hoverColor?: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/feryamaha", hoverColor: "#181717" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/feryamaha/", hoverColor: "#0077B5" },
  { name: "X", url: "https://x.com/_feryamaha", hoverColor: "#000000" },
  { name: "Instagram", url: "https://www.instagram.com/fm_frontend/" },
  { name: "WhatsApp", url: "https://wa.me/5514996010696", hoverColor: "#25D366" },
];
