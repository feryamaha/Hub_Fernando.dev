import React, { useState } from 'react';
import { useTheme } from '../../../../hooks/useTheme';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

const YaminuelleChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [theme] = useTheme();

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      setMessages([
        ...messages,
        { text: inputMessage, sender: 'user', timestamp: new Date() }
      ]);
      setInputMessage('');
    }
  };

  return (
    <div className={`h-full flex flex-col bg-finder-window theme-${theme}`}>
      {/* Header do Chat */}
      <div className="bg-finder-sidebar border-b border-finder-border p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-[#00FF9D] flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" stroke="black" strokeWidth="1.5"/>
              <path d="M8 12H16M12 8V16" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="12" cy="12" r="2" fill="black"/>
            </svg>
          </div>
          <div>
            <h2 className="text-finder-text font-medium">Yaminuelle AI</h2>
            <p className="text-finder-text-secondary text-sm">Online</p>
          </div>
        </div>
      </div>

      {/* Área de Mensagens */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-finder">
        {/* Mensagem de Boas-vindas */}
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 rounded-full bg-[#00FF9D] flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" stroke="black" strokeWidth="1.5"/>
              <circle cx="12" cy="12" r="2" fill="black"/>
            </svg>
          </div>
          <div className="bg-finder-hover rounded-2xl rounded-tl-none p-4 max-w-[80%]">
            <p className="text-finder-text">Olá! Eu sou a Yaminuelle, sua assistente virtual. Como posso ajudar você hoje?</p>
          </div>
        </div>

        {/* Mensagens do Chat */}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start space-x-3 ${
              message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            {message.sender === 'user' ? (
              <div className="w-8 h-8 rounded-full bg-finder-accent flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">Você</span>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#00FF9D] flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" stroke="black" strokeWidth="1.5"/>
                  <circle cx="12" cy="12" r="2" fill="black"/>
                </svg>
              </div>
            )}
            <div
              className={`rounded-2xl p-4 max-w-[80%] ${
                message.sender === 'user'
                  ? 'bg-finder-accent text-white rounded-tr-none'
                  : 'bg-finder-hover text-finder-text rounded-tl-none'
              }`}
            >
              <p>{message.text}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input de Mensagem */}
      <div className="border-t border-finder-border p-4">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 bg-black text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition-all duration-200"
          />
          <button
            type="submit"
            className="bg-finder-accent text-white p-2 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default YaminuelleChat; 