const datosProducto = require('../models/datosProductoModel');

const getProductos = async (req, res) => {
    try {
        const productos = await datosProducto.find();

        console.log('Productos obtenidos:', productos);

        res.status(200).render('traermongo',{
            productos: productos
        });
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
    }
}

// Controlador para manejar el envío de datos del producto
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
    envioDatosProducto,
    getProductos
};