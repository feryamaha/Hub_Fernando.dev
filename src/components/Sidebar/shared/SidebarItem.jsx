import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Componente SidebarItem
 * Renderiza um item da barra lateral com ícone e texto
 * @param {string} iconSrc - Caminho para o arquivo do ícone
 * @param {string} label - Texto do item
 * @param {string} to - Rota de destino
 * @param {function} onClick - Função de clique (opcional)
 * @param {boolean} isDownloadable - Indica se o item é baixável
 * @param {string} className - Classes CSS adicionais
 */
const SidebarItem = ({
  iconSrc,
  label,
  to,
  onClick,
  isDownloadable = false,
  className = ''
}) => {
  // Conteúdo do item que será renderizado tanto no Link quanto no botão
  const content = (
    <>
      {/* Renderiza o ícone se houver um caminho definido */}
      {iconSrc && (
        <div className="flex-shrink-0">
          <img
            src={iconSrc}
            alt={`${label} icon`}
            className={`${className} transition-colors duration-200`}
          />
        </div>
      )}
      {/* Label do item */}
      <span className="text-finder truncate">{label}</span>
      {/* Ícone de download (opcional) */}
      {isDownloadable && (
        <svg
          className="w-4 h-4 ml-auto text-finder-text-secondary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      )}
    </>
  );

  // Se houver uma rota, renderiza como Link
  if (to) {
    return (
      <Link
        to={to}
        className="sidebar-item group hover:bg-finder-hover rounded-md transition-colors duration-200"
      >
        {content}
      </Link>
    );
  }

  // Caso contrário, renderiza como botão
  return (
    <button
      onClick={onClick}
      className="sidebar-item w-full text-left group hover:bg-finder-hover rounded-md transition-colors duration-200"
    >
      {content}
    </button>
  );
};

export default SidebarItem; 