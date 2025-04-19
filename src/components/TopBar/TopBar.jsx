import React, { useState } from 'react';
import WindowControls from './WindowControls/WindowControls';
import YouTubeSearch from './Search/YouTubeSearch';
import GoogleSearch from './Search/GoogleSearch';
import InfoModal from './InfoModal/InfoModal';
import ShareModal from './ShareModal/ShareModal';
import { ShareIcon as ShareIconOutline, InformationCircleIcon as InfoIconOutline } from '@heroicons/react/24/outline';

const TopBar = ({ title }) => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  return (
    <>
      <div className="h-topbar bg-finder-window border-b border-finder-border flex items-center justify-between select-none px-2 md:px-4">
        <div className="flex items-center flex-1">
          <WindowControls />
          <h1 className="text-finder text-center flex-1 pr-8 md:pr-32 text-sm md:text-base">
            {title || 'Finder'}
          </h1>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="hidden md:block">
            <YouTubeSearch />
          </div>
          <div className="hidden md:block">
            <GoogleSearch />
          </div>
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="p-1 md:p-2 text-finder-text-secondary hover:text-finder-text transition-colors"
            title="Compartilhar"
          >
            <ShareIconOutline className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button
            onClick={() => setIsInfoModalOpen(true)}
            className="p-1 md:p-2 text-finder-text-secondary hover:text-finder-text transition-colors"
            title="Informações"
          >
            <InfoIconOutline className="w-4 h-4 md:w-5 md:h-5" />
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