const { altaApp, homeApp, contactoApp, nosotrosApp, traermongoApp } = require('../controllers/controllerRouter');

const router = require('express').Router();

router.get('/', homeApp);

router.get('/alta', altaApp);

router.get('/contacto', contactoApp);

router.get('/nosotros', nosotrosApp);

router.get('/traermongo', traermongoApp);

module.exports = router; 