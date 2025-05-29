const express = require('express');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Ruta principal que sirve el index.html
//app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname, 'public'));
//});

app.set('view engine', 'hbs');

//Configuracion de rutas de hbs
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index');
});

// Middleware para manejar errores
app.use((req, res) => {
    console.error(`Ruta no encontrada: ${req.originalUrl}`);
    res.status(404).send('<h1>404 - Página no encontrada</h1>');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('<h1>500 - Error interno del servidor</h1>');
});

module.exports = app; // Exportamos la configuración para usarla en el servidor
