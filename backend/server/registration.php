<?
	
	$loginFordb = '032885006_valera';
	$passFordb = '123456';
	
	include('includes/connect.php');//Подключение к БД
	
	include('includes/functions.php');
	
	//Безопасность введенных данных (Если это скрипт, то скрипт будет преобразован в обычный текст).
	
	$login = stripslashes($_POST['login']);
	$login = htmlspecialchars($login);
	$pass = stripslashes($_POST['pass']);
	$pass = htmlspecialchars($pass);
	$mail = stripslashes($_POST['mail']);
	$mail = htmlspecialchars($mail); 
	
	//Проверка на длину логина и пароля (Если слишком коротко, то exit).
	
	if((strlen($login) < 4) or (strlen($pass) < 8) or (strlen($mail) < 5)){
		exit("Oshibka vvoda dannih!");
	}
	
	//Проверка на занятость login'а
	
	$isUsed = mysql_query('SELECT `login` FROM `users` WHERE login="'.$login.'"');//Проверка на использованность логина
	$isUsedList = mysql_fetch_array($isUsed);
	$isUsedmail = mysql_query('SELECT `login` FROM `users` WHERE mail="'.$mail.'"');// Проверка на использованность почты
	$isUsedListmail = mysql_fetch_array($isUsedmail);
	
	if(!empty($isUsedListmail)){
		exit('Pochta uzhe zanyata!');
	}
	
	if(!empty($login) && !empty($pass)){//Проверка на пустоту login и pass
		if(empty($isUsedList)){//Проверка на занятость login'а (1)
				
			$randomCode = generateCode(15);//Генерация рандомного кода для посылания на почту
			
			$pushCode = mysql_query('INSERT INTO `registercode`(`login`, `code`, `pass`, `mail`) VALUES ("'.$login.'","'.$randomCode.'","'.md5($pass).'","'.$mail.'")');//Отправка данных на сервер со списком регистрирующихся пользователей
			
			if(!$pushCode){//Проверка на удачность sql запроса на таблицу
				exit('Poprobuite esche raz!');
			}

			$to = $mail;//Генерация и отправка письма на почту
			$subject = 'Registraciya';
			$message = 'Pereidite po ssilke! ' . "\r\n" .
				'http://it-labor.ru/playground/valera/registerCode.php?login='.$login.'&code='.$randomCode;
			$headers = 'From: valerii777999@gmail.com' . "\r\n" .
				'Reply-To: valerii777999@gmail.com' . "\r\n" .
				'X-Mailer: Keskil_prod';
			
			if(!mail($to, $subject, $message, $headers)){//Если сообщение не было отправлено
				exit('Pochta vvedena ne pravilno!');
			};
			
			echo('Podtverdite pochtu! Posleduite instrukciyam otpravlennim na pochtu');
			
		} else 
			echo 'login zanyat';
	} else {
		echo('Login ili parol imeet pustoe znachenie');
	}
?>