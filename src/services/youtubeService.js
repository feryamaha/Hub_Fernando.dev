// Configuração da API do YouTube
const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

// Funções de formatação
const formatViews = (count) => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M visualizações`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K visualizações`;
  }
  return `${count} visualizações`;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 30) {
    return `${diffDays} dias atrás`;
  } else if (diffDays < 365) {
    return `${Math.floor(diffDays / 30)} meses atrás`;
  } else {
    return `${Math.floor(diffDays / 365)} anos atrás`;
  }
};

const formatDuration = (duration) => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = (match[1] || '').replace('H', '');
  const minutes = (match[2] || '').replace('M', '');
  const seconds = (match[3] || '').replace('S', '');
  
  let result = '';
  if (hours) result += `${hours}:`;
  result += `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  return result;
};

// Função de validação da API key
const validateApiKey = () => {
  if (!API_KEY) {
    throw new Error('A chave da API do YouTube não está configurada. Por favor, verifique suas configurações.');
  }
  
  // Verifica se a chave tem o formato correto (39 caracteres, alfanuméricos e traços)
  const keyFormat = /^[A-Za-z0-9_-]{39}$/;
  if (!keyFormat.test(API_KEY)) {
    throw new Error('O formato da chave da API do YouTube é inválido. Por favor, verifique se a chave está correta.');
  }
};

// Função para tratar erros da API
const handleApiError = (error) => {
  console.error('Erro na API do YouTube:', error);
  
  if (error.response) {
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        throw new Error('Requisição inválida. Por favor, verifique os parâmetros da busca.');
      case 401:
        throw new Error('A chave da API do YouTube não é válida. Por favor, verifique se a chave está correta e se as restrições estão configuradas adequadamente.');
      case 403:
        throw new Error('Acesso negado. Verifique as restrições da chave da API e as cotas de uso.');
      case 404:
        throw new Error('Recurso não encontrado.');
      case 429:
        throw new Error('Cota de requisições excedida. Por favor, tente novamente mais tarde.');
      case 500:
      case 503:
        throw new Error('Erro no servidor do YouTube. Por favor, tente novamente mais tarde.');
      default:
        throw new Error('Erro ao acessar a API do YouTube. Por favor, tente novamente.');
    }
  }
  
  throw new Error('Erro na comunicação com a API do YouTube. Por favor, verifique sua conexão e tente novamente.');
};

// Função principal de busca
export const searchVideos = async (searchTerm) => {
  try {
    // Valida a API key antes de fazer a requisição
    validateApiKey();
    
    console.log('Verificando configuração da API...');
    console.log('API_KEY:', API_KEY);
    
    if (!searchTerm.trim()) {
      return [];
    }

    // Parâmetros da busca
    const searchParams = new URLSearchParams({
      part: 'snippet',
      maxResults: 10,
      type: 'video',
      key: API_KEY,
      q: searchTerm.trim(),
    });

    const searchUrl = `${API_BASE_URL}/search?${searchParams}`;
    console.log('URL da busca:', searchUrl);

    // Busca os vídeos
    const searchResponse = await fetch(searchUrl);
    
    if (!searchResponse.ok) {
      const errorData = await searchResponse.json();
      handleApiError({ response: { status: searchResponse.status, data: errorData } });
    }

    const searchData = await searchResponse.json();
    
    if (!searchData.items || searchData.items.length === 0) {
      return [];
    }

    // Busca detalhes dos vídeos
    const videoIds = searchData.items.map(item => item.id.videoId).join(',');
    const detailsParams = new URLSearchParams({
      part: 'snippet,contentDetails,statistics',
      id: videoIds,
      key: API_KEY,
    });

    const detailsUrl = `${API_BASE_URL}/videos?${detailsParams}`;
    const detailsResponse = await fetch(detailsUrl);
    
    if (!detailsResponse.ok) {
      const errorData = await detailsResponse.json();
      handleApiError({ response: { status: detailsResponse.status, data: errorData } });
    }

    const detailsData = await detailsResponse.json();
    
    // Mapeia os resultados
    return searchData.items.map((item, index) => {
      const details = detailsData.items[index];
      return {
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url,
        channel: item.snippet.channelTitle,
        description: item.snippet.description,
        views: formatViews(details.statistics.viewCount),
        timestamp: formatDate(item.snippet.publishedAt),
        duration: formatDuration(details.contentDetails.duration)
      };
    });
  } catch (error) {
    console.error('Erro no serviço do YouTube:', error);
    throw error;
  }
}; 