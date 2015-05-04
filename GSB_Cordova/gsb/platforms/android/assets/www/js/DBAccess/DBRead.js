
 
function appelAjaxForListAll(doneFunction, orderBy, order, table){
    var url = phpGet+"/"+ table +"?by="+orderBy+"&order="+order;
    console.log(table + " Appel ajax : url : " + url); 
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
    })
    .done(function(data) {
        console.log(table+" Done > callback");
        doneFunction(data);
        });
    }

function appelAjaxForGet(doneFunction,userId, nomMois, orderBy, order, table){
    var url = phpGet+"/"+
    table +"/idVisiteur/" + userId +"/mois/"+ nomMois +"?by="+orderBy+"&order="+order;
    console.log(table + " Appel ajax : url : " + url); 
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
    })
    .done(function(data) {
        console.log(table+" Done > callback");
         monthSelectedLines =[];
         if ($.isArray(data) && data.length > 0) {
            console.log("LigneFraisHorsForfait filtre des lignes de frais json");
            for (var i = 0; i < data.length ; i++) {
                if (data[i].mois==nomMois){
                             console.log("LigneFraisHorsForfait 1 mois ok");
                    monthSelectedLines.push(data[i]);
                }
            }
        }
        
        doneFunction(monthSelectedLines);
        });
    }