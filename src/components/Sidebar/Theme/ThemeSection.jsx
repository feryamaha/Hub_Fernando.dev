import React from 'react';
import { useTheme, THEME_LIST } from '../../../hooks/useTheme';
import '../../../index.css';

const ThemeSection = () => {
  const [theme, changeTheme] = useTheme();

  return (
    <div className="mb-6">
      <h2 className="text-finder-text-secondary text-[11px] font-medium uppercase px-2 mb-1">
        Theme
      </h2>
      <nav className="space-y-px">
        {THEME_LIST.map(({ id, name, color, className }) => (
          <button
            key={id}
            onClick={() => changeTheme(color)}
            className={`flex items-center w-full px-2 py-1 rounded-md ${
              theme === color 
                ? 'bg-finder-accent bg-opacity-20' 
                : 'hover:bg-finder-hover'
            }`}
          >
            <div className="window-controls">
              <div className={`window-control ${color === 'red' ? 'close' : color === 'orange' ? 'minimize' : 'maximize'}`} 
                   style={{ backgroundColor: color === 'red' ? '#FF5F57' : 
                                          color === 'orange' ? '#FEBC2E' : 
                                          color === 'yellow' ? '#FFE08C' :
                                          color === 'green' ? '#28C840' :
                                          color === 'blue' ? '#0A84FF' :
                                          color === 'purple' ? '#BF5AF2' :
                                          '#98989D' }} />
            </div>
            <span className="text-finder-text">{name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ThemeSection; 