<?
	
	$loginFordb = 'valeratop';
	$passFordb = '123456';
	
	include('includes/functions.php');
	
	$db = connect($loginFordb, $passFordb);
	
	//Безопасность введенных данных (Если это скрипт, то скрипт будет преобразован в обычный текст).
	
	$login = stripslashes($_POST['login']);
	$login = htmlspecialchars($login);
	$pass = md5(stripslashes($_POST['pass']));
	$pass = htmlspecialchars($pass);
	$exittext = array();
	$result = '';
	$usersList = '';
	$adminCheck = '';
	$adminlist = '';
	
	//Текст, который будет выводится в конце скрипта.
	
	
	//Проверка на верность login'a.
	
	$result = mysql_query('SELECT `id`, `login`, `pass` FROM `users` WHERE login="'.$login.'"');
	$usersList = mysql_fetch_array($result);
	
	if($usersList["pass"] == $pass && $login != ''){//Проверка верности пароля.
		
		//Запоминание cookie.
		session_start();
		
		$_SESSION["varList"] = array();//Ведение варлиста очень сильно поможет при очистке сессии.
		
		$_SESSION["loggedIn"] = "yes";
		array_push($_SESSION["varList"], "loggedIn");
		$_SESSION["login"] = $login;
		array_push($_SESSION["varList"], "login");
		$_SESSION["id"] = $usersList['id'];
		array_push($_SESSION["varList"], "id");
		
		
		
		//Проверка на наличие админ прав.
		
		$adminCheck = mysql_query('SELECT `login` FROM `adminlist` WHERE login="'.$login.'"');
		$adminlist = mysql_fetch_array($adminCheck);
		
		if(!empty($adminlist)){
			$_SESSION['admin'] = true;
		} else {
			$_SESSION['admin'] = false;
		}
		
		array_push($_SESSION["varList"], "admin");
		
		//Редактирование сообщения выхода.
		
		$exittext['text'] = "Здравствуйте, ".$login."!";
		$exittext['sessionId'] = $_COOKIE['PHPSESSID'];
		
	} else {
		
		//При ошибке нахождения пароля или логина
		
		$exittext['text'] = 'login ili parol vvedeni ne pravilno/pustie!';
		
		exit(json_encode($exittext));
	}
	
	echo json_encode($exittext);
?>