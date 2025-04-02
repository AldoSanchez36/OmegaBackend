const { Router } = require('express');
const { crearPlanta, obtenerMisPlantas } = require('../controllers/plantas');
const { authMiddleware, soloAdmin } = require('../middlewares/auth');
const router = Router();
// host + /api/plantas

// Crear una planta (admin)
router.post('/crear', [authMiddleware, soloAdmin], crearPlanta);

// Obtener las plantas creadas por el usuario autenticado
router.get('/mis-plantas/:usuario_id', authMiddleware, obtenerMisPlantas);

module.exports = router;