const express = require('express');
const router = express.Router();
const { guardarCarrito } = require('../controllers/carritoController'); // Asegúrate de importar el controlador correctamente

router.post('/guardar/carrito', guardarCarrito);

module.exports = router;