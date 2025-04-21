import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, UserIcon, CodeBracketIcon, FolderIcon, EnvelopeIcon, PlayIcon } from '@heroicons/react/24/outline';

/**
 * Componente LocationsSection
 * Renderiza as seções de favoritos e localizações na barra lateral
 */
const LocationsSection = () => {
  const location = useLocation();

  const handleDownload = (filename) => {
    window.open(`/downloads/${filename}`, '_blank');
  };

  // Lista de itens favoritos com seus respectivos ícones
  const favorites = [
    { path: '/', title: 'Home', icon: 'home' },
    { path: '/about', title: 'About', icon: 'about' },
    { path: '/skills', title: 'Skills', icon: 'skills' },
    { path: '/projects', title: 'Projects', icon: 'projects' },
    { path: '/contact', title: 'Contact', icon: 'contact' }
  ];

  // Lista de localizações com seus respectivos ícones personalizados
  const locations = [
    {
      path: '/chat',
      label: 'Yaminuelle',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" stroke="#00FF9D" strokeWidth="1.5"/>
          <path d="M8 12H16M12 8V16" stroke="#00FF9D" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M9 9L15 15M15 9L9 15" stroke="#00FF9D" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M12 3V5M21 12H19M12 19V21M5 12H3M18.4 5.6L16.9 7.1M18.4 18.4L16.9 16.9M5.6 18.4L7.1 16.9M5.6 5.6L7.1 7.1" stroke="#00FF9D" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="2" fill="#00FF9D"/>
        </svg>
      )
    },
    {
      path: '/google',
      label: 'Google',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24">
          <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="#4285F4" />
        </svg>
      )
    },
    {
      path: '/youtube',
      label: 'YouTube',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FF0000" />
        </svg>
      )
    }
  ];

  return (
    <>
      <div className="mb-6">
        <h2 className="text-finder-text-secondary text-[11px] font-medium uppercase px-2 mb-1">
          Favoritos
        </h2>
        <nav className="space-y-px">
          {favorites.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${location.pathname === item.path
                ? 'bg-finder-accent text-white'
                : 'text-finder-text hover:bg-finder-hover'
                }`}
            >
              <img
                src={`./icons/${item.icon}.svg`}
                alt=""
                className={`w-4 h-4 mr-2 transition-colors duration-200 ${location.pathname === item.path ? 'text-theme' : ''}`}
                style={location.pathname === item.path ? { filter: 'var(--finder-accent-filter)' } : {}}
              />
              <span className="text-sm">{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="mb-6">
        <h2 className="text-finder-text-secondary text-[11px] font-medium uppercase px-2 mb-1">
          Locations
        </h2>
        <nav className="space-y-px">
          {locations.map((item) => (
            <div key={item.label} className="flex items-center group px-2">
              <Link
                to={item.path}
                className={`flex-1 flex items-center py-1 text-finder-text transition-all duration-200 rounded-lg ${location.pathname === item.path
                  ? 'border-b-2 border-finder-accent text-theme'
                  : 'hover:border-b-2 hover:border-finder-accent hover:opacity-50'
                  }`}>
                <span className="w-4 h-4 mr-2 transition-colors duration-200">
                  {item.icon}
                </span>
                <span className="transition-opacity duration-200">{item.label}</span>
              </Link>
              {item.downloadable && (
                <button
                  onClick={() => handleDownload(item.filename)}
                  className="p-1 rounded-lg hover:border-b-2 hover:border-finder-accent ml-1 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:opacity-50"
                  title="Download"
                >
                  <img 
                    src="./icons/download.svg" 
                    alt="Download" 
                    className="w-4 h-4 text-finder-text-secondary"
                  />
                </button>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};

export default LocationsSection; 