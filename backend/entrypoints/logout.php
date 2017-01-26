<?
	session_start();
	
	if($_SESSION['loggedIn'] == 'yes'){//Очистка переменных сессии при дестрое.
		foreach ($_SESSION['varList'] as &$value) {
			unset($_SESSION[$value]);
		}
		unset($value);
		unset($_SESSION['varList']);
		session_destroy();
		echo 'Vi razloginilis! ';
	} else {
		echo 'Vi dazhe ne voshli! :D';
	};
	
	$adminClient = htmlspecialchars(stripslashes($_POST['adminClient']));
	
	if($adminClient){
		header('Location: /admin/index.php');
	};
	
	

?>