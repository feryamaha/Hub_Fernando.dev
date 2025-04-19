import React, { useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import TopBar from './components/TopBar/TopBar';
import MainContent from './components/MainContent/MainContent';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './styles/tailwind.css';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }, []);

  return (
    <ThemeProvider>
      <div className="flex flex-col h-screen bg-[var(--background)]">
        <TopBar />
        <MainContent />
      </div>
    </ThemeProvider>
  );
}

export default App; 