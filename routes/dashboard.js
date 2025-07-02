const { Router } = require('express');
const { obtenerResumenDashboard, obtenerResumenAdmin } = require('../controllers/dashboard');
const { authMiddleware } = require('../middlewares/auth');
const router = Router();

router.get('/resumen', authMiddleware, obtenerResumenDashboard);
router.get('/resumen-admin', authMiddleware, obtenerResumenAdmin);

module.exports = router; 