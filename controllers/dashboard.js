const PlantasSQL = require('../models/PlantasSQL');
const ProcesosSQL = require('../models/ProcesosSQL');
const VariablesSQL = require('../models/VariablesSQL');
const DocumentosPDFSQL = require('../models/DocumentosPDFSQL');
const UsuariosPlantasSQL = require('../models/Usuarios_Plantas_SQL');
const UsuariosProcesosSQL = require('../models/Usuarios_Procesos_SQL');

const obtenerResumenDashboard = async (req, res) => {
    const usuario_id = req.user.id;

    // 1. Plantas accesibles
    const plantas = await PlantasSQL.obtenerPlantasPorAcceso(usuario_id) || [];
    const plantaIds = plantas.map(p => p.id);

    // 2. Procesos de esas plantas
    let procesos = [];
    if (plantaIds.length > 0) {
        const { data: procesosData, error: errorProcesos } = await require('../DB/sqlConfig')
            .from('procesos')
            .select('*')
            .in('planta_id', plantaIds);
        procesos = procesosData || [];
    }
    const procesoIds = procesos.map(p => p.id);

    // 3. Variables de esos procesos
    let variables = [];
    if (procesoIds.length > 0) {
        const { data: variablesData, error: errorVariables } = await require('../DB/sqlConfig')
            .from('variables')
            .select('*')
            .in('proceso_id', procesoIds);
        variables = variablesData || [];
    }

    // 4. Reportes/documentos PDF accesibles
    const reportes = await DocumentosPDFSQL.obtenerReportesDashboard(usuario_id) || [];

    res.json({
        ok: true,
        resumen: {
            plantas: plantas.length,
            procesos: procesos.length,
            variables: variables.length,
            reportes: reportes.length
        }
    });
};

const obtenerResumenAdmin = async (req, res) => {
    // Solo admin
    if (req.user.puesto !== 'admin' && req.user.userType !== 'admin') {
        return res.status(403).json({ ok: false, msg: 'Solo admin puede acceder a este resumen global.' });
    }
    const PlantasSQL = require('../models/PlantasSQL');
    const ProcesosSQL = require('../models/ProcesosSQL');
    const VariablesSQL = require('../models/VariablesSQL');
    const DocumentosPDFSQL = require('../models/DocumentosPDFSQL');

    // Plantas
    const plantas = await PlantasSQL.getAll() || [];
    // Procesos
    const procesos = await ProcesosSQL.obtenerTodosProcesos() || [];
    // Variables
    const variables = await VariablesSQL.obtenerTodasVariables() || [];
    // Reportes/documentos PDF
    const { data: reportes, error: errorReportes } = await require('../DB/sqlConfig')
        .from('documentos_pdf')
        .select('id');

    res.json({
        ok: true,
        resumen: {
            plantas: plantas.length,
            procesos: procesos.length,
            variables: variables.length,
            reportes: reportes ? reportes.length : 0
        }
    });
};

module.exports = {
    obtenerResumenDashboard,
    obtenerResumenAdmin
}; 