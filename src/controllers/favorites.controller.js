// src/controllers/favorites.controller.js
const db = require('../models/database');

// 1. Listar os favoritos do utilizador logado
exports.getFavorites = (req, res) => {
    const userId = req.user.id;

    db.all('SELECT id, user_id, game_id, game_name, game_image FROM favorites WHERE user_id = ?', [userId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(rows);
    });
};

// 2. Adicionar um jogo aos favoritos
exports.addFavorite = (req, res) => {
    const userId = req.user.id;
    const { gameId, gameName, gameImage } = req.body;

    if (!gameId || !gameName) {
        return res.status(400).json({ message: 'O ID e o Nome do jogo são obrigatórios.' });
    }

    // Verificar se o jogo já está nos favoritos deste utilizador
    db.get('SELECT * FROM favorites WHERE user_id = ? AND game_id = ?', [userId, gameId], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (row) return res.status(400).json({ message: 'Este jogo já está nos teus favoritos.' });

        // Guardar na base de dados
        db.run(
            'INSERT INTO favorites (user_id, game_id, game_name, game_image) VALUES (?, ?, ?, ?)',
            [userId, gameId, gameName, gameImage],
            function(err) {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json({ message: 'Adicionado aos favoritos!', id: this.lastID });
            }
        );
    });
};

// 3. Remover dos favoritos
exports.removeFavorite = (req, res) => {
    const userId = req.user.id;
    const gameId = req.params.gameId; // Vem do URL (ex: /api/favorites/3498)

    db.run('DELETE FROM favorites WHERE user_id = ? AND game_id = ?', [userId, gameId], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        // this.changes indica quantas linhas foram apagadas
        if (this.changes === 0) return res.status(404).json({ message: 'Jogo não encontrado nos favoritos.' });
        
        res.status(200).json({ message: 'Removido dos favoritos com sucesso.' });
    });
};