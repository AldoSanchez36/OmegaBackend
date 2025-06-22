const { Router } = require('express');
const {
  crearVariable,
  obtenerVariablesPorProceso,
  obtenerTodasVariables,
  actualizarVariable,
  eliminarVariable
} = require('../controllers/variables');

const router = Router();

router.post('/crear', crearVariable);
router.get('/proceso/:proceso_id', obtenerVariablesPorProceso);
router.get('/', obtenerTodasVariables);

router.patch('/:id', actualizarVariable); // Actualizar variable
router.delete('/:id', eliminarVariable); // Eliminar variable

module.exports = router;