import React, { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon, DocumentIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { sendMessage, processDocument, generateImage } from '../../../services/grokService';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);
    setError(null);

    // Adiciona mensagem do usuário
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      // Verifica se é um comando para gerar imagem
      if (userMessage.toLowerCase().startsWith('desenhe') || userMessage.toLowerCase().startsWith('crie uma imagem')) {
        const imageUrl = await generateImage(userMessage);
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'Aqui está a imagem que você pediu!',
          image: imageUrl
        }]);
      } else {
        // Envia mensagem normal
        const response = await sendMessage(userMessage);
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setError(error.message);
      setMessages(prev => [...prev, { 
        role: 'error', 
        content: 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await processDocument(file);
      setMessages(prev => [...prev, 
        { role: 'user', content: `Documento: ${file.name}` },
        { role: 'assistant', content: result.summary }
      ]);
    } catch (error) {
      console.error('Erro ao processar documento:', error);
      setError(error.message);
      setMessages(prev => [...prev, { 
        role: 'error', 
        content: 'Desculpe, ocorreu um erro ao processar o documento. Por favor, tente novamente.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-finder-window rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-finder-sidebar border-b border-finder-border p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-white font-bold text-xl">Y</span>
          </div>
          <div>
            <h2 className="text-finder-text font-medium">Yaminuelle</h2>
            <p className="text-finder-text-secondary text-sm">Assistente Virtual</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            data-aos={message.role === 'user' ? 'fade-left' : 'fade-right'}
            data-aos-delay={index * 100}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 ${
                message.role === 'user'
                  ? 'bg-finder-accent text-white'
                  : message.role === 'error'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-finder-search text-finder-text'
              }`}
            >
              {message.content}
              {message.image && (
                <img
                  src={message.image}
                  alt="Generated"
                  className="mt-2 rounded-lg max-w-full h-auto"
                />
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start" data-aos="fade-right">
            <div className="bg-finder-search text-finder-text rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-finder-accent rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-finder-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-finder-accent rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-finder-border p-4">
        <form onSubmit={handleSend} className="flex items-center space-x-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept=".pdf,.txt,.doc,.docx"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-finder-text-secondary hover:text-finder-accent transition-colors"
            title="Enviar arquivo"
          >
            <DocumentIcon className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={() => {
              const prompt = prompt('Descreva a imagem que você quer gerar:');
              if (prompt) {
                setInput(`desenhe ${prompt}`);
                handleSend({ preventDefault: () => {} });
              }
            }}
            className="p-2 text-finder-text-secondary hover:text-finder-accent transition-colors"
            title="Gerar imagem"
          >
            <PhotoIcon className="w-6 h-6" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 px-4 py-2 bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition-all duration-200"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="p-2 text-finder-text-secondary hover:text-finder-accent transition-colors disabled:opacity-50"
          >
            <PaperAirplaneIcon className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat; 