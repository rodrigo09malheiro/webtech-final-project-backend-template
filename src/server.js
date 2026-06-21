/**
 * server.js
 * --------------------------------------------------------------------------
 * Ponto de entrada (entry point) da aplicação backend.
 * Responsável apenas por carregar as variáveis de ambiente, importar a
 * aplicação Express já configurada (app.js) e arrancar o servidor HTTP
 * na porta definida em .env (ou 3000 por defeito).
 * --------------------------------------------------------------------------
 */

// Carrega as variáveis definidas no ficheiro .env (ex: PORT, JWT_SECRET) para process.env
require("dotenv").config();

// Importa a aplicação Express já configurada (rotas, middlewares, swagger, etc.)
const app = require("./app");

// Porta onde o servidor vai escutar — usa a do .env, ou 3000 se não estiver definida
const PORT = process.env.PORT || 3000;

// Arranca o servidor HTTP e mostra no terminal os endereços úteis
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs:  http://localhost:${PORT}/api-docs`);
});