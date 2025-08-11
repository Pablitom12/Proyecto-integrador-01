require('dotenv').config(); 

const express = require('express');
const connectToMongoDB = require('./conexion/conexionMongo'); 

const app = require('./app'); 

connectToMongoDB()

const PORT = process.env.PORT; 

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
