const express = require('express');
const router = express.Router();
const Academia = require('../models/Academia');

// Ruta para obtener todas las academias
router.get('/', async (req, res) => {
    try {
        const academias = await Academia.find();
        res.json(academias);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para agregar una nueva academia
router.post('/', async (req, res) => {
    const { nombre, trofeosOro, trofeosPlata } = req.body;
    const nuevaAcademia = new Academia({
        nombre,
        trofeosOro,
        trofeosPlata
    });

    try {
        const academiaGuardada = await nuevaAcademia.save();
        res.status(201).json(academiaGuardada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;