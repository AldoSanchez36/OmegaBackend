const UsuariosPlantasSQL = require('../models/Usuarios_Plantas_SQL');

// Asignar acceso a un usuario para una planta
const asignarAccesoPlanta = async (req, res) => {
  const { usuario_id, planta_id, puede_ver = true, puede_editar = false } = req.body;

  const acceso = await UsuariosPlantasSQL.asignarAcceso(usuario_id, planta_id, puede_ver, puede_editar);

  if (!acceso) {
    return res.status(500).json({ ok: false, msg: 'Error al asignar acceso a la planta' });
  }

  res.status(201).json({ ok: true, acceso });
};

// Obtener todas las plantas asignadas a un usuario
const obtenerPlantasDeUsuario = async (req, res) => {
  const { usuario_id } = req.params;

  const plantas = await UsuariosPlantasSQL.obtenerPlantasDeUsuario(usuario_id);

  if (!plantas) {
    return res.status(404).json({ ok: false, msg: 'No se encontraron accesos para este usuario' });
  }

  res.status(200).json({ ok: true, plantas });
};

// Revocar acceso de un usuario a una planta
const revocarAccesoPlanta = async (req, res) => {
  const { usuario_id, planta_id } = req.body;

  const result = await UsuariosPlantasSQL.revocarAcceso(usuario_id, planta_id);

  if (!result) {
    return res.status(500).json({ ok: false, msg: 'Error al revocar acceso' });
  }

  res.status(200).json({ ok: true, msg: 'Acceso revocado correctamente' });
};

// Actualizar acceso de un usuario a una planta
const patchAccesoPlanta = async (req, res) => {
  const { usuario_id, planta_id, puede_ver, puede_editar } = req.body;

  const acceso = await UsuariosPlantasSQL.updateAcceso(usuario_id, planta_id, puede_ver, puede_editar);

  if (!acceso) {
    return res.status(500).json({ ok: false, msg: 'Error al actualizar acceso a la planta' });
  }

  res.status(200).json({ ok: true, acceso });
};

module.exports = {
  asignarAccesoPlanta,
  obtenerPlantasDeUsuario,
  revocarAccesoPlanta,
  patchAccesoPlanta
};