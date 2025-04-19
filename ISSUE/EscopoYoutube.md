# Escopo: Integração YouTube no WHFF-enD

## Objetivo Principal
Implementar funcionalidade de pesquisa e reprodução de vídeos do YouTube diretamente dentro do app, sem redirecionamento para páginas externas.

## Componentes Existentes
- `src/components/Viewers/SearchResults.jsx`
- `src/components/Viewers/VideoPlayer.jsx`
- `src/components/TopBar/SearchBar.jsx`

## Requisitos Técnicos

### 1. Integração com YouTube Data API v3
- Configurar autenticação com API Key
- Implementar endpoint `/search` para busca de vídeos
- Limitar resultados a 5 vídeos por pesquisa
- Incluir informações relevantes: título, miniatura, descrição, ID do vídeo

### 2. Componentes Necessários
- Modificar `SearchBar.jsx`:
  - Capturar termo de busca
  - Fazer requisição à API
  - Exibir ícone de play (já existente)
  
- Atualizar `SearchResults.jsx`:
  - Renderizar lista de vídeos
  - Exibir miniaturas
  - Mostrar título e descrição
  - Implementar seleção de vídeo
  
- Ajustar `VideoPlayer.jsx`:
  - Integrar iframe do YouTube
  - Manter estilo consistente com Finder
  - Implementar controles de reprodução

### 3. Interface e UX
- Estilo consistente com macOS/Finder
- Barra de título personalizada
- Bordas arredondadas
- Transições suaves
- Feedback visual durante carregamento

### 4. Fluxo de Funcionalidade
1. Usuário digita termo de busca
2. Sistema faz requisição à API
3. Resultados são exibidos em lista
4. Ao selecionar vídeo, player é exibido
5. Reprodução ocorre na mesma janela

## Dependências
- YouTube Data API v3
- React
- Tailwind CSS
- Framer Motion (para animações)

## Restrições
- Não abrir novas abas/janelas
- Manter consistência visual com o resto do app
- Limitar número de resultados para performance
- Tratar erros de API adequadamente

## Próximos Passos
1. Análise dos componentes existentes
2. Configuração da API
3. Implementação da busca
4. Desenvolvimento da interface
5. Testes e ajustes

## Prioridade
- [x] Alta

## Labels
- enhancement
- youtube-integration
- api-integration 