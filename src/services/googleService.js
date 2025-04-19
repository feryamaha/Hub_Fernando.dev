// Configuração da API do Google Search
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const SEARCH_ENGINE_ID = process.env.REACT_APP_GOOGLE_SEARCH_ENGINE_ID;
const API_BASE_URL = 'https://www.googleapis.com/customsearch/v1';

// Função de validação das credenciais
const validateCredentials = () => {
  if (!API_KEY) {
    throw new Error('A chave da API do Google não está configurada. Por favor, verifique suas configurações.');
  }

  if (!SEARCH_ENGINE_ID) {
    throw new Error('O ID do mecanismo de busca não está configurado. Por favor, verifique suas configurações.');
  }

  // Verifica se a chave tem o formato correto (39 caracteres, alfanuméricos e traços)
  const keyFormat = /^[A-Za-z0-9_-]{39}$/;
  if (!keyFormat.test(API_KEY)) {
    throw new Error('O formato da chave da API do Google é inválido. Por favor, verifique se a chave está correta.');
  }
};

// Função para tratar erros da API
const handleApiError = (error) => {
  console.error('Erro na API do Google:', error);
  
  if (error.response) {
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        throw new Error('Requisição inválida. Por favor, verifique os parâmetros da busca.');
      case 401:
        throw new Error('A chave da API do Google não é válida. Por favor, verifique se a chave está correta.');
      case 403:
        throw new Error('Acesso negado. Verifique as restrições da chave da API e as cotas de uso.');
      case 429:
        throw new Error('Cota de requisições excedida. Por favor, tente novamente mais tarde.');
      case 500:
      case 503:
        throw new Error('Erro no servidor do Google. Por favor, tente novamente mais tarde.');
      default:
        throw new Error('Erro ao acessar a API do Google. Por favor, tente novamente.');
    }
  }
  
  throw new Error('Erro na comunicação com a API do Google. Por favor, verifique sua conexão e tente novamente.');
};

// Função para formatar os resultados
const formatResults = (items) => {
  if (!items) return [];
  
  return items.map(item => ({
    title: item.title,
    link: item.link,
    snippet: item.snippet,
    thumbnail: item.pagemap?.cse_thumbnail?.[0]?.src,
    type: 'webpage',
    date: item.pagemap?.metatags?.[0]?.['article:published_time']
  }));
};

// Função principal de busca
export const searchGoogle = async (searchTerm) => {
  try {
    // Valida as credenciais antes de fazer a requisição
    validateCredentials();
    
    console.log('Verificando configuração da API...');
    
    if (!searchTerm.trim()) {
      return [];
    }

    // Parâmetros da busca
    const searchParams = new URLSearchParams({
      key: API_KEY,
      cx: SEARCH_ENGINE_ID,
      q: searchTerm.trim(),
      num: 10,
      safe: 'active',
    });

    const searchUrl = `${API_BASE_URL}?${searchParams}`;
    
    // Faz a busca
    const response = await fetch(searchUrl);
    
    if (!response.ok) {
      const errorData = await response.json();
      handleApiError({ response: { status: response.status, data: errorData } });
    }

    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      return [];
    }

    // Formata e retorna os resultados
    return formatResults(data.items);
  } catch (error) {
    console.error('Erro no serviço do Google:', error);
    throw error;
  }
}; 