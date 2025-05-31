const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombreProducto: { type: String, required: true },
    precioProducto: { type: Number, required: true },
    stockProducto: { type: Number, required: true },
    herbolarioProducto: { type: String, required: true },
    categoriaProducto: { type: String, required: true },
    descripcionCortaProducto: { type: String, required: true },
    descripcionLargaProducto: { type: String, required: true },
    envioSinCargoProducto: { type: String, enum: ['si', 'no'], required: true },
    edadDesdeProducto: { type: Number, required: true },
    edadHastaProducto: { type: Number, required: true },
    fotoProducto: { type: String } 
}, { timestamps: true });

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;
