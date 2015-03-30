//login
//pass
$("#container").hide();
$("#button_login").click(function() {
     console.log("Login");
  login();
});


    
function login(){
    console.log("Login");
    var url="http://stephanegoyet.fr/gsb/gsb_server/php/index_gosimpleapp.php/Visiteur/login/"+$("#login").val()+"/mdp/"+$("#pass").val();
    console.log(url);
    $.ajax({
         dataType: "json",
         url: url,
         context: document.body,
         statusCode: {
           404: function() {
            alert( "page not found" );
            }
        },
        fail: function() {
            alert( "error" );
            }
        }).done(function(data) {
            console.log(data);
            if ($.isArray(data) && data.length){
                $("#container").show();
            }else{
                $("#container").hide();
              
            }
            }).fail(function( jqxhr, textStatus, error ) {
                var err = textStatus + ", " + error;
                console.log( "Request Failed: " + err );
              });
}