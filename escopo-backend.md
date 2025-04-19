# Escopo do Backend - Sistema de Busca Unificado

## Fluxograma Hierárquico do Sistema

1. Usuário Interage no Frontend
   └── 1.1. Digita query (ex.: "javascript")
   └── 1.2. Seleciona tipo de busca (ex.: "youtube" ou "google")
   └── 1.3. Envia requisição ao backend
          └── 1.3.1. Requisição GET: /api/search?query=javascript&type=youtube

2. Backend Processa a Requisição
   └── 2.1. Recebe requisição no endpoint /api/search
   └── 2.2. Valida parâmetros
          └── 2.2.1. Verifica se query é válida (string, não vazia)
          └── 2.2.2. Verifica se type é "google" ou "youtube"
          └── 2.2.3. Se inválido, retorna erro (HTTP 400)
   └── 2.3. Carrega chaves de API
          └── 2.3.1. Usa dotenv para ler .env (ex.: YOUTUBE_API_KEY)
          └── 2.3.2. Garante que .env está protegido (.gitignore)
   └── 2.4. Envia requisição à API externa
          └── 2.4.1. Se type="youtube": GET https://www.googleapis.com/youtube/v3/search
          └── 2.4.2. Se type="google": GET https://www.googleapis.com/customsearch/v1
          └── 2.4.3. Inclui chave de API na requisição

3. API Externa Processa a Requisição
   └── 3.1. Google Cloud Console valida a chave
          └── 3.1.1. Verifica se a chave é válida
          └── 3.1.2. Checa restrições (ex.: IP ou domínio)
          └── 3.1.3. Se inválido, retorna erro (ex.: HTTP 403)
   └── 3.2. Processa a busca
          └── 3.2.1. Executa a query (ex.: busca vídeos ou resultados web)
   └── 3.3. Retorna resultados em JSON
          └── 3.3.1. Ex.: Lista de vídeos (YouTube) ou links (Google)

4. Backend Retorna Resultados ao Frontend
   └── 4.1. Recebe resposta da API externa
   └── 4.2. Formata resposta (JSON)
   └── 4.3. Envia resposta ao frontend
          └── 4.3.1. HTTP 200 com resultados
          └── 4.3.2. Se erro, HTTP 500 com mensagem

5. Frontend Exibe Resultados
   └── 5.1. Recebe resposta do backend
   └── 5.2. Renderiza resultados na interface
          └── 5.2.1. Ex.: Exibe vídeos (YouTube) ou links (Google)

## Explicação do Fluxograma

Este fluxograma hierárquico organiza o processo em cinco níveis principais, com subníveis que detalham cada etapa. A estrutura reflete a sequência e a dependência entre os componentes (usuário, frontend, backend, APIs externas). Aqui está uma explicação resumida de cada nível:

### Usuário Interage no Frontend:
- O usuário digita uma query (ex.: "javascript") e escolhe o tipo de busca (google ou youtube) em uma interface web.
- O frontend envia uma requisição GET ao backend com os parâmetros query e type (ex.: /api/search?query=javascript&type=youtube).
- Nota: O frontend não tem acesso às chaves de API, garantindo segurança.

### Backend Processa a Requisição:
- O backend (Node.js com Express) recebe a requisição no endpoint /api/search.
- Valida a query (deve ser uma string não vazia) e o tipo (deve ser google ou youtube). Se inválido, retorna um erro.
- Carrega as chaves de API do arquivo .env usando dotenv. O .env é protegido pelo .gitignore para evitar exposição.
- Envia uma requisição à API externa correspondente, incluindo a chave de API (ex.: YOUTUBE_API_KEY para YouTube).

### API Externa Processa a Requisição:
- A API (Google Custom Search ou YouTube Data API v3) recebe a requisição do backend.
- O Google Cloud Console valida a chave, verificando sua autenticidade e restrições (ex.: limitada ao IP do servidor ou domínio).
- Se válida, a API executa a busca e retorna os resultados em JSON. Se inválida, retorna um erro.

### Backend Retorna Resultados ao Frontend:
- O backend recebe os resultados da API externa.
- Formata a resposta como JSON e a envia ao frontend com status HTTP 200.
- Em caso de erro (ex.: cota excedida), retorna um erro HTTP 500.

### Frontend Exibe Resultados:
- O frontend recebe a resposta JSON do backend.
- Renderiza os resultados na interface do usuário (ex.: lista de vídeos para YouTube ou links para Google Search).

## Por Que Este Fluxograma é Claro e Hierárquico?

1. **Estrutura Hierárquica**: Cada nível (1 a 5) representa uma etapa principal, com subníveis (ex.: 2.1, 2.2) detalhando ações específicas, mostrando a relação entre os componentes.

2. **Sequência Lógica**: O fluxo segue a ordem natural: usuário → frontend → backend → API externa → backend → frontend → usuário.

3. **Foco em Segurança**: Destaca a proteção das chaves (no .env, com restrições no Google Cloud Console) e a validação no backend.

4. **Simplicidade**: Inclui apenas os passos essenciais, evitando complexidade desnecessária.

## Configurações Necessárias

### Frontend:
- Deve enviar requisições GET para /api/search. Exemplo:
```javascript
fetch('http://localhost:3000/api/search?query=javascript&type=youtube')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Erro:', error));
```

### Backend:
- Use o código fornecido anteriormente (endpoint /api/search em Node.js com Express).

### Google Cloud Console:
- Configure chaves para Google Custom Search JSON API e YouTube Data API v3.
- Adicione restrições (ex.: HTTP Referrer para https://seusite.com ou IP do servidor).
- Verifique o GOOGLE_SEARCH_ENGINE_ID no Google Custom Search Console.

## Conclusão

Este fluxograma hierárquico organiza o processo de pesquisa em níveis claros, mostrando como o frontend, backend e APIs externas interagem para processar uma query, proteger as chaves e retornar resultados. 