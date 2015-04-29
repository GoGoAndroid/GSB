/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var idLigneHorsForfaitSelectionnee;

function findSelectedLineHorsForfait()
{
    //lignesHorsForfait
    for (var i = 0; i < lignesHorsForfait.length ; i++) {
            //console.log("check ligne  : " + i);
                if (lignesHorsForfait[i].id==id){
                     console.log("selectionLigneHorsForfait : found ligne");
                    //id="date_element_hors_forfait"
                    return lignesHorsForfait[i];
                }
            }    
}

function isLineChanged(lignesHorsForfait, montant, date, libelle)
{
    return (lignesHorsForfait.libelle == libelle && 
            lignesHorsForfait.montant == montant && 
            lignesHorsForfait.mois == date);
}

function updateLigneHorsForfait()
{    
    var ligneHorsForfait = findSelectedLineHorsForfait();
    var ligneHorsForfaitModifiee = ligneHorsForfait;
    
    ligneHorsForfaitModifiee.montant = $("#montant_element_hors_forfait").val();
    ligneHorsForfaitModifiee.mois = $("#date_element_hors_forfait").val();
    ligneHorsForfaitModifiee.libelle = $("#libelle_element_hors_forfait").val();
    
    if (isLineChanged(
        ligneHorsForfaitModifiee,
        ligneHorsForfaitModifiee.mois,
        ligneHorsForfaitModifiee.montant, 
        ligneHorsForfaitModifiee.libelle))
    {
        appelAjaxForUpdate(
                "LigneFraisHorsForfait",
                idLigneHorsForfaitSelectionnee, 
                miseAJourAffichage,
                ligneHorsForfaitModifiee);
    }
}

function miseAJourAffichage()
{
    $("#dateLigneHorsFrais_"+idLigneHorsForfaitSelectionnee).html(ligneHorsForfaitModifiee.mois);
    $("#montantLigneHorsFrais_"+idLigneHorsForfaitSelectionnee).html(ligneHorsForfaitModifiee.montant);
    $("#libelleLigneHorsFrais_"+idLigneHorsForfaitSelectionnee).html(ligneHorsForfaitModifiee.libelle);
}
