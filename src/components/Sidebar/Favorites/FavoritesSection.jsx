import React from 'react';
import SidebarItem from '../shared/SidebarItem';
import {
  AirDropIcon,
  RecentsIcon,
  ApplicationsIcon,
  DesktopIcon,
  DocumentsIcon,
} from '../../shared/Icons/MacOSIcons';

/**
 * Componente FavoritesSection - Seção de favoritos da barra lateral
 * Renderiza uma lista de links favoritos com seus respectivos ícones
 */
const FavoritesSection = () => {
  // Array com os itens favoritos e suas configurações
  const favorites = [
    { 
      icon: AirDropIcon, 
      label: 'Home', 
      to: '/',
      description: 'Página inicial do portfólio'
    },
    { 
      icon: RecentsIcon, 
      label: 'About', 
      to: '/about',
      description: 'Informações sobre mim e minha carreira'
    },
    { 
      icon: ApplicationsIcon, 
      label: 'Skills', 
      to: '/skills',
      description: 'Minhas habilidades e competências técnicas'
    },
    { 
      icon: DesktopIcon, 
      label: 'Projects', 
      to: '/projects',
      description: 'Portfólio de projetos desenvolvidos'
    },
    { 
      icon: DocumentsIcon, 
      label: 'Contact', 
      to: '/contact',
      description: 'Informações de contato e redes sociais'
    },
  ];

  return (
    <div className="space-y-1 px-2">
      {/* Título da seção */}
      <h2 className="text-xs font-semibold text-finder-text-secondary px-4 py-2">
        Favorites
      </h2>
      {/* Lista de itens favoritos */}
      {favorites.map((item) => (
        <SidebarItem
          key={item.label}
          icon={item.icon}
          label={item.label}
          to={item.to}
          className="w-5 h-5 text-finder-text"
        />
      ))}
    </div>
  );
};

export default FavoritesSection; 