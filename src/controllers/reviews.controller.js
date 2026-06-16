// src/controllers/reviews.controller.js
const db = require('../models/database');

// 1. Ir buscar todas as reviews de um jogo específico
exports.getGameReviews = (req, res) => {
    const gameId = req.params.gameId;

    // Fazemos um JOIN com a tabela users para devolver o nome e a foto de quem comentou
    const query = `
        SELECT reviews.*, users.username, users.avatar_url 
        FROM reviews 
        JOIN users ON reviews.user_id = users.id 
        WHERE reviews.game_id = ? 
        ORDER BY reviews.created_at DESC
    `;

    db.all(query, [gameId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(rows);
    });
};

// 2. Adicionar uma nova review a um jogo
exports.addReview = (req, res) => {
    const userId = req.user.id; // Vem do token JWT
    const { gameId, rating, comment } = req.body;

    if (!gameId || !rating) {
        return res.status(400).json({ message: 'O ID do jogo e a nota (rating) são obrigatórios.' });
    }

    // Guardar a review na base de dados
    const query = 'INSERT INTO reviews (user_id, game_id, rating, comment) VALUES (?, ?, ?, ?)';
    
    db.run(query, [userId, gameId, rating, comment], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Review adicionada com sucesso!', id: this.lastID });
    });
};