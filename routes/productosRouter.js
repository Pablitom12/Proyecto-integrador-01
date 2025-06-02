const router = require('express').Router();

const { envioDatosProducto, getProductos } = require('../controllers/productosController');

router.post('/', envioDatosProducto);

router.get('/productos', (getProductos))

module.exports = router;