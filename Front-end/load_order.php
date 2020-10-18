<?php
    $host = 'localhost'; // адрес сервера 
    $database = 'u1063682_sqlmipoint'; // имя базы данных
    $user = 'u1063682_one_cod'; // имя пользователя
    $password = 'Qwerty1@';// пароль // заданный вами пароль
    $link = mysqli_connect($host, $user, $password, $database);
    //$query ="INSERT orders(latitude,longitude,address,courier_id,stock) VALUES (1,2,'3',4,5)";
    $query ="INSERT orders(latitude,longitude,address,courier_id,stock) VALUES ({$_POST['lat']},{$_POST['lon']},'{$_POST['address']}',{$_POST['courier_id']},{$_POST['id_building']})";
        mysqli_set_charset($link,"utf8");
        mysqli_query($link,"SET NAMES 'utf8'");
        mysqli_query($link,"SET CHARACTER SET 'utf8'");
    mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));
    $query ="UPDATE couriers SET busy=1 WHERE couriers.id={$_POST['courier_id']}";
        mysqli_set_charset($link,"utf8");
        mysqli_query($link,"SET NAMES 'utf8'");
        mysqli_query($link,"SET CHARACTER SET 'utf8'");
    mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));
    echo "fdfsdf";
?>