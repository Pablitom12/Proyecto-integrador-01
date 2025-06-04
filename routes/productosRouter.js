const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productosController'); // Asegúrate de importar el controlador correctamente

// Definir rutas correctamente
router.get('/api/productos', productoController.obtenerProductos); 
router.get('/api/productos/:id', productoController.obtenerProductoPorId);
router.post('/api/productos', productoController.crearProducto);
router.put('/api/productos/:id', productoController.actualizarProducto);
router.delete('/api/productos/:id', productoController.eliminarProducto);

router.get('/productos', productoController.obtenerProductos); // Ruta para obtener todos los productos

module.exports = router;
