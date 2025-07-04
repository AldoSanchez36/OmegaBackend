const VariablesSQL = require('../models/VariablesSQL');

// Crear una nueva variable
const crearVariable = async (req, res) => {
  const { variables } = req.body;

  if (Array.isArray(variables)) {
    const resultados = [];

    for (const variable of variables) {
      const { nombre, unidad, proceso_id } = variable;
      const creada = await VariablesSQL.crearVariable(nombre, unidad, proceso_id);
      if (!creada) {
        return res.status(500).json({ ok: false, msg: `Error al crear variable: ${nombre}` });
      }
      resultados.push(creada);
    }

    return res.status(201).json({ ok: true, variables: resultados });
  } else {
    // Compatibilidad con el envío individual
    const { nombre, unidad, proceso_id } = req.body;
    const variable = await VariablesSQL.crearVariable(nombre, unidad, proceso_id);

    if (!variable) {
      return res.status(500).json({ ok: false, msg: 'Error al crear variable' });
    }

    return res.status(201).json({ ok: true, variable });
  }
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

// Actualizar una variable existente
const actualizarVariable = async (req, res) => {
  const { id } = req.params;
  const { nombre, unidad } = req.body;

  const updated = await VariablesSQL.actualizarVariable(id, nombre, unidad);
  if (!updated) {
    return res.status(500).json({ ok: false, msg: 'Error al actualizar la variable' });
  }

  res.status(200).json({ ok: true, variable: updated });
};

// Eliminar una variable existente
const eliminarVariable = async (req, res) => {
  const { id } = req.params;

  const deleted = await VariablesSQL.eliminarVariable(id);
  if (!deleted) {
    return res.status(500).json({ ok: false, msg: 'Error al eliminar la variable' });
  }

  res.status(200).json({ ok: true, msg: 'Variable eliminada correctamente' });
};

module.exports = {
  crearVariable,
  obtenerVariablesPorProceso,
  obtenerTodasVariables,
  actualizarVariable,
  eliminarVariable
};
