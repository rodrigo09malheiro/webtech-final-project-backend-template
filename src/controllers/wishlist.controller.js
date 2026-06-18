const db = require('../models/database');

exports.getWishlist = (req, res) => {
    const userId = req.user.id;

    db.all('SELECT id, user_id, game_id, game_name, game_image FROM wishlist WHERE user_id = ?', [userId], (err, rows) => {
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

exports.addToWishlist = (req, res) => {
    const userId = req.user.id;
    const { gameId, gameName, gameImage } = req.body;

    if (!gameId || !gameName) {
        return res.status(400).json({ message: 'O ID e o Nome do jogo são obrigatórios.' });
    }

    db.get('SELECT * FROM wishlist WHERE user_id = ? AND game_id = ?', [userId, gameId], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (row) return res.status(400).json({ message: 'Este jogo já está na tua wishlist.' });

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

exports.removeFromWishlist = (req, res) => {
    const userId = req.user.id;
    const gameId = req.params.gameId;

    db.run('DELETE FROM wishlist WHERE user_id = ? AND game_id = ?', [userId, gameId], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: 'Jogo não encontrado na wishlist.' });
        res.status(200).json({ message: 'Removido da wishlist com sucesso.' });
    });
};