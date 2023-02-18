<?php
$error;
if(!empty($_POST['usuario']) && !empty($_POST['password'])){
    $usuario = $_POST['usuario'];
    $password = $_POST['password'];
    if($usuario == "cliente" && $password == "123"){
        $error = "OK";
        header("Location: cliente.html");
    }
    elseif($usuario == "admin" && $password == "asd"){
        $error = "OK";
        header("Location: admin.html");
    }
    else
   {
    $error = "OK";
      header("Location: error.html");
    
   }
} 