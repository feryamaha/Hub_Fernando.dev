"use client";

import { useNavigation } from "@/hooks/use-navigation";
import type { ModalProps } from "@/types";

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  const { navigate } = useNavigation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-finder-window rounded-lg shadow-xl max-w-lg w-full mx-4 overflow-hidden">
        <div className="mac-window-titlebar">
          <button
            type="button"
            aria-label="Fechar e voltar à Home"
            onClick={() => {
              onClose();
              navigate("/");
            }}
            className="hover:opacity-80 transition-opacity"
          >
            <img src="/icons/icon-mac-close_button.svg" width={12} height={12} alt="" />
          </button>
          <img src="/icons/icon-mac-minimize.svg" width={12} height={12} alt="" />
          <img src="/icons/icon-mac-maximize.svg" width={12} height={12} alt="" />
          <span className="mac-window-title">{title}</span>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
