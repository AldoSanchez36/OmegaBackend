const DocumentosPDFPermisosSQL = require('../models/DocumentosPDFPermisosSQL');

const crearPermisoPDF = async (req, res) => {
    const permiso = await DocumentosPDFPermisosSQL.crear(req.body);
    if (!permiso) return res.status(500).json({ ok: false, msg: 'Error al crear permiso PDF' });
    res.status(201).json({ ok: true, permiso });
};

const obtenerPermisosPDF = async (req, res) => {
    const permisos = await DocumentosPDFPermisosSQL.obtenerTodos();
    res.json({ ok: true, permisos });
};

const obtenerPermisoPDFPorId = async (req, res) => {
    const permiso = await DocumentosPDFPermisosSQL.obtenerPorId(req.params.id);
    if (!permiso) return res.status(404).json({ ok: false, msg: 'Permiso PDF no encontrado' });
    res.json({ ok: true, permiso });
};

const eliminarPermisoPDF = async (req, res) => {
    const ok = await DocumentosPDFPermisosSQL.eliminar(req.params.id);
    if (!ok) return res.status(404).json({ ok: false, msg: 'No se pudo eliminar' });
    res.json({ ok: true });
};

module.exports = {
    crearPermisoPDF,
    obtenerPermisosPDF,
    obtenerPermisoPDFPorId,
    eliminarPermisoPDF
}; 