// src/controllers/wishlist.controller.js
const db = require('../models/database');

// 1. Listar a wishlist do utilizador logado
exports.getWishlist = (req, res) => {
    const userId = req.user.id;

    // wishlist.controller.js - getWishlist
db.all('SELECT id, user_id, game_id as gameId, game_name as gameName, game_image as gameImage FROM wishlist WHERE user_id = ?', [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(rows);
});
};

// 2. Adicionar um jogo à wishlist
exports.addToWishlist = (req, res) => {
    const userId = req.user.id;
    const { gameId, gameName, gameImage } = req.body;

    if (!gameId || !gameName) {
        return res.status(400).json({ message: 'O ID e o Nome do jogo são obrigatórios.' });
    }

    // Verificar se o jogo já está na wishlist
    db.get('SELECT * FROM wishlist WHERE user_id = ? AND game_id = ?', [userId, gameId], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (row) return res.status(400).json({ message: 'Este jogo já está na tua wishlist.' });

        // Guardar na base de dados
        db.run(
            'INSERT INTO wishlist (user_id, game_id, game_name, game_image) VALUES (?, ?, ?, ?)',
            [userId, gameId, gameName, gameImage],
            function(err) {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json({ message: 'Adicionado à wishlist!', id: this.lastID });
            }
        );
    });
};

// 3. Remover da wishlist
exports.removeFromWishlist = (req, res) => {
    const userId = req.user.id;
    const gameId = req.params.gameId;

    db.run('DELETE FROM wishlist WHERE user_id = ? AND game_id = ?', [userId, gameId], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: 'Jogo não encontrado na wishlist.' });
        
        res.status(200).json({ message: 'Removido da wishlist com sucesso.' });
    });
};