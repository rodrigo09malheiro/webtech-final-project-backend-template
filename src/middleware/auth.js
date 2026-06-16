// src/middleware/auth.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Ir buscar o token ao cabeçalho do pedido (Authorization: Bearer <token>)
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Acesso negado. Token em falta.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verifica se o token é válido (O secret tem de ser o mesmo usado no Login)
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'gamedex_super_secret');
        req.user = decoded; // Guarda os dados do utilizador no request
        next(); // Deixa o pedido avançar para o Controller
    } catch (error) {
        console.error("Erro de Autenticação:", error.message); // Usamos a variável aqui!
        return res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
};

module.exports = authMiddleware;