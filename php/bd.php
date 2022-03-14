<?php

include "conect.php";

$login = filter_var(trim($_POST['login']),
FILTER_SANITIZE_STRING);
$password = filter_var(trim($_POST['psw']),
FILTER_SANITIZE_STRING);





$result = $mysql->query("SELECT * FROM `users` WHERE
 `login` = '$login' AND `password` = '$password'");
$user = $result->fetch_assoc();

if(count($user) == 0){
    $error = 'Такой пользователь не существует';
    exit();
}

setcookie('user', $user['name'], time() + 3000, '/');

$mysql->close();

header('location:../home.php');


?>