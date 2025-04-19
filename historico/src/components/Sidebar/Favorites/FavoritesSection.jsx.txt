import React from 'react';
import SidebarItem from '../shared/SidebarItem';
import {
  AirDropIcon,
  RecentsIcon,
  ApplicationsIcon,
  DesktopIcon,
  DocumentsIcon,
} from '../../shared/Icons/MacOSIcons';

const FavoritesSection = () => {
  const favorites = [
    { icon: AirDropIcon, label: 'Home', to: '/' },
    { icon: RecentsIcon, label: 'About', to: '/about' },
    { icon: ApplicationsIcon, label: 'Skills', to: '/skills' },
    { icon: DesktopIcon, label: 'Projects', to: '/projects' },
    { icon: DocumentsIcon, label: 'Contact', to: '/contact' },
  ];

  return (
    <div className="space-y-1 px-2">
      <h2 className="text-xs font-semibold text-finder-text-secondary px-4 py-2">
        Favorites
      </h2>
      {favorites.map((item) => (
        <SidebarItem
          key={item.label}
          icon={item.icon}
          label={item.label}
          to={item.to}
        />
      ))}
    </div>
  );
};

export default FavoritesSection; 