import type { ReactNode } from "react";

/** Nomes de cor de tema suportados (ids de THEME_IDS). */
export type ThemeColor =
  | "blue"
  | "green"
  | "green-lime"
  | "yellow"
  | "orange"
  | "red"
  | "purple"
  | "gray"
  | "black";

/** Item exibido na lista de temas do Sidebar. */
export interface ThemeListItem {
  id: string;
  name: string;
  color: ThemeColor;
  className: string;
  iconPath: string;
}

/** Rotas/seções navegáveis da aplicação (substitui react-router). */
export type SectionPath = "/" | "/about" | "/skills" | "/projects" | "/contact";

/** Props compartilhadas por componentes de modal. */
export interface ModalBaseProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ModalProps extends ModalBaseProps {
  title: string;
  children: ReactNode;
}
