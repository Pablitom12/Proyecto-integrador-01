const express = require('express');
const path = require('path');
const hbs = require('hbs'); 

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Ruta principal que sirve el index.html
//app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname, 'public'));
//});

app.set('view engine', 'hbs');

//Configuracion de rutas de hbs
app.set('views', path.join(__dirname, 'views'));

//registramos la carpeta de partials
hbs.registerPartials(path.join(__dirname, 'views/partials')); 

const pagesRouter = require('./routes/pagesRouter'); // Importamos el router de páginas
const productosRouter = require('./routes/productosRouter'); // Importamos el router de datos del producto

app.use('/', pagesRouter); // Usamos el router para manejar las rutas de la aplicación
app.use('/api', productosRouter); // Usamos el router para manejar las rutas de datos del producto



// Middleware para manejar errores
app.use((req, res) => {
    console.error(`Ruta no encontrada: ${req.originalUrl}`);
    res.status(404).send('<h1>404 - Página no encontrada</h1>');
});

app.use((err, req, res, next) => {
    console.error(`Error interno del servidor: ${err.message}`);
    res.status(500).send('<h1>500 - Error interno del servidor</h1>');
});



module.exports = app; // Exportamos la configuración para usarla en el servidor
