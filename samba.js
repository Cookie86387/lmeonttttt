// Objeto que mapea los tamaños a la información del producto
var productosPorTalle = {
    36: {
        nombre: 'Superstar',
        talle: 36,
        disponible: true,
        imagen: 'remera.png',
        precio: 250 // Supongamos que el precio es $250
    },
    37: {
        nombre: 'Superstar',
        talle: 37,
        disponible: true,
        imagen: 'remera.png',
        precio: 250 // Supongamos que el precio es $250
    },
    38: {
        nombre: 'Superstar',
        talle: 38,
        disponible: true,
        imagen: 'remera.png',
        precio: 250 // Supongamos que el precio es $250
    },
    39: {
        nombre: 'Superstar',
        talle: 39,
        disponible: true,
        imagen: 'remera.png',
        precio: 250 // Supongamos que el precio es $250
    },
    40: {
        nombre: 'Superstar',
        talle: 40,
        disponible: true,
        imagen: 'remera.png',
        precio: 250 // Supongamos que el precio es $250
    },
    41: {
        nombre: 'Superstar',
        talle: 41,
        disponible: true,
        imagen: 'remera.png',
        precio: 250 // Supongamos que el precio es $250
    },
    42: {
        nombre: 'Superstar',
        talle: 42,
        disponible: true,
        imagen: 'remera.png',
        precio: 250 // Supongamos que el precio es $250
    },
    43: {
        nombre: 'Superstar',
        talle: 43,
        disponible: true,
        imagen: 'remera.png',
        precio: 250 // Supongamos que el precio es $250
    },
    44: {
        nombre: 'Superstar',
        talle: 44,
        disponible: true,
        imagen: 'remera.png',
        precio: 250 // Supongamos que el precio es $250
    },
    // Agregar los demás tamaños según sea necesario...
};

// Variable global para almacenar el tamaño seleccionado
var selectedSize = '';

// Función para manejar el evento click en el botón "Comprar"
document.getElementById('buyButton').addEventListener('click', function() {
    // Verificar si se ha seleccionado un tamaño
    if (!selectedSize) {
        return; // Detener la ejecución si no se ha seleccionado ningún tamaño
    }
    
    // Obtener información del producto según el tamaño seleccionado
    var producto = productosPorTalle[selectedSize];
    
    // Codificar la información del producto en formato JSON
    var productoJSON = encodeURIComponent(JSON.stringify(producto));

    // Redireccionar a la página del carrito con la información del producto como parámetro
    window.location.href = 'carrito.html?producto=' + productoJSON;
});

// Función para mostrar el estado de stock
function showStockStatus(status) {
    // Obtener el elemento de estado de stock
    const stockStatus = document.querySelector('.stock-status');
    // Actualizar el texto del estado de stock
    stockStatus.textContent = status;

    // Obtener el círculo
    const stockCircle = document.querySelector('.circle');

    // Cambiar el color del círculo y del texto basado en el estado
    if (status === 'En Stock') {
        stockStatus.style.color = 'green'; // Cambiar el color del texto a verde
        stockCircle.style.backgroundColor = 'green'; // Cambiar el color del círculo a verde
    } else {
        stockStatus.style.color = 'red'; // Cambiar el color del texto a rojo
        stockCircle.style.backgroundColor = 'red'; // Cambiar el color del círculo a rojo
    }
}

// Obtener todos los elementos de tamaño
const sizes = document.querySelectorAll('.size');

// Iterar sobre cada elemento de tamaño
sizes.forEach(size => {
    // Agregar un event listener para el evento click a cada tamaño
    size.addEventListener('click', () => {
        // Verificar si el tamaño seleccionado está disponible o no
        if (size.classList.contains('available')) {
            // Si está disponible, actualizar el tamaño seleccionado
            selectedSize = size.textContent.trim();
            // Mostrar el texto "Con stock"
            showStockStatus('En Stock');
        } else {
            // Si no está disponible, mostrar el texto "Sin stock"
            showStockStatus('Sin Stock');
            showModalMessage("Este talle no está disponible.");
            // Limpiar el tamaño seleccionado si no está disponible
            selectedSize = '';
        }

        // Remover la clase 'selected' de todos los tamaños
        sizes.forEach(s => s.classList.remove('selected'));
        // Agregar la clase 'selected' solo al tamaño clickeado
        size.classList.add('selected');
    });
});

// Obtén todas las imágenes laterales
const sideImages = document.querySelectorAll('.images img');

// Define una función para manejar el clic en las imágenes laterales
function handleSideImageClick(event) {
    // Obtiene la ruta de la imagen clickeada
    const newSrc = event.target.getAttribute('src');

    // Cambia la imagen principal por la imagen clickeada
    mainImage.setAttribute('src', newSrc);

    // Actualizar el tamaño seleccionado basado en la imagen clickeada
    selectedSize = event.target.getAttribute('data-size');
}

// Agrega un event listener a cada imagen lateral para manejar el clic
sideImages.forEach(image => image.addEventListener('click', handleSideImageClick));

// Obtener el modal
var modal = document.getElementById("myModal");

// Obtener el <span> que cierra el modal
var span = document.getElementsByClassName("close")[0];

// Cuando el usuario hace clic en <span> (x), cerrar el modal
span.onclick = function() {
    modal.style.display = "none";
}

// Cuando el usuario hace clic en cualquier lugar fuera del modal, cerrarlo
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Función para mostrar el modal con un mensaje
function showModalMessage(message) {
    document.getElementById('modalMessage').textContent = message;
    modal.style.display = "block";
}

// Función para agregar un producto al carrito
function agregarAlCarrito() {
    if (!selectedSize) {
        showModalMessage("Por favor selecciona un talle antes de agregar al carrito.");
        return;
    }

    // Obtener información del producto
    var producto = productosPorTalle[selectedSize];

    // Obtener el carrito de localStorage
    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Agregar el producto al carrito
    carrito.push(producto);

    // Actualizar el carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Mostrar un mensaje de confirmación
    document.getElementById('addedToCartMessage').style.display = 'block';
}

// Evento click para el botón "Agregar al carrito"
document.getElementById('addToCartButton').addEventListener('click', agregarAlCarrito);
