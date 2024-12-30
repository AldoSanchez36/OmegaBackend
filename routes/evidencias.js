// Rutas de usuario y autenticacion
// host + /api/auth
const {check} = require('express-validator') 
const  { Router } = require('express');
const router = Router();
const {CrearUsuario,RevalidarUsuario,LoginUsuario, UpdateUsuario} = require('../controllers/auth');
const { validarCampos } = require('../middelwares/validar-campos');
// const { uploadFile } = require('../controllers/evidencias');

router.post("/",
controller.uploadFile,
controller.upload
);//post

router.get("/renew",RevalidarUsuario);

module.exports = router;