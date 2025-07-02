const DocumentosPDFSQL = require('../models/DocumentosPDFSQL');

const crearDocumentoPDF = async (req, res) => {
    const documento = await DocumentosPDFSQL.crear(req.body);
    if (!documento) return res.status(500).json({ ok: false, msg: 'Error al crear documento PDF' });
    res.status(201).json({ ok: true, documento });
};

const obtenerDocumentosPDF = async (req, res) => {
    const documentos = await DocumentosPDFSQL.obtenerTodos();
    res.json({ ok: true, documentos });
};

const obtenerDocumentoPDFPorId = async (req, res) => {
    const documento = await DocumentosPDFSQL.obtenerPorId(req.params.id);
    if (!documento) return res.status(404).json({ ok: false, msg: 'Documento PDF no encontrado' });
    res.json({ ok: true, documento });
};

const eliminarDocumentoPDF = async (req, res) => {
    const ok = await DocumentosPDFSQL.eliminar(req.params.id);
    if (!ok) return res.status(404).json({ ok: false, msg: 'No se pudo eliminar' });
    res.json({ ok: true });
};

const obtenerReportesDashboard = async (req, res) => {
    const usuario_id = req.user.id;
    const reportes = await DocumentosPDFSQL.obtenerReportesDashboard(usuario_id);
    res.json({ ok: true, reportes });
};

module.exports = {
    crearDocumentoPDF,
    obtenerDocumentosPDF,
    obtenerDocumentoPDFPorId,
    eliminarDocumentoPDF,
    obtenerReportesDashboard
}; 