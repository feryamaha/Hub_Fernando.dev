// Configuração da API do Grok
const API_KEY = process.env.REACT_APP_GROK_API_KEY;
const API_SECRET = process.env.REACT_APP_GROK_API_SECRET;
const API_BASE_URL = 'https://api.x.ai/v1';

// Função de validação das credenciais
const validateCredentials = () => {
  if (!API_KEY) {
    throw new Error('A chave da API do Grok não está configurada. Por favor, verifique suas configurações.');
  }

  if (!API_SECRET) {
    throw new Error('A chave secreta da API do Grok não está configurada. Por favor, verifique suas configurações.');
  }
};

// Função para tratar erros da API
const handleApiError = (error) => {
  console.error('Erro na API do Grok:', error);
  
  if (error.response) {
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        throw new Error('Requisição inválida. Por favor, verifique os parâmetros da mensagem.');
      case 401:
        throw new Error('Credenciais inválidas. Por favor, verifique suas chaves de API.');
      case 403:
        throw new Error('Acesso negado. Verifique as restrições da chave da API e as cotas de uso.');
      case 429:
        throw new Error('Cota de requisições excedida. Por favor, tente novamente mais tarde.');
      case 500:
      case 503:
        throw new Error('Erro no servidor do Grok. Por favor, tente novamente mais tarde.');
      default:
        throw new Error('Erro ao acessar a API do Grok. Por favor, tente novamente.');
    }
  }
  
  throw new Error('Erro na comunicação com a API do Grok. Por favor, verifique sua conexão e tente novamente.');
};

// Função para enviar mensagem de texto
export const sendMessage = async (message, options = {}) => {
  try {
    validateCredentials();
    
    const response = await fetch(`${API_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'X-API-Secret': API_SECRET
      },
      body: JSON.stringify({
        model: 'grok-beta',
        messages: [{ role: 'user', content: message }],
        ...options
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      handleApiError({ response: { status: response.status, data: errorData } });
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Erro no serviço do Grok:', error);
    throw error;
  }
};

// Função para processar documentos (PDFs e textos)
export const processDocument = async (file, options = {}) => {
  try {
    validateCredentials();
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('model', 'grok-beta');
    Object.entries(options).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await fetch(`${API_BASE_URL}/documents/process`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'X-API-Secret': API_SECRET
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      handleApiError({ response: { status: response.status, data: errorData } });
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao processar documento:', error);
    throw error;
  }
};

// Função para gerar imagens
export const generateImage = async (prompt, options = {}) => {
  try {
    validateCredentials();
    
    const response = await fetch(`${API_BASE_URL}/images/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'X-API-Secret': API_SECRET
      },
      body: JSON.stringify({
        prompt,
        model: 'aurora',
        ...options
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      handleApiError({ response: { status: response.status, data: errorData } });
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('Erro ao gerar imagem:', error);
    throw error;
  }
}; 