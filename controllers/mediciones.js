const MedicionesSQL = require('../models/MedicionesSQL');
const VariablesSQL = require('../models/VariablesSQL');
const ProcesosSQL = require('../models/ProcesosSQL');
const PlantasSQL = require('../models/PlantasSQL');

const crearMedicion = async (req, res) => {
    const medicion = await MedicionesSQL.crearMedicion(req.body);
    if (!medicion) return res.status(500).json({ ok: false, msg: 'Error al crear medición' });
    res.status(201).json({ ok: true, medicion });
};

const obtenerMediciones = async (req, res) => {
    const mediciones = await MedicionesSQL.obtenerTodas();
    res.json({ ok: true, mediciones });
};

const obtenerMedicionPorId = async (req, res) => {
    const medicion = await MedicionesSQL.obtenerPorId(req.params.id);
    if (!medicion) return res.status(404).json({ ok: false, msg: 'Medición no encontrada' });
    res.json({ ok: true, medicion });
};

const actualizarMedicion = async (req, res) => {
    const medicion = await MedicionesSQL.actualizarMedicion(req.params.id, req.body);
    if (!medicion) return res.status(404).json({ ok: false, msg: 'No se pudo actualizar' });
    res.json({ ok: true, medicion });
};

const eliminarMedicion = async (req, res) => {
    const ok = await MedicionesSQL.eliminarMedicion(req.params.id);
    if (!ok) return res.status(404).json({ ok: false, msg: 'No se pudo eliminar' });
    res.json({ ok: true });
};

const obtenerPorNombreVariable = async (req, res) => {
    const { nombre } = req.params;
    const variable = await VariablesSQL.obtenerPorNombre(nombre);
    if (!variable) return res.status(404).json({ ok: false, msg: 'Variable no encontrada' });
    const mediciones = await MedicionesSQL.obtenerPorVariableId(variable.id);
    res.json({ ok: true, mediciones });
};

const obtenerPorSistema = async (req, res) => {
    const { sistema } = req.params;
    const mediciones = await MedicionesSQL.obtenerPorSistema(sistema);
    res.json({ ok: true, mediciones });
};

const obtenerPorProceso = async (req, res) => {
    const { nombre } = req.params;
    const proceso = await ProcesosSQL.obtenerPorNombre(nombre);
    if (!proceso) return res.status(404).json({ ok: false, msg: 'Proceso no encontrado' });
    const mediciones = await MedicionesSQL.obtenerPorProcesoId(proceso.id);
    res.json({ ok: true, mediciones });
};

const obtenerPorCliente = async (req, res) => {
    const { nombre } = req.params;
    const planta = await PlantasSQL.obtenerPorNombre(nombre);
    if (!planta) return res.status(404).json({ ok: false, msg: 'Cliente (planta) no encontrado' });
    const mediciones = await MedicionesSQL.obtenerPorPlantaId(planta.id);
    res.json({ ok: true, mediciones });
};

module.exports = {
    crearMedicion,
    obtenerMediciones,
    obtenerMedicionPorId,
    actualizarMedicion,
    eliminarMedicion,
    obtenerPorNombreVariable,
    obtenerPorSistema,
    obtenerPorProceso,
    obtenerPorCliente
};
