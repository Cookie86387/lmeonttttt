// Slider
const slides = document.querySelectorAll('.slider img');
const intervalTime = 5000; // Intervalo de cambio de imagen (5 segundos)
let slideInterval;

const nextSlide = () => {
    const current = document.querySelector('.current');
    current.classList.remove('current');
    if (current.nextElementSibling) {
        current.nextElementSibling.classList.add('current');
    } else {
        slides[0].classList.add('current');
    }
    setTimeout(() => current.classList.remove('current'));
}

slideInterval = setInterval(nextSlide, intervalTime);

// Carrito de compras
let carrito = [];

function agregarAlCarrito(nombre, precio) {
    let encontrado = false;
    carrito.forEach(producto => {
        if (producto.nombre === nombre) {
            producto.cantidad++;
            encontrado = true;
        }
    });

    if (!encontrado) {
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    mostrarCarrito();
}

function mostrarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach((producto, index) => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - Precio: $${producto.precio} (${producto.cantidad})`;
        listaCarrito.appendChild(li);

        const botonQuitar = document.createElement('button');
        botonQuitar.textContent = 'Quitar';
        botonQuitar.className = 'boton-quitar';
        botonQuitar.addEventListener('click', () => quitarDelCarrito(index));
        li.appendChild(botonQuitar);

        total += producto.precio * producto.cantidad;
    });

    const totalElement = document.getElementById('total');
    totalElement.textContent = `Total: $${total}`;

    const carritoElement = document.getElementById('carrito');
    if (carrito.length > 0) {
        carritoElement.classList.add('carrito-lleno');
    } else {
        carritoElement.classList.remove('carrito-lleno');
    }
}

function quitarDelCarrito(index) {
    if (carrito[index].cantidad === 1) {
        carrito.splice(index, 1);
    } else {
        carrito[index].cantidad--;
    }
    mostrarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
}

// Cambio de imagen principal en producto
const imagenesAdicionales = document.querySelectorAll('.imagen-adicional img');
imagenesAdicionales.forEach(imagen => {
    imagen.addEventListener('click', function() {
        const imagenClickeada = this.src;
        const imagenPrincipal = this.closest('.producto').querySelector('.producto-imagen');
        imagenPrincipal.src = imagenClickeada;
    });
});

// Agregar al carrito
const botonesAgregar = document.querySelectorAll('.boton-agregar');
botonesAgregar.forEach(boton => {
    boton.addEventListener('click', function() {
        const nombre = this.dataset.nombre;
        const precio = parseFloat(this.dataset.precio);
        agregarAlCarrito(nombre, precio);
    });
});

// Vaciar carrito
const botonVaciarCarrito = document.getElementById('boton-vaciar-carrito');
botonVaciarCarrito.addEventListener('click', vaciarCarrito);

