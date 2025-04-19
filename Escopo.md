# Escopo do Projeto - Portfólio MacOS Style

## 1. Visão Geral
Este projeto é uma reimaginação criativa de um portfólio profissional, utilizando a interface do MacOS Finder como base de design. O objetivo é criar uma experiência única e interativa que combine a familiaridade do Finder com funcionalidades modernas de um portfólio web.

## 2. Tecnologias Base
- React (^19.1.0)
- Tailwind CSS
- Webpack & Babel (configuração existente)
- ESLint & Prettier
- Sistema de auto-commit
- GitHub Pages para deploy

## 3. Estrutura Atual do Projeto

### 3.1 Arquivos Principais
- `src/App.jsx`: Componente principal da aplicação
- `src/index.jsx`: Ponto de entrada da aplicação
- `src/index.css`: Estilos globais
- `src/styles/tailwind.css`: Configuração do Tailwind CSS

### 3.2 Componentes Implementados
#### MainContent
- Gerenciador de conteúdo e tema
- Seções: Home, About, Skills, Projects, Contact
- Sistema de temas básico

#### Sidebar
- Navegação principal
- Items da barra lateral
- Seletor de temas

#### TopBar
- Controles da janela
- Barra de busca (básica)
- Ações da barra superior

#### Viewers
- ContentViewer (básico)

### 3.3 Configurações
- Configurações do projeto
- Contextos React
- Hooks personalizados

### 3.4 Estilos
- Configuração do Tailwind
- Temas personalizados

### 3.5 Público
- Ícones do sistema
- Dados do projeto
- Template HTML
- Favicon

## 4. Funcionalidades Implementadas
- Sistema de temas básico
- Navegação entre seções
- Controles de janela
- Visualização de conteúdo básico

## 5. Funcionalidades Pendentes
### 5.1 TopBar
- [ ] Busca integrada com YouTube
- [ ] Busca integrada com Google
- [ ] Ações de compartilhamento funcionais
- [ ] Ações contextuais

### 5.2 Sidebar
- [ ] Ícones corretos para cada seção
- [ ] Funcionalidades de download
- [ ] Sistema de temas completo

### 5.3 MainContent
- [ ] Viewers específicos para cada tipo de conteúdo
- [ ] Integração com YouTube
- [ ] Integração com Google
- [ ] Sistema de download

### 5.4 Viewers
- [ ] VideoPlayer para YouTube
- [ ] SearchResults para buscas
- [ ] FileViewer para documentos

### 5.5 Responsividade
- [ ] Adaptações para desktop (> 1024px)
- [ ] Adaptações para laptop (1024px)
- [ ] Adaptações para tablet (768px)
- [ ] Adaptações para mobile (640px)
- [ ] Menu hambúrguer para mobile

## 6. Próximos Passos
1. Implementar sistema de busca integrado
2. Adicionar visualizadores específicos
3. Implementar sistema de download
4. Melhorar responsividade
5. Adicionar integrações com YouTube e Google

## 7. Histórico de Desenvolvimento
- Implementação inicial da estrutura básica
- Criação dos componentes principais
- Implementação do sistema de temas
- Configuração do Tailwind CSS
- Implementação da navegação básica

## 8. Responsividade
### Breakpoints
- Desktop: > 1024px
- Laptop: 1024px
- Tablet: 768px
- Mobile: 640px

### Adaptações por Dispositivo
#### Desktop/Laptop
- Layout completo
- Todas as funcionalidades

#### Tablet
- Sidebar colapsável
- Ajustes de layout para tela média
- Manutenção de todas as funcionalidades

#### Mobile
- Layout simplificado
- Menu hambúrguer para sidebar
- Foco em conteúdo principal

## 9. Temas e Estilização
### Sistema de Cores
```javascript
colors: {
  finder: {
    'window': '#2D2D2D',
    'sidebar': '#323232',
    'hover': '#454545',
    // Cores específicas para cada tema
  }
}
```

### Elementos de UI
- Bordas arredondadas precisas
- Sombras sutis
- Efeitos hover
- Transições suaves

## 10. Funcionalidades Especiais
### Integração YouTube
- Busca de vídeos
- Player integrado
- Interface personalizada

### Integração Google
- Busca personalizada
- Resultados integrados
- Visualização in-app

### Sistema de Download
- Downloads diretos
- Visualização prévia
- Indicadores de progresso

### Compartilhamento
- Link direto para seções
- Compartilhamento social
- QR Code (opcional)

## 11. Performance
### Otimizações
- Code splitting
- Lazy loading de componentes
- Otimização de imagens
- Caching apropriado

### Métricas Alvo
- First Paint: < 1s
- Time to Interactive: < 2s
- Performance Score: > 90

## 12. Acessibilidade
- Suporte a teclado completo
- Labels ARIA apropriados
- Contraste adequado
- Navegação assistiva

## 13. Manutenção
### Padrões de Código
- ESLint config
- Prettier config
- Convenções de nomenclatura
- Documentação inline

### Versionamento
- Sistema de auto-commit
- Conventional commits
- GitHub Flow

## 14. Deploy
- GitHub Pages
- CI/CD automático
- Ambiente de staging
- Monitoramento de produção

## 15. Arquivos para Download
1. README.md - Documentação geral
2. Currículo - CV atualizado
3. LessonsLearning.md - Aprendizados
4. Escopo.md - Este documento

## 16. Dependências Principais
```json
{
  "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-router-dom": "^7.5.0",
    "@heroicons/react": "^2.0.0",
    "tailwindcss": "^3.0.0",
    "react-youtube": "^10.0.0",
    "googleapis": "^126.0.0"
  }
}
```

## 17. Scripts Disponíveis
```json
{
  "scripts": {
    "dev": "webpack serve --mode development --open",
    "build": "cross-env NODE_ENV=production webpack && node scripts/auto-commit.js",
    "predeploy": "yarn build",
    "deploy": "gh-pages -d dist"
  }
}
```

## 18. Estrutura de Diretórios
[Estrutura detalhada de diretórios conforme apresentada anteriormente]

## 19. Considerações de Segurança
- Sanitização de inputs
- Proteção contra XSS
- Gestão segura de APIs
- Validação de downloads

## 20. Testes
- Testes unitários
- Testes de integração
- Testes de UI
- Testes de acessibilidade

---

Este documento serve como referência principal para o desenvolvimento e manutenção do projeto. Qualquer alteração significativa deve ser refletida aqui para manter a consistência da documentação. 