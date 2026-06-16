// src/routes/profile.routes.js
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Configurar onde e como o multer vai guardar as imagens
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Tem de ser guardado na pasta uploads na raiz
    },
    filename: function (req, file, cb) {
        // Gera um nome único: avatar_161351531.jpg
        cb(null, 'avatar_' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// O nosso segurança! O utilizador tem de estar logado.
router.use(authMiddleware);

// GET /api/profile -> Ver os dados
router.get('/', profileController.getProfile);

// PUT /api/profile -> Atualizar dados (O multer vai à procura de um ficheiro chamado 'avatar')
router.put('/', upload.single('avatar'), profileController.updateProfile);

module.exports = router;