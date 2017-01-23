<?
session_start();
	
if($_SESSION['admin'] != true){
	include('includes/header.php');
?>
	<h1 style="padding: 2em 0">Админпанель<br />Кэскил-онлайн</h1>
	<div class="main-login">
		<form action="../entrypoints/loginChecker.php" type="POST">
			<input class="login" name="login" size="32"  type="text" placeholder="Логин">
			<input class="pass" name="pass" size="32"  type="text" placeholder="Пароль">
			<input class="signin" name="signin" type="submit" value="Войти">
		</form>
	</div>

<script>
	var signin = document.querySelector(".signin");
	var login = document.querySelector(".login");
	var pass = document.querySelector(".pass");
	
	signin.onclick = function() {
		if( 
			( login.value.length < 4 ) || ( pass.value.length <8 ) 
		){
			alert("Ошибка! Минимальная длина пароля - 8, минимальная длина логина - 4");
			return false;
		};
	};
</script>
<?
	include('includes/footer.php');
	}
	exit();
?>