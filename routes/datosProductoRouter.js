const router = require('express').Router();

const { envioDatosProducto } = require('../controllers/datosProductoController');

router.post('/', envioDatosProducto);

module.exports = router;