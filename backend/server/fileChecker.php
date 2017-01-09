<?
	
	$loginFordb = '032885006_valera';
	$passFordb = '123456';
	
	include('includes/connect.php');
	include('includes/time.php');
	include('includes/functions.php');//Подключение к бд и подключение функций.
	
	session_start();
	
	if($_SESSION['loggedIn'] != 'yes'){//Проверка на логин
		
		exit('Войдите в систему!');
		
	}
	
	if($_POST['type'] == 'contest' && (gettype($_POST['contest']) != 'integer' || $_POST['contest'] * 10 <= 0 )){
		exit('Ne pravilnii tip "contest\'a"');
	};
	
	if($_FILES['userfile']['size'] > 10485760 || $_FILES['userfile']['size'] == 0){//Проверка на вес файла.
		
		exit('File vesit slishkom mnogo. ('.$_FILES['userfile']['size'].')');
		
	}
	
	$filetype = pathinfo($_FILES['userfile']['name']);//Тут должна быть проверка на тип файла, но она почему-то не работает. Возможно ошибка на стороне отправки названия файла со стороны клиента.
	$filetype = $filetype['extension'];
	if(($filetype != 'jpeg') && ($filetype != 'jpg') && ($filetype != 'png')){
		//exit('Ne pravilnii tip faila ('.$filetype.')');
	};
	
	$photoUploadDir = 'images/'.$_POST['type'].'Photo/'.getRandomFileName('images/contestPhoto/', $filetype).'.'.$filetype;//Генерация рандомного названия файла
	
	if(move_uploaded_file($_FILES['userfile']['tmp_name'], $photoUploadDir)){//Если файл переместится
		$photoUploadDir = 'http://it-labor.ru/playground/valera/'.$photoUploadDir;
		$sqlData = 'INSERT INTO `filelist`(`user`, `type`, `contest`, `name`, `date`, `text`) VALUES ("'.$_SESSION['login'].'", "'.$_POST['type'].'","'.htmlspecialchars(stripslashes($_POST['contest'])).'", "'.$photoUploadDir.'","'.$time['year'].$time['month'].$time['day'].'","'.htmlspecialchars(stripslashes($_POST['text'])).'")';
		$result = mysql_query($sqlData);
	} else {
		exit('Neizvestnaya oshibka pri peremeshenii faila! (nomer oshibki : '.$_FILES['userfile']['error'].' )');
	}
	
	if($_POST['type'] == 'avatar'){//Если это аватарка юзера, то скрипт обновляет данные пользователя.
		session_start();
		$sqlData = 'SELECT `icon` FROM `users` WHERE id="'.$_SESSION['id'].'"';
		$fileDelete = mysql_query($sqlData);
		$fileDelete = mysql_fetch_assoc($fileDelete)['icon'];
		if($fileDelete != 'http://it-labor.ru/playground/valera/images/avatarPhoto/changeMe.png'){//Если аватарка уже есть, но она не равна дефолтной, то скрипт удаляет прежний файл.
			
			unlink(substr($fileDelete, 37));
			
		};
		$sqlData = 'UPDATE `users` SET `icon`="'.$photoUploadDir.'" WHERE id = "'.$_SESSION['id'].'"';
		$result = mysql_query($sqlData);
	};
	
	if($result) {//Сообщение в конце скрипта.
		echo('Vash file sohranen na servere!');
	} else {
		exit('Oshibka mysql zaprosa!');
	}
?>