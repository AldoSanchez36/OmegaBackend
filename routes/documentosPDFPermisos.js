const { Router } = require('express');
const {
    crearPermisoPDF,
    obtenerPermisosPDF,
    obtenerPermisoPDFPorId,
    eliminarPermisoPDF
} = require('../controllers/documentosPDFPermisos');
const { authMiddleware } = require('../middlewares/auth');
const router = Router();
// host + /api/documentos-pdf-permisos

router.post('/', authMiddleware, crearPermisoPDF);
router.get('/', authMiddleware, obtenerPermisosPDF);
router.get('/:id', authMiddleware, obtenerPermisoPDFPorId);
router.delete('/:id', authMiddleware, eliminarPermisoPDF);

module.exports = router; 