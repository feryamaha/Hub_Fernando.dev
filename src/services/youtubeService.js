// Configuração da API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

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
    if (!searchTerm.trim()) {
      return [];
    }

    const response = await fetch(`${API_BASE_URL}/api/search?${new URLSearchParams({
      query: searchTerm.trim(),
      type: 'youtube'
    })}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao realizar a busca');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro no serviço do YouTube:', error);
    throw error;
  }
}; 