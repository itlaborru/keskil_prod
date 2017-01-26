<?
	session_start();
	$isAdmin = false;
	
	if($_SESSION['admin'] == true){
		$isAdmin = true;
	};
	
	$loginFordb = 'valeratop';
	$passFordb = '123456';
	
	include('includes/connect.php');
	include('includes/header.php');
?>

<? if($isAdmin != true) { ?>
<div class="main-login">
	<form action='../entrypoints/loginChecker.php' method="POST">
		<input class="login" name="login" size="32"  type="text" placeholder="Логин" />
		<input class="pass" name="pass" size="32"  type="text" placeholder="Пароль" />
		<input name="adminClient" type="hidden" value="true" />
		<input class="signin" name="signin" type="submit" value="Войти" />
	</form>
</div>

<?
} else {
?>
	<a href="contests.php"> Конкурсы </a> <br/><br/> 
	<a href="cartoons.php"> Мультфильмы </a> <br/><br/>
	<a href="news.php"> Новости </a> <br/><br/> 
	<a href="pulsegoroda.php"> Пульс города </a> <br/><br/>
	<a href="pulsegorodaModeration.php"> Пульс города (модерация) </a><br/><br/>
	<a href="feedback.php"> Обратная связь </a><br/><br/>
	<a href="users.php"> Пользователи </a><br/><br/>
	
	<form action='../entrypoints/logout.php' method="POST">
		<input name="adminClient" type="hidden" value="true" />
		<input class="logout" name="logout" type="submit" value="Выйти" />
	</form>
	
<?
}
include('includes/footer.php');
?>