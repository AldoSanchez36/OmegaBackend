const { Router } = require('express');
const {
    crearDocumentoPDF,
    obtenerDocumentosPDF,
    obtenerDocumentoPDFPorId,
    eliminarDocumentoPDF
} = require('../controllers/documentosPDF');
const { authMiddleware } = require('../middlewares/auth');
const router = Router();
// host + /api/documentos-pdf

router.post('/', authMiddleware, crearDocumentoPDF);
router.get('/', authMiddleware, obtenerDocumentosPDF);
router.get('/:id', authMiddleware, obtenerDocumentoPDFPorId);
router.delete('/:id', authMiddleware, eliminarDocumentoPDF);

module.exports = router; 