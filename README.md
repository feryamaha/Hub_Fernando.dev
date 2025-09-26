# Portfólio MacOS Style

## 🚀 Visão Geral

Portfólio interativo inspirado no macOS, com animações, temas dinâmicos e integrações API.

## 🛠️ Tecnologias & Ferramentas

-   React 18, React Router 6, Tailwind CSS 3, Framer Motion, GSAP, AOS, Three.js, React Icons, Heroicons
-   YouTube Data API v3, Google Custom Search API, Grok API (xAI), GitHub Pages
-   Webpack, Babel, ESLint, Prettier, PostCSS, Autoprefixer, dotenv

## 📦 Estrutura

-   `MainContent/`: Home, About, Skills, Projects, Contact, Chat
-   `Sidebar/`: Navegação, Temas
-   `TopBar/`: WindowControls, Search, Modals
-   `services/`: Integrações APIs (YouTube, Google, Grok)
-   `hooks/`: Hooks customizados (tema, tamanho tela, download)
-   `context/`: Contextos React

## ⚡ Como Executar

```bash
git clone https://github.com/feryamaha/Hub_Fernando.dev.git
cd Hub_Fernando.dev
yarn install              # Instala dependências
cp .env.example .env      # Copia .env de exemplo
yarn dev                  # Executa localmente (http://localhost:3000)
```

## 🏗️ Build

```bash
yarn build                # Gera a build otimizada
```

## 🚀 Deploy gh-pages Automático

```bash
yarn deploy               # Faz deploy automático para gh-pages
```

## 🔄 Deploy gh-pages Manual

```bash
git checkout main                     # Vai para main
yarn build                            # Gera build
cp -r build /tmp/build_temp           # Copia build temporariamente
git checkout gh-pages                 # Vai para gh-pages
rm -rf *                              # Remove arquivos antigos
cp -r /tmp/build_temp/* .             # Copia nova build
git add . && git commit -m "Update"   # Comita
git push origin gh-pages              # Envia para remoto
rm -rf /tmp/build_temp                # Remove build temp
git checkout main                     # Retorna para main
yarn install                          # Reinstala dependências
yarn dev                              # Testa localmente
```

-   Verificar se em http://localhost:3000 esta igual ao https://feryamaha.github.io/Hub_Fernando.dev/
    gerado pela gh-pages (vice e versa) para confirmar se alteracoes que foram comitas na branch main foram aplicadas na gh-pages.
