const express = require('express');
const ReportesSQL = require('../models/ReportesSQL');

const crearReporte = async (req, res = express.response) => {
    const { planta_id, sistema, usuario_id, observaciones = '', valores = [] } = req.body;

    if (!planta_id || !sistema || !usuario_id || !Array.isArray(valores)) {
        return res.status(400).json({
            ok: false,
            msg: 'Faltan datos requeridos o el formato es inválido.',
        });
    }

    try {
        // Crear el reporte
        const reporte = await ReportesSQL.crearReporte(planta_id, sistema, usuario_id, observaciones);
        if (!reporte) {
            return res.status(500).json({
                ok: false,
                msg: 'No se pudo crear el reporte.',
            });
        }

        // Insertar valores asociados al reporte
        const valoresConReporteId = valores.map(val => ({
            ...val,
            reporte_id: reporte.id
        }));

        const valoresInsertados = await ReportesSQL.agregarValoresAlReporte(valoresConReporteId);
        if (!valoresInsertados) {
            return res.status(500).json({
                ok: false,
                msg: 'Reporte creado, pero no se pudieron guardar los valores.',
            });
        }

        return res.status(201).json({
            ok: true,
            msg: 'Reporte creado con éxito',
            reporte,
            valores: valoresInsertados
        });
    } catch (error) {
        console.error('Error al crear reporte:', error);
        return res.status(500).json({
            ok: false,
            msg: `Error interno al crear el reporte: ${error.message}`
        });
    }
};

const obtenerReportePorId = async (req, res = express.response) => {
    const { id } = req.params;

    try {
        const reporte = await ReportesSQL.obtenerReportePorId(id);

        if (!reporte) {
            return res.status(404).json({
                ok: false,
                msg: 'Reporte no encontrado',
            });
        }

        res.status(200).json({
            ok: true,
            reporte,
        });
    } catch (error) {
        console.error('Error al obtener reporte por ID:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno al obtener el reporte'
        });
    }
};

const obtenerReportesPorUsuario = async (req, res = express.response) => {
    const { usuario_id } = req.params;

    try {
        const reportes = await ReportesSQL.obtenerReportesPorUsuario(usuario_id);

        res.status(200).json({
            ok: true,
            reportes,
        });
    } catch (error) {
        console.error('Error al obtener reportes del usuario:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno al obtener los reportes del usuario'
        });
    }
};

module.exports = {
    crearReporte,
    obtenerReportePorId,
    obtenerReportesPorUsuario
};
