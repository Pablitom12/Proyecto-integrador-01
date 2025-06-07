const carritoModel = require('../models/carritoModel');
const ProductModel = require('../models/productModel');

const guardarCarrito = async (req, res) => {
    try {
        const { productos } = req.body;

        console.log("Carrito recibido:", productos);

        const carritoProductos = [];

        for (const item of productos) {
            const producto = await ProductModel.findById(item.productoId);
            if (!producto || producto.stockProducto < item.cantidad) {
                return res.status(400).json({ mensaje: `Stock insuficiente para ${producto?.nombreProducto || 'producto desconocido'}` });
            }

            carritoProductos.push({
                productoId: producto._id,
                nombreProducto: producto.nombreProducto,
                precioProducto: producto.precioProducto,
                cantidad: item.cantidad
            });
        }

        for (const item of carritoProductos) {
            await ProductModel.findByIdAndUpdate(item.productoId, {
                $inc: { stockProducto: -item.cantidad }
            });
        }

        const carrito = new carritoModel({ productos: carritoProductos });
        await carrito.save();

        return res.status(200).json({
            mensaje: "Carrito guardado correctamente y stock actualizado",
            carrito
        });

    } catch (error) {
        console.error("Error al guardar el carrito:", error); // Agregar log en la consola
        return res.status(500).json({ mensaje: "Error al guardar el carrito", error });
    }
};

module.exports = {
    guardarCarrito
}