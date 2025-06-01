const router = require('express').Router();

const { envioDatosProducto, getProductos } = require('../controllers/datosProductoController');

router.post('/', envioDatosProducto);

router.get('/traermongo', (getProductos))

module.exports = router;