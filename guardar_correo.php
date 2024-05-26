<?php
// Datos del formulario
$email = $_POST['email'];

// Cuerpo del mensaje a agregar al documento
$message = "Nuevo correo suscrito: $email\n";

// URL del documento de Google Docs
$documentUrl = 'https://docs.google.com/document/d/1Zez1Mg7DNsrymf02cgVGHzJI-mo5HzVkJjzbV7agidg/edit';

// Configuración de la solicitud HTTP
$options = array(
    'http' => array(
        'header'  => "Content-Type: application/json\r\n",
        'method'  => 'POST',
        'content' => json_encode(array('content' => $message)),
    ),
);

// Realizar la solicitud HTTP a Google Docs
$response = file_get_contents($documentUrl, false, stream_context_create($options));

// Verificar si la solicitud fue exitosa
if ($response === FALSE) {
    echo 'Error al enviar el correo.';
} else {
    echo 'Correo enviado correctamente.';
}
?>
