document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search');
  const filtroTalles = document.getElementById('filtro-talles');
  const filtroColores = document.getElementById('filtro-colores');
  const filtroMarcas = document.getElementById('filtro-marcas');
  const productosContainer = document.getElementById('productos');
  const mensajeContainer = document.querySelector('.mensaje');

  fetch('productos.json')
      .then(response => response.json())
      .then(productos => {
          renderProductos(productos);

          searchInput.addEventListener('input', () => {
              filtrarProductos(productos);
          });

          filtroTalles.addEventListener('change', () => {
              filtrarProductos(productos);
          });

          filtroColores.addEventListener('change', () => {
              filtrarProductos(productos);
          });

          filtroMarcas.addEventListener('change', () => {
              filtrarProductos(productos);
          });

          mostrarMensajeSiNingunProducto(productos);
      });

  function renderProductos(productos) {
      productosContainer.innerHTML = '';
      productos.forEach(producto => {
          const productoDiv = document.createElement('div');
          productoDiv.className = 'producto';
          productoDiv.innerHTML = `
              <a href="${producto.nombre.replace(/\s+/g, '')}.html"> <!-- Enlace al producto -->
                  <div class="imagen-container">
                      <p>${producto.nombre}</p>
                      <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
                  </div>
              </a>
          `;
          productosContainer.appendChild(productoDiv);
      });
  }

  function filtrarProductos(productos) {
      const searchTerm = searchInput.value.trim().toLowerCase();
      const talle = filtroTalles.value;
      const color = filtroColores.value;
      const marca = filtroMarcas.value;

      const productosFiltrados = productos.filter(producto => {
          return (
              (producto.nombre.toLowerCase().includes(searchTerm) || searchTerm === '') &&
              (producto.talle === talle || talle === '') &&
              (producto.color === color || color === '') &&
              (producto.marca === marca || marca === '')
          );
      });

      renderProductos(productosFiltrados);
      mostrarMensajeSiNingunProducto(productosFiltrados);
  }

  function mostrarMensajeSiNingunProducto(productosFiltrados) {
      if (productosFiltrados.length === 0 && searchInput.value.trim() !== '') {
          mensajeContainer.style.display = 'block';
      } else {
          mensajeContainer.style.display = 'none';
      }
  }
});
