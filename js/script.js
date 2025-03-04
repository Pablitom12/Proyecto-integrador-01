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
    
