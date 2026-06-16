const express = require("express");
const cors = require("cors");
const path = require("path"); // <-- Adicionado para resolver caminhos
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// ── Middleware ─────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// 👉 Servir a pasta "uploads" para que o Angular consiga aceder às imagens de perfil
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ── Swagger ────────────────────────────────────────────────────────────────────
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ── Routes ─────────────────────────────────────────────────────────────────────
app.use("/api", routes);

// ── Error handler (must be last) ───────────────────────────────────────────────
app.use(errorHandler);

module.exports = app;