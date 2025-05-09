import React, { useState, useCallback } from 'react';
import { MagnifyingGlassIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../../../hooks/useTheme';
import { searchGoogle } from '../../../../api/api'; // Ajustado para usar searchGoogle
import debounce from 'lodash/debounce';

const GoogleSearch = () => {
  // Hook para obter o tema atual (ex.: 'light', 'dark', etc.)
  const [theme] = useTheme();

  // Estados do componente
  const [searchTerm, setSearchTerm] = useState(''); // Termo de busca digitado pelo usuário
  const [isSearching, setIsSearching] = useState(false); // Indicador de estado de busca
  const [searchResults, setSearchResults] = useState(null); // Resultados da pesquisa
  const [selectedResult, setSelectedResult] = useState(null); // Resultado selecionado para visualização detalhada
  const [viewportSize, setViewportSize] = useState('default'); // Tamanho da viewport (default, maximized, closed)
  const [error, setError] = useState(null); // Mensagem de erro, se houver

  // Função de busca com debounce para evitar múltiplas requisições
  const debouncedSearch = useCallback(
    debounce(async (term) => {
      if (!term.trim()) return; // Evita busca com termo vazio

      setIsSearching(true); // Inicia o estado de busca
      setError(null); // Limpa erros anteriores

      try {
        console.log('Initiating search for term:', term);
        const results = await searchGoogle(term); // Chama a API do backend via searchGoogle
        console.log('Search results received:', results);
        // Mapeia os resultados para a estrutura esperada (ajustado para a resposta do backend)
        const mappedResults = results.map(item => ({
          title: item.title,
          link: item.link,
          snippet: item.snippet,
          thumbnail: item.pagemap?.cse_thumbnail?.[0]?.src || '',
          date: item.pagemap?.metatags?.[0]?.['article:published_time'] || ''
        }));
        setSearchResults(mappedResults); // Atualiza os resultados
      } catch (error) {
        console.error('Erro na pesquisa:', error);
        setError(error.message); // Define mensagem de erro
        setSearchResults([]); // Limpa resultados em caso de erro
      } finally {
        setIsSearching(false); // Finaliza o estado de busca
      }
    }, 500), // Atraso de 500ms para o debounce
    []
  );

  // Manipula o envio do formulário de busca
  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      console.log('Form submitted, triggering search for:', searchTerm);
      debouncedSearch(searchTerm); // Executa a busca com o termo atual
    }
  };

  // Manipula o clique em um resultado para exibir detalhes
  const handleResultClick = (result) => {
    console.log('Result clicked:', result);
    setSelectedResult(result);
    setViewportSize('default');
  };

  // Volta para a lista de resultados
  const handleBack = () => {
    console.log('Back button clicked, returning to results');
    setSelectedResult(null);
    setViewportSize('default');
  };

  // Controla o tamanho da viewport (fechar, minimizar, maximizar)
  const handleViewportControl = (action) => {
    console.log(`Viewport control action: ${action}`);
    switch (action) {
      case 'close':
        setSelectedResult(null);
        setViewportSize('closed');
        break;
      case 'minimize':
        setViewportSize('default');
        break;
      case 'maximize':
        setViewportSize('maximized');
        break;
      default:
        break;
    }
  };

  // Define as classes CSS com base no tamanho da viewport
  const getViewportClass = () => {
    switch (viewportSize) {
      case 'maximized':
        return 'fixed inset-0 z-40';
      case 'default':
        return 'w-full h-full';
      default:
        return '';
    }
  };

  // Classes reutilizáveis para os botões de controle
  const controlButtonsClass = "w-3 h-3 rounded-full transition-colors relative group";
  const controlButtonBg = "absolute inset-0 rounded-full bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity";

  return (
    <div className={`h-full flex flex-col bg-finder-window theme-${theme}`}>
      {/* Cabeçalho com ícone do Google e botão de voltar */}
      <div className="bg-finder-sidebar border-b border-finder-border p-2">
        <div className="flex items-center space-x-3">
          {selectedResult && (
            <button
              onClick={handleBack}
              className="p-1 rounded-md hover:bg-finder-hover text-finder-text-secondary hover:text-finder-accent transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
          )}
          <div className="w-8 h-8 rounded-full flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387 .307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="#4285F4" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-finder-text font-medium">Google Search</h2>
            <p className="text-finder-text-secondary text-sm">Pesquise sem sair do portfolio</p>
          </div>
        </div>
      </div>

      {/* Área principal com formulário de busca e resultados */}
      <div className="flex-1 flex flex-col p-4 overflow-hidden">
        {/* Formulário de busca */}
        <form onSubmit={handleSearch} className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar no Google..."
            className="flex-1 px-4 py-2 bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition-all duration-200"
          />
          <button
            type="submit"
            className="p-2 text-white hover:bg-gray-700 rounded-lg"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </form>

        {/* Área de resultados */}
        <div className="flex-1 overflow-y-auto scrollbar-finder">
          {isSearching ? (
            // Exibe um spinner durante a busca
            <div className="flex items-center justify-center text-finder-text-secondary h-full">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Pesquisando...
            </div>
          ) : selectedResult ? (
            // Exibe o resultado selecionado em um iframe
            <>
              {viewportSize === 'maximized' && (
                // Botões de controle quando maximizado
                <div className="fixed top-4 left-4 flex items-center space-x-2 z-50 p-2 rounded-lg bg-black bg-opacity-20">
                  <button onClick={() => handleViewportControl('close')} className={controlButtonsClass} title="Fechar">
                    <div className="bg-[#FF5F57] hover:bg-[#FF5F57]/80 w-full h-full rounded-full" />
                    <div className={controlButtonBg} />
                  </button>
                  <button onClick={() => handleViewportControl('minimize')} className={controlButtonsClass} title="Minimizar">
                    <div className="bg-[#FFBD2E] hover:bg-[#FFBD2E]/80 w-full h-full rounded-full" />
                    <div className={controlButtonBg} />
                  </button>
                  <button onClick={() => handleViewportControl('maximize')} className={controlButtonsClass} title="Maximizar">
                    <div className="bg-[#28C840] hover:bg-[#28C840]/80 w-full h-full rounded-full" />
                    <div className={controlButtonBg} />
                  </button>
                </div>
              )}
              <div className={`bg-finder-window rounded-lg shadow-lg transition-all duration-300 ${getViewportClass()}`}>
                <div className="bg-finder-search rounded-t-lg p-3 flex items-center justify-between">
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className="text-finder-accent font-medium truncate">{selectedResult.title}</h3>
                    <p className="text-finder-text-secondary text-sm truncate">{selectedResult.link}</p>
                  </div>
                  {viewportSize !== 'maximized' && (
                    // Botões de controle quando não maximizado
                    <div className="flex items-center space-x-2 bg-black bg-opacity-20 p-2 rounded-lg">
                      <button onClick={() => handleViewportControl('close')} className={controlButtonsClass} title="Fechar">
                        <div className="bg-[#FF5F57] hover:bg-[#FF5F57]/80 w-full h-full rounded-full" />
                        <div className={controlButtonBg} />
                      </button>
                      <button onClick={() => handleViewportControl('minimize')} className={controlButtonsClass} title="Minimizar">
                        <div className="bg-[#FFBD2E] hover:bg-[#FFBD2E]/80 w-full h-full rounded-full" />
                        <div className={controlButtonBg} />
                      </button>
                      <button onClick={() => handleViewportControl('maximize')} className={controlButtonsClass} title="Maximizar">
                        <div className="bg-[#28C840] hover:bg-[#28C840]/80 w-full h-full rounded-full" />
                        <div className={controlButtonBg} />
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex-1 bg-finder-search" style={{ height: 'calc(100vh - 180px)' }}>
                  <iframe
                    src={selectedResult.link}
                    title={selectedResult.title}
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin"
                  />
                </div>
              </div>
            </>
          ) : searchResults ? (
            // Exibe os resultados da pesquisa em um grid de cards
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
              {error ? (
                // Exibe mensagem de erro, se houver
                <div className="col-span-full flex items-center justify-center text-red-500">
                  <p>{error}</p>
                </div>
              ) : searchResults.length === 0 ? (
                // Exibe mensagem se não houver resultados
                <div className="col-span-full flex items-center justify-center text-finder-text-secondary">
                  <p>Nenhum resultado encontrado</p>
                </div>
              ) : (
                // Mapeia os resultados para cards
                searchResults.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => handleResultClick(result)}
                    className={`bg-black rounded-lg shadow-md hover:shadow-lg transition-shadow border border-transparent hover:border-${theme}-500 cursor-pointer p-4 flex flex-col h-full`}
                  >
                    {/* Thumbnail do resultado, se disponível */}
                    {result.thumbnail && (
                      <div className="w-full h-32 mb-3">
                        <img src={result.thumbnail} alt={result.title} className="w-full h-full object-cover rounded" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-[#4285F4] font-medium mb-1 line-clamp-2 hover:underline">{result.title}</h3>
                      <p className="text-finder-text-secondary text-xs mb-2 truncate">{result.link}</p>
                      <p className="text-finder-text text-sm line-clamp-3">{result.snippet}</p>
                      {result.date && (
                        <p className="text-finder-text-secondary text-xs mt-2">
                          {new Date(result.date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          ) : (
            // Mensagem inicial antes de qualquer busca
            <div className="flex items-center justify-center text-finder-text-secondary h-full">
              <p>Digite um termo para iniciar a busca</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoogleSearch;