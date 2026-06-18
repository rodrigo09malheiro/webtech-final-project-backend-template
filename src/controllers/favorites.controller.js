const db = require('../models/database');

exports.getFavorites = (req, res) => {
    const userId = req.user.id;

    db.all('SELECT id, user_id, game_id, game_name, game_image FROM favorites WHERE user_id = ?', [userId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
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

exports.addFavorite = (req, res) => {
    const userId = req.user.id;
    const { gameId, gameName, gameImage } = req.body;

    if (!gameId || !gameName) {
        return res.status(400).json({ message: 'O ID e o Nome do jogo são obrigatórios.' });
    }

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

exports.removeFavorite = (req, res) => {
    const userId = req.user.id;
    const gameId = req.params.gameId;

    db.run('DELETE FROM favorites WHERE user_id = ? AND game_id = ?', [userId, gameId], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: 'Jogo não encontrado nos favoritos.' });
        res.status(200).json({ message: 'Removido dos favoritos com sucesso.' });
    });
};