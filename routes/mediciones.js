const { Router } = require('express');
const {
    crearMedicion,
    obtenerMediciones,
    obtenerMedicionPorId,
    actualizarMedicion,
    eliminarMedicion,
    obtenerPorNombreVariable,
    obtenerPorSistema,
    obtenerPorProceso,
    obtenerPorCliente
} = require('../controllers/mediciones');
const { authMiddleware } = require('../middlewares/auth');
const router = Router();
// host + /api/mediciones

router.post('/', authMiddleware, crearMedicion);
router.get('/', authMiddleware, obtenerMediciones);
router.get('/:id', authMiddleware, obtenerMedicionPorId);
router.patch('/:id', authMiddleware, actualizarMedicion);
router.delete('/:id', authMiddleware, eliminarMedicion);
router.get('/variable/:nombre', authMiddleware, obtenerPorNombreVariable);
router.get('/sistema/:sistema', authMiddleware, obtenerPorSistema);//S1,S2,S3,S4,S5
router.get('/proceso/:nombre', authMiddleware, obtenerPorProceso);
router.get('/cliente/:nombre', authMiddleware, obtenerPorCliente);

module.exports = router;
