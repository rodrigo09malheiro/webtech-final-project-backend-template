// src/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Rota para o registo: POST /api/auth/register
router.post('/register', authController.register);

// Rota para o login: POST /api/auth/login
router.post('/login', authController.login);

module.exports = router;