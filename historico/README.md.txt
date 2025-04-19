# Portfólio MacOS Style

## Estrutura Atual do Projeto

### Arquivos Principais
- `src/App.jsx`: Componente principal da aplicação
- `src/index.jsx`: Ponto de entrada da aplicação
- `src/index.css`: Estilos globais
- `src/styles/tailwind.css`: Configuração do Tailwind CSS

### Componentes
- `src/components/MainContent/`: Componente principal de conteúdo
  - `MainContent.jsx`: Gerenciador de conteúdo e tema
  - `Sections/`: Seções do portfólio
    - `Home/`: Página inicial
    - `About/`: Sobre
    - `Skills/`: Habilidades
    - `Projects/`: Projetos
    - `Contact/`: Contato

- `src/components/Sidebar/`: Barra lateral
  - `Sidebar.jsx`: Navegação principal
  - `SidebarItem.jsx`: Item da barra lateral
  - `ThemeSelector.jsx`: Seletor de temas

- `src/components/TopBar/`: Barra superior
  - `TopBar.jsx`: Controles da janela
  - `WindowControls.jsx`: Botões de controle
  - `SearchBar.jsx`: Barra de busca
  - `Actions.jsx`: Ações da barra superior

- `src/components/Viewers/`: Visualizadores de conteúdo
  - `ContentViewer.jsx`: Visualizador de conteúdo geral

### Configurações
- `src/config/`: Configurações do projeto
- `src/context/`: Contextos React
- `src/hooks/`: Hooks personalizados

### Estilos
- `src/styles/`: Estilos e temas
  - `tailwind.css`: Configuração do Tailwind
  - `themes/`: Temas personalizados

### Público
- `public/`: Arquivos estáticos
  - `icons/`: Ícones do sistema
  - `data/`: Dados do projeto
  - `index.html`: Template HTML
  - `favicon.svg`: Ícone do site

## Tecnologias Utilizadas
- React
- Tailwind CSS
- Webpack & Babel
- ESLint & Prettier
- GitHub Pages

## Funcionalidades Implementadas
- Sistema de temas
- Navegação entre seções
- Controles de janela
- Visualização de conteúdo básico

## Próximos Passos
- Implementar sistema de busca integrado
- Adicionar visualizadores específicos
- Implementar sistema de download
- Melhorar responsividade
- Adicionar integrações com YouTube e Google 