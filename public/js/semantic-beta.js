( function () {
    var dataUrl = 'http://genre-classifier.eu-gb.mybluemix.net/test';
    $("#twitter_btn").on("click", function(event) {
        var userName = $("#username").val();
        console.log(userName);
        $.get(dataUrl)
         .done(function(data){
            $("#result").html(data);        
       });   
    });

})()