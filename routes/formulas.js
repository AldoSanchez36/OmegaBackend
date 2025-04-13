const { Router } = require('express');
const {
  crearFormula,
  obtenerFormulasPorProceso,
  obtenerTodasFormulas
} = require('../controllers/formulas');
const { authMiddleware, soloAdmin } = require('../middlewares/auth');

const router = Router();

router.post('/crear', [authMiddleware, soloAdmin], crearFormula);
// requiere correcion se debe poder crear la formula sin inportar que procesos(systema) se este usando


router.get('/proceso/:proceso_id', [authMiddleware, soloAdmin], obtenerFormulasPorProceso);
router.get('/',[authMiddleware, soloAdmin], obtenerTodasFormulas);

module.exports = router;