const mongoose = require('mongoose'); // Importamos Mongoose para manejar MongoDB

const connectToMongoDB = async (MONGO_LOCAL) => {
    try {
        await mongoose.connect(MONGO_LOCAL);
        console.log(`Conectado a la base de datos: Productos`); // mostramos un mensaje en la consola
    } catch (error) {
        console.error('Error al conectar a la base de datos', error); // mostramos un mensaje de error en la consola
        process.exit(1); // salimos del proceso con un error
    }
}

module.exports = connectToMongoDB; // Exportamos la función para usarla en el servidor principal