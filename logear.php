<?php
// Verificar si el formulario de inicio de sesión se ha enviado
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Obtener el nombre de usuario y la contraseña enviados desde el formulario
    $nombre = $_POST['nombre'];
    $password = $_POST['password'];

    // Verificar las credenciales del usuario
    if ($nombre == 'admin' && $password == 'asd') {
        // Las credenciales son válidas, redirigir al usuario a la página de administración
        header("Location: admin.html");
        exit;
    } elseif ($nombre == 'cliente' && $password == '123') {
        // Las credenciales son válidas, redirigir al usuario a la página del cliente
        header("Location: cliente.html");
        exit;
    } else {
        // Las credenciales son inválidas, mostrar un mensaje de error
        header("Location: error.html");
    }
}
?>