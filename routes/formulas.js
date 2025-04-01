const { Router } = require('express');
const {
  crearFormula,
  obtenerFormulasPorProceso,
  obtenerTodasFormulas
} = require('../controllers/formulas');

const router = Router();

router.post('/crear', crearFormula);
router.get('/proceso/:proceso_id', obtenerFormulasPorProceso);
router.get('/', obtenerTodasFormulas);

module.exports = router;