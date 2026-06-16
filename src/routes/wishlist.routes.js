// src/routes/wishlist.routes.js
const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlist.controller');
const authMiddleware = require('../middleware/auth');

// Obriga a ter Login (Token JWT)
router.use(authMiddleware);

// GET /api/wishlist
router.get('/', wishlistController.getWishlist);

// POST /api/wishlist
router.post('/', wishlistController.addToWishlist);

// DELETE /api/wishlist/:gameId
router.delete('/:gameId', wishlistController.removeFromWishlist);

module.exports = router;