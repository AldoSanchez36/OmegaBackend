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
    VerificarUsuario,
    solicitarRecuperacion,
    resetearPassword,
} = require('../controllers/authSQL');
const { authMiddleware, soloAdmin } = require('../middlewares/auth');
const rateLimit = require('express-rate-limit');

const router = Router();

// Limitar a 5 intentos de login por IP cada 5 minutos
const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutos
  max: 5, // máximo 5 intentos
  message: { ok: false, msg: 'Demasiados intentos de login, intenta más tarde.' },
  standardHeaders: true,
  legacyHeaders: false,
});

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
    loginLimiter,
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

// Ruta para verificar usuario por código
router.post('/verificar', VerificarUsuario);

// Ruta para solicitar recuperación de contraseña
router.post('/forgot-password', solicitarRecuperacion);

// Ruta para resetear contraseña
router.post('/reset-password', resetearPassword);

module.exports = router;