// src/controllers/profile.controller.js
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
    let avatarUrl = req.body.avatarUrl; // Caso não haja upload, mantemos a lógica flexível

    // Se o Multer apanhou um ficheiro no pedido, guardamos o caminho dele
    if (req.file) {
        // Substituir barras invertidas (Windows) por normais para não quebrar a URL no frontend
        avatarUrl = req.file.path.replace(/\\/g, '/');
    }

    // Atualizar na base de dados (COALESCE garante que só atualiza se houver um valor novo)
    db.run(
        'UPDATE users SET username = COALESCE(?, username), avatar_url = COALESCE(?, avatar_url) WHERE id = ?',
        [username, avatarUrl, userId],
        function(err) {
            if (err) {
                // Tratar o erro de tentar mudar para um username que já existe
                if (err.message.includes('UNIQUE constraint failed: users.username')) {
                    return res.status(400).json({ message: 'Este username já está em uso por outra pessoa.' });
                }
                return res.status(500).json({ error: err.message });
            }
            
            res.status(200).json({ 
                message: 'Perfil atualizado com sucesso!',
                avatarUrl: avatarUrl
            });
        }
    );
};