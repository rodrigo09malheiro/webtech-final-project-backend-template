// src/routes/reviews.routes.js
const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviews.controller');
const authMiddleware = require('../middleware/auth'); // O nosso segurança

// GET /api/reviews/:gameId -> Rota PÚBLICA (qualquer um pode ler as reviews)
router.get('/:gameId', reviewsController.getGameReviews);

// POST /api/reviews -> Rota PROTEGIDA (só com login é que podes comentar)
router.post('/', authMiddleware, reviewsController.addReview);

module.exports = router;