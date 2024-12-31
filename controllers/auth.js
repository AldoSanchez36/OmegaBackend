const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const Usuarios = require('../models/Usuarios');

// Función para generar JWT
const generateJWT = (id, userType) => {
    return jwt.sign({ id, userType }, process.env.JWT_SECRET, {
        expiresIn: '4h', // Expiración del token
    });
};


const CrearUsuario = async (req, res = express.response) => {
    const { username, email, password, confirmPassword } = req.body;

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
        return res.status(400).json({
            ok: false,
            msg: 'Las contraseñas no coinciden',
        });
    }

    try {
        // Verificar si el usuario ya existe
        let usuario = await Usuarios.findOne({ email });
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Este correo ya existe',
            });
        }

        // Crear un nuevo usuario con la contraseña encriptada
        const salt = bcrypt.genSaltSync(10); // Nivel de seguridad del hash
        const hashedPassword = bcrypt.hashSync(password, salt);

        usuario = new Usuarios({ 
            username,          // Asignar directamente el campo `username`
            email,             // Directamente asignar `email`
            password: hashedPassword, // Cambiar `pwd` a `password`
            puesto: 'user'
        });

        // Guardar usuario en la base de datos
        await usuario.save();

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
        // Verificar si el usuario existe
        const usuario = await Usuarios.findOne({ email }); // Corregido: Usar `Usuarios`
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

        // Respuesta exitosa
        res.status(200).json({
            ok: true,
            msg: 'Inicio de sesión exitoso',
            username: usuario.username,
            email: usuario.email,
            puesto:usuario.puesto,
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

const RevalidarUsuario  = async(req,res= express.response)=>{
    const {email,pwd} = req.body;
    res.json({
        ok:true,
        msg:'renew',
        email,
        pwd
    })
}

const UpdateUsuario  = async(req,res= express.response)=>{
    const {id,puesto} = req.body;
    try{
    
    let usuarioUpdate = await Usuarios.updateOne({_id:"621d1866682be653270fe7e4"},{puesto:"TA"})
    console.log(usuarioUpdate);
    // await usuarioUpdate.save();
    res.status(201).json({
        ok:true,
        msg:'update',
    })
    }catch (error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'por favor notifica al admin Aldo Sanchez Leon',
        })
    }
}



const GetUsers = async (req, res = express.response) => {
    try {
        // Obtener todos los usuarios de la base de datos
        const usuarios = await Usuarios.find({}, 'username email puesto'); // Selecciona los campos deseados
        res.status(200).json({
            ok: true,
            usuarios, // Enviar la lista de usuarios
        });
    } catch (error) {
        console.error("Error en ObtenerUsuarios:", error);
        res.status(500).json({
            ok: false,
            msg: `Error interno: ${error.message || 'por favor notifica al admin Aldo Sanchez Leon'}`,
        });
    }
};

module.exports ={
    CrearUsuario,RevalidarUsuario,LoginUsuario,UpdateUsuario,GetUsers
}