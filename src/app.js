/**
 * app.js
 * --------------------------------------------------------------------------
 * Configuração central da aplicação Express: regista os middlewares globais
 * (CORS, parsing de JSON), expõe a pasta de uploads de avatares como ficheiros
 * estáticos, liga a documentação Swagger, monta o router principal da API
 * sob o prefixo "/api" e, por fim, regista o middleware de tratamento de erros.
 * Este ficheiro só configura a app — quem efetivamente a arranca é o server.js.
 * --------------------------------------------------------------------------
 */
const express = require("express");
const cors = require("cors");
const path = require("path"); // <-- Adicionado para resolver caminhos
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// ── Middleware ─────────────────────────────────────────────────────────────────
app.use(cors()); // permite que o frontend (noutra origem/porta) chame esta API
app.use(express.json()); // faz parsing automático do corpo das requests em JSON

// 👉 Servir a pasta "uploads" para que o Angular consiga aceder às imagens de perfil
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ── Swagger ────────────────────────────────────────────────────────────────────
// Disponibiliza a documentação interativa da API em /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ── Routes ─────────────────────────────────────────────────────────────────────
// Todas as rotas da API ficam acessíveis a partir do prefixo /api
app.use("/api", routes);

// ── Error handler (must be last) ───────────────────────────────────────────────
// Tem de ser o último middleware registado, para capturar erros de qualquer rota
app.use(errorHandler);

module.exports = app;