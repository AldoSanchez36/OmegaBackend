const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Definir el esquema y modelo para la colección 'movies'
const movieSchema = new mongoose.Schema({}, { collection: 'movies' });
const Movie = mongoose.model('Movie', movieSchema);

// Ruta GET para obtener el primer documento de 'movies'
router.get('/api/test', async (req, res) => {
    try {
        // Obtener el primer documento de la colección 'movies'
        const firstMovie = await Movie.findOne(); 
        res.json(firstMovie); // Enviar el documento como respuesta JSON
    } catch (error) {
        console.error('Error fetching movie:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;