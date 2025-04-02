const PlantasSQL = require('../models/PlantasSQL');

const crearPlanta = async (req, res) => {
  const { nombre } = req.body;
  const creado_por = req.user.id; // ID del usuario autenticado

  const planta = await PlantasSQL.crearPlanta(nombre, creado_por);

  if (!planta) {
    return res.status(500).json({ ok: false, msg: 'Error al crear planta' });
  }

  res.status(201).json({ ok: true, planta });
};

const obtenerMisPlantas = async (req, res) => {
  const plantas = await PlantasSQL.obtenerPlantasPorUsuario(req.user.id);
  res.json({ ok: true, plantas });
};

module.exports = {
  crearPlanta,
  obtenerMisPlantas
};