<?
	
	$loginFordb = 'Keskil';
	$passFordb = '123456';
	
	include('includes/functions.php');
	
	$db = connect($loginFordb, $passFordb);
	
	//Безопасность введенных данных (Если это скрипт, то скрипт будет преобразован в обычный текст).
	
	$login = stripslashes($_POST['login']);
	$login = htmlspecialchars($login);
	$pass = stripslashes($_POST['pass']);
	$pass = htmlspecialchars($pass);
	$mail = stripslashes($_POST['mail']);
	$mail = htmlspecialchars($mail); 
	$isUsed = '';
	$isUsedList = '';
	$isUsedmail = '';
	$isUsedListmail = '';
	$randomCode = '';
	
	$to = '';
	$subject = '';
	$message = '';
	$headers = '';
	
	
	
	
	//Проверка на длину логина и пароля (Если слишком коротко, то exit).
	
	if((strlen($login) < 4) or (strlen($pass) < 8) or (strlen($mail) < 5)){
		$array->text = "Oshibka vvoda dannih!";
		exit(json_encode($array));
	}
	
	//Проверка на занятость login'а
	
	$isUsed = mysql_query('SELECT `login` FROM `users` WHERE login="'.$login.'"');//Проверка на использованность логина
	$isUsedList = mysql_fetch_array($isUsed);
	$isUsedmail = mysql_query('SELECT `login` FROM `users` WHERE mail="'.$mail.'"');// Проверка на использованность почты
	$isUsedListmail = mysql_fetch_array($isUsedmail);
	
	if(!empty($isUsedListmail)){
		$array->text = 'Pochta uzhe zanyata!';
		exit(json_encode($array));
	}
	
	if(!empty($isUsedList)){//Проверка на занятость login'а (1)
			
		$array->text = 'login zanyat';
		exit(json_encode($array));
		
	}
	
	$isUsed = mysql_query('SELECT `login` FROM `registercode` WHERE login="'.$login.'"');//Проверка на использованность логина
	$isUsedList = mysql_fetch_array($isUsed);
	$isUsedmail = mysql_query('SELECT `login` FROM `registercode` WHERE mail="'.$mail.'"');// Проверка на использованность почты
	$isUsedListmail = mysql_fetch_array($isUsedmail);
	
	if(!empty($isUsedListmail)){
		$array->text = 'Pochta uzhe zanyata!';
		exit(json_encode($array));
	}
	
	if(!empty($isUsedList)){//Проверка на занятость login'а (1)
			
		$array->text = 'login zanyat';
		exit(json_encode($array));
		
	}
	
	if(empty($login) || empty($pass)){//Проверка на пустоту login и pass
		$array->text = 'Заполните все поля!';
		exit(json_encode($array));
	}
	
	$randomCode = generateCode(15);//Генерация рандомного кода для посылания на почту
			
	$pushCode = mysql_query('INSERT INTO `registercode`(`login`, `code`, `pass`, `mail`) VALUES ("'.$login.'","'.$randomCode.'","'.md5($pass).'","'.$mail.'")');//Отправка данных на сервер со списком регистрирующихся пользователей
	
	if(!$pushCode){//Проверка на удачность sql запроса на таблицу
		$array->text = 'Попробуйте снова!';
		exit(json_encode($array));
	}

	$to = $mail;//Генерация и отправка письма на почту
	$subject = 'Регистрация';
	$message = 'Перейдите по ссылке! ' . "\r\n" .
		'http://ovz1.itlaborykt.zm9y1.vps.myjino.ru/entrypoints/registerCode.php?login='.$login.'&code='.$randomCode;
	$headers = 'From: "Keskil-Online@robot.ru"' . "\r\n" .
		'Reply-To: "Keskil-Online@robot.ru"' . "\r\n" .
		'X-Mailer: "Keskil_prod"';
	$array->text = 'OK';
	if(!mail($to, $subject, $message, $headers)){//Если сообщение не было отправлено
		$array->text = 'Не верная почта';
		exit(json_encode($array));
	};
	
	$array->text = 'Подтвердите почту! Последуйте инструкциям отправленным на вашу почту';
	exit(json_encode($array));
?>