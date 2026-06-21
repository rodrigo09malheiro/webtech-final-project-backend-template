// src/routes/favorites.routes.js
/**
 * routes/favorites.routes.js
 * --------------------------------------------------------------------------
 * Rotas de gestão dos jogos favoritos do utilizador autenticado.
 * Todas exigem token JWT válido (authMiddleware aplicado a todo o router).
 * --------------------------------------------------------------------------
 */
const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favorites.controller');
const authMiddleware = require('../middleware/auth'); // O nosso segurança!

// Todas as rotas de favoritos exigem que o utilizador esteja logado
router.use(authMiddleware);

// GET /api/favorites -> lista os favoritos do utilizador logado
router.get('/', favoritesController.getFavorites);

// POST /api/favorites -> adiciona um jogo aos favoritos
router.post('/', favoritesController.addFavorite);

// DELETE /api/favorites/:gameId -> remove um jogo dos favoritos
router.delete('/:gameId', favoritesController.removeFavorite);

module.exports = router;