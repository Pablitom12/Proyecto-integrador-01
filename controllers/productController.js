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
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
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
    obtenerCards,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};