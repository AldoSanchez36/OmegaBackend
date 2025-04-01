const { Router } = require('express');
const { authMiddleware, soloAdmin } = require('../middlewares/auth');
const {
  asignarAccesoProceso,
  obtenerProcesosDeUsuario,
  revocarAccesoProceso
} = require('../controllers/accesosProcesos');

const router = Router();

router.post('/asignar', [authMiddleware, soloAdmin], asignarAccesoProceso);
router.get('/usuario/:usuario_id', [authMiddleware, soloAdmin], obtenerProcesosDeUsuario);
router.delete('/revocar', [authMiddleware, soloAdmin], revocarAccesoProceso);

module.exports = router;