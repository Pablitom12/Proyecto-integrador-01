const express = require('express');
const router = express.Router();
const { crearCarrito } = require('../controllers/CarritoController');

router.post('/', crearCarrito);

module.exports = router;