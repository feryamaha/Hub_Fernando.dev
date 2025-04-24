import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../hooks/useTheme';

const FavoritesSection = () => {
  const [theme] = useTheme(); // Obtendo o tema atual

  // Cor dinâmica para os ícones com base no tema
  const iconColor = theme === 'dark' ? '#D1D5DB' : '#374151'; // Cinza-claro para escuro, cinza-escuro para claro

  const favorites = [
    {
      path: '/',
      label: 'Home',
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" fill={theme} />
        </svg>
      ),
    },
    {
      path: '/about',
      label: 'About',
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="10" stroke={theme} strokeWidth="2" />
          <path
            d="M12 8v4m0 4h.01"
            stroke={theme}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      path: '/skills',
      label: 'Skills',
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"
            fill={theme}
          />
        </svg>
      ),
    },
    {
      path: '/projects',
      label: 'Projects',
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="2"
            stroke={theme}
            strokeWidth="2"
          />
          <path
            d="M3 9h18"
            stroke={theme}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      path: '/contact',
      label: 'Contact',
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2m18 0v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8m18 0H3"
            stroke={theme}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M7 10h10M7 14h5"
            stroke={theme}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="mb-10">
      <h2 className="text-finder-text-secondary text-[11px] font-medium uppercase px-2 mb-1">
        Favorites
      </h2>
      <nav className="space-y-px">
        {favorites.map((item) => (
          <div key={item.label} className="flex items-center group px-2">
            <Link
              to={item.path}
              className="flex-1 flex items-center py-1 text-finder-text transition-all duration-200 rounded-lg hover:border-b-2 hover:border-finder-accent hover:opacity-50 "
            >
              <span className="w-4 h-4 mr-2 transition-colors duration-200">
                {item.icon}
              </span>
              <span className="transition-opacity duration-200">
                {item.label}
              </span>
            </Link>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default FavoritesSection;