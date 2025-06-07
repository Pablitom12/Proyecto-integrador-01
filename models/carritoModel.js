const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
    productos: [{
        productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
        nombreProducto: { type: String, required: true },
        precioProducto: { type: Number, required: true },
        cantidad: { type: Number, required: true }
    }]
}, { timestamps: true });

const Carrito = mongoose.model('Carrito', carritoSchema);
module.exports = Carrito;
