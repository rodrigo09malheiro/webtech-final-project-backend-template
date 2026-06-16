// src/controllers/auth.controller.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/database');

exports.register = (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Por favor, preenche todos os campos.' });
    }

    // Verificar se o utilizador já existe
    db.get('SELECT * FROM users WHERE email = ? OR username = ?', [email, username], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (row) return res.status(400).json({ message: 'Email ou username já estão em uso.' });

        // Encriptar a password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Guardar na base de dados
        db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Registo concluído com sucesso!', userId: this.lastID });
        });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Por favor, preenche o email e a password.' });
    }

    // Procurar utilizador pelo email
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(401).json({ message: 'Credenciais inválidas.' });

        // Comparar a password introduzida com a encriptada na BD
        const isValid = bcrypt.compareSync(password, user.password);
        if (!isValid) return res.status(401).json({ message: 'Credenciais inválidas.' });

        // Gerar o Token JWT (Atenção: o secret tem de ser o mesmo do auth.js)
        const token = jwt.sign(
            { id: user.id, username: user.username }, 
            process.env.JWT_SECRET || 'gamedex_super_secret', 
            { expiresIn: '24h' }
        );

        // Devolver token e dados do utilizador
        res.status(200).json({
            token,
            user: { 
                id: user.id, 
                username: user.username, 
                email: user.email, 
                avatarUrl: user.avatar_url 
            }
        });
    });
};