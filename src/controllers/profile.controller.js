// src/controllers/profile.controller.js
/**
 * controllers/profile.controller.js
 * --------------------------------------------------------------------------
 * Lógica do perfil do utilizador: obter os dados atuais e atualizar
 * username e/ou avatar (a imagem chega via multer, já gravada em disco,
 * e aqui só guardamos o caminho relativo na base de dados).
 * --------------------------------------------------------------------------
 */
const db = require('../models/database');

// 1. Obter os dados atuais do utilizador
exports.getProfile = (req, res) => {
    const userId = req.user.id;

    db.get('SELECT id, username, email, avatar_url FROM users WHERE id = ?', [userId], (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(404).json({ message: 'Utilizador não encontrado.' });

        res.status(200).json(user);
    });
};

// 2. Atualizar o Perfil (Username e/ou Avatar)
exports.updateProfile = (req, res) => {
    const userId = req.user.id;
    const { username } = req.body;
    let avatarUrl = req.body.avatarUrl;

    // Se vier um ficheiro novo (upload via multer), usa o caminho onde foi gravado
    if (req.file) {
        avatarUrl = '/' + req.file.path.replace(/\\/g, '/');
    }

    // COALESCE mantém o valor antigo sempre que o novo vier null/undefined
    db.run(
        'UPDATE users SET username = COALESCE(?, username), avatar_url = COALESCE(?, avatar_url) WHERE id = ?',
        [username, avatarUrl, userId],
        function(err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed: users.username')) {
                    return res.status(400).json({ message: 'Este username já está em uso por outra pessoa.' });
                }
                return res.status(500).json({ error: err.message });
            }

            // Lê os valores finais da BD para garantir que a resposta está sempre certa
            db.get('SELECT username, avatar_url FROM users WHERE id = ?', [userId], (err2, row) => {
                if (err2) return res.status(500).json({ error: err2.message });

                res.status(200).json({
                    message: 'Perfil atualizado com sucesso!',
                    username: row.username,
                    avatarUrl: row.avatar_url
                });
            });
        }
    );
};