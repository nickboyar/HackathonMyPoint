<?php
    $host = 'localhost'; // адрес сервера 
    $database = 'u1063682_gazprom_hakaton'; // имя базы данных
    $user = 'u1063682_all'; // имя пользователя
    $password = 'Qwerty1';// пароль // заданный вами пароль
    $link = mysqli_connect($host, $user, $password, $database);
    $query ="SELECT lat,lon,fulladress,location,rating,Zanatost FROM banks";
        mysqli_set_charset($link,"utf8");
        mysqli_query($link,"SET NAMES 'utf8'");
        mysqli_query($link,"SET CHARACTER SET 'utf8'");
    $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));
    for ($data = []; $row = mysqli_fetch_assoc($result); $data[] = $row);
    $jsonResult = json_encode($data);
    echo $jsonResult;
    mysql_close($link);
?>