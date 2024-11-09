// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/torneo', { useNewUrlParser: true, useUnifiedTopology: true });

// Modelo de Academia
const Academia = mongoose.model('Academia', new mongoose.Schema({
    nombre: String,
    trofeosOro: Number,
    trofeosPlata: Number
}));



// Rutas
app.get('/api/academias', async (req, res) => {
    const academias = await Academia.find();
    res.json(academias);
});

app.post('/api/academias', async (req, res) => {
    const nuevaAcademia = new Academia(req.body);
    await nuevaAcademia.save();
    res.json(nuevaAcademia);
});

app.put('/api/academias/:id', async (req, res) => {
    const { id } = req.params;
    const academiaActualizada = await Academia.findByIdAndUpdate(id, req.body, { new: true });
    res.json(academiaActualizada);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});