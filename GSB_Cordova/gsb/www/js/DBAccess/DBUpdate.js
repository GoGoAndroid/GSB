/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function appelAjaxForUpdate(tableName, idRow, callBack, ligneModifiee){
    var url = phpGet
    
    +"/"+ tableName + "/" + idRow; 
    console.log(tableName + " Appel ajax : url : " + url); 
    console.log("Update Data : "+ ligneModifiee.montant);
    console.log("Update appel ajax : url : " + url); 
    $.ajax({
        dataType: "json",
        url: url,
        type: 'PUT',
        context: document.body,
        data : ligneModifiee,
        statusCode: {
            404: function() {
                alert("Update page not found");
            }
        },
        fail: function() {
            alert("Update error");
        }
    })
    .done(function(data) {
        console.log("Update done : "+ idRow);
        console.log("Update done Data : "+ ligneModifiee.montant);   
        callBack(idRow,ligneModifiee);
        });
 }
