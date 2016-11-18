
//Логин (Действия при нажатии).
		
$$('.signin').on('click', function(){
	
	//Проверка на длину при отправке данных на сервер.
	if( 
		( $$('.login').val().length < 4 ) || ( $$('.pass').val().length <8 ) 
	){
		alert('Ошибка! Минимальная длина пароля - 8, минимальная длина логина - 4');
	} else {
		shortAjax(
			'http://it-labor.ru/playground/valera/loginChecker.php', 
			
			{
			'login': $$('.login').val(),
			'pass': $$('.pass').val(),
			},
			
			function(data){
				var dataLogin = JSON.parse(data);
				alert(dataLogin['text']);
				localStorage.setItem("phpSessionId", dataLogin.sessionId);
				localStorage.setItem("loggedIn", true);
				$$('.loginPanel').css('display', 'none');
				$$('.userPanel').css('display', 'block');
				$$('.userPanel__icon').attr('src', '');
				$$('.userPanel__name').html('Soedinenie s serverom ne ustanovilos!');
				shortAjax(
					'http://it-labor.ru/playground/valera/user-data-ajax.php', 
					
					{},
					
					function(data){
						var dataLogin = JSON.parse(data);
						$$('.userPanel__icon').attr('src', dataLogin.icon);
						$$('.userPanel__name').html(dataLogin.login);
					}
				);
			}
		);
	}
	
});

$$('.register').on('click', function(){

	//Проверка на длину при отправке данных на сервер.
	if( 
		( $$('.loginReg').val().length < 4 ) || ( $$('.passReg').val().length <8 ) 
	){
		alert('Ошибка! Минимальная длина пароля - 8, минимальная длина логина - 4');
	}
	
	shortAjax(
		'http://it-labor.ru/playground/valera/registration.php',
		{ 
			'login': $$('.loginReg').val(), 
			'pass': $$('.passReg').val(),
			'mail': $$('.mail').val()
		},
		function(data){
			alert(data);
		}
	);
	
});

$$('.logout').on('click', function(){
	
	shortAjax(
		'http://it-labor.ru/playground/valera/logout.php',
		{},
		function(data){
			alert(data);
			getCookie('PHPSESSID', null);
			localStorage.clear();
			console.log(localStorage.getItem('phpSessionId'));
			$$('.loginPanel').css('display', 'block');
			$$('.userPanel').css('display', 'none');
		}
	);
	
});