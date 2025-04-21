import React from 'react';
import SidebarItem from '../shared/SidebarItem';

/**
 * Componente FavoritesSection
 * Renderiza a seção de favoritos com ícones e links de navegação
 * Os ícones são carregados diretamente da pasta public/icons
 */
const FavoritesSection = () => {
  // Lista de itens do menu com seus respectivos ícones e rotas
  const favorites = [
    { 
      icon: './icons/home.svg', 
      label: 'Home', 
      to: '/',
      description: 'Página inicial do portfólio'
    },
    { 
      icon: './icons/about.svg', 
      label: 'About', 
      to: '/about',
      description: 'Informações sobre mim e minha carreira'
    },
    { 
      icon: './icons/skills.svg', 
      label: 'Skills', 
      to: '/skills',
      description: 'Minhas habilidades e competências técnicas'
    },
    { 
      icon: './icons/projects.svg', 
      label: 'Projects', 
      to: '/projects',
      description: 'Portfólio de projetos desenvolvidos'
    },
    { 
      icon: './icons/contact.svg', 
      label: 'Contact', 
      to: '/contact',
      description: 'Informações de contato e redes sociais'
    },
  ];

  return (
    <div className="space-y-1 px-2">
      {/* Título da seção de favoritos */}
      <h2 className="text-xs font-semibold text-finder-text-secondary px-4 py-2">
        Favorites
      </h2>
      {/* Lista de itens do menu */}
      {favorites.map((item) => (
        <SidebarItem
          key={item.label}
          iconSrc={item.icon}
          label={item.label}
          to={item.to}
          className="w-5 h-5 text-finder-text"
        />
      ))}
    </div>
  );
};

export default FavoritesSection; 