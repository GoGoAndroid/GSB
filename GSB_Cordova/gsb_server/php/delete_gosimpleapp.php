<?php
/*
 *  Serveur ftp          : ftp.gosimpleapp.com  ou ftp.cluster014.ovh.net
    Login ou utilisateur : gosimple
    Mot de passe         : 43ieFWDD
 */
 $serveur = "gosimplemod1.mysql.db";
$base = "gosimplemod1";
$user = "gosimplemod1";
$pass = "56TttNHHDhg";

$mysqli = new mysqli($serveur, $user, $pass, $base);

$id = $_GET["id"];
$tableName = $_GET["tableName"];
$sql = "delete from  $tableName where id = $id";
header("Access-Control-Allow-Origin: *");
if ($mysqli->query($sql)) {
    echo $id;
}
else {
    echo 'echec';
}
    
    
?>

