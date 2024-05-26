document.addEventListener("DOMContentLoaded", function() {
    // Función para mostrar el mensaje de suscripción
    function mostrarMensaje() {
        var overlay = document.getElementById("overlay");
        var mensaje = document.getElementById("mensaje");
        overlay.style.display = "flex";
        setTimeout(function() {
            overlay.style.display = "none";
        }, 3000); // Ocultar después de 3 segundos
    }

    // Función para validar el correo electrónico
    function validarEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
        return re.test(String(email).toLowerCase());
    }

    // Agregamos el evento de submit para el formulario de suscripción
    document.getElementById("suscripcion-form").addEventListener("submit", function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe automáticamente

        var email = document.getElementById("email").value;
        if (validarEmail(email)) {
            // Simulamos una solicitud exitosa, ya que no tenemos un servidor configurado
            mostrarMensaje(); // Mostrar el mensaje de suscripción
            document.getElementById("suscripcion-form").reset(); // Limpiar el formulario después de enviar
        } else {
            alert("Por favor ingresa un correo electrónico válido.");
        }
    });

    // Verificamos si existen submenús en la página
    var submenus = document.querySelectorAll(".submenu");
    if (submenus.length === 0) {
        // Seleccionamos el contenedor de los productos
        var productosContainer = document.getElementById("mas-vendidos");

        // Seleccionamos todos los productos
        var productos = productosContainer.querySelectorAll(".producto");

        // Obtenemos el ancho total del contenedor de productos
        var containerWidth = productosContainer.offsetWidth;

        // Obtenemos el ancho total de todos los productos
        var totalWidth = 0;
        productos.forEach(function(producto) {
            totalWidth += producto.offsetWidth;
        });

        // Calculamos la cantidad de productos clonados que queremos agregar
        var cantidadClones = Math.ceil(containerWidth / totalWidth) * 1; // Ajustar la cantidad de clones

        // Clonamos los productos y los agregamos al final del contenedor
        for (var i = 0; i < cantidadClones; i++) {
            productos.forEach(function(producto) {
                var clone = producto.cloneNode(true);
                productosContainer.appendChild(clone);
            });
        }

        // Obtenemos la posición inicial del sexto producto
        var sextoProducto = productos[5];
        var posicionInicial = sextoProducto.offsetLeft;

        // Función para mover los productos hacia la izquierda de manera continua
        function moveProducts() {
            productosContainer.style.left = productosContainer.offsetLeft - 1 + "px";
            if (productosContainer.offsetLeft <= -totalWidth) {
                // Reposicionamos los productos al inicio de la posición inicial del sexto producto
                productosContainer.style.left = posicionInicial + "px";
            }
            requestAnimationFrame(moveProducts);
        }

        // Iniciar el movimiento de los productos
        moveProducts();
    }
});
