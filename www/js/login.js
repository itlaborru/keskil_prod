
//����� (�������� ��� �������).
		
$$('.signin').on('click', function(){
	
	//�������� �� ����� ��� �������� ������ �� ������.
	if( 
		( $$('.login').val().length < 4 ) || ( $$('.pass').val().length <8 ) 
	){
		alert('������! ����������� ����� ������ - 8, ����������� ����� ������ - 4');
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
				$$('.loginPanel').css('display', 'none');
				$$('.userPanel').css('display', 'block');
			}
		);
	}
	
});

$$('.register').on('click', function(){

	//�������� �� ����� ��� �������� ������ �� ������.
	if( 
		( $$('.loginReg').val().length < 4 ) || ( $$('.passReg').val().length <8 ) 
	){
		alert('������! ����������� ����� ������ - 8, ����������� ����� ������ - 4');
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
			$$('.loginPanel').css('display', 'block');
			$$('.userPanel').css('display', 'none');
		}
	);
	
});