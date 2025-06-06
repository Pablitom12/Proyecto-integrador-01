const mongoose = require('mongoose');
const Producto = require('../models/productModel');

const obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.render('productos', { productos }); 
    }  catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
    }
};

const obtenerCards = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.render('cards', { productos }); // Renderizar la vista 'cards' con los productos
    } catch (error) {
        console.error('Error al obtener los productos para las cards:', error);
        res.status(500).json({ message: 'Error al obtener los productos para las cards', error: error.message });
    }
};

const obtenerProductoPorId = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }
        res.json(producto);
    } catch (error) {
        res.status(500).json({ mensaje: "Error del servidor" });
    }
};

const crearProducto = async (req, res) => {
    try {
        const { nombreProducto, precioProducto, stockProducto, descripcionCortaProducto, envioSinCargoProducto } = req.body;

        if (!nombreProducto || !precioProducto || !stockProducto || !descripcionCortaProducto || envioSinCargoProducto === undefined) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        // Crear el nuevo producto
        const nuevoProducto = new Producto(req.body);
        await nuevoProducto.save();
        res.status(201).redirect('/productos'); // Redirigir a la lista de productos después de crear uno nuevo

    } catch (error) {
        console.error("Error en crearProducto:", error);
        res.status(500).json({ error: "Error al crear el producto" });
    }
};

const obtenerProductoParaEditar = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ mensaje: "ID no válido" });
        }

        const producto = await Producto.findById(id);

        if (!producto) {
            return res.status(404).send("Producto no encontrado");
        }
        res.render('formularioUpdate', { producto });

    } catch (error) {
        console.error("Error al obtener producto:", error);
        res.status(500).send("Error interno del servidor");
    }
};


const actualizarProducto = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ mensaje: "ID no válido o faltante" });
        }

        const datosActualizados = req.body;
        const producto = await Producto.findByIdAndUpdate(id, datosActualizados, { new: true });

        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        res.redirect('/productos'); // Redirige a la lista de productos

    } catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).json({ mensaje: "Error interno del servidor", error: error.message });
    }
};

eliminarProducto = async (req, res) => {
    try {
        const id = req.params.id;
        const producto = await Producto.findById(id);

        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        await Producto.findByIdAndDelete(id);
        res.status(200).redirect('/productos'); 

    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};




module.exports = {
    obtenerProductos,
    obtenerCards,
    obtenerProductoPorId,
    crearProducto,
    obtenerProductoParaEditar,
    actualizarProducto,
    eliminarProducto
};