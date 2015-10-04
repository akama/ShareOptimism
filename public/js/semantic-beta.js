( function () {
    var dataUrl = 'http://genre-classifier.eu-gb.mybluemix.net/test?userid=';
    $("#twitter_btn").on("click", function(event) {
        var userName = $("#username").val();
        dataUrl += userName;
        console.log(userName);
        $.getJSON(dataUrl)
         .done(function(data){
            console.log(data);
            $("#result").html(data.user);        
       });   
    });

})()