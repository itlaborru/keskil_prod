$$('.feedbackSend').on('click', function(){
	if($$('.feedback').val() != "") {
		if(localStorage.getItem("userName") == null) {
			myApp.alert('Войдите в свой аккаунт', 'Ошибка');
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
					myApp.alert('Предложение отправлено', 'Успешно');
				}
			);
		}
	}
	else {
		myApp.alert('Поле пусто', 'Сообщение об ошибке');
	}
});