const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviews.controller');
const authMiddleware = require('../middleware/auth'); 

// ⚠️ IMPORTANTE: A rota '/' tem de vir ANTES de '/:gameId'
// caso contrário o Express trata GET /reviews como GET /reviews/:gameId

// GET /api/reviews -> Rota PROTEGIDA (reviews do utilizador logado, para o Perfil)
router.get('/', authMiddleware, reviewsController.getUserReviews);

// GET /api/reviews/:gameId -> Rota PÚBLICA
router.get('/:gameId', reviewsController.getGameReviews);

// POST /api/reviews -> Rota PROTEGIDA
router.post('/', authMiddleware, reviewsController.addReview);

module.exports = router;