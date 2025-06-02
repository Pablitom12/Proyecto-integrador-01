const Carrito = require('../models/carritoModel');
const Producto = require('../models/productsModel');

exports.crearCarrito = async (req, res) => {
    try {
        // Validar y calcular total
        let total = 0;
        const items = [];
        for (const item of req.body.items) {
    const producto = await Producto.findById(item.producto);
    
    if (!producto) {
        return res.status(404).json({
            error: `Producto con ID ${item.producto} no encontrado`
        });
    }
    
    if (producto.stockProducto < item.cantidad) {
        return res.status(400).json({
            error: `Stock insuficiente para el producto ${producto.nombreProducto}`
        });
    }
    
      const subtotal = producto.precioProducto * item.cantidad;
        total += subtotal;

        items.push({
            producto: item.producto,
            cantidad: item.cantidad,
            precioUnitario: producto.precioProducto
        });
    }
    
    // Crear carrito
    const carrito = await Carrito.create({
        items,
        total
    });
    
    // Mostrar en consola
    console.log('Nuevo carrito creado:', carrito);
    
    res.status(201).json({
        message: 'Carrito creado exitosamente',
        data: carrito,
        // Enviar señal para vaciar carrito en frontend
        vaciarCarrito: true
    });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};