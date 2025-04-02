const { Router } = require('express');
const { crearReporte, obtenerReportePorId, obtenerReportesPorUsuario } = require('../controllers/reportes');
const { authMiddleware } = require('../middlewares/auth');

const router = Router();

// Ruta protegida para crear reportes
router.post('/', authMiddleware, crearReporte);

// Ruta protegida para obtener un reporte por ID
router.get('/:id', authMiddleware, obtenerReportePorId);

// Ruta protegida para obtener todos los reportes de un usuario
router.get('/usuario/:usuario_id', authMiddleware, obtenerReportesPorUsuario);

module.exports = router;