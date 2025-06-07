require('dotenv').config(); 

const express = require('express');
const connectToMongoDB = require('./conexion/conexionMongo'); 
const MONGO_URI = process.env.MONGO_ATLAS; 

const app = require('./app'); 

connectToMongoDB(MONGO_URI)

const PORT = process.env.PORT; 

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
