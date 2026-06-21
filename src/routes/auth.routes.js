// src/routes/auth.routes.js
/**
 * routes/auth.routes.js
 * --------------------------------------------------------------------------
 * Rotas públicas de autenticação: registo e login de utilizadores.
 * Não exigem token, pois são o ponto de entrada para obter um.
 * --------------------------------------------------------------------------
 */
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Rota para o registo: POST /api/auth/register
router.post('/register', authController.register);

// Rota para o login: POST /api/auth/login
router.post('/login', authController.login);

module.exports = router;