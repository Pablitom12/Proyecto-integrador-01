const homeApp = (req, res) => { 
    res.render('index'); 
}

const altaApp = (req, res) => { 
    res.render('alta'); 
}

const contactoApp = (req, res) => { 
    res.render('contacto'); 
}

const nosotrosApp = (req, res) => { 
    res.render('nosotros'); 
}

const productosApp = (req, res) => { 
    res.render('productos'); 
}

module.exports = {
    homeApp, 
    altaApp, 
    contactoApp, 
    nosotrosApp, 
    productosApp
}