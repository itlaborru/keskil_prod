<?
	
	$loginFordb = 'valeratop';
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
	
	if(!empty($login) && !empty($pass)){//Проверка на пустоту login и pass
		if(empty($isUsedList)){//Проверка на занятость login'а (1)
				
			$randomCode = generateCode(15);//Генерация рандомного кода для посылания на почту
			
			$pushCode = mysql_query('INSERT INTO `registercode`(`login`, `code`, `pass`, `mail`) VALUES ("'.$login.'","'.$randomCode.'","'.md5($pass).'","'.$mail.'")');//Отправка данных на сервер со списком регистрирующихся пользователей
			
			if(!$pushCode){//Проверка на удачность sql запроса на таблицу
				$array->text = 'Poprobuite esche raz!';
				exit(json_encode($array));
			}

			$to = $mail;//Генерация и отправка письма на почту
			$subject = 'Registraciya';
			$message = 'Pereidite po ssilke! ' . "\r\n" .
				'http://ovz1.itlaborykt.zm9y1.vps.myjino.ru/entrypoints/registerCode.php?login='.$login.'&code='.$randomCode;
			$headers = 'From: valerii777999@gmail.com' . "\r\n" .
				'Reply-To: valerii777999@gmail.com' . "\r\n" .
				'X-Mailer: Keskil_prod';
			
			if(!mail($to, $subject, $message, $headers)){//Если сообщение не было отправлено
				$array->text = 'Pochta vvedena ne pravilno!';
				exit(json_encode($array));
			};
			
			$array->text = 'Podtverdite pochtu! Posleduite instrukciyam otpravlennim na pochtu';
			exit(json_encode($array));
			
		} else 
			$array->text = 'login zanyat';
			exit(json_encode($array));
	} else {
		$array->text = 'Login ili parol pusti';
		exit(json_encode($array));
	}
?>