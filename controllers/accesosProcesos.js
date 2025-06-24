const UsuariosProcesosSQL = require('../models/Usuarios_Procesos_SQL');

// Asignar acceso a un usuario para un proceso
const asignarAccesoProceso = async (req, res) => {
  const { usuario_id, proceso_id, puede_ver = true, puede_editar = false } = req.body;

  const acceso = await UsuariosProcesosSQL.asignarAcceso(usuario_id, proceso_id, puede_ver, puede_editar);

  if (!acceso) {
    return res.status(500).json({ ok: false, msg: 'Error al asignar acceso al proceso' });
  }

  res.status(201).json({ ok: true, acceso });
};

// Obtener todos los procesos asignados a un usuario
const obtenerProcesosDeUsuario = async (req, res) => {
  const { usuario_id } = req.params;

  const procesos = await UsuariosProcesosSQL.obtenerProcesosDeUsuario(usuario_id);

  if (!procesos) {
    return res.status(404).json({ ok: false, msg: 'No se encontraron accesos para este usuario' });
  }

  res.status(200).json({ ok: true, procesos });
};
// Actualizar
const patchAccesoProceso = async (req, res) => {
  const { usuario_id, proceso_id, puede_ver = true, puede_editar = false } = req.body;

  const acceso = await UsuariosProcesosSQL.updateAcceso(usuario_id, proceso_id, puede_ver, puede_editar);

  if (!acceso) {
    return res.status(403).json({ ok: false, msg: 'El usuario no tiene acceso a la planta del proceso.' });
  }

  res.status(200).json({ ok: true, acceso });
};

// Revocar acceso de un usuario a un proceso
const revocarAccesoProceso = async (req, res) => {
  const { usuario_id, proceso_id } = req.body;

  const result = await UsuariosProcesosSQL.revocarAcceso(usuario_id, proceso_id);

  if (!result) {
    return res.status(500).json({ ok: false, msg: 'Error al revocar acceso al proceso' });
  }

  res.status(200).json({ ok: true, msg: 'Acceso revocado correctamente' });
};

module.exports = {
  asignarAccesoProceso,
  obtenerProcesosDeUsuario,
  patchAccesoProceso,
  revocarAccesoProceso
};
