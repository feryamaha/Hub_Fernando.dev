import React, { useState, useEffect } from 'react';
import WindowControls from './WindowControls/WindowControls';
import YouTubeSearch from './Search/YouTubeSearch';
import GoogleSearch from './Search/GoogleSearch';
import InfoModal from './InfoModal/InfoModal';
import ShareModal from './ShareModal/ShareModal';
import { ShareIcon as ShareIconOutline, InformationCircleIcon as InfoIconOutline } from '@heroicons/react/24/outline';
import { useTheme } from '../../hooks/useTheme';

const TopBar = ({ title }) => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [theme] = useTheme();
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [cursorVisible, setCursorVisible] = useState(true);
  const fullText = title || 'fernando.dev / frontend...';

  // Efeito para animar o cursor piscando
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500); // Piscar a cada 500ms

    return () => clearInterval(cursorInterval);
  }, []);

  // Efeito para controlar a digitação e apagamento
  useEffect(() => {
    let timeout;
    const typeSpeed = 100; // Velocidade de digitação (ms)
    const deleteSpeed = 50; // Velocidade de apagamento (ms)
    const pauseDuration = 1000; // Pausa após completar digitação ou apagamento

    if (isTyping) {
      if (displayedText.length < fullText.length) {
        timeout = setTimeout(() => {
          setDisplayedText(fullText.slice(0, displayedText.length + 1));
        }, typeSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, pauseDuration);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, deleteSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(true);
        }, pauseDuration);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isTyping, fullText]);

  return (
    <>
      <div className="h-topbar bg-finder-window border-b border-finder-border flex items-center justify-between select-none px-2 md:px-4">
        <div className="flex items-center flex-1">
          <h1
            className="text-finder text-left flex-1 pr-8 md:pr-32 text-sm md:text-base text-2xl md:text-3xl p-[3px]"
            style={{ color: theme }}
          >
            <span>{displayedText}</span>
            <span style={{ opacity: cursorVisible ? 1 : 0 }}>|</span>
          </h1>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="p-1 md:p-2 text-finder-text-secondary hover:text-finder-text transition-colors"
            title="Compartilhar"
          >
            <ShareIconOutline
              style={{ color: theme }}
              className="w-4 h-4 md:w-5 md:h-5"
            />
          </button>
          <button
            onClick={() => setIsInfoModalOpen(true)}
            className="p-1 md:p-2 text-finder-text-secondary hover:text-finder-text transition-colors"
            title="Informações"
          >
            <InfoIconOutline
              style={{ color: theme }}
              className="w-4 h-4 md:w-5 md:h-5"
            />
          </button>
        </div>
      </div>

      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
      />
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </>
  );
};

export default TopBar;