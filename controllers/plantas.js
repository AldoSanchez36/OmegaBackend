const PlantasSQL = require('../models/PlantasSQL');
const UsuariosPlantasSQL = require('../models/Usuarios_Plantas_SQL');

const crearPlanta = async (req, res) => {
  const { nombre, usuario_id } = req.body;
  const creado_por = req.user.id; // El admin

  const planta = await PlantasSQL.crearPlanta(nombre, creado_por);

  if (!planta) {
    return res.status(500).json({ ok: false, msg: 'Error al crear planta' });
  }

  // Asignar acceso al usuario seleccionado (cliente Doe)
  await UsuariosPlantasSQL.asignarAcceso(usuario_id, planta.id, true, true);

  res.status(201).json({ ok: true, planta });
};

const obtenerMisPlantas = async (req, res) => {
  const plantas = await PlantasSQL.obtenerPlantasPorUsuario(req.user.id);
  res.json({ ok: true, plantas });
};

const obtenerPlantasPorAcceso = async (req, res) => {
  let usuario_id = req.user.id;
  if ((req.user.userType === 'admin' || req.user.puesto === 'admin') && req.headers['x-usuario-id']) {
    usuario_id = req.headers['x-usuario-id'];
  }
  const plantas = await PlantasSQL.obtenerPlantasPorAcceso(usuario_id);
  res.json({ ok: true, plantas });
};

const getAllPlantas = async (req, res) => {
  const plantas = await PlantasSQL.getAll();
  res.json({ ok: true, plantas });
};

module.exports = {
  crearPlanta,
  obtenerMisPlantas,
  obtenerPlantasPorAcceso,
  getAllPlantas
};