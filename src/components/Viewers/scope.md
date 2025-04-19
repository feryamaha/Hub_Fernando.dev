# YouTube Viewer - Escopo do Projeto

## Visão Geral
O YouTube Viewer é um componente que permite buscar e visualizar vídeos do YouTube dentro da aplicação, mantendo o estilo visual do macOS Finder.

## Componentes Principais

### 1. YouTubeViewer (Container Principal)
- Utiliza o `ContentViewer` como container base
- Gerencia o estado da busca e seleção de vídeos
- Integra os componentes de busca e visualização

### 2. SearchResults (Resultados da Busca)
- Exibe os resultados em cards com:
  - Thumbnail do vídeo
  - Título
  - Descrição (truncada)
  - Indicador de fonte (YouTube)
- Estilo consistente com o Finder
- Hover effects e transições suaves

### 3. VideoPlayer (Reprodutor)
- Integração com react-youtube
- Player responsivo (16:9)
- Controles de reprodução
- Estilo consistente com o Finder

## Funcionalidades

### 1. Busca de Vídeos
- Campo de busca com placeholder
- Botão de submit
- Feedback visual durante a busca (loading)
- Tratamento de erros
- Limite de 10 resultados por busca

### 2. Visualização de Resultados
- Grid responsivo (1 coluna em mobile, 2 em tablet, 3 em desktop)
- Cards com hover effect
- Informações essenciais do vídeo
- Seleção de vídeo ao clicar

### 3. Reprodução de Vídeo
- Player integrado
- Tamanho responsivo
- Controles nativos do YouTube
- Retorno à lista de resultados

## Integração com Backend

### 1. API Service (youtube.js)
- Endpoint: `/api/youtube/search`
- Parâmetros:
  - q: termo de busca
- Retorno:
  - items: array de vídeos
  - error: mensagem de erro (se houver)

### 2. Contexto (YouTubeContext)
- Estado:
  - videos: array de vídeos
  - error: mensagem de erro
  - isLoading: estado de carregamento
  - searchTerm: termo de busca atual
- Funções:
  - setSearchTerm: atualiza o termo de busca
  - fetchVideos: busca vídeos na API

## Segurança

### 1. Proteção da API Key
- Chave armazenada apenas no backend
- Frontend se comunica apenas com o backend
- Endpoint protegido contra uso indevido

### 2. Validações
- Sanitização de inputs
- Tratamento de erros
- Rate limiting no backend

## Estilização

### 1. Cores e Temas
- Usa variáveis CSS do tema Finder:
  - --finder-window: background
  - --finder-text: texto principal
  - --finder-accent: elementos de destaque
  - --finder-border: bordas
  - --finder-hover: efeitos hover

### 2. Responsividade
- Mobile: 1 coluna
- Tablet: 2 colunas
- Desktop: 3 colunas
- Player: proporção 16:9

### 3. Animações
- Loading spinner
- Transições suaves
- Hover effects
- Fade in/out

## Dependências
- react-youtube: player de vídeo
- react-pdf: visualização de PDFs (se necessário)
- axios: requisições HTTP

## Variáveis de Ambiente
- Frontend:
  - REACT_APP_API_URL: URL do backend
- Backend:
  - YOUTUBE_API_KEY: chave da API do YouTube

## Testes
- Testes de componente
- Testes de integração
- Testes de responsividade
- Testes de segurança

## Próximos Passos
1. Implementar backend
2. Configurar variáveis de ambiente
3. Testar integração
4. Refinar UI/UX
5. Implementar testes 