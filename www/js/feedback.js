$$('.feedbackSend').on('click', function(){
	if($$('.feedback').val() != "") {
		if(localStorage.getItem("userName") == null) {
			myApp.alert(dictionary.plsLogin, dictionary.error);
		}
		else {
			shortAjax(entrypoints.feedback.url,entrypoints.feedback.data,entrypoints.feedback.success);
		}
	}
	else {
		myApp.alert(dictionary.emptyField, dictionary.error);
	}
});