document.addEventListener('DOMContentLoaded', () => {
  const formProducto = document.getElementById('formProducto');
  const productosTable = document.getElementById('productosTable');
  const btnCancelar = document.getElementById('btnCancelar');
  const carritoItems = document.getElementById('carritoItems');
  const carritoTotal = document.getElementById('carritoTotal');
  const btnFinalizarCompra = document.getElementById('btnFinalizarCompra');
  
  let editMode = false;
  let currentProductId = null;
  let carrito = [];
  
  // Cargar productos al iniciar
  cargarProductos();
  
  // Manejar formulario de productos
  formProducto.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const producto = {
      nombreProducto: document.getElementById('nombreProducto').value,
      precioProducto: parseFloat(document.getElementById('precioProducto').value),
      stockProducto: parseInt(document.getElementById('stockProducto').value),
      descripcionCortaProducto: document.getElementById('descripcionCortaProducto').value,
      envioSinCargoProducto: document.getElementById('envioSinCargoProducto').value,
      fotoProducto: document.getElementById('fotoProducto').value
    };
    
    try {
      let response;
      
      if (editMode) {
        response = await fetch(`/api/productos/${currentProductId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(producto)
        });
      } else {
        response = await fetch('/api/productos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(producto)
        });
      }
      
      if (response.ok) {
        formProducto.reset();
        cargarProductos();
        salirModoEdicion();
      } else {
        const error = await response.json();
        alert(error.error || 'Error al guardar el producto');
      }
    } catch (error) {
      alert('Error de conexión');
    }
  });
  
  // Cancelar edición
  if (btnCancelar) {
    btnCancelar.addEventListener('click', salirModoEdicion);
  }
  
  // Cargar productos desde la API
  async function cargarProductos() {
    try {
      const response = await fetch('/api/productos');
      const productos = await response.json();
      
      productosTable.innerHTML = productos.map(producto => `
        <tr>
          <td>${producto.nombreProducto}</td>
          <td>$${producto.precioProducto.toFixed(2)}</td>
          <td>${producto.stockProducto}</td>
          <td>
            <button class="btn btn-sm btn-warning btn-editar" data-id="${producto._id}">Editar</button>
            <button class="btn btn-sm btn-danger btn-eliminar" data-id="${producto._id}">Eliminar</button>
            <button class="btn btn-sm btn-success btn-agregar-carrito" data-id="${producto._id}">+ Carrito</button>
          </td>
        </tr>
      `).join('');
      
      // Agregar eventos a los botones
      document.querySelectorAll('.btn-editar').forEach(btn => {
        btn.addEventListener('click', () => cargarProductoParaEditar(btn.dataset.id));
      });
      
      document.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', () => eliminarProducto(btn.dataset.id));
      });
      
      document.querySelectorAll('.btn-agregar-carrito').forEach(btn => {
        btn.addEventListener('click', () => agregarAlCarrito(btn.dataset.id));
      });
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  }
  
  // Cargar producto para editar
  async function cargarProductoParaEditar(id) {
    try {
      const response = await fetch(`/api/productos/${id}`);
      const producto = await response.json();
      
      // Llenar formulario
      document.getElementById('productoId').value = producto._id;
      document.getElementById('nombreProducto').value = producto.nombreProducto;
      document.getElementById('precioProducto').value = producto.precioProducto;
      document.getElementById('stockProducto').value = producto.stockProducto;
      document.getElementById('descripcionCortaProducto').value = producto.descripcionCortaProducto;
      document.getElementById('envioSinCargoProducto').value = producto.envioSinCargoProducto;
      document.getElementById('fotoProducto').value = producto.fotoProducto || '';
      
      // Entrar en modo edición
      editMode = true;
      currentProductId = id;
      document.querySelector('button[type="submit"]').textContent = 'Actualizar';
      btnCancelar.style.display = 'inline-block';
    } catch (error) {
      alert('Error al cargar el producto para editar');
    }
  }
  
  // Eliminar producto
  async function eliminarProducto(id) {
    if (confirm('¿Está seguro de eliminar este producto?')) {
      try {
        const response = await fetch(`/api/productos/${id}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          cargarProductos();
        } else {
          const error = await response.json();
          alert(error.error || 'Error al eliminar el producto');
        }
      } catch (error) {
        alert('Error de conexión');
      }
    }
  }
  
  // Salir del modo edición
  function salirModoEdicion() {
    formProducto.reset();
    editMode = false;
    currentProductId = null;
    document.querySelector('button[type="submit"]').textContent = 'Guardar';
    btnCancelar.style.display = 'none';
  }
  
  // Funcionalidad del carrito
  function agregarAlCarrito(productoId) {
    const productoExistente = carrito.find(item => item.producto === productoId);
    
    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      carrito.push({
        producto: productoId,
        cantidad: 1
      });
    }
    
    actualizarCarrito();
  }
  
  function actualizarCarrito() {
    carritoItems.innerHTML = carrito.map(item => `
      <tr>
        <td>Producto ${item.producto}</td>
        <td>${item.cantidad}</td>
        <td>$${(item.cantidad * 10).toFixed(2)}</td> <!-- Precio hardcodeado por simplicidad -->
      </tr>
    `).join('');
    
    const total = carrito.reduce((sum, item) => sum + (item.cantidad * 10), 0);
    carritoTotal.textContent = `$${total.toFixed(2)}`;
  }
  
  // Finalizar compra
  btnFinalizarCompra.addEventListener('click', async () => {
    try {
      const response = await fetch('/api/carrito', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ items: carrito })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert('Compra finalizada con éxito');
        carrito = [];
        actualizarCarrito();
        // Cerrar modal
        bootstrap.Modal.getInstance(document.getElementById('carritoModal')).hide();
      } else {
        alert(data.error || 'Error al finalizar la compra');
      }
    } catch (error) {
      alert('Error de conexión');
    }
  });
  
  // Mostrar modal del carrito
  document.querySelector('.btn-carrito').addEventListener('click', () => {
    const modal = new bootstrap.Modal(document.getElementById('carritoModal'));
    modal.show();
  });
});