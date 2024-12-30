const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {
    // Manejo de errores de validación
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            msg: 'Errores en los campos enviados',
            errores: errores.mapped(),
        });
    }

    next();
};

module.exports = {
    validarCampos,
};