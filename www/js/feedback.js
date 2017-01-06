var feedback = {
	bindEvents:	function() {
		$('.feedbackSend').on('click', function(){
			if($('.feedback').val() != "") {
				if(localStorage.getItem("userName") == null) {
					app.alert(dictionary.plsLogin, dictionary.error);
				}
				else {
					ajax(entrypoints.feedback.url,entrypoints.feedback.data,entrypoints.feedback.success);
				}
			}
			else {
				app.alert(dictionary.emptyField, dictionary.error);
			}
		});
	},
}