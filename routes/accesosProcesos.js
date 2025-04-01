const { Router } = require('express');
const {
  asignarAccesoProceso,
  obtenerProcesosDeUsuario,
  revocarAccesoProceso
} = require('../controllers/accesosProcesos');

const router = Router();

router.post('/asignar', asignarAccesoProceso);
router.get('/usuario/:usuario_id', obtenerProcesosDeUsuario);
router.delete('/revocar', revocarAccesoProceso);

module.exports = router;