// src/routes/favorites.routes.js
const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favorites.controller');
const authMiddleware = require('../middleware/auth'); // O nosso segurança!

// Todas as rotas de favoritos exigem que o utilizador esteja logado
router.use(authMiddleware);

// GET /api/favorites
router.get('/', favoritesController.getFavorites);

// POST /api/favorites
router.post('/', favoritesController.addFavorite);

// DELETE /api/favorites/:gameId
router.delete('/:gameId', favoritesController.removeFavorite);

module.exports = router;