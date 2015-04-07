//login
//pass

var loginUtilisateur;
var idUtilisateur;
var moisEnLettres = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Décembre"];
var mois = [];
$("#container").hide();

$("#button_login").click(function() {
    console.log("Login");
    videDropDownMois();
    videFraisHorsForfait();
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
    var url = "http://stephanegoyet.fr/gsb/gsb_server/php/index_gosimpleapp.php/Visiteur/login/" + loginUtilisateur + "/mdp/" + $("#pass").val();
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
    //getMoisAvecLigneHorsFrais(ordonnerMois);
    //ordonnerMois(creerLesLignesDuDropDown);
}

function getMoisAvecFraisPourLeVisiteur(callBack) {
    // utilisateur ( login)
    //select distinct(mois) from fichefrais where idVisiteur = idUtilisateur 
    var url = "http://stephanegoyet.fr/gsb/gsb_server/php/index_gosimpleapp.php/fichefrais/idVisiteur/" + idUtilisateur+"?by=mois&order=desc";
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
                // console.log("Mois sélectionné : " + moisSelectionne + " résultat du test : " + $.inArray(moisSelectionne, mois));
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
    //mois[indiceMois];// 201301
    
    $('#dropdownMenu3').html(formaterDate(mois[indiceMois]));
}



function getMoisAvecLigneHorsFrais() {
var url = "http://stephanegoyet.fr/gsb/gsb_server/php/index_gosimpleapp.php/LigneFraisHorsForfait/idVisiteur/" + idUtilisateur+"?by=mois&order=desc";
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
                // console.log("Mois sélectionné : " + moisSelectionne + " résultat du test : " + $.inArray(moisSelectionne, mois));
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
}
function buildDropDownLine(indiceMois) {
    return '<li role="presentation"><a role="menuitem" tabindex="'+indiceMois+'" href="javascript:changeDropDownTitle('+indiceMois+');">'+formaterDate(mois[indiceMois])+'</li>';
}

