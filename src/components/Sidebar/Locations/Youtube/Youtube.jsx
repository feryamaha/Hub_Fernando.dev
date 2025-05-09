import React, { useState, useRef, useCallback } from 'react';
import { FaYoutube } from 'react-icons/fa';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../../../hooks/useTheme';
import { searchYouTube } from '../../../../api/api';
import debounce from 'lodash/debounce';

const YoutubeSearch = () => {
    // Hook para obter o tema atual (ex.: 'light', 'dark', etc.)
    const [theme] = useTheme();

    // Estados do componente
    const [searchTerm, setSearchTerm] = useState(''); // Termo de busca digitado pelo usuário
    const [searchResults, setSearchResults] = useState([]); // Resultados da pesquisa
    const [isLoading, setIsLoading] = useState(false); // Indicador de estado de busca
    const [selectedVideo, setSelectedVideo] = useState(null); // Vídeo selecionado para visualização detalhada
    const [viewportSize, setViewportSize] = useState('default'); // Tamanho da viewport (default, maximized, closed)
    const [error, setError] = useState(null); // Mensagem de erro, se houver
    const isSearching = useRef(false); // Ref para evitar múltiplas buscas simultâneas

    // Função de busca com debounce para evitar múltiplas requisições
    const debouncedSearch = useCallback(
        debounce(async (term) => {
            if (!term.trim() || isSearching.current) return; // Evita busca com termo vazio ou busca simultânea

            isSearching.current = true; // Inicia o estado de busca
            setIsLoading(true); // Ativa o indicador de carregamento
            setError(null); // Limpa erros anteriores

            try {
                const results = await searchYouTube(term); // Chama a API para buscar vídeos
                // Mapeia os resultados para a estrutura esperada
                const mappedResults = results.map(item => ({
                    id: item.id.videoId,
                    title: item.snippet.title,
                    channel: item.snippet.channelTitle,
                    thumbnail: item.snippet.thumbnails?.medium?.url || '',
                    timestamp: item.snippet.publishedAt,
                    description: item.snippet.description
                }));
                setSearchResults(mappedResults); // Atualiza os resultados
            } catch (error) {
                console.error('Erro na pesquisa:', error);
                setError(error.message); // Define mensagem de erro
                setSearchResults([]); // Limpa resultados em caso de erro
            } finally {
                setIsLoading(false); // Finaliza o estado de carregamento
                isSearching.current = false; // Permite novas buscas
            }
        }, 500), // Atraso de 500ms para o debounce
        []
    );

    // Manipula o envio do formulário de busca
    const handleSearch = (e) => {
        e.preventDefault();
        debouncedSearch(searchTerm); // Executa a busca com o termo atual
    };

    // Manipula o clique em um vídeo para exibir detalhes
    const handleVideoClick = (video) => {
        setSelectedVideo(video);
        setViewportSize('default');
    };

    // Volta para a lista de resultados
    const handleBack = () => {
        setSelectedVideo(null);
        setViewportSize('default');
    };

    // Controla o tamanho da viewport (fechar, minimizar, maximizar)
    const handleViewportControl = (action) => {
        switch (action) {
            case 'close':
                setSelectedVideo(null);
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
    const controlButtonsClass = 'w-3 h-3 rounded-full transition-colors relative group';
    const controlButtonBg = 'absolute inset-0 rounded-full bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity';

    return (
        <div className={`h-full flex flex-col bg-finder-window theme-${theme}`}>
            {/* Cabeçalho com ícone do YouTube e botão de voltar */}
            <div className="bg-finder-sidebar border-b border-finder-border p-2">
                <div className="flex items-center space-x-3">
                    {selectedVideo && (
                        <button
                            onClick={handleBack}
                            className="p-1 rounded-md hover:bg-finder-hover text-finder-text-secondary hover:text-finder-accent transition-colors"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}
                    <div className="w-8 h-8 rounded-full flex items-center justify-center">
                        <FaYoutube className="text-2xl text-red-600" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-finder-text font-medium">YouTube</h2>
                        <p className="text-finder-text-secondary text-sm">Assista vídeos sem sair do portfólio</p>
                    </div>
                </div>
            </div>

            {/* Área principal com formulário de busca e resultados */}
            <div className="flex-1 flex flex-col p-4 overflow-hidden">
                {selectedVideo ? (
                    // Exibe o vídeo selecionado em um iframe
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
                                    <h3 className="text-finder-accent font-medium truncate">{selectedVideo.title}</h3>
                                    <p className="text-finder-text-secondary text-sm truncate">{selectedVideo.channel}</p>
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
                                <div className="w-full h-full flex flex-col">
                                    <div className="relative w-full h-[calc(100%-200px)]">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                                            className="absolute inset-0 w-full h-full"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            style={{ aspectRatio: '16/9' }}
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h4 className="text-finder-text font-medium text-lg mb-2">{selectedVideo.title}</h4>
                                        <div className="flex items-center text-finder-text-secondary text-sm mb-4">
                                            <span>{selectedVideo.channel}</span>
                                            <span className="mx-2">•</span>
                                            <span>{new Date(selectedVideo.timestamp).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-finder-text">{selectedVideo.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    // Exibe o formulário de busca e os resultados
                    <>
                        {/* Formulário de busca */}
                        <form onSubmit={handleSearch} className="flex items-center space-x-2 mb-4">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Buscar vídeos..."
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
                            {error ? (
                                // Exibe mensagem de erro, se houver
                                <div className="flex items-center justify-center text-red-500 h-full">
                                    <p>Erro: {error}</p>
                                </div>
                            ) : isLoading ? (
                                // Exibe um spinner durante a busca
                                <div className="flex items-center justify-center text-finder-text-secondary h-full">
                                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    Pesquisando...
                                </div>
                            ) : searchResults.length > 0 ? (
                                // Exibe os resultados da pesquisa em um grid de cards
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
                                    {searchResults.map((video) => (
                                        <button
                                            key={video.id}
                                            onClick={() => handleVideoClick(video)}
                                            className={`bg-black rounded-lg shadow-md hover:shadow-lg transition-shadow border border-transparent hover:border-${theme}-500 cursor-pointer p-4 flex flex-col h-full`}
                                        >
                                            {/* Thumbnail do vídeo */}
                                            <div className="w-full h-32 mb-3">
                                                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover rounded" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-finder-accent font-medium mb-1 line-clamp-2">{video.title}</h3>
                                                <p className="text-finder-text-secondary text-xs mb-2">{video.channel}</p>
                                                <div className="flex items-center text-finder-text-secondary text-xs">
                                                    <span>{new Date(video.timestamp).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : searchTerm && !isLoading && !isSearching.current ? (
                                // Exibe mensagem se não houver resultados
                                <div className="flex items-center justify-center text-finder-text-secondary h-full">
                                    Nenhum resultado encontrado
                                </div>
                            ) : null}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default YoutubeSearch;