// Rutas de usuario y autenticacion
// host + /api/auth
const { Router } = require('express');
const { check } = require('express-validator');
const { 
    CrearUsuario, 
    LoginUsuario, 
    
    UpdateUsuario, 
    getAllUsers 
} = require('../controllers/authSQL');
//RevalidarUsuario, 
//require('../controllers/auth');

const router = Router();

// Rutas de autenticación
router.post(
    '/register',
    [
        check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
        check('email', 'El correo debe ser válido').isEmail(),
        check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    ],
    CrearUsuario
);

router.post(
    '/login',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
    ],
    LoginUsuario
);

//router.get('/renew', RevalidarUsuario);

// Ruta para obtener todos los usuarios
router.get('/users', getAllUsers); // Añade esta línea para habilitar la ruta

// Ruta para actualizar un usuario
router.post('/update', UpdateUsuario);

module.exports = router;