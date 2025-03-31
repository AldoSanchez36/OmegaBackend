const FormulasSQL = require('../models/FormulasSQL');

// Crear una nueva fórmula
const crearFormula = async (req, res) => {
  const { nombre, expresion, proceso_id, variables_usadas } = req.body;
  const creador_id = req.user.id; // requiere autenticación con JWT

  const formula = await FormulasSQL.crearFormula(nombre, expresion, proceso_id, creador_id, variables_usadas);

  if (!formula) {
    return res.status(500).json({ ok: false, msg: 'Error al crear fórmula' });
  }

  res.status(201).json({ ok: true, formula });
};

// Obtener todas las fórmulas de un proceso
const obtenerFormulasPorProceso = async (req, res) => {
  const { proceso_id } = req.params;

  const formulas = await FormulasSQL.obtenerFormulasPorProceso(proceso_id);

  if (!formulas) {
    return res.status(404).json({ ok: false, msg: 'No se encontraron fórmulas para este proceso' });
  }

  res.status(200).json({ ok: true, formulas });
};

// Obtener todas las fórmulas del sistema
const obtenerTodasFormulas = async (req, res) => {
  const formulas = await FormulasSQL.obtenerTodasFormulas();

  if (!formulas) {
    return res.status(500).json({ ok: false, msg: 'Error al obtener fórmulas' });
  }

  res.status(200).json({ ok: true, formulas });
};

module.exports = {
  crearFormula,
  obtenerFormulasPorProceso,
  obtenerTodasFormulas
};
