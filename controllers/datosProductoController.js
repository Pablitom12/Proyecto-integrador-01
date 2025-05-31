const datosProducto = require('../models/datosProductoModel');

const envioDatosProducto = async (req, res) => {
    const { nombreProducto, precioProducto, stockProducto, herbolarioProducto, categoriaProducto, descripcionCortaProducto, descripcionLargaProducto, envioSinCargoProducto, edadDesdeProducto, edadHastaProducto, fotoProducto } = req.body;

    const nuevoProducto = new datosProducto({
        nombreProducto,
        precioProducto,
        stockProducto,
        herbolarioProducto,
        categoriaProducto,
        descripcionCortaProducto,
        descripcionLargaProducto,
        envioSinCargoProducto,
        edadDesdeProducto,
        edadHastaProducto,
        fotoProducto
    });

    try {
        await nuevoProducto.save();
        res.status(200).render('index');
    }

    catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    }

    console.log('Datos del producto recibidos:', nuevoProducto);
}


module.exports = {
    envioDatosProducto
};