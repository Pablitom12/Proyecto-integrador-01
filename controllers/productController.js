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

const actualizarProducto = async (req, res) => {
    try {
        const id = req.params.id;
        const { nombreProducto, precioProducto, stockProducto, descripcionCortaProducto, envioSinCargoProducto } = req.body;

        if (!nombreProducto || !precioProducto || !stockProducto || !descripcionCortaProducto || envioSinCargoProducto === undefined) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        const productoActualizado = await Producto.findByIdAndUpdate(id, req.body, { new: true });

        if (!productoActualizado) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        res.status(200).redirect('/productos'); // Redirigir a la lista de productos después de actualizar uno

    } catch (error) {
        console.error("Error en actualizarProducto:", error);
        res.status(500).json({ error: "Error al actualizar el producto" });
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
    actualizarProducto,
    eliminarProducto
};