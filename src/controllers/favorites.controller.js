/**
 * controllers/favorites.controller.js
 * --------------------------------------------------------------------------
 * Lógica do CRUD de favoritos: listar, adicionar e remover jogos da lista
 * de favoritos do utilizador autenticado (req.user.id vem do JWT, definido
 * pelo middleware de autenticação).
 * --------------------------------------------------------------------------
 */
const db = require('../models/database');

// Lista os favoritos do utilizador logado
exports.getFavorites = (req, res) => {
    const userId = req.user.id;

    db.all('SELECT id, user_id, game_id, game_name, game_image FROM favorites WHERE user_id = ?', [userId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        // Converte os nomes das colunas (snake_case da BD) para camelCase, como o frontend espera
        const result = rows.map(row => ({
            id: row.id,
            userId: row.user_id,
            gameId: row.game_id,
            gameName: row.game_name,
            gameImage: row.game_image
        }));
        res.status(200).json(result);
    });
};

// Adiciona um jogo aos favoritos (evita duplicados)
exports.addFavorite = (req, res) => {
    const userId = req.user.id;
    const { gameId, gameName, gameImage } = req.body;

    if (!gameId || !gameName) {
        return res.status(400).json({ message: 'O ID e o Nome do jogo são obrigatórios.' });
    }

    // Verifica se o jogo já está nos favoritos antes de inserir
    db.get('SELECT * FROM favorites WHERE user_id = ? AND game_id = ?', [userId, gameId], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (row) return res.status(400).json({ message: 'Este jogo já está nos teus favoritos.' });

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

// Remove um jogo dos favoritos do utilizador
exports.removeFavorite = (req, res) => {
    const userId = req.user.id;
    const gameId = req.params.gameId;

    db.run('DELETE FROM favorites WHERE user_id = ? AND game_id = ?', [userId, gameId], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: 'Jogo não encontrado nos favoritos.' });
        res.status(200).json({ message: 'Removido dos favoritos com sucesso.' });
    });
};