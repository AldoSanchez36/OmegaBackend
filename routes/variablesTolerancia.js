const { Router } = require('express');
const {
    crearTolerancia,
    obtenerTolerancias,
    obtenerToleranciaPorId,
    actualizarTolerancia,
    eliminarTolerancia
} = require('../controllers/variablesTolerancia');
const { authMiddleware } = require('../middlewares/auth');
const router = Router();
// host + /api/variables-tolerancia

router.post('/', authMiddleware, crearTolerancia);
router.get('/', authMiddleware, obtenerTolerancias);
router.get('/:id', authMiddleware, obtenerToleranciaPorId);
router.patch('/:id', authMiddleware, actualizarTolerancia);
router.delete('/:id', authMiddleware, eliminarTolerancia);

module.exports = router; 