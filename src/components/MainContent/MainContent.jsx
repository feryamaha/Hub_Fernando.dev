// Este arquivo é responsável por gerenciar o conteúdo principal da aplicação.
// Ele controla a exibição do conteúdo com base nas rotas, gerencia o estado do Sidebar (menu lateral),
// e implementa funcionalidades como maximizar, minimizar e ocultar o conteúdo principal.

import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import useScreenSize from '../../hooks/useScreenSize'; // Hook para detectar o tamanho da tela
import { useTheme } from '../../hooks/useTheme'; // Hook para gerenciar o tema
import Sidebar from '../Sidebar/Sidebar'; // Componente do menu lateral
import Home from './Home/Home'; // Página inicial
import About from './About/About'; // Página "Sobre"
import Skills from './Skills/Skills'; // Página "Habilidades"
import Projects from './Projects/Projects'; // Página "Projetos"
import Contact from './Contact/Contact'; // Página "Contato"
import YaminuelleChat from '../Sidebar/Locations/Yaminuelle/YaminuelleChat'; // Página de chat com IA
import GoogleSearch from '../Sidebar/Locations/Google/GoogleSearch'; // Página de busca no Google
import Youtube from '../Sidebar/Locations/Youtube/Youtube'; // Página de busca no YouTube
import Search from './Search/Search'; // Componente de busca

const MainContent = () => {
  // Estado para controlar o estado do conteúdo (normal, minimizado, maximizado, oculto)
  const [contentState, setContentState] = useState('normal');

  // Estado para controlar se o Sidebar está aberto ou fechado
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Hook para obter a localização atual da rota
  const location = useLocation();

  // Hook para obter o tema atual
  const [theme] = useTheme();

  // Hook para detectar o tamanho da tela (mobile, desktop, etc.)
  const screenSize = useScreenSize();

  // Estado para armazenar o termo de busca
  const [searchTerm, setSearchTerm] = useState('');

  // Fecha o menu lateral no mobile quando a rota muda
  useEffect(() => {
    if (screenSize.isMobile) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname, screenSize.isMobile]);

  // Função para obter o título da página com base na rota atual
  const getTitle = () => {
    switch (location.pathname) {
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

  // Função para lidar com a busca
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Função para renderizar o conteúdo principal com base no estado
  const renderContent = () => {
    if (contentState === 'hidden' || contentState === 'minimized') {
      return null; // Não renderiza nada se o conteúdo estiver oculto ou minimizado
    }

    return (
      <div className={`flex-1 bg-finder-window overflow-y-auto scrollbar-finder ${contentState === 'maximized' ? 'fixed inset-0 mt-[38px] ml-[200px] z-50' : ''}`}>
        <div className="p-6 mx-auto">
          <Routes>
            {/* Define as rotas e os componentes correspondentes */}
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
          {/* Botões para controlar o estado do conteúdo */}
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
        {/* Título da página */}
        <div className="flex-1 text-center text-finder-text text-finder">
          {getTitle()}
        </div>
        {/* Componente de busca */}
        <div className="px-2">
          <Search onSearch={handleSearch} />
        </div>
      </div>

      {/* Container principal */}
      <div className="flex h-[calc(100vh-38px)]">
        {/* Sidebar */}
        <div className={`${screenSize.isMobile ? 'fixed inset-0 z-40 transform transition-transform duration-300' : 'w-sidebar'} ${screenSize.isMobile && !isSidebarOpen ? '-translate-x-full' : ''} bg-finder-sidebar border-r border-finder-border flex flex-col`}>
          <Sidebar /> {/* Renderizando o Sidebar */}
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