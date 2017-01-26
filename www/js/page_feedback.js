var feedback = {
	render: function() {
		feedback.bindEvents();
	},
	bindEvents:	function() {
		if(!feedback.notFirstUse) {
			$('.feedbackSend').on('click', function(){
				if($('.feedback').val() != "") {
					if(localStorage.getItem("userInfo") == null) {
						app.alert(dictionary.plsLogin, dictionary.error);
					}
					else {
						entrypoints.feedbackSend();
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