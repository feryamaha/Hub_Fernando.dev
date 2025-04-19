# Portfólio MacOS Style

## 🚀 Visão Geral
Um portfólio moderno e interativo inspirado na interface do macOS, com animações suaves, temas dinâmicos e integrações com APIs populares.

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca principal para construção da UI
- **React Router 6** - Navegação entre páginas
- **Tailwind CSS 3** - Estilização e design system
- **Framer Motion** - Animações avançadas
- **GSAP** - Animações e efeitos visuais
- **AOS (Animate On Scroll)** - Animações baseadas em scroll
- **Three.js** - Efeitos 3D e distorções
- **React Icons & Heroicons** - Biblioteca de ícones

### APIs e Serviços
- **YouTube Data API v3** - Integração com YouTube
- **Google Custom Search API** - Busca personalizada
- **Grok API (xAI)** - Chatbot inteligente
- **GitHub Pages** - Hospedagem e deploy

### Ferramentas de Desenvolvimento
- **Webpack** - Bundling e otimização
- **Babel** - Transpilação de código
- **ESLint & Prettier** - Linting e formatação
- **PostCSS** - Processamento CSS
- **Autoprefixer** - Compatibilidade CSS
- **dotenv** - Gerenciamento de variáveis de ambiente

## ✨ Funcionalidades Implementadas

### Interface e UX
- Interface estilo Finder do macOS
- Sistema de temas dinâmicos
- Animações suaves e interativas
- Responsividade em todos os dispositivos
- Navegação intuitiva
- Controles de janela (minimizar, maximizar, fechar)

### Integrações
- **YouTube Search**
  - Busca de vídeos em tempo real
  - Visualização de resultados
  - Player de vídeo integrado

- **Google Search**
  - Busca personalizada
  - Resultados em tempo real
  - Visualização de páginas web

- **Chatbot Yaminuelle**
  - Processamento de mensagens
  - Geração de imagens
  - Processamento de documentos
  - Interface estilo macOS

### Componentes Especiais
- **Grid Distortion** - Efeito 3D interativo
- **True Focus** - Sistema de foco dinâmico
- **Variable Proximity** - Interações baseadas em proximidade
- **Crosshair** - Sistema de mira interativo
- **Rotating Text** - Texto rotativo com animações
- **Modal System** - Sistema de modais personalizado

### Animações e Efeitos
- Transições suaves entre páginas
- Efeitos de hover e foco
- Animações baseadas em scroll
- Efeitos de distorção 3D
- Sistema de pastas animado
- Tooltips informativos
- Cards interativos

### Performance e Otimização
- Lazy loading de componentes
- Code splitting
- Otimização de assets
- Caching e memoização
- Gerenciamento de estado eficiente

## 📦 Estrutura do Projeto

### Componentes Principais
- `MainContent/` - Conteúdo principal
  - `Home/` - Página inicial com efeitos 3D
  - `About/` - Sobre com cards interativos
  - `Skills/` - Habilidades em estilo Finder
  - `Projects/` - Projetos com visualização em pastas
  - `Contact/` - Contato com efeitos interativos
  - `Chat/` - Chatbot integrado

- `Sidebar/` - Navegação lateral
  - `Locations/` - Links de navegação
  - `Theme/` - Seletor de temas

- `TopBar/` - Barra superior
  - `WindowControls/` - Controles da janela
  - `Search/` - Busca integrada
  - `Modals/` - Sistema de modais

### Serviços e Utilitários
- `services/` - Integrações com APIs
  - `youtubeService.js` - YouTube API
  - `googleService.js` - Google Search API
  - `grokService.js` - Grok API

- `hooks/` - Hooks personalizados
  - `useTheme.js` - Gerenciamento de temas
  - `useScreenSize.js` - Responsividade
  - `useDownload.js` - Sistema de download

- `context/` - Contextos React
  - `ThemeContext.jsx` - Contexto de temas

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn
- Git

### Instalação
1. Clone o repositório:
```bash
git clone https://github.com/feryamaha/Hub_Fernando.dev.git
cd Hub_Fernando.dev
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite o arquivo .env com suas chaves de API
```

### Desenvolvimento
```bash
npm start
# ou
yarn start
```

### Build
```bash
npm run build
# ou
yarn build
```

### Deploy
```bash
npm run deploy
# ou
yarn deploy
```

## 📝 Licença
Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuições
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## 📞 Contato
- GitHub: [feryamaha](https://github.com/feryamaha)
- LinkedIn: [Fernando Moreira](https://linkedin.com/in/fernando-moreira)
- Email: [seu-email@exemplo.com](mailto:seu-email@exemplo.com) 