<?
	
	$loginFordb = '032885006_valera';
	$passFordb = '123456';
	
	include('includes/connect.php');//Подключние к бд.
	
	$login = stripslashes($_GET['login']);//Соблюдение безопасности от sql инъекций.
	$login = htmlspecialchars($login);
	$code = stripslashes($_GET['code']);
	$code = htmlspecialchars($code);
	$fname = stripslashes($_GET['fname']);
	$fname = htmlspecialchars($fname);
	$lname = stripslashes($_GET['lname']);
	$lname = htmlspecialchars($lname);
	
	if(strlen($fname) < 2){//Проверка на наличие введенных данных.
		exit('Imya ne mozhet bit koroche dvuh simvolov!');
	}
	if(strlen($lname) < 1){
		exit('Vvedite familiyu '.$lname);
	}
	
	$checkCode = mysql_query('SELECT * FROM `registercode` WHERE login="'.$login.'"');//Проверка на наличие кода в бдшке.
	$checkCodeRes = mysql_fetch_assoc($checkCode)['code'];
	
	if($checkCodeRes == $code ){//Если код верный.
		$delCode = mysql_query('DELETE FROM `registercode` WHERE login="'.$login.'"');//Удаление с бдшки кода.
		if($delCode){
			$pass = $checkCodeRes['pass'];
			$mail = $checkCodeRes['mail'];
			
			$result = mysql_query('INSERT INTO `users`(`login`, `pass`, `mail`, `icon`, `fname`,  `lname`) VALUES ("'.$login.'","'.$pass.'","'.$mail.'","http://it-labor.ru/playground/valera/images/avatarPhoto/changeMe.png","'.$fname.'","'.$lname.'")');//Пуш на сервер нового аккаунта.
			
			if($result){
				echo 'Dannie prinyati' ;
			} else {
				echo 'Oshibka otpravki!' ;
				$pushCode = mysql_query('INSERT INTO `registercode`(`login`, `code`) VALUES ("'.$login.'","'.$code.'")');
			};
		} else {
			echo('Poprobuite esche raz!');//Если не очистилось с бдшки.
		}
	} else {
		echo 'Ne vernii code! Scopiruite ssilku tochnee!';//Не подходящий код или логин.
	}

?>