const VariablesSQL = require('../models/VariablesSQL');

// Crear una nueva variable
const crearVariable = async (req, res) => {
  const { nombre, unidad, proceso_id } = req.body;

  const variable = await VariablesSQL.crearVariable(nombre, unidad, proceso_id);

  if (!variable) {
    return res.status(500).json({ ok: false, msg: 'Error al crear variable' });
  }

  res.status(201).json({ ok: true, variable });
};

// Obtener variables de un proceso
const obtenerVariablesPorProceso = async (req, res) => {
  const { proceso_id } = req.params;

  const variables = await VariablesSQL.obtenerVariablesPorProceso(proceso_id);

  if (!variables) {
    return res.status(404).json({ ok: false, msg: 'No se encontraron variables para este proceso' });
  }

  res.status(200).json({ ok: true, variables });
};

// Obtener todas las variables
const obtenerTodasVariables = async (req, res) => {
  const variables = await VariablesSQL.obtenerTodasVariables();

  if (!variables) {
    return res.status(500).json({ ok: false, msg: 'Error al obtener variables' });
  }

  res.status(200).json({ ok: true, variables });
};

module.exports = {
  crearVariable,
  obtenerVariablesPorProceso,
  obtenerTodasVariables
};
