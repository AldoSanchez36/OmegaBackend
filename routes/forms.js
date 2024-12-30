// // Rutas de forms
// // host + /api/forms
// const {check} = require('express-validator') 
// const { Router } = require('express');
// const { createProduccion,createPruebas,createCalidad,createTecnicalTest,createEvidencias,createEstatus, createTodo } = require('../controllers/forms');
// const { validarProduccion } = require('../middelwares/validar-produccion');
// const router = Router();

// router.post('/produccion'
// // ,[//middlewares
// //     check('status','error no hay modelo').notEmpty(),
// //     check('orden','error no hay orden').notEmpty(),
// //     check('modelo','error no hay modelo').notEmpty(),
// //     check('configuracion','error no hay configuracion').notEmpty(),
// //     check('numero_wu','error no hay numero de wu').notEmpty(),
// //     check('numero_ems','error no hay numero de ems').notEmpty(),
// //     check('cliente','error no hay cliente').notEmpty(),
// //     check('pais','error no hay pais').notEmpty(),
// //     check('version','error no hay version').notEmpty(),
// //     check('tipo','error no hay tipo').notEmpty(),
// //     validarProduccion 
// // ]
// ,createProduccion);


// router.post('/calidad',
// // [//middlewares
// //     check('incoming','error no hay incoming').notEmpty(),
// //     check('r_incoming','error no hay QA').notEmpty(),
// // validarProduccion 
// // ],
// createCalidad);

// router.post('/pruebas',createPruebas);

// router.post('/pruebas/files',createEvidencias);

// router.post('/tecnicaltest',createTecnicalTest);

// router.post('/Todo',createTodo);

// router.post('/estatus',createEstatus);


// module.exports = router;
