const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController'); // Asegúrate de importar el controlador correctamente

router.get('/productos', productController.obtenerProductos); 
router.get('/productos/:id', productController.obtenerProductoPorId);
router.post('/productos', productController.crearProducto);
router.put('/productos/:id', productController.actualizarProducto);
router.delete('/productos/:id', productController.eliminarProducto);

router.get('/cards', productController.obtenerCards); // Ruta para obtener las tarjetas de productos

module.exports = router;
