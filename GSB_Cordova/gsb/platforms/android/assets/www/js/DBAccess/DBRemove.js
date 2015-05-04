/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var phpDelete = "http://stephanegoyet.fr/gsb/gsb_server/php/delete_gosimpleapp.php";

 function appelAjaxForDelete(tableName, idRow, callBack){
    var url = phpDelete+"?"+
    
    "id="+idRow+"&tableName="+tableName;
    
    console.log("Delete appel ajax : url : " + url); 
    $.ajax({
        dataType: "json",
        url: url,
        type: 'GET',
        context: document.body,
        statusCode: {
            404: function() {
                alert("Delete page not found");
            }
        },
        fail: function() {
            alert("Delete error");
        }
    })
    .done(function(data) {
        console.log("Delete done : "+ idRow);
        callBack(idRow);
        });
 }
 