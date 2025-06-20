const { Router } = require('express');
const { authMiddleware, soloAdmin } = require('../middlewares/auth');
const {
  crearProceso,
  obtenerProcesosPorPlanta,
  obtenerTodosProcesos
} = require('../controllers/procesos');
// host + /api/procesos'
const router = Router();

router.post('/crear', [authMiddleware, soloAdmin], crearProceso);
router.get('/planta/:planta_id', authMiddleware, obtenerProcesosPorPlanta);
router.get('/', authMiddleware, obtenerTodosProcesos);

module.exports = router;