( function () {
	$("#twitter_btn").on("click", function(event) {
		var dataUrl = '/watson?userid=';
		var userName = $("#username").val();
		dataUrl += userName;
		console.log(userName);
		$.getJSON(dataUrl)
			.done(function(data){
				var pos_percent = Math.floor(100*(data["positive"]/data["total"]));
				var new_percent = Math.floor(100*(data["neutral"]/data["total"]));
				var neg_percent = Math.floor(100*(data["negative"]/data["total"]));
				$("#pos_text").text("Positive: " + String(pos_percent) + "%");
				$("#new_text").text("Neutral: " + String(new_percent) + "%");
				$("#neg_text").text("Negative: " + String(neg_percent) + "%");
				$("#pos_bar").css("width", String(pos_percent) + "%");
				$("#new_bar").css("width", String(new_percent) + "%");
				$("#neg_bar").css("width", String(neg_percent) + "%");
				console.log(data);
				$("#result").html(data.user);
			});
	});

})()
