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

function agregarProducto() {
        const nombre = document.getElementById('nombreProducto').value;
        const descripcion = document.getElementById('descripcionProducto').value;

        if (nombre && descripcion) {
            const productos = JSON.parse(localStorage.getItem('productos')) || [];
            productos.push({ nombre, descripcion });
            localStorage.setItem('productos', JSON.stringify(productos));
            alert('Producto agregado correctamente.');
            window.location.href = 'pagina_principal.html';
        } else {
            alert('Por favor, completa todos los campos.');
        }
    }

function validarFormulario() {
    const nombre = document.getElementById('nombre').value;
    const regex = /^[a-zA-Z\s]+$/;

    if (!regex.test(nombre)) {
        alert('Por favor, ingresa un nombre válido sin números.');
        return false;
    }
    return true;
}
    
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
    if (!stockProducto || isNaN(stockProducto) || parseInt(stockProducto) < 0) mensajesError.push('El stock del producto debe ser un número no negativo.');
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
