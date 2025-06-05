const { altaApp, homeApp, contactoApp, nosotrosApp } = require('../controllers/controllerRouter');

const router = require('express').Router();

router.get('/', homeApp);

router.get('/alta', altaApp);

router.get('/contacto', contactoApp);

router.get('/nosotros', nosotrosApp);

module.exports = router; 