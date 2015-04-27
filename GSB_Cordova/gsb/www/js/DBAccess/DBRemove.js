/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


 function appelAjaxForDelete(tableName, idRow, callBack){
    var url = phpDelete+"?"+
    "id="+idRow+"&tableName="+tableName;
    console.log("Appel ajax : url : " + url); 
    $.ajax({
        dataType: "json",
        url: url,
        type: 'GET',
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
        console.log("Done");
        callBack(data);
        });
 }
 