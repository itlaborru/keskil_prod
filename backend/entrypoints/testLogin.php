<?
	
	$loginFordb = 'valeratop';
	$passFordb = '123456';
	
	include('includes/functions.php');
	
	$db = connect($loginFordb, $passFordb);
	
	//������������ ��������� ������ (���� ��� ������, �� ������ ����� ������������ � ������� �����).
	
	$login = stripslashes($_POST['login']);
	$login = htmlspecialchars($login);
	$pass = stripslashes($_POST['pass']);
	$pass = md5(htmlspecialchars($pass));
	$exittext = array();
	$result = '';
	$usersList = '';
	$adminCheck = '';
	$adminlist = '';
	
	//�����, ������� ����� ��������� � ����� �������.
	
	
	//�������� �� �������� login'a.
	$result = mysql_query('SELECT `id`, `login`, `pass` FROM `users` WHERE login="'.$login.'"');
	$usersList = mysql_fetch_array($result);
	
	if($usersList["pass"] == $pass && $login != ''){//�������� �������� ������.
		
		//����������� cookie.
		session_start();
		
		$_SESSION["varList"] = array();//������� �������� ����� ������ ������� ��� ������� ������.
		
		$_SESSION["loggedIn"] = "yes";
		array_push($_SESSION["varList"], "loggedIn");
		$_SESSION["login"] = $login;
		array_push($_SESSION["varList"], "login");
		$_SESSION["id"] = $usersList['id'];
		array_push($_SESSION["varList"], "id");
		
		
		
		//�������� �� ������� ����� ����.
		
		$adminCheck = mysql_query('SELECT `login` FROM `adminlist` WHERE login="'.$login.'"');
		$adminlist = mysql_fetch_array($adminCheck);
		
		if(!empty($adminlist)){
			$_SESSION['admin'] = true;
		} else {
			$_SESSION['admin'] = false;
		}
		
		array_push($_SESSION["varList"], "admin");
		
		//�������������� ��������� ������.
		
		$exittext['text'] = "������������, ".$login."!";
		$exittext['sessionId'] = $_COOKIE['PHPSESSID'];
		header('Location: /admin/index.php');
	} else {
		
		//��� ������ ���������� ������ ��� ������
		
		$exittext['text'] = 'login ili parol vvedeni ne pravilno/pustie!';
		
		exit(json_encode($exittext));
	}
	
	echo json_encode($exittext);
?>