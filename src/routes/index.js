// src/routes/index.js
const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const favoritesRoutes = require('./favorites.routes');
const wishlistRoutes = require('./wishlist.routes');
const reviewsRoutes = require('./reviews.routes');
const profileRoutes = require('./profile.routes'); // <-- Descomentado

router.use('/auth', authRoutes);
router.use('/favorites', favoritesRoutes);
router.use('/wishlist', wishlistRoutes);
router.use('/reviews', reviewsRoutes);
router.use('/profile', profileRoutes); // <-- Descomentado

module.exports = router;