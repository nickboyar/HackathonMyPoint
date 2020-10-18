<?php
    $host = 'localhost'; // адрес сервера 
    $database = 'u1063682_sqlmipoint'; // имя базы данных
    $user = 'u1063682_one_cod'; // имя пользователя
    $password = 'Qwerty1@';// пароль // заданный вами пароль
    $link = mysqli_connect($host, $user, $password, $database);
    $query ="SELECT buildings.*, organizations.name,organizations.products FROM buildings,organizations WHERE buildings.organization = organizations.id"; //AND organizations.products = 'Продукты'
        mysqli_set_charset($link,"utf8");
        mysqli_query($link,"SET NAMES 'utf8'");
        mysqli_query($link,"SET CHARACTER SET 'utf8'");
    $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));
    for ($data = []; $row = mysqli_fetch_assoc($result); $data[] = $row);
    $jsonResult = json_encode($data);
    echo $jsonResult;
?>