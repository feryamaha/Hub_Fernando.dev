import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import useScreenSize from '../../hooks/useScreenSize';
import { useTheme } from '../../hooks/useTheme';
import LocationsSection from '../Sidebar/Locations/LocationsSection';
import ThemeSection from '../Sidebar/Theme/ThemeSection';
import Home from './Home/Home';
import About from './About/About';
import Skills from './Skills/Skills';
import Projects from './Projects/Projects';
import Contact from './Contact/Contact';
import YaminuelleChat from '../Sidebar/Locations/Yaminuelle/YaminuelleChat';
import GoogleSearch from '../Sidebar/Locations/Google/GoogleSearch';
import Youtube from '../Sidebar/Locations/Youtube/Youtube';
import Search from './Search/Search';

const MainContent = () => {
  const [contentState, setContentState] = useState('normal');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const [theme] = useTheme();
  const screenSize = useScreenSize();
  const [searchTerm, setSearchTerm] = useState('');

  // Fecha o menu mobile quando a rota muda
  useEffect(() => {
    if (screenSize.isMobile) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname, screenSize.isMobile]);

  const getTitle = () => {
    switch(location.pathname) {
      case '/': return 'Home';
      case '/about': return 'Sobre';
      case '/skills': return 'Habilidades';
      case '/projects': return 'Projetos';
      case '/contact': return 'Contato';
      case '/chat': return 'Yaminuelle AI';
      case '/google': return 'Google Search';
      case '/youtube': return 'YouTube';
      default: return 'Home';
    }
  };

  // Filter function for skills and projects
  const filterItems = (items, term) => {
    if (!term) return items;
    const lowerTerm = term.toLowerCase();
    
    return items.map(category => ({
      ...category,
      files: category.files.filter(file => 
        file.name.toLowerCase().includes(lowerTerm) ||
        file.description?.toLowerCase().includes(lowerTerm)
      )
    })).filter(category => category.files.length > 0);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const renderContent = () => {
    if (contentState === 'hidden' || contentState === 'minimized') {
      return null;
    }

    return (
      <div className={`flex-1 bg-finder-window overflow-y-auto scrollbar-finder ${
        contentState === 'maximized' ? 'fixed inset-0 mt-[38px] ml-[200px] z-50' : ''
      }`}>
        <div className="p-6 mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills searchTerm={searchTerm} />} />
            <Route path="/projects" element={<Projects searchTerm={searchTerm} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/chat" element={<YaminuelleChat />} />
            <Route path="/google" element={<GoogleSearch />} />
            <Route path="/youtube" element={<Youtube />} />
          </Routes>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen bg-finder-window font-finder theme-${theme}`}>
      {/* Barra de título do Finder */}
      <div className="bg-finder-sidebar border-b border-finder-border h-[38px] flex items-center">
        <div className="flex items-center px-2 space-x-2">
          <button 
            onClick={() => setContentState(prev => prev === 'hidden' ? 'normal' : 'hidden')}
            className="w-3 h-3 rounded-full bg-[#FF5F57] hover:bg-[#FF5F57]/80 transition-colors"
          />
          <button 
            onClick={() => setContentState(prev => prev === 'minimized' ? 'normal' : 'minimized')}
            className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:bg-[#FFBD2E]/80 transition-colors"
          />
          <button 
            onClick={() => setContentState(prev => prev === 'maximized' ? 'normal' : 'maximized')}
            className="w-3 h-3 rounded-full bg-[#28C840] hover:bg-[#28C840]/80 transition-colors"
          />
        </div>
        <div className="flex-1 text-center text-finder-text text-finder">
          {getTitle()}
        </div>
        <div className="px-2">
          <Search onSearch={handleSearch} />
        </div>
      </div>

      {/* Container principal */}
      <div className="flex h-[calc(100vh-38px)]">
        {/* Sidebar */}
        <div className={`${
          screenSize.isMobile ? 'fixed inset-0 z-40 transform transition-transform duration-300' : 'w-sidebar'
        } ${
          screenSize.isMobile && !isSidebarOpen ? '-translate-x-full' : ''
        } bg-finder-sidebar border-r border-finder-border flex flex-col`}>
          <div className="flex-1 overflow-y-auto scrollbar-finder p-2">
            <LocationsSection />
            <ThemeSection />
          </div>
        </div>

        {/* Área de conteúdo */}
        {renderContent()}
      </div>

      {/* Menu hambúrguer para mobile */}
      {screenSize.isMobile && (
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed bottom-4 right-4 bg-finder-accent text-finder-text p-3 rounded-full shadow-lg z-50"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default MainContent; 