require('dotenv').config(); 

const express = require('express');
const connectToMongoDB = require('./conexion/conexionMongo'); // Importamos la función de conexión a MongoDB
const MONGO_URI = process.env.MONGO_ATLAS; // Obtenemos la URI de MongoDB desde las variables de entorno

const app = require('./app'); // Importamos la configuración de la aplicación

// Conectamos a la base de datos MongoDB
connectToMongoDB(MONGO_URI)

const PORT = process.env.PORT; 

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
