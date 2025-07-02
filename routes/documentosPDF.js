const { Router } = require('express');
const {
    crearDocumentoPDF,
    obtenerReportesDashboard,
    obtenerDocumentosPDF,
    obtenerDocumentoPDFPorId,
    eliminarDocumentoPDF
} = require('../controllers/documentosPDF');
const { authMiddleware } = require('../middlewares/auth');
const router = Router();
// host + /api/documentos-pdf

router.post('/', authMiddleware, crearDocumentoPDF);
router.get('/dashboard', authMiddleware, obtenerReportesDashboard);
router.get('/', authMiddleware, obtenerDocumentosPDF);
router.get('/:id', authMiddleware, obtenerDocumentoPDFPorId);
router.delete('/:id', authMiddleware, eliminarDocumentoPDF);

module.exports = router; 