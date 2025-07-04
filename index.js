const express = require('express');
const cors = require('cors');
require('dotenv').config();
//Mongoo
//const { dbConnection } = require('./DB/config'); // Configuración de MongoDB
//const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const rateLimit = require('express-rate-limit');

const app = express();

// Configuración de Mongoose
//mongoose.set('strictQuery', true); // Ajusta según tus necesidades
const supabase = require('./DB/sqlConfig'); // Conexión a Supabase

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.use(fileUpload());
app.use(cors());
/*app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));*/

// Conexión a la base de datos
//dbConnection();

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/plantas', require('./routes/plantas'));
app.use('/api/procesos', require('./routes/procesos'));
app.use('/api/variables', require('./routes/variables'));
app.use('/api/formulas', require('./routes/formulas'));
app.use('/api/reportes', require('./routes/reportes'));
app.use('/api/accesos/plantas', require('./routes/accesosPlantas'));
app.use('/api/accesos/procesos', require('./routes/accesosProcesos'));

app.use('/api/mediciones',require('./routes/mediciones'))
app.use('/api/variables-tolerancia',require('./routes/variablesTolerancia'))

app.use('/api/documentos-pdf',require('./routes/documentosPdf'))
app.use('/api/documentos-pdf-permisos',require('./routes/documentosPdfPermisos'))

app.use('/api/dashboard',require('./routes/dashboard'))


// Middleware para manejo de errores globales
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ ok: false, msg: 'Error interno del servidor' });
});

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

/* const options = {
  key: fs.readFileSync('./certs/key.pem'),
  cert: fs.readFileSync('./certs/cert.pem')
};

https.createServer(options, app).listen(443, () => {
  console.log('Servidor HTTPS en puerto 443');
}); */

// const helmet = require('helmet');
// app.use(helmet());

// app.use(cors({
//   origin: ['https://tudominio.com'],
//   credentials: true
// }));