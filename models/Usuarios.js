const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
    username: {
        type: String,
        required: true, // Cambiado para validar correctamente
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true, // Cambiado para validar correctamente
    },
    puesto: {
        type: String,
    },
});

module.exports = model('Usuario', UsuarioSchema);