const { Router } = require('express');
const { crearPlanta, obtenerMisPlantas } = require('../controllers/plantas');
const router = Router();

// Crear una planta (admin)
router.post('/crear', crearPlanta);

// Obtener las plantas creadas por el usuario autenticado
router.get('/mis-plantas/:usuario_id', obtenerMisPlantas);

module.exports = router;