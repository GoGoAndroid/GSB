 Programme d'actualisation des lignes des tables,  
 cette mise à jour peut prendre plusieurs minutes...
<?php

//phpinfo();
include("include/fct.inc.php");
?>start...<?php
/* Modification des paramètres de connexion */

$serveur='mysql:host=localhost';
$bdd='gsb_valide';   		
$user='userGsb' ;    		
$mdp='secret' ;	
$server="localhost";

try {
	//$pdo = new PDO($serveur.';'.$bdd, $user, $mdp);
	 
	$pdo = new PDO('mysql:host='.$server.';dbname='.$bdd.'', $user, $mdp);
	//$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	$pdo->query("SET CHARACTER SET utf8"); 
	$req = "select * from ficheFrais";
		$res = $pdo->query($req);
		$lesLignes = $res->fetchAll();
	

} catch (PDOException $e) {
    echo 'Échec lors de la connexion : ' . $e->getMessage();
}

set_time_limit(0);
creationFichesFrais($pdo);
creationFraisForfait($pdo);
creationFraisHorsForfait($pdo);
majFicheFrais($pdo);

?>