const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const UsuariosSQL = require('../models/UsuariosSQL');

// Función para generar JWT
const generateJWT = (id, userType) => {
    return jwt.sign({ id, userType }, process.env.JWT_SECRET, {
        expiresIn: '4h',
    });
};

const CrearUsuario = async (req, res = express.response) => {
    const { username, email, password, confirmPassword, puesto } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({
            ok: false,
            msg: 'Las contraseñas no coinciden',
        });
    }

    try {
        // Verificar si el usuario ya existe en Supabase
        let usuario = await UsuariosSQL.getUserByEmail(email);
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Este correo ya existe',
            });
        }

        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Crear usuario en Supabase
        const newUser = await UsuariosSQL.createUser(username, email, hashedPassword, puesto || 'client');

        if (!newUser) {
            throw new Error('Error al registrar usuario en la base de datos.');
        }

        res.status(201).json({
            ok: true,
            msg: 'Usuario registrado exitosamente',
        });
    } catch (error) {
        console.error("Error en CrearUsuario:", error);
        res.status(500).json({
            ok: false,
            msg: `Error interno: ${error.message || 'por favor notifica al admin Aldo Sanchez Leon'}`,
        });
    }
};

const LoginUsuario = async (req, res = express.response) => {
    const { email, password } = req.body;

    try {
        // Buscar usuario en Supabase
        const usuario = await UsuariosSQL.getUserByEmail(email);
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales no correctas',
            });
        }

        // Validar la contraseña
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales no correctas',
            });
        }

        const token = generateJWT(usuario.id, usuario.puesto);

        console.log('Token generado:');
        res.status(200).json({
            ok: true,
            msg: 'Inicio de sesión exitoso',
            username: usuario.username,
            email: usuario.email,
            puesto: usuario.puesto,
            token
        });
    } catch (error) {
        console.error('Error en LoginUsuario:', error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor notifica al administrador Aldo Sanchez Leon',
        });
    }
};

const LogoutUsuario = async (req, res = express.response) => {
    // En una implementación básica con JWT, simplemente se elimina el token del lado del cliente
    // Si se implementa lista negra, aquí se agregaría el token a la lista
    console.log('Usuario ha cerrado sesión');
    return res.status(200).json({
        ok: true,
        msg: 'Sesión cerrada exitosamente',
    });
};

const UpdateUsuario = async (req, res = express.response) => {
    const { id } = req.params;
    const updates = req.body;
    
    try {
        const usuarioActualizado = await UsuariosSQL.updateUserById(id, updates);

        res.status(200).json({
            ok: true,
            msg: 'Usuario actualizado con éxito',
            data: usuarioActualizado
        });
    } catch (error) {
        console.error("Error en UpdateUsuario:", error);
        res.status(500).json({
            ok: false,
            msg: `Error interno: ${error.message || 'por favor notifica al admin Aldo Sanchez Leon'}`,
        });
    }
};

const getAllUsers = async (req, res = express.response) => {
    try {
        // Obtener usuarios desde Supabase
        const usuarios = await UsuariosSQL.getAllUsers();

        res.status(200).json({
            ok: true,
            usuarios,
        });
    } catch (error) {
        console.error("Error en GetUsers:", error);
        res.status(500).json({
            ok: false,
            msg: `Error interno: ${error.message || 'por favor notifica al admin Aldo Sanchez Leon'}`,
        });
    }
};

const getUserById = async (req, res = express.response) => {
    const { id } = req.params;

    try {
        const usuario = await UsuariosSQL.getUserById(id);

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado',
            });
        }

        res.status(200).json({
            ok: true,
            usuario,
        });
    } catch (error) {
        console.error("Error en getUserById:", error);
        res.status(500).json({
            ok: false,
            msg: `Error interno: ${error.message || 'por favor notifica al admin Aldo Sanchez Leon'}`,
        });
    }
};

const DeleteUsuario = async (req, res = express.response) => {
    const { id } = req.params;
    
    try {
        const eliminado = await UsuariosSQL.deleteUserById(id);

        if (!eliminado || eliminado.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró el usuario para eliminar',
            });
        }

        res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado correctamente',
        });
    } catch (error) {
        console.error("Error en DeleteUsuario:", error);
        res.status(500).json({
            ok: false,
            msg: `Error interno: ${error.message || 'por favor notifica al admin Aldo Sanchez Leon'}`,
        });
    }
};

module.exports = {
    CrearUsuario,
    LoginUsuario,
    LogoutUsuario,
    UpdateUsuario,
    getUserById,
    getAllUsers,
    DeleteUsuario
};