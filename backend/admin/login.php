<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<title>Title</title>
</head>
<body>
	<!-- ���� ��� ����� ������ ��� �����/����������� -->
	<p><?
		
		session_start();
		echo 'login: ';
		if($_SESSION['loggedIn'] == 'yes') {
			echo $_SESSION['login'];
			if($_SESSION['admin']){
				echo ' (admin)';
			}
		} else {
			echo 'Vi ne voshli v sistemu!';
		}
		
	?></p>
	<input class="login" name="login" size="32"  type="text" placeholder="Login">
	<input class="pass" name="pass" size="32"  type="text" placeholder="Password">
	<input class="signin" name="signin" type="button" value="Log in">
	<input class="logout" name="logout" type="button" value="logout">


<script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<script>
	
	//����� (�������� ��� �������).
	
	$(".signin").on("click", function(){
		
		//�������� �� ����� ��� �������� ������ �� ������.
		if( 
			( $(".login").val().length < 4 ) || ( $(".pass").val().length <8 ) 
		){
			alert("������! ����������� ����� ������ - 8, ����������� ����� ������ - 4");
		}
		
		shortAjax(
			"../entrypoints/loginChecker.php", 
			
			{
			"login": $(".login").val(),
			"pass": $(".pass").val(),
			},
			
			function(data){
				alert(data);
			}
		);
		
	});
	
	$(".logout").on("click", function(){
			
		shortAjax(
			"../entrypoints/logout.php",
			{},
			function(data){
				alert(data);
			}
		);
		
	});
	
	
	//����������� ajax.
	
	var shortAjax = function(url, data, onSuccess){
		$.ajax({
			method : "POST",
			url: url,
			data: data,
			success: onSuccess,
		
		});
	};
	
</script>
</body>
</html>