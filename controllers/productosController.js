const Producto = require('../models/productosModel');
const { validationResult } = require('express-validator');

const obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.status(200).render('productos', { productos }); // Renderizar la vista 'productos' con los datos obtenidos
    }  catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
    }
};

const obtenerProductoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Buscando producto con ID:", id); // Muestra el ID en la consola

        const producto = await Producto.findById(id);
        
        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el producto", error });
    }
};

crearProducto = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.render('alta', { 
            errores: errores.array(),
            datos: req.body // Mantener los datos escritos en el formulario
        });
    }

    try {
        const { nombreProducto, precioProducto, stockProducto, descripcionCortaProducto, envioSinCargoProducto } = req.body;

        const nuevoProducto = new Producto({
            nombreProducto,
            precioProducto,
            stockProducto,
            descripcionCortaProducto,
            envioSinCargoProducto
        });

        await nuevoProducto.save();
        res.redirect('/productos'); // Redirige después de un envío exitoso

    } catch (error) {
        console.error("Error en crearProducto:", error);
        res.render('alta', { errores: [{ msg: "Error al guardar el producto" }], datos: req.body });
    }
};



const actualizarProducto = async (req, res) => {
    try {
        const productoActualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(productoActualizado);
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
    }
};

const eliminarProducto = async (req, res) => {
    try {
        await Producto.findByIdAndDelete(req.params.id);
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
    }
};

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};