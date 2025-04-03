const { Router } = require('express');
const {
  crearFormula,
  obtenerFormulasPorProceso,
  obtenerTodasFormulas
} = require('../controllers/formulas');
const { authMiddleware, soloAdmin } = require('../middlewares/auth');

const router = Router();

router.post('/crear', [authMiddleware, soloAdmin], crearFormula);
router.get('/proceso/:proceso_id', [authMiddleware, soloAdmin], obtenerFormulasPorProceso);
router.get('/',[authMiddleware, soloAdmin], obtenerTodasFormulas);

module.exports = router;