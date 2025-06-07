const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController'); // Asegúrate de importar el controlador correctamente

router.get('/productos', productController.obtenerProductos); 
router.get('/productos/:id', productController.obtenerProductoPorId);
router.post('/productos', productController.crearProducto);
router.get('/productos/editar/:id', productController.obtenerProductoParaEditar);
router.post('/productos/update/:id', productController.actualizarProducto);
router.post('/productos/delete/:id', productController.eliminarProducto);

router.get('/plantas', productController.obtenerCards);  

module.exports = router;
