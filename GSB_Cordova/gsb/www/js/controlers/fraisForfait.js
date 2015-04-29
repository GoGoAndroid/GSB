/* 
 
 TABLE `FraisForfait` (
  `id` char(3) NOT NULL,
  `libelle` char(20) DEFAULT NULL,
  `montant` decimal(5,2) DEFAULT NULL,

TABLE `LigneFraisForfait` (
  `idVisiteur` char(4) NOT NULL,
  `mois` char(6) NOT NULL,
  `idFraisForfait` char(3) NOT NULL,
  `quantite` int(11) DEFAULT NULL,
  
 */
var templateForfait = " <label  style=\"width:15em;\" id=\"basic-addon1\" >TEMPLATE_LIBELLE</label> " +
            "<input  style=\"width:5em;\" type=\"number\" id=\"TEMPLATE_QTE_ID\" placeholder=\"00.0\" value=\"TEMPLATE_MONTANT\"> <br/>"

/*var templateForfait="       <div class=\"row\">"+
            "<div class='col-md-8'><span id=\"TEMPLATE_ID\">TEMPLATE_LIBELLE &nbsp; TEMPLATE_MONTANT</span></div>"+
            "<div class='col-md-2'><input style='width: 2em;' id=\"TEMPLATE_QTE_ID\" type=\"number\" class=\"form-control\"  aria-describedby=\"TEMPLATE_ID\"></div>"+    
            "<div class='col-md-2'><span><span class=\"glyphicon glyphicon-plus\" aria-hidden=\"true\"></span></span></div>"+
        "</div>";*/

var labelsForfaits=[];
var lignesForfait=[];
function getLabelForfaits(){
    
    console.log("getLabelForfaits");
    appelAjaxForListAll(setLabelsForfaits, "libelle", "ASC", "FraisForfait");    
}

 

function resetLabelForfaits(){
    $("#labels_forfait" ).html("");  
}

function setLabelsForfaits(labelsForfait_){
    labelsForfaits=labelsForfait_;
    console.log("getLabelForfaits labelsForfait");
        for (var i = 0; i < labelsForfaits.length ; i++) {
            var htmlForfait=templateForfait.replace("TEMPLATE_ID","tpl_"+labelsForfaits[i].id);
            htmlForfait=htmlForfait.replace("TEMPLATE_QTE_ID",labelsForfaits[i].id);
            htmlForfait=htmlForfait.replace("TEMPLATE_LIBELLE",labelsForfaits[i].libelle);
            htmlForfait=htmlForfait.replace("TEMPLATE_MONTANT",labelsForfaits[i].montant);
            console.log("Append forfait "+labelsForfaits[i].libelle);
            $("#labels_forfait" ).append(htmlForfait);
        } 
}


function getFraisForfait(userId,nomMois){
    console.log("get LigneFraisForfait");
     appelAjaxForGet(setForfaitFields,userId, nomMois, "idFraisForfait",  "ASC", "LigneFraisForfait");
}

function setForfaitFields(receivedLignesForfait){
     console.log("callback LigneFraisForfait");
    lignesForfait=receivedLignesForfait;
    for (var i = 0; i < lignesForfait.length ; i++) {
         console.log("LigneFraisForfait update ligne "+i+" id "+lignesForfait[i].idFraisForfait);
        $("#"+lignesForfait[i].idFraisForfait).val(lignesForfait[i].quantite);
           
    }
    
}


resetLabelForfaits();
getLabelForfaits();