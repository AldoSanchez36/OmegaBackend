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
  const procesos = await ProcesosSQL.obtenerTodosProcesos();

  if (!procesos) {
    return res.status(500).json({ ok: false, msg: 'Error al obtener procesos' });
  }

  res.status(200).json({ ok: true, procesos });
};

module.exports = {
  crearProceso,
  obtenerProcesosPorPlanta,
  obtenerTodosProcesos
};
