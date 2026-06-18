# Web Technologies Final Project (Backend)

This repository is the official Node.js + Express backend template for the final project.
Focus on building your API features. The project already includes automated checks for structure, linting, and syntax.

## Install dependencies

```bash
npm install
```

## Run the project locally

```bash
# Development (auto-restart on changes)
npm run dev

# Production
npm start
```

API available at `http://localhost:3000/api`
Swagger docs at `http://localhost:3000/api-docs`

## Quality checks (local)

Run all checks:

```bash
npm run quality
```

Teacher grading (score + report):

```bash
npm run grade
```

Run individual checks:

```bash
npm run validate
npm run lint
npm run syntax
```

What each check does:

- `validate`: ensures the minimum required project structure exists.
- `lint`: runs ESLint to enforce basic code quality.
- `syntax`: verifies Node.js can parse the main files without syntax errors.

## Environment variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

## Files and folders students should not edit

Do not edit:

- .github/workflows/\*\*
- scripts/\*\*
- package.json
- package-lock.json
- eslint.config.\*
- src/app.js _(only add routes — do not remove existing config)_
- src/config/swagger.js _(only update info fields)_

You can edit / create:

- src/routes/\*\*
- src/controllers/\*\*
- src/models/\*\*
- src/middleware/\*\* _(except errorHandler.js)_
- .env
- PROJECT_INFO.md
- README.md _(only the project-specific sections)_

## Project structure

```
src/
├── server.js           ← entry point
├── app.js              ← Express app (routes, middleware)
├── config/
│   └── swagger.js      ← Swagger/OpenAPI configuration
├── routes/
│   └── index.js        ← route aggregator (add your routes here)
├── controllers/        ← controller functions (create your own)
├── models/             ← data models / schema (create your own)
└── middleware/
    └── errorHandler.js ← global error handler
```

## Project-specific sections to complete

- Fill in [PROJECT_INFO.md](PROJECT_INFO.md) with your group and project details.
- Add any project notes in this README below.

### Project Notes

**GameDex** — backend da aplicação de catálogo e gestão pessoal de jogos.

**Funcionalidades implementadas**

- Autenticação (registo/login) com JWT e passwords encriptadas com bcrypt
- Gestão de perfil: atualização de username e upload de avatar
- Favoritos: adicionar, remover e listar jogos favoritos do utilizador
- Wishlist: adicionar, remover e listar jogos na wishlist
- Reviews: criar review (rating + comentário) por jogo, e listar reviews do utilizador ou de um jogo específico
- Todas as rotas protegidas usam o token JWT para identificar o utilizador (`req.user.id`)
- Respostas relacionadas com jogos (favoritos, wishlist, reviews) devolvem os campos em camelCase (`gameId`, `gameName`, `gameImage`) para consistência com o frontend Angular

**Base de dados**

SQLite, com as tabelas `users`, `favorites`, `wishlist` e `reviews`.

**Integração externa**

A RAWG API é consumida no frontend (Angular) para listagem, pesquisa e detalhe de jogos. O backend apenas guarda as associações (IDs, nomes e imagens dos jogos) ligadas ao utilizador autenticado — não há dados mockados.

**Variáveis de ambiente necessárias**

Ver `.env.example`:
- `PORT`
- `JWT_SECRET`
