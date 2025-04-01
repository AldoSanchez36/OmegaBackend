const { Router } = require('express');
const { crearReporte } = require('../controllers/reportes');
const { authMiddleware } = require('../middlewares/auth');

const router = Router();

// Ruta protegida para crear reportes
router.post('/', authMiddleware, crearReporte);

module.exports = router;