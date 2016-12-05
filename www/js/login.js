
//Логин (Действия при нажатии).
		
$$('.signin').on('click', function(){
	
	myApp.closePanel();
	
	//Проверка на длину при отправке данных на сервер.
	if( 
		( $$('.login').val().length < 4 ) || ( $$('.pass').val().length <8 ) 
	){
		alert(dictionary.error +dictionary.register);
	} else {
		shortAjax(entrypoints.signIn.url,entrypoints.signIn.data,entrypoints.signIn.success);
	}
	
});

$$('.register').on('click', function(){
	
	myApp.closePanel();
	
	//Проверка на длину при отправке данных на сервер.
	if( 
		( $$('.loginReg').val().length < 4 ) || ( $$('.passReg').val().length <8 ) 
	){
		alert(dictionary.error +dictionary.register);
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
			$$('.login').val('');
			$$('.pass').val('');
			$$('.loginReg').val('');
			$$('.passReg').val('');
			$$('.mail').val('');
		}
	);
	
});

$$('.logout').on('click', function(){
	currentLogin = "";
	
	myApp.closePanel();
	
	$$('.login').val('');
	$$('.pass').val('');
	$$('.loginReg').val('');
	$$('.passReg').val('');
	$$('.mail').val('');
	
	mainView.router.back({'pageName':'index', 'force':true});
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

$$('.updateUserinfo').on('click', function(){
	
	updateUserinfo();
	
});