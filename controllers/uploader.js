// const express = require('express');
// const Pruebas = require('../models/Prueba');

// const singleFileUpload = async (req, res, next) => {
//     try{
//      const {id_pruebas,fileName} = req.body;
//      //     const file = req.file;
//      //     console.log(file)
//      //     res.status(201).send('File Uploaded Successfully');
//      await Pruebas.updateMany({_id:"621ee1e3da87692f0e77f365"},{evidencias:fileName})
//      // await usuarioUpdate.save();
//      res.status(201).json({
//          ok:true,
//          msg:'update evidencias',
//      })
//     }catch(error) {
//          res.status(400).send (error.message);
//     }
// }
// /////////////////////////////////////////
// const getallSingleFiles = async (req, res, next) => {
//      try{
//          const files = await SingleFile.find();
//          res.status(200).send(files);
//      }catch(error) {
//          res.status(400).send (error.message);
//      }
// }
// //////////////////////////////////////////

// const multipleFileUpload = async (req, res, next) => {
//     try{
//          const file = req.file;
//          console.log(file)
//          res.status(201).send('multiple files Uploaded Successfully');
//     }catch(error) {
//          res.status(400).send (error.message);
//     }
// }
// /////////////////////////////////////


// module.exports = {
//     singleFileUpload,multipleFileUpload,
//     getallSingleFiles,
    
// }