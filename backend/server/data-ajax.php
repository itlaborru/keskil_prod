<?
	$loginFordb = '032885006_valera';
	$passFordb = '123456';
	
	include('includes/connect.php');//Подключение к бд.
	
	session_start();
	
	$sql = mysql_query('SELECT * FROM `contestlist`');//Получение всех данных с таблицы.
	
	$data = array();
	$contest = array();
	
	while ($result = mysql_fetch_assoc($sql)) //Пуш данных в массив для вывода.
	{ 
		array_push($contest, $result);
	}
	
	$contest = array('contest' => $contest);//Добавление данных в общий список.
	$data = array_merge($data, $contest);
	
	$sql = mysql_query('SELECT `id`, `login`, `mail`, `fname`, `mname`, `lname`, `icon` FROM `users` WHERE id="'.$_SESSION['id'].'"');//Получение всех данных с таблицы.
	
	$userData = array();
	
	while ($result = mysql_fetch_assoc($sql)) //Пуш данных в массив для вывода.
	{ 
		$userData = array_merge($userData, $result);
	}
	
	$userData = array('userData' => $userData);//Добавление данных в общий список.
	$data = array_merge($data, $userData);
	
	$phpSessionId = array('sessionId' => $_COOKIE['PHPSESSID']);//Запоминание сессии для сохранения в куки.
	
	$data = array_merge($data, $phpSessionId);//Добавление данных в общий список.
	
	echo json_encode($data);

?>