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
            // Si está disponible, mostrar el texto "Con stock"
            showStockStatus('En Stock');
        } else {
            // Si no está disponible, mostrar el texto "Sin stock"
            showStockStatus('Sin Stock');
        }

        // Remover la clase 'selected' de todos los tamaños
        sizes.forEach(s => s.classList.remove('selected'));
        // Agregar la clase 'selected' solo al tamaño clickeado
        size.classList.add('selected');
    });
});

// Obtén todas las imágenes laterales
const sideImages = document.querySelectorAll('.images img');

// Obtén la imagen principal
const mainImage = document.querySelector('.main-image img');

// Define una función para manejar el clic en las imágenes laterales
function handleSideImageClick(event) {
    // Obtiene la ruta de la imagen clickeada
    const newSrc = event.target.getAttribute('src');

    // Cambia la imagen principal por la imagen clickeada
    mainImage.setAttribute('src', newSrc);
}

// Agrega un event listener a cada imagen lateral para manejar el clic
sideImages.forEach(image => image.addEventListener('click', handleSideImageClick));

// Array para almacenar los elementos del carrito
let cartItems = [];

// Función para agregar un producto al carrito
function addToCart(productName, price, imageSrc) {
    // Agregar el producto al array del carrito
    cartItems.push({ name: productName, price: price, image: imageSrc });

    // Mostrar un mensaje de producto añadido al carrito
    const addedToCartMessage = document.getElementById('addedToCartMessage');
    addedToCartMessage.style.display = 'block';

    // Llamar a la función updateCartView para actualizar la visualización del carrito
    updateCartView();
}

// Función para actualizar la visualización del carrito
function updateCartView() {
    const cartContainer = document.querySelector('.cart-items');
    const totalAmountElement = document.getElementById('totalAmount');
    let totalPrice = 0;

    // Limpiar el contenido actual del contenedor del carrito
    cartContainer.innerHTML = '';

    // Recorrer todos los elementos del carrito y agregarlos al contenedor
    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');

        // Agregar la imagen del producto
        const imageElement = document.createElement('img');
        imageElement.src = item.image;
        itemElement.appendChild(imageElement);

        // Agregar el nombre y el precio del producto
        const nameElement = document.createElement('p');
        nameElement.textContent = item.name;
        itemElement.appendChild(nameElement);

        const priceElement = document.createElement('p');
        priceElement.textContent = `$${item.price}`;
        itemElement.appendChild(priceElement);

        // Calcular el precio total
        totalPrice += item.price;

        // Agregar el elemento del producto al contenedor del carrito
        cartContainer.appendChild(itemElement);
    });

    // Actualizar el precio total del carrito
    totalAmountElement.textContent = totalPrice.toFixed(2);
}

// Llamar a la función updateCartView al cargar la página para mostrar los elementos del carrito
window.addEventListener('load', updateCartView);

// Obtener el botón de comprar
const buyButton = document.getElementById('buyButton');

// Agregar un event listener para el evento click al botón de comprar
buyButton.addEventListener('click', () => {
    // Obtener la información del producto
    const productName = 'Superstar';
    const price = 45.00;
    const imageSrc = 'remera.png';

    // Agregar el producto al carrito
    addToCart(productName, price, imageSrc);
});
