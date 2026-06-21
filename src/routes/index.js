// src/routes/index.js
/**
 * routes/index.js
 * --------------------------------------------------------------------------
 * Router "agregador": junta todas as rotas individuais da API (auth,
 * favorites, wishlist, reviews, profile) num único router, cada uma com o
 * seu próprio prefixo. Este router é depois montado em app.js sob "/api".
 * --------------------------------------------------------------------------
 */
const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const favoritesRoutes = require('./favorites.routes');
const wishlistRoutes = require('./wishlist.routes');
const reviewsRoutes = require('./reviews.routes');
const profileRoutes = require('./profile.routes'); // <-- Descomentado

// Cada bloco de rotas fica disponível sob o seu próprio prefixo, ex: /api/auth/...
router.use('/auth', authRoutes);
router.use('/favorites', favoritesRoutes);
router.use('/wishlist', wishlistRoutes);
router.use('/reviews', reviewsRoutes);
router.use('/profile', profileRoutes); // <-- Descomentado

module.exports = router;