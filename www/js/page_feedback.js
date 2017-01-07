var feedback = {
	render: function() {
		feedback.bindEvents();
	},
	bindEvents:	function() {
		if(!feedback.notFirstUse) {
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
		}
		feedback.notFirstUse = true;
	},
	notFirstUse: false,
}