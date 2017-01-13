<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<title>Title</title>
</head>
<body>
	<!-- Поле для ввода данных для входа/регистрации -->

	<input class="login" name="login" size="32"  type="text" placeholder="Login">
	<input class="pass" name="pass" size="32"  type="text" placeholder="Password">
	<input class="signin" name="signin" type="button" value="Log in">
	<input class="register" name="register" type="button" value="Register">
	<input class="logout" name="logout" type="button" value="logout">
	<input class="test1" name="test1" type="text" value="test1">
	<input class="test2" name="test2" type="text" value="test2">
	<input class="test" name="test" type="button" value="test">


<script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<script>
	
	//Логин (Действия при нажатии).
	
	$('.signin').on('click', function(){
		
		//Проверка на длину при отправке данных на сервер.
		if( 
			( $('.login').val().length < 4 ) || ( $('.pass').val().length <8 ) 
		){
			alert('Ошибка! Минимальная длина пароля - 8, минимальная длина логина - 4');
		}
		
		shortAjax(
			'loginChecker.php', 
			
			{
			'login': $('.login').val(),
			'pass': $('.pass').val(),
			},
			
			function(data){
				alert(data);
			}
		);
		
	});
	
	//Регистрация (Действия при нажатии).
	
	$('.register').on('click', function(){
		
		//Проверка на длину при отправке данных на сервер.
		if( 
			( $('.login').val().length < 4 ) || ( $('.pass').val().length <8 ) 
		){
			alert('Ошибка! Минимальная длина пароля - 8, минимальная длина логина - 4');
		}
		
		shortAjax(
			'registration.php',
			{ 
				'login': $('.login').val(), 
				'pass': $('.pass').val(),
			},
			function(data){
				alert(data);
			}
		);
		
	});
	
	$('.logout').on('click', function(){
			
		shortAjax(
			'../entrypoints/logout.php',
			{},
			function(data){
				alert(data);
			}
		);
		
	});
	
	
	$('.test').on('click', function(){
		
		shortAjax(
			'user-data-passChange.php',
			{
				oldPass : $('.test1').val(),
				pass : $('.test2').val()
			},
			function(data){
				console.log(data);
			}
		);
		
	})
	
	//Укороченный ajax.
	
	var shortAjax = function(url, data, onSuccess){
		$.ajax({
			method : 'POST',
			url: url,
			data: data,
			success: onSuccess,
		
		});
	};
	
</script>
</body>
</html>