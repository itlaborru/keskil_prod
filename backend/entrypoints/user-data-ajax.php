<?
	session_start();
	
	if($_SESSION["loggedIn"] != 'yes'){//Проверка сессии на наличие
		exit('Voidite v sistemu!');
	};
	
	$loginFordb = 'Keskil';
	$passFordb = '123456';
	
	include('includes/connect.php');//Логин на бдшку
	
	if($_POST['type'] == 'get'){//get - post запрос на получение данных
		
		$id = $_SESSION['id'];
		
		$usersdata = mysql_query('SELECT `id`, `login`, `mail`, `fname`, `mname`, `lname`, `icon` FROM `users` WHERE id="'.$id.'"');
		
		$result = mysql_fetch_assoc($usersdata);
		
		echo json_encode($result);
		
	} else if ($_POST['type'] == 'edit'){//edit - запрос на изменение данных юзера
		
		$fname = stripslashes($_POST['fname']);
		$fname = htmlspecialchars($fname);
		$mname = stripslashes($_POST['mname']);
		$mname = htmlspecialchars($mname);
		$lname = stripslashes($_POST['lname']);
		$lname = htmlspecialchars($lname);
		
		$sql = 'UPDATE `users` SET ';//Создание переменной sql, которая и будет потом пушить данные
		
		if(!empty($fname)){//Добавление изменения переменных при их наличии
			$sql .= '`fname`=';
			$sql .= '"'.$fname.'"';
			$zapyataya = true;
		};
		
		if(!empty($mname)){
			if($zapyataya){//Добавление запятой при наличии вставленных до нее переменных
				$sql .= ', ';
			};
			$zapyataya = true;
			$sql .= '`mname`=';
			$sql .= '"'.$mname.'"';
		};
		
		if(!empty($lname)){
			if($zapyataya){
				$sql .= ', ';
			};
			$zapyataya = true;
			$sql .= ' `lname`=';
			$sql .= ' "'.$lname.'"';
		};
		
		$result = mysql_query($sql.' WHERE id = "'.$_SESSION['id'].'"');//sql запрос на бдшку
		
		echo 'Dannie izmeneni! ';
		
	}

?>