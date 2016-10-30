$$('.feedbackSend').on('click', function(){
	if($$('.feedback').val() != "") {
		//console.log($$('.feedback').val());
		shortAjax('http://it-labor.ru/playground/valera/feedback.php', 
			{
				'type':'upload',
				'content':	$$('.feedback').val(),
			},
			function(data) {
				console.log(data);
				$$('.feedback').val("");
				myApp.alert('Предложение отправленр', 'Успешно');
			}
		);
	}
	else {
		myApp.alert('Поле пусто', 'Сообщение об ошибке');
	}
});