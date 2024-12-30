// Rutas de usuario y autenticacion
// host + /api/auth
const {check} = require('express-validator') 
const  { Router } = require('express');
const router = Router();
const {CrearUsuario,RevalidarUsuario,LoginUsuario, UpdateUsuario} = require('../controllers/auth');
const { validarCampos } = require('../middelwares/validar-campos');

router.post(
    '/register',
    [
        check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
        check('email', 'El correo debe ser válido').isEmail(),
        check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
        validarCampos, // Middleware de validación
    ],
    CrearUsuario
);//post

        //login
router.post("/",
        [
            check('email','el email es obligatorio').isEmail(),
            check('password','el password debe ser de 6 caracteres').isLength({min:6}),
            validarCampos
        ]
        ,LoginUsuario);//post
        
router.post("/update",UpdateUsuario);//post


router.get("/renew",RevalidarUsuario);

module.exports = router;