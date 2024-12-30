const express = require('express');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const Usuarios = require('../models/Usuarios');

// const CrearUsuario = async(req,res= express.response)=>{
//     // console.log(req.body)
//     const { username, email, password, confirmPassword } = req.body;

//     if (password !== confirmPassword) {
//         return res.status(400).json({
//             ok: false,
//             msg: 'Las contraseñas no coinciden',
//         });
//     }

//     try{
    
//     let usuario = await Usuarios.findOne({email})
//     console.log(usuario);
//     console.log(pwd)

//         if(usuario){
//             return res.status(400).json({
//                 ok:false,
//                 uid:usuario.id,
//                 msg:'este correo ya existe'
//             })
//         }
    
//     usuario = new Usuarios({ name: username, email, pwd: password });    
//     //usuario = new Usuarios(req.body);

//     ///encriptando password
//     const salt  = bcrypt.genSaltSync(10);//10 por defecto
//     //usuario.pwd = bcrypt.hashSync(pwd , salt);

//     await usuario.save();

//     res.status(201).json({
//         ok:true,
//         msg:'Usuario registrado exitosamente',
//         pass: pwd
//         // name,      
//         // email,
//         // pwd
//     })
//     }catch (error){
//         console.log("Error en CrearUsuario:", error);
//         res.status(500).json({
//             ok: false,
//             msg: `Error interno: ${error.message || 'por favor notifica al admin Aldo Sanchez Leon'}`,
//         });
//     }
// }
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
                msg: 'El correo no está registrado',
            });
        }

        // Validar la contraseña
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta',
            });
        }

        // Respuesta exitosa
        res.status(200).json({
            ok: true,
            msg: 'Inicio de sesión exitoso',
            username: usuario.username,
            email: usuario.email,
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


module.exports ={
    CrearUsuario,RevalidarUsuario,LoginUsuario,UpdateUsuario
}