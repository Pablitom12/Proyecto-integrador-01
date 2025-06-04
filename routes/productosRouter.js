const express = require('express');
const { check } = require('express-validator'); 
const router = express.Router();
const productoController = require('../controllers/productosController'); // Asegúrate de importar el controlador correctamente

// Definir rutas correctamente
router.get('/api/productos', productoController.obtenerProductos); 
router.get('/api/productos/:id', productoController.obtenerProductoPorId);
router.post('/api/productos',
    [
        check('nombreProducto')
            .isString()
            .notEmpty()
            .matches(/^[A-Za-z\s]+$/)
            .withMessage('El nombre solo puede contener letras y espacios'),
        check('precioProducto')
            .isNumeric()
            .withMessage('El precio debe ser un número'),
        check('stockProducto')
            .isNumeric()
            .withMessage('El stock debe ser un número'),
        check('descripcionCortaProducto')
            .isString()
            .notEmpty()
            .withMessage('La descripción corta debe ser un string y no puede estar vacía'),
        check('envioSinCargoProducto')
            .isIn(['si', 'no'])
            .withMessage('El envío debe ser "si" o "no"')
    ],
    productoController.crearProducto
);


router.put('/api/productos/:id', productoController.actualizarProducto);
router.delete('/api/productos/:id', productoController.eliminarProducto);

router.get('/productos', productoController.obtenerProductos); // Ruta para obtener todos los productos

module.exports = router;
