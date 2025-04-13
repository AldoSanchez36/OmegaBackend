// const mongoose = require('mongoose');

// // Configuración global para evitar advertencias futuras
// mongoose.set('strictQuery', true);


// const test = false;

// const dbConnection = async () => {
//     try {
//         // Seleccionar la URI de conexión según el valor de 'test'
//         const mongoURI = test ? process.env.MONGODB_sample : process.env.MONGODB_URI;

//         // Conexión a la base de datos utilizando la URI desde las variables de entorno
//         await mongoose.connect(mongoURI);

//         console.log("MongoDB activa");

//         // Eventos para monitorear el estado de la conexión
//         mongoose.connection.on("connected", () => {
//             console.log("Conexión a MongoDB establecida correctamente.");
//         });

//         mongoose.connection.on("error", (err) => {
//             console.error("Error en la conexión a MongoDB:", err.message);
//         });

//         mongoose.connection.on("disconnected", () => {
//             console.log("Desconexión de MongoDB.");
//         });
//     } catch (error) {
//         console.error("Error al conectar con MongoDB:", error.message);
//         throw new Error("Error iniciando MongoDB");
//     }
// };

// module.exports = {
//     dbConnection,
// };