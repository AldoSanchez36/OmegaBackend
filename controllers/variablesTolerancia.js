const VariablesToleranciaSQL = require('../models/VariablesToleranciaSQL');

const crearTolerancia = async (req, res) => {
    const tolerancia = await VariablesToleranciaSQL.crear(req.body);
    if (!tolerancia) return res.status(500).json({ ok: false, msg: 'Error al crear tolerancia' });
    res.status(201).json({ ok: true, tolerancia });
};

const obtenerTolerancias = async (req, res) => {
    const tolerancias = await VariablesToleranciaSQL.obtenerTodas();
    res.json({ ok: true, tolerancias });
};

const obtenerToleranciaPorId = async (req, res) => {
    const tolerancia = await VariablesToleranciaSQL.obtenerPorId(req.params.id);
    if (!tolerancia) return res.status(404).json({ ok: false, msg: 'Tolerancia no encontrada' });
    res.json({ ok: true, tolerancia });
};

const actualizarTolerancia = async (req, res) => {
    const tolerancia = await VariablesToleranciaSQL.actualizar(req.params.id, req.body);
    if (!tolerancia) return res.status(404).json({ ok: false, msg: 'No se pudo actualizar' });
    res.json({ ok: true, tolerancia });
};

const eliminarTolerancia = async (req, res) => {
    const ok = await VariablesToleranciaSQL.eliminar(req.params.id);
    if (!ok) return res.status(404).json({ ok: false, msg: 'No se pudo eliminar' });
    res.json({ ok: true });
};

module.exports = {
    crearTolerancia,
    obtenerTolerancias,
    obtenerToleranciaPorId,
    actualizarTolerancia,
    eliminarTolerancia
}; 