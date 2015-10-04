( function () {
    $("#twitter_btn").on("click", function(event) {
	var dataUrl = '/watson?userid=';
        var userName = $("#username").val();
        dataUrl += userName;
        console.log(userName);
        $.getJSON(dataUrl)
         .done(function(data){
	    $("#pos_bar").css("width", String(Math.floor(100*(data["positive"]/data["total"]))) + "%")
	    $("#new_bar").css("width", String(Math.floor(100*(data["neutral"]/data["total"]))) + "%")
	    $("#neg_bar").css("width", String(Math.floor(100*(data["negative"]/data["total"]))) + "%")
            console.log(data);
            $("#result").html(data.user);        
       });   
    });

})()
