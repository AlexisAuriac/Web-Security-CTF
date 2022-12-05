<?php

include_once('secret.php');

if(isset($_GET['source'])){
    show_source(__FILE__);
    die();
}

$message = "";

if (isset($_POST['username']) && isset($_POST['password']))
{
    $username = htmlspecialchars(trim($_POST['username']));
    $password = htmlspecialchars(trim($_POST['password']));
    if (!empty($username) && !empty($password) && strlen($username) > 5)
    {
        $sum = 0;
        for ($i = 0 ; $i < strlen($username) ; ++$i)
            $sum += ord($username[$i]); // 1nTr3sT1nG, 15n't 1t ?
        if ($password === strval($sum)) {
            $message = 'Congrats ! Validate with this flag : '.$g_flag;
        } else $message = 'Bad Password ! Remember that the password is generated with the username ! Like a KeygenMe !';
    } else $message = "Username have to be 6 chars at least";
}
?>
