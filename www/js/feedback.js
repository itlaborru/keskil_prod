$$('.feedbackSend').on('click', function(){
	if($$('.feedback').val() != "") {
		if(localStorage.getItem("userName") == null) {
			myApp.alert(dictionary.plsLogin, dictionary.error);
		}
		else {
			shortAjax('http://it-labor.ru/playground/valera/feedback.php', 
				{
					'type':'upload',
					'content':	$$('.feedback').val(),
					'user':	localStorage.getItem("userName"),
				},
				function(data) {
					console.log(data);
					$$('.feedback').val("");
					myApp.alert(dictionary.feedbackSent, dictionary.success);
				}
			);
		}
	}
	else {
		myApp.alert(dictionary.emptyField, dictionary.error);
	}
});