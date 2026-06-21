// src/routes/wishlist.routes.js
/**
 * routes/wishlist.routes.js
 * --------------------------------------------------------------------------
 * Rotas de gestão da wishlist (lista de desejos) do utilizador autenticado.
 * Todas exigem token JWT válido (authMiddleware aplicado a todo o router).
 * --------------------------------------------------------------------------
 */
const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlist.controller');
const authMiddleware = require('../middleware/auth');

// Obriga a ter Login (Token JWT)
router.use(authMiddleware);

// GET /api/wishlist -> lista a wishlist do utilizador logado
router.get('/', wishlistController.getWishlist);

// POST /api/wishlist -> adiciona um jogo à wishlist
router.post('/', wishlistController.addToWishlist);

// DELETE /api/wishlist/:gameId -> remove um jogo da wishlist
router.delete('/:gameId', wishlistController.removeFromWishlist);

module.exports = router;