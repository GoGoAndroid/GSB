<?php
    $serveur = "gosimplemod1.mysql.db";
$base = "gosimplemod1";
$user = "gosimplemod1";
$pass = "56TttNHHDhg";

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

