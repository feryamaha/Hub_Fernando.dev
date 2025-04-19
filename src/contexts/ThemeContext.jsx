import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = [
  { name: 'blue', class: 'theme-blue', color: '#0A84FF' },
  { name: 'red', class: 'theme-red', color: '#FF5F57' },
  { name: 'orange', class: 'theme-orange', color: '#FF9500' },
  { name: 'yellow', class: 'theme-yellow', color: '#FFE08C' },
  { name: 'green', class: 'theme-green', color: '#28C840' },
  { name: 'purple', class: 'theme-purple', color: '#BF5AF2' },
  { name: 'pink', class: 'theme-pink', color: '#FF2D55' }
];

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('theme') || 'theme-blue';
  });

  useEffect(() => {
    document.documentElement.className = currentTheme;
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  const value = {
    currentTheme,
    setCurrentTheme,
    themes
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 