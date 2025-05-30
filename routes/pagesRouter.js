const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/alta', (req, res) => {
    res.render('alta');
});

router.get('/contacto', (req, res) => {
    res.render('contacto');
});

router.get('/nosotros', (req, res) => {
    res.render('nosotros');
});

module.exports = router; // Exportamos el router para usarlo en app.js