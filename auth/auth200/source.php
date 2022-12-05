<?php
include_once('secret.php');

if(isset($_GET['source'])){
    show_source(__FILE__);
    die();
}

$message = "";

if (isset($_POST['flag']))
{
    $flag = htmlspecialchars(trim($_POST['flag']));

    $key = "Th1s_1s_@_x0r_k3y_l0l!";
    $encrypted_flag = "";
    if (!empty($flag))
    {
        for ($i = 0; $i < strlen($flag) ; ++$i) {
            $encrypted_flag .= chr(ord($flag[$i]) ^ ord($key[$i % strlen($key)]));
        }
        if (bin2hex($encrypted_flag) === "3c09431700451c00232d19531900026c1e2a09431f7e38075d527e1052")
            $message = "W0w ! Good J0b !! Let's say to SakiiR that u broke this one, show him your keygen ! Oh, I almost forgotten to give u the flag ! ".$g_flag;
        else
            $message = "Arf, It is far from the reality : ".bin2hex($encrypted_flag);
    }
}
?>
