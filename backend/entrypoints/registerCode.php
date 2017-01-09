<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<title>Регистрация</title>
</head>
<body>
	<input class="fname" name="fname" size="32"  type="text" placeholder="fname">
	<input class="lname" name="lname" size="32"  type="text" placeholder="lname">
	<input class="push" name="push" type="button" value="push">
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
	<script>
		
		<?//Cам по себе это генератор аккаунта при наличии письма на почту.?>
		
		$('.push').on('click', function(){
			$.ajax({
				method : 'GET',
				url: 'codeChecker.php',
				data: {
					<? echo '"login" : "'.$_GET['login'].'",' ?>
					<? echo '"code" : "'.$_GET['code'].'",' ?>
					"fname" : $('.fname').val(),
					"lname" : $('.lname').val(),
				},
				success: function(data){
					alert(data);
				},
				error: function(xhr, stat){
					alert(stat);
				}
			});
		});
		
	</script>
</body>
</html>