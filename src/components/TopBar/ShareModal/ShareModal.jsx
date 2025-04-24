import React, { useState } from 'react';
import Modal from '../../shared/Modal/Modal';
import {
  LinkIcon,
  ClipboardDocumentIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

const ShareModal = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const currentUrl = window.location.href;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar URL:', err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Compartilhar">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <LinkIcon className="w-5 h-5 text-finder-text-secondary "/>
          <span className="text-finder-text">URL do Portfolio</span>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={currentUrl}
            readOnly
            className="flex-1 bg-black text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
          <button
            onClick={handleCopy}
            className="p-2 bg-finder-accent text-white rounded-lg hover:bg-opacity-90 transition-colors"
            title="Copiar URL"
          >
            {copied ? (
              <CheckIcon className="w-5 h-5" />
            ) : (
              <ClipboardDocumentIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="text-sm text-finder-text-secondary">
          <p>Compartilhe este portfolio com outras pessoas!</p>
        </div>
      </div>
    </Modal>
  );
};

export default ShareModal; 