<?
	
	$loginFordb = 'valeratop';
	$passFordb = '123456';
	
	include('includes/functions.php');//Подключние к бд.
	
	$db = connect($loginFordb, $passFordb);
	
	$login = htmlspecialchars(stripslashes($_GET['login']));//Соблюдение безопасности от sql инъекций.
	$code = htmlspecialchars(stripslashes($_GET['code']));
	$fname = htmlspecialchars(stripslashes($_GET['fname']));
	$lname = htmlspecialchars(stripslashes($_GET['lname']));
	$checkCode = '';
	$checkCodeRes = '';
	$delCode = '';
	$pass = '';
	$mail = '';
	$result = '';
	$pushCode = '';
	
	if(strlen($fname) < 2){//Проверка на наличие введенных данных.
		$array->text = 'Imya ne mozhet bit koroche dvuh simvolov!'; 
		exit(json_encode($array));
	}
	if(strlen($lname) == 0){
		$array->text = 'Vvedite familiyu!'; 
		exit(json_encode($array));
	}
	
	$checkCode = mysql_query('SELECT * FROM `registercode` WHERE login="'.$login.'"');//Проверка на наличие кода в бдшке.
	$checkCodeRes = mysql_fetch_assoc($checkCode);
	
	if($checkCodeRes['code'] == $code ){//Если код верный.
		$delCode = mysql_query('DELETE FROM `registercode` WHERE login="'.$login.'"');//Удаление с бдшки кода.
		if($delCode){
			$pass = $checkCodeRes['pass'];
			$mail = $checkCodeRes['mail'];
			
			$result = mysql_query('INSERT INTO `users`(`login`, `pass`, `mail`, `icon`, `fname`,  `lname`) VALUES ("'.$login.'","'.$pass.'","'.$mail.'","http://it-labor.ru/playground/valera/images/avatarPhoto/changeMe.png","'.$fname.'","'.$lname.'")');//Пуш на сервер нового аккаунта.
			
			if($result){
				$array->text = 'Dannie prinyati'; 
				exit(json_encode($array));
			} else {
				$array->text = 'Oshibka otpravki!'; 
				exit(json_encode($array));
				
				$pushCode = mysql_query('INSERT INTO `registercode`(`login`, `code`) VALUES ("'.$login.'","'.$code.'")');
			};
		} else {
			$array->text = 'Poprobuite esche raz!'; 
			exit(json_encode($array));
		}
	} else {
		$array->text = 'Ne vernii code! Scopiruite ssilku tochnee!'; 
		exit(json_encode($array));
	}

?>