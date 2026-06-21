/**
 * config/swagger.js
 * --------------------------------------------------------------------------
 * Configuração do Swagger/OpenAPI para esta API.
 * Gera a especificação OpenAPI 3.0 a partir dos comentários JSDoc presentes
 * nos ficheiros de rotas (src/routes/*.js) e exporta o objeto resultante,
 * que é depois servido pelo swagger-ui-express em /api-docs (ver app.js).
 * --------------------------------------------------------------------------
 */
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Web Technologies Final Project API",
      version: "1.0.0",
      description: "API documentation for the final project backend",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: "Development server",
      },
    ],
  },
  // Pasta onde o swagger-jsdoc vai procurar comentários @openapi/@swagger para gerar a doc
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;