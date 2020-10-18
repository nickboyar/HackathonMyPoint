<?
$host = 'localhost'; // адрес сервера 
    $database = 'u1063682_sqlmipoint'; // имя базы данных
    $user = 'u1063682_one_cod'; // имя пользователя
    $password = 'Qwerty1@';// пароль // заданный вами пароль
    $link = mysqli_connect($host, $user, $password, $database);
    $query = "DELETE FROM tempOrder WHERE tempOrder.id={$_POST['id']}";
    mysqli_set_charset($link,"utf8");
    mysqli_query($link,"SET NAMES 'utf8'");
    mysqli_query($link,"SET CHARACTER SET 'utf8'");
    mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));
    echo "fdsfsdfds";
?>