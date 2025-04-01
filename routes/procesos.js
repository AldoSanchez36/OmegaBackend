const { Router } = require('express');
const {
  crearProceso,
  obtenerProcesosPorPlanta,
  obtenerTodosProcesos
} = require('../controllers/procesos');

const router = Router();

router.post('/crear', crearProceso);
router.get('/planta/:planta_id', obtenerProcesosPorPlanta);
router.get('/', obtenerTodosProcesos);

module.exports = router;