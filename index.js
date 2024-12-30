const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./DB/config'); // Configuración de MongoDB
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const app = express();

// Configuración de Mongoose
mongoose.set('strictQuery', true); // Ajusta según tus necesidades

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.use(fileUpload());
app.use(cors());

// Conexión a la base de datos
dbConnection();

// Rutas
app.use('/api/auth', require('./routes/auth'));

const testRoute = require('./routes/test');
app.use('/', testRoute);

// Manejo de errores no controlados
process.on('unhandledRejection', (error) => {
  console.error('Uncaught Error', error);
  process.exit(1);
});

// Inicio del servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});