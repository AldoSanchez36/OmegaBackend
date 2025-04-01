// Rutas de usuario y autenticacion
// host + /api/auth
const { Router } = require('express');
const { check } = require('express-validator');
const { 
    CrearUsuario, 
    LoginUsuario, 
    LogoutUsuario,
    UpdateUsuario, 
    getAllUsers,
    DeleteUsuario,
    getUserById,
} = require('../controllers/authSQL');
const { authMiddleware, soloAdmin } = require('../middlewares/auth');

const router = Router();

// Rutas de autenticación para crear un nuevo usuario
router.post(
    '/register',
    [
        check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
        check('email', 'El correo debe ser válido').isEmail(),
        check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    ],
    CrearUsuario
);

// Ruta para iniciar sesión
router.post(
    '/login',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
    ],
    LoginUsuario
);

// Ruta para cerrar sesión
router.post('/logout', LogoutUsuario);

// Ruta para obtener un usuario por ID
router.get('/user/:id', [authMiddleware, soloAdmin], getUserById);

// Ruta para obtener todos los usuarios
router.get('/users',  [authMiddleware, soloAdmin], getAllUsers); 

// Ruta para actualizar un usuario
router.patch('/update/:id', [authMiddleware, soloAdmin], UpdateUsuario);

// Ruta para eliminar un usuario
router.delete('/delete/:id', [authMiddleware, soloAdmin], DeleteUsuario);

module.exports = router;