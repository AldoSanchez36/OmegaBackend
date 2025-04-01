const { Router } = require('express');
const {
  crearVariable,
  obtenerVariablesPorProceso,
  obtenerTodasVariables
} = require('../controllers/variables');

const router = Router();

router.post('/crear', crearVariable);
router.get('/proceso/:proceso_id', obtenerVariablesPorProceso);
router.get('/', obtenerTodasVariables);

module.exports = router;