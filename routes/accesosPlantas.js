const { Router } = require('express');
const { authMiddleware, soloAdmin } = require('../middlewares/auth');
const {
  asignarAccesoPlanta,
  obtenerPlantasDeUsuario,
  revocarAccesoPlanta
} = require('../controllers/accesosPlantas');

const router = Router();

router.post('/asignar', [authMiddleware, soloAdmin], asignarAccesoPlanta);
router.get('/usuario/:usuario_id', [authMiddleware, soloAdmin], obtenerPlantasDeUsuario);
router.delete('/revocar', [authMiddleware, soloAdmin], revocarAccesoPlanta);

module.exports = router;