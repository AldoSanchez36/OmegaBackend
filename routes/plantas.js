const { Router } = require('express');
const { crearPlanta, obtenerMisPlantas, obtenerPlantasPorAcceso, getAllPlantas } = require('../controllers/plantas');
const { authMiddleware, soloAdmin } = require('../middlewares/auth');
const router = Router();
// host + /api/plantas

// Crear una planta (admin)
router.post('/crear', [authMiddleware, soloAdmin], crearPlanta);

// Obtener las plantas creadas por el usuario autenticado
router.get('/mis-plantas/:usuario_id', authMiddleware, obtenerMisPlantas);

// Obtener las plantas a las que el usuario tiene acceso
router.get('/accesibles', authMiddleware, obtenerPlantasPorAcceso);

// Obtener todas las plantas (solo admin)
router.get('/all', [authMiddleware, soloAdmin], getAllPlantas);

module.exports = router;