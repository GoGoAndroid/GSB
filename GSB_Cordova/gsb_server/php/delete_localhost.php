<?php
    $serveur = "localhost";
$base = "gsb_web";
$user = "dev";
$pass = "dev";

$mysqli = new mysqli($serveur, $user, $pass, $base);

$id = $_GET["id"];
$tableName = $_GET["tableName"];
$sql = 'delete from  $tableName where id = $id';
if ($mysqli->query($sql)) {
    echo $id;
}
else {
    echo 'echec';
}
    
    
?>

