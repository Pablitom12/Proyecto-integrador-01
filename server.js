const mongoose = require('mongoose'); // Importamos Mongoose para manejar MongoDB
const app = require('./app'); // Importamos la configuración de Express
const MONGO_URI = 'mongodb://localhost:27017/Productos'; // Cambia esto según tu configuración de MongoDB

const port = process.env.PORT || 3000; // Puerto por defecto

app.listen(port, () => {  
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error de conexión a MongoDB:', err));



