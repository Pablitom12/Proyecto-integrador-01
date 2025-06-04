const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombreProducto: { type: String, required: true },
    precioProducto: { type: Number, required: true },
    stockProducto: { type: Number, required: true },
    descripcionCortaProducto: { type: String, required: true },
    envioSinCargoProducto: { type: String, enum: ['si', 'no'], required: true },
    fotoProducto: { type: String } 
}, { timestamps: false });

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;
