const Producto = require('../models/productosModel');

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

const crearProducto = async (req, res) => {
    try {
        const { nombreProducto, precioProducto, stockProducto, descripcionCortaProducto, envioSinCargoProducto } = req.body;

        if (!nombreProducto || !precioProducto || !stockProducto || !descripcionCortaProducto || envioSinCargoProducto === undefined) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        // Crear el nuevo producto
        const nuevoProducto = new Producto(req.body);
        await nuevoProducto.save();
        res.status(201).render('productos')
    } catch (error) {
        console.error("Error en crearProducto:", error);
        res.status(500).json({ error: "Error al crear el producto" });
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

console.log(Producto);

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};