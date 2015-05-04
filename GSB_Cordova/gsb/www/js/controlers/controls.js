//login
//pass

var loginUtilisateur = "lvillachane";
var password = "jux7g";
var idUtilisateur;
var moisEnLettres = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Décembre"];
var mois = [];
var lignesHorsForfait = [];
//var phpGet = "http://localhost/GSB_Cordova/index_localhost.php";
//var phpDelete = "http://localhost/GSB_Cordova/delete_localhost.php";
var phpGet = "http://stephanegoyet.fr/gsb/gsb_server/php/index_gosimpleapp.php";
$("#container").hide();


$("#button_login").click(function() {
    
    console.log("Login");
    videDropDownMois();
    videFraisHorsForfait();
    loginUtilisateur=$('#login').val();
    password =$('#pass').val();
    login();
});

function videDropDownMois() {
    $("#dropDownMoisItemList").html("");
    console.log( $("#dropDownMoisItemList").html());
}
function videFraisHorsForfait(){
    $("#fraisHorsForfait").html("");
    console.log( $("#dropDownMoisItemList").html(""));
    }

function login() {
    console.log("Login");
    loginUtilisateur = $("#login").val();
    //var url = "http://stephanegoyet.fr/gsb/gsb_server/php/index_gosimpleapp.php/Visiteur/login/" + loginUtilisateur + "/mdp/" + $("#pass").val();
    var url = phpGet+"/Visiteur/login/"+loginUtilisateur+"/mdp/" + password;
    console.log(url);
    $.ajax({
        dataType: "json",
        url: url,
        context: document.body,
        statusCode: {
            404: function() {
                alert("page not found");
                $("#container").hide();
            }
        },
        fail: function() {
            alert("error");
            $("#container").hide();
        }
    }).done(function(tableauDesVisiteurs) {
        console.log(tableauDesVisiteurs);
        if ($.isArray(tableauDesVisiteurs) && tableauDesVisiteurs.length > 0) {
            utilisateurConnecte(tableauDesVisiteurs);
        } else {
            $("#container").hide();

        }
    }).fail(function(jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.log("Request Failed: " + err);
        $("#container").hide();
    });
}

function utilisateurConnecte(tableauDesVisiteurs) {
    $("#container").show();
    idUtilisateur = tableauDesVisiteurs[0]["id"];
    console.log("id utilisateur = " + idUtilisateur);
    initialisationDuDropDown();
}

function initialisationDuDropDown() {
    mois = [];
    getMoisAvecFraisPourLeVisiteur(getMoisAvecLigneHorsFrais);
 
}

function getMoisAvecFraisPourLeVisiteur(callBack) {
    // utilisateur ( login)
    //select distinct(mois) from fichefrais where idVisiteur = idUtilisateur 
    var url = phpGet+"/fichefrais/idVisiteur/" + idUtilisateur+"?by=mois&order=desc";
    console.log("url : " + url);    
    $.ajax({
        dataType: "json",
        url: url,
        context: document.body,
        statusCode: {
            404: function() {
                alert("page not found");
            }
        },
        fail: function() {
            alert("error");
        }
    }).done(function(tableauDesFrais) {
        var contentDropDown = "";
        if ($.isArray(tableauDesFrais) && tableauDesFrais.length > 0) {
            for (var i = 0; i < tableauDesFrais.length && i<10; i++) {
                moisSelectionne = tableauDesFrais[i].mois;
                if ($.inArray(moisSelectionne, mois) === -1) {
                    mois.push(moisSelectionne);
                }
            }
        }
        console.log("Fin de getMoisAvecFraisPourLeVisiteur");
        callBack();
    }).fail(function(jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.log("Request Failed: " + err);
    });
}
function formaterDate(unMoisSelectionne) {
    console.log(unMoisSelectionne);
    var mois = "";
    //str.substring(1, 4);
    var annee = unMoisSelectionne.substring(0,4);
    if(unMoisSelectionne.substring(4,5) === "0")    {
        mois = unMoisSelectionne.substring(5,6);
    }
    
    else{
        mois = unMoisSelectionne.substring(4,6);
    }
    console.log("mois : "+ mois);
    var ceMoisEnLettres = moisEnLettres[mois-1];
    console.log("annee : "+ annee + "mois : "+ceMoisEnLettres);
    // TODO problème de casse à l'affichage du mois à régler
    return (ceMoisEnLettres+" "+annee);
}
function changeDropDownTitle(indiceMois) {
    $('#dropdownMenu3').html(formaterDate(mois[indiceMois]));
    
    
}



function getMoisAvecLigneHorsFrais() {
var url = phpGet+"/LigneFraisHorsForfait/idVisiteur/" + idUtilisateur+"?by=mois&order=desc";
    console.log("url : " + url);    
    $.ajax({
        dataType: "json",
        url: url,
        context: document.body,
        statusCode: {
            404: function() {
                alert("page not found");
            }
        },
        fail: function() {
            alert("error");
        }
    }).done(function(tableauDesFrais) {
        var contentDropDown = "";
        if ($.isArray(tableauDesFrais) && tableauDesFrais.length > 0) {
            for (var i = 0; i < tableauDesFrais.length && i<10; i++) {
                moisSelectionne = tableauDesFrais[i].mois;
                if ($.inArray(moisSelectionne, mois) === -1) {
                    mois.push(moisSelectionne);
                }
            }
        }
        console.log("Fin de getMoisAvecLigneHorsFrais");
        ordonnerMois();
        creerLesLignesDuDropDown();
    }).fail(function(jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.log("Request Failed: " + err);
    });
}
function ordonnerMois() {
    mois.sort();
    mois.reverse();
    console.log("Fin de ordonnerMois");

} 
function creerLesLignesDuDropDown() {
    contentDropDown = "";
    console.log("créer creerLesLignesDuDropDown : " + mois.length);
    for (var i = 0; i < mois.length; i++) {
        contentDropDown += buildDropDownLine(i);
        console.log("Boucle creerLesLignesDuDropDown : "+contentDropDown );
    }
    console.log("Fin CreerLesLignes");
    $("#dropDownMoisItemList").html(contentDropDown);
    selectionnerMois(0);
}
function buildDropDownLine(indiceMois) {
    return '<li id="'+buildIdForLigneFrais(indiceMois)+
            '" role="presentation"><a role="menuitem" tabindex="'+
            indiceMois+'" href="javascript:selectionnerMois('+indiceMois+');">'+
            formaterDate(mois[indiceMois])+'</li>';
}

function buildIdForLigneFrais(i){
    
    return "ligne_de_frais_du_dropDown" + i;
}
 
 function selectionnerMois(pIndiceMois){
    for(var indiceMois=0 ; indiceMois < mois.length ; indiceMois++){
        $("#"+buildIdForLigneFrais(indiceMois)).removeClass("active");
    }
    $("#"+buildIdForLigneFrais(pIndiceMois)).addClass("active");
       console.log("selectionnerMois change title "+mois[pIndiceMois]);
    changeDropDownTitle(pIndiceMois);
    
    getFraisForfait(idUtilisateur,mois[pIndiceMois]);
    
    console.log("selectionnerMois lireLigneHorsFraisBDD "+mois[pIndiceMois]);
    lireLigneHorsFraisBDD(ecrireLigneHorsFrais,pIndiceMois);
    
 }
 
 function lireLigneHorsFraisBDD(callBack, indiceMois){
    console.log("lireLigneHorsFraisBDD :");
    
     var doneFunction= function(tableauDesFrais){
         lignesHorsForfait=tableauDesFrais;
         $("#fraisHorsForfait").html("");
        var contentDropDown = "";
        if ($.isArray(tableauDesFrais) && tableauDesFrais.length > 0) {
            console.log("LigneFraisHorsForfait Reception des lignes de frais json");
            for (var i = 0; i < tableauDesFrais.length ; i++) {
                ecrireLigneHorsFrais(new LigneHorsFrais(tableauDesFrais[i]));
            }
        }
        else {
            console.log(" lireLigneHorsFraisBDD Pas de ligne");
            ecrirePasDeLigneHorsForfais();
        }
     };
    console.log("LigneFraisHorsForfait appelAjaxForGet : ");
    appelAjaxForGet(doneFunction ,idUtilisateur,mois[indiceMois], "date" , "desc","LigneFraisHorsForfait");
    console.log("lireLigneHorsFraisBDD ApresappelAjaxForGet :");
 }
 
 function ecrirePasDeLigneHorsForfais(){
      $("#fraisHorsForfait")
    .append("<small><i >pas de ligne de frais</i></small>");
 }
 
 function ecrireLigneHorsFrais(uneLigneHorsFrais){
     console.log("LigneFraisHorsForfait date : " + uneLigneHorsFrais.date);
     $("#fraisHorsForfait")
    .append($('<tr id="LigneHorsFrais_'+uneLigneHorsFrais.id + '" onclick=selectionLigneHorsForfait('+
        '"'+uneLigneHorsFrais.id+'")>')
    .append($('<td  id="dateLigneHorsFrais_'+uneLigneHorsFrais.id+'">')
        .text(uneLigneHorsFrais.date)
        )
    .append($('<td  id="libelleLigneHorsFrais_'+uneLigneHorsFrais.id+'">')
        .html("<div style='width:8em;'><small>"+uneLigneHorsFrais.libelle+"</small></div>")
        )
    .append($('<td  id="montantLigneHorsFrais_'+uneLigneHorsFrais.id+'">')
        .text(uneLigneHorsFrais.montant)
        )
     .append("<td   class='text-right'><"
            + "button id = 'btnRemoveElementHorsForfaitId_"
            + uneLigneHorsFrais.id + "' class ='btn btn-danger'"
            + "type='button'><span class='glyphicon glyphicon-remove'"
            + " aria-hidden='true' onclick = 'removeElementHorsFrais(" + uneLigneHorsFrais.id + ");'"
            + "></span></button></td></tr>")
        );
    console.log("fin");    
 }
 
 function removeElementHorsFrais(idRow) {
     console.log("Delete removeElementHorsFrais : "+idRow);
     appelAjaxForDelete("LigneFraisHorsForfait", idRow, suppressionLigneDuTableauHorsFrais);
 }
 
 function suppressionLigneDuTableauHorsFrais(data) {
     console.log("Delete data : " + data);
     var idLigneHorsForfait = data;
     $('#LigneHorsFrais_'+idLigneHorsForfait).html("");
 }
 
 function selectionLigneHorsForfait(id){
      idLigneHorsForfaitSelectionnee = id;
      console.log("selectionLigneHosrForfait : " + id);
      //lignesHorsForfait
      for (var i = 0; i < lignesHorsForfait.length ; i++) {
            console.log("check ligne  : " + i);
                if (lignesHorsForfait[i].id==id){
                     console.log("selectionLigneHorsForfait : found ligne");
                    //id="date_element_hors_forfait"
                    
                    $("#date_element_hors_forfait").val(format_date_for_saisie(lignesHorsForfait[i].mois));
                    $("#libelle_element_hors_forfait").val(lignesHorsForfait[i].libelle);
                    $("#montant_element_hors_forfait").val(lignesHorsForfait[i].montant);
                }
            }
      
 }
 function format_date_for_saisie(mois){
     //The specified value '201501' does not conform to the required format, 'yyyy-MM-dd'.
     return mois.substring(0,4)+"-"+mois.substring(4,6)+"-"+"01";
     
 }

