/**
 * controllers/wishlist.controller.js
 * --------------------------------------------------------------------------
 * Lógica do CRUD da wishlist: listar, adicionar e remover jogos da lista
 * de desejos do utilizador autenticado. Estrutura praticamente idêntica ao
 * favorites.controller.js, mas a operar sobre a tabela "wishlist".
 * --------------------------------------------------------------------------
 */
const db = require('../models/database');

// Lista a wishlist do utilizador logado
exports.getWishlist = (req, res) => {
    const userId = req.user.id;

    db.all('SELECT id, user_id, game_id, game_name, game_image FROM wishlist WHERE user_id = ?', [userId], (err, rows) => {
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

// Adiciona um jogo à wishlist (evita duplicados)
exports.addToWishlist = (req, res) => {
    const userId = req.user.id;
    const { gameId, gameName, gameImage } = req.body;

    if (!gameId || !gameName) {
        return res.status(400).json({ message: 'O ID e o Nome do jogo são obrigatórios.' });
    }

    // Verifica se o jogo já está na wishlist antes de inserir
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

// Remove um jogo da wishlist do utilizador
exports.removeFromWishlist = (req, res) => {
    const userId = req.user.id;
    const gameId = req.params.gameId;

    db.run('DELETE FROM wishlist WHERE user_id = ? AND game_id = ?', [userId, gameId], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: 'Jogo não encontrado na wishlist.' });
        res.status(200).json({ message: 'Removido da wishlist com sucesso.' });
    });
};