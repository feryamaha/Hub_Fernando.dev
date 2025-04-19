// Configuração da API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Função unificada de busca
export const search = async (query, type = 'google') => {
  try {
    if (!query.trim()) {
      return [];
    }

    const response = await fetch(`${API_BASE_URL}/api/search?${new URLSearchParams({
      query: query.trim(),
      type
    })}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao realizar a busca');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro na busca:', error);
    throw error;
  }
};

// Funções específicas para cada tipo de busca
export const searchGoogle = async (query) => {
  return search(query, 'google');
};

export const searchYouTube = async (query) => {
  return search(query, 'youtube');
};

// Função para tratar erros da API
export const handleApiError = (error) => {
  if (error.response) {
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        throw new Error(`Requisição inválida: ${data.error?.message || 'Verifique os parâmetros da busca.'}`);
      case 401:
        throw new Error('Acesso não autorizado. Por favor, tente novamente.');
      case 403:
        throw new Error('Acesso negado. Verifique as restrições e as cotas de uso.');
      case 429:
        throw new Error('Cota de requisições excedida. Por favor, tente novamente mais tarde.');
      default:
        throw new Error(`Erro ao acessar a API (${status}). ${data.error?.message || 'Por favor, tente novamente.'}`);
    }
  }
  
  throw new Error('Erro na comunicação com a API. Por favor, verifique sua conexão e tente novamente.');
}; 