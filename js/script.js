//script del buscador del index

function filtrarProductos() {
    const input = document.getElementById('buscador');
    const filter = input.value.toLowerCase();
    const productos = document.getElementsByClassName('product');

    for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];
        const txtValue = producto.textContent || producto.innerText;
        
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
            producto.style.display = 'block';
        } else {
            producto.style.display = 'none';
        }
    }
}

//script del formulario del alta de productos

function agregarProducto() {
    const nombreProducto = document.getElementById('nombreProducto').value.trim();
    const precioProducto = document.getElementById('precioProducto').value.trim();
    const stockProducto = document.getElementById('stockProducto').value.trim();
    const herbolario = document.getElementById('Herbolario').value.trim();
    const categoriaProducto = document.getElementById('categoriaProducto').value.trim();
    const descripcionCortaProducto = document.getElementById('descripcionCortaProducto').value.trim();
    const descripcionLargaProducto = document.getElementById('descripcionLargaProducto').value.trim();
    const envioSinCargoProducto = document.getElementById('envioSinCargoProducto').value.trim();
    const edadDesdeProducto = document.getElementById('edadDesdeProducto').value.trim();
    const edadHastaProducto = document.getElementById('edadHastaProducto').value.trim();
    const fotoProducto = document.getElementById('fotoProducto').files[0];

    let mensajesError = [];
        
    if (!nombreProducto) mensajesError.push('El nombre del producto es obligatorio.');
    if (!precioProducto || isNaN(precioProducto) || parseFloat(precioProducto) <= 0) mensajesError.push('El precio del producto debe ser un número positivo.');
    if (!stockProducto || isNaN(stockProducto) || parseInt(stockProducto) < 0) mensajesError.push('El stock del producto no debe ser un número negativo.');
    if (!herbolario) mensajesError.push('El herbolario es obligatorio.');
    if (!categoriaProducto) mensajesError.push('La categoría del producto es obligatoria.');
    if (!descripcionCortaProducto) mensajesError.push('La descripción corta del producto es obligatoria.');
    if (!descripcionLargaProducto) mensajesError.push('La descripción larga del producto es obligatoria.');
    if (!envioSinCargoProducto) mensajesError.push('Selecciona si el envío es sin cargo.');
    if (!edadDesdeProducto || isNaN(edadDesdeProducto) || parseInt(edadDesdeProducto) < 0) mensajesError.push('La edad desde debe ser un número no negativo.');
    if (!edadHastaProducto || isNaN(edadHastaProducto) || parseInt(edadHastaProducto) < 0 || parseInt(edadHastaProducto) < parseInt(edadDesdeProducto)) mensajesError.push('La edad hasta debe ser un número no negativo y mayor que la edad desde.');
    if (!fotoProducto) mensajesError.push('La foto del producto es obligatoria.');

    if (mensajesError.length > 0) {
            alert(mensajesError.join('\n'));
            return;
    }
        
    alert('Producto agregado exitosamente.');
}

//script del formulario de contacto

function validarFormulario() {
    const nombre = document.getElementById('nombre').value;
    const regex = /^[a-zA-Z\s]+$/;

    if (!regex.test(nombre)) {
        alert('Por favor, ingresa un nombre válido sin números.');
        return false;
    }
    return true;
}