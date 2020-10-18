<?php
    $host = 'localhost'; // адрес сервера 
    $database = 'u1063682_sqlmipoint'; // имя базы данных
    $user = 'u1063682_one_cod'; // имя пользователя
    $password = 'Qwerty1@';// пароль // заданный вами пароль
    $link = mysqli_connect($host, $user, $password, $database);
    
    $query ="INSERT tempOrder(finish_address,stock) VALUES ('{$_POST['finish_address']}',{$_POST['stock']})";
        mysqli_set_charset($link,"utf8");
        mysqli_query($link,"SET NAMES 'utf8'");
        mysqli_query($link,"SET CHARACTER SET 'utf8'");
    mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));
    $query ="SELECT tempOrder.id from tempOrder where finish_address='{$_POST['finish_address']}' AND stock={$_POST['stock']}";
    $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));
    for ($data; $row = mysqli_fetch_assoc($result); $data=$row);
    $index = json_decode(json_encode($data))->id;
    //echo  $jsonResult->id;
    $query = "SELECT tempOrder.ready from tempOrder WHERE tempOrder.id={$index}";
    $check = 0;
    while($check == 0){
        $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));
        for ($data; $row = mysqli_fetch_assoc($result); $data=$row);
        $check = json_decode(json_encode($data))->ready;
    }
    $query = "call selectPreviewCouriers({$index})";
    $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));
    for ($data = []; $row = mysqli_fetch_assoc($result); $data[] = $row);
    // $query = "call deleteTempData({$index})";
    //     mysqli_set_charset($link,"utf8");
    //     mysqli_query($link,"SET NAMES 'utf8'");
    //     mysqli_query($link,"SET CHARACTER SET 'utf8'");
    // $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));
    $jsonResult = json_encode($data);
    echo  $jsonResult;
    // mysql_close($link);
?>