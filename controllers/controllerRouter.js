const homeApp = (req, res) => { // creamos una ruta para la página de inicio
    res.render('index'); // renderizamos la vista index.hbs
}

const altaApp = (req, res) => { // creamos una ruta para la página de alta
    res.render('alta'); // renderizamos la vista alta.hbs
}

const contactoApp = (req, res) => { // creamos una ruta para la página de contacto
    res.render('contacto'); // renderizamos la vista contacto.hbs
}

const nosotrosApp = (req, res) => { // creamos una ruta para la página de nosotros  
    res.render('nosotros'); // renderizamos la vista nosotros.hbs
}

module.exports = {
    homeApp, // exportamos la función homeApp
    altaApp, // exportamos la función altaApp
    contactoApp, // exportamos la función contactoApp
    nosotrosApp // exportamos la función nosotrosApp
}