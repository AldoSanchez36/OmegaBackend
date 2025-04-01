const { Router } = require('express');
const {
  asignarAccesoPlanta,
  obtenerPlantasDeUsuario,
  revocarAccesoPlanta
} = require('../controllers/accesosPlantas');

const router = Router();

router.post('/asignar', asignarAccesoPlanta);
router.get('/usuario/:usuario_id', obtenerPlantasDeUsuario);
router.delete('/revocar', revocarAccesoPlanta);

module.exports = router;