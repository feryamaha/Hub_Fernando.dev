import type { ReactNode } from "react";

/** Nomes de cor de tema suportados (chaves de THEME_COLORS). */
export type ThemeColor = "red" | "orange" | "yellow" | "green" | "blue" | "purple" | "gray";

/** Item exibido na lista de temas do Sidebar. */
export interface ThemeListItem {
  id: string;
  name: string;
  color: ThemeColor;
  className: string;
  hex: string;
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
