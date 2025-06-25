const ProcesosSQL = require('../models/ProcesosSQL');

// Crear un nuevo proceso
const crearProceso = async (req, res) => {
  const { nombre, planta_id, descripcion } = req.body;

  const proceso = await ProcesosSQL.crearProceso(nombre, planta_id, descripcion);

  if (!proceso) {
    return res.status(500).json({ ok: false, msg: 'Error al crear proceso' });
  }

  res.status(201).json({ ok: true, proceso });
};

// Obtener procesos asociados a una planta
const obtenerProcesosPorPlanta = async (req, res) => {
  const { planta_id } = req.params;

  const procesos = await ProcesosSQL.obtenerProcesosPorPlanta(planta_id);

  if (!procesos) {
    return res.status(404).json({ ok: false, msg: 'No se encontraron procesos para esta planta' });
  }

  res.status(200).json({ ok: true, procesos });
};

// Obtener todos los procesos del sistema
const obtenerTodosProcesos = async (req, res) => {
  let procesos = await ProcesosSQL.obtenerTodosProcesos();

  if (!procesos) {
    return res.status(500).json({ ok: false, msg: 'Error al obtener procesos' });
  }

  // Si los procesos no traen variables, las agregamos aquí
  // Suponiendo que tienes un modelo VariablesSQL con un método obtenerVariablesPorProceso
  const VariablesSQL = require('../models/VariablesSQL');
  for (let i = 0; i < procesos.length; i++) {
    const variables = await VariablesSQL.obtenerVariablesPorProceso(procesos[i].id);
    procesos[i].variables = Array.isArray(variables) ? variables : [];
  }

  res.status(200).json({ ok: true, procesos });
};

module.exports = {
  crearProceso,
  obtenerProcesosPorPlanta,
  obtenerTodosProcesos
};
