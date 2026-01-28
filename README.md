# GitOnli
 
 Front-end para explorar perfis e repositórios do GitHub.
 
 O projeto foi estruturado como um desafio técnico focado em:
 
 - UI consistente e componentizada
 - Camada de dados previsível (cache, paginação, loading states)
 - Tipagem forte com TypeScript `strict`
 - Padrões opinativos de qualidade via ESLint
 
 ## Visão geral
 
 Fluxo principal:
 
 - Página inicial (`/`): busca por usuário do GitHub
 - Página do usuário (`/user`): exibe dados e lista repositórios com paginação
 
 A aplicação chama endpoints internos do Next (`/app/api/*`) que fazem proxy para a GitHub API.
 Isso centraliza tratamento de erros, evita problemas de CORS e simplifica a camada de UI.
 
 ## Tecnologias
 
 - **Next.js (App Router)**
   - Rotas de UI em `app/`
   - Route Handlers em `app/api/*`
 - **React 19**
 - **Material UI (MUI) + Emotion**
   - Tema global com `ThemeProvider`
   - Integração com App Router via `@mui/material-nextjs`
   - Extensão de tema (ex.: `palette.gradientPrimary`) em `app/extensions.d.ts`
 - **TanStack React Query**
   - Cache, revalidação, estado de carregamento e paginação
   - `keepPreviousData` para UX suave ao paginar
 - **Zustand**
   - Estado mínimo global (ex.: último usuário selecionado)
 - **Axios**
   - Client HTTP com `axios.create` para padronizar chamadas e headers
 - **CSS Modules + utilitários**
   - Estilos locais por domínio e componentes
   - Utilitários de layout quando necessário
 
 ## Organização do projeto
 
 Estrutura (resumo):
 
 ```text
 app/
   api/
     git-users/route.ts
     git-repo/route.ts
   domain/
     header.tsx
     search-github.tsx
     types/
   store/
     last-user.ts
   user/
     page.tsx
     domains/
       header.tsx
       repositories.tsx
       types/
 hooks/
   useApi.tsx
 components/
   ...
 ```
 
 Diretrizes usadas:
 
 - **Domain-first**: componentes e estilos agrupados por domínio (ex.: `search-github`, `user/repositories`)
 - **UI desacoplada de infraestrutura**: UI chama `/api/...` e não a GitHub API diretamente
 - **Tipos próximos do domínio**: tipos de `GitUser` e `Repository` ficam junto das features
 
 ## Camada de dados
 
 ### Next Route Handlers como BFF
 
 - `GET /api/git-users?user={login}`
 - `GET /api/git-repo?user={login}&page={n}&per_page={n}`
 
 Responsabilidades:
 
 - Encapsular chamadas à GitHub API
 - Normalizar erros e status HTTP
 - Permitir futura inclusão de autenticação (token) sem alterar a UI
 
 ### React Query
 
 Estratégias usadas:
 
 - Busca controlada via `enabled: false` + `refetch()` (evita request automático enquanto o usuário digita)
 - Paginação com chave `['repositories', login, page]`
 - `keepPreviousData` para manter a lista anterior enquanto a próxima página carrega
 
 ### Zustand
 
 Foi escolhido para um estado global pequeno e direto:
 
 - Armazenar o usuário selecionado para navegação entre rotas
 - Evitar prop drilling
 - Manter a UI simples (estado global mínimo; o restante fica no React Query)
 
 ## Variáveis de ambiente
 
 Crie um arquivo `.env.local` na raiz do projeto (pasta `onli-github-project/`).
 
 ```bash
 # Token opcional para aumentar rate limits da GitHub API
 GITHUB_API_TOKEN=seu_token_aqui
 
 # Opcional (caso você queira parametrizar a base URL publicamente)
 NEXT_PUBLIC_GITHUB_API_URL=https://api.github.com
 ```
 
 Observações:
 
 - `GITHUB_API_TOKEN` é recomendado para evitar rate limit em testes repetidos.
 - Se você não definir o token, a aplicação ainda funciona, mas pode sofrer rate limiting dependendo do volume.
 
 ## Como rodar
 
 Entre na pasta do projeto:
 
 ```bash
 cd onli-github-project
 ```
 
 ### Com Bun
 
 ```bash
 bun install
 bun dev
 ```
 
 ### Com NPM
 
 ```bash
 npm install
 npm run dev
 ```
 
 A aplicação sobe em `http://localhost:3000`.

 ## ESLint (opinativo)
 
 Este projeto usa um conjunto de regras intencionalmente opinativo para aumentar consistência e qualidade.
 Alguns destaques do `eslint.config.mjs`:
 
 - **Estilo**
   - Identação em 4 espaços
   - Aspas simples e `semi` obrigatório
 - **Imports**
   - Ordenação com `eslint-plugin-import-helpers` (grupos e espaçamento)
   - Alerta para ciclos (`import/no-cycle`)
 - **React e Performance**
   - Regras de Hooks (`react-hooks/rules-of-hooks`)
   - `react-perf/jsx-no-new-array-as-prop`
   - `react/jsx-no-bind` para evitar criação de funções inline no JSX (reduz re-renderizações desnecessárias)
 - **Acessibilidade (A11y)**
   - Regras do `eslint-plugin-jsx-a11y` com avisos para padrões comuns
 
 O objetivo aqui não é apenas “passar no lint”, mas estabelecer padrões claros para evolução do projeto.