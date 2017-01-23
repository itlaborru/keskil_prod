<?
	header("Access-Control-Allow-Origin: *");
	
	if(!$_POST){//Если пустой запрос.
		$array->text = 'pustoi zapros!';
		exit(json_encode($array));
	}
	
	$loginFordb = 'valeratop';
	$passFordb = '123456';
	include('includes/time.php');
	include('includes/functions.php');
	
	$db = connect($loginFordb, $passFordb);
	
	if($_POST['file'] == 'cartoonsServer'){
		
		$sql;
		
		rootCheck();
		
		if($_POST['type'] == 'upload') {//Загрузка на сервер
			
			$url = htmlspecialchars($_POST['url']);
			$name = htmlspecialchars(stripslashes($_POST['name']));
			$category = htmlspecialchars(stripslashes($_POST['category']));
		
			$sql = mysql_query('INSERT INTO `cartoonsList`(`url`, `name`,`category`) VALUES ("'.$url.'","'.$name.'","'.$category.'")');
		}//Удаление ЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭ
		
		
		
		else if($_POST['type'] == 'delete') {
			$id = htmlspecialchars(stripslashes($_POST['id']));
			
			$sql = mysql_query('DELETE FROM `cartoonslist` WHERE id="'.$id.'"');
			
			if($sql){
				$array->text = 'success!';
				echo(json_encode($array));
			} else {
				$array->text = 'error!';
				echo(json_encode($array));
			}
		}//Обновление данных ЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭЭ
		
		
		
		else if($_POST['type'] == 'update') {
			
			$name = htmlspecialchars(stripslashes($_POST['name']));
			$url = htmlspecialchars(stripslashes($_POST['url']));
			$categories = htmlspecialchars(stripslashes($_POST['categories']));
			$id = htmlspecialchars(stripslashes($_POST['id']));
			
			$sql = mysql_query
			(
				'UPDATE `cartoonslist` SET `name`="'.$name.'",`url`="'.$url.'",`category`="'.$categories.'"WHERE id="'.$id.'"'
			);
			if($sql){
				$array->text = 'success!';
				echo(json_encode($array));
			} else {
				$array->text = 'error!';
				echo(json_encode($array));
			}	
		}
		
		
		
	}
	

	
	else if($_POST['file'] == 'feedback'){
		
		$sql;
		
		if($_POST['type'] == 'upload'){//Загрузка сообщения на фидбек.
			
			$content = htmlspecialchars(stripslashes($_POST['content']));
			$user = htmlspecialchars(stripslashes($_SESSION['login']));
			
			loginCheck();
			
			$sql = mysql_query('INSERT INTO `feedback`(`content`,`user`) VALUES ("'.$content.'","'.$user.'")');
			
			if($sql) {
				$array->text = 'success!';
				echo(json_encode($array));
			}
		}
		
		
		
		else if($_POST['type'] == 'delete'){
			$id = htmlspecialchars(stripslashes($_POST['id']));
			$sql;
			
			rootCheck();//Проверка на права админа.
			
			$sql = mysql_query('DELETE FROM `feedback` WHERE id="'.$id.'"');
			
			if($sql){
				$array->text = 'dannie udaleni';
				echo(json_encode($array));
				echo 'dannie udaleni';
			} else {
				$array->text = 'oshibka!';
				echo(json_encode($array));
			}
		}
		
		
		
	}
	
	
	
	else if($_POST['file'] == 'fileChecker'){
		
		//Подключение к бд и подключение функций.
		
		$type = htmlspecialchars(stripslashes($_POST['type']));
		$contest = htmlspecialchars(stripslashes($_POST['contest']));
		$filetype = '';
		$photoUploadDir = '';
		$text = htmlspecialchars(stripslashes($_POST['text']));
		$result = '';
		$sqlData = '';
		$fileDelete = '';
		
		loginCheck();
		
		/*if($type == 'contest' && (gettype($contest) != 'integer' || $contest * 10 <= 0 )){
			$array->text = 'Ne pravilnii tip "contest\'a"';
			exit(json_encode($array));
		};*/
		
		if($_FILES['userfile']['size'] > 10485760 || $_FILES['userfile']['size'] == 0){//Проверка на вес файла.
			
			$array->text = 'File vesit slishkom mnogo. ('.$_FILES['userfile']['size'].')';
			exit(json_encode($array));
			
		}
		
		if(!file_exists('images/'.$type.'Photo')){
			mkdir('images/'.$type.'Photo');
		}
		
		$filetype = pathinfo($_FILES['userfile']['name']);//Тут должна быть проверка на тип файла, но она почему-то не работает. Возможно ошибка на стороне отправки названия файла со стороны клиента.
		$filetype = $filetype['extension'];
		if(($filetype != 'jpeg') && ($filetype != 'jpg') && ($filetype != 'png')){
			//exit('Ne pravilnii tip faila ('.$filetype.')');
		};
		
		//$photoUploadDir = __DIR__ . '/images/'.$type.'Photo/'.getRandomFileName('images/'.$type.'Photo/', $filetype).'.'.$filetype;//Генерация рандомного названия файла
		
		$server = '/var/www/domains/ovz1.itlaborykt.zm9y1.vps.myjino.ru/';
		
		$photoUploadDir = 'assets/'.getRandomFileName('../assets/', $filetype).'.'.$filetype;//Генерация рандомного названия файла
		
		if(move_uploaded_file($_FILES['userfile']['tmp_name'], $server.$photoUploadDir)){//Если файл переместится
			$photoUploadDir = 'ovz1.itlaborykt.zm9y1.vps.myjino.ru/'.$photoUploadDir;
			$sqlData = 'INSERT INTO `filelist`(`user`, `type`, `contest`, `name`, `date`, `text`) VALUES ("'.$_SESSION['login'].'", "'.$type.'","'.$contest.'", "'.$photoUploadDir.'","'.$time['year'].$time['month'].$time['day'].'","'.$text.'")';
			$result = mysql_query($sqlData);
		} else {
			$array->text = 'Neizvestnaya oshibka pri peremeshenii faila! (nomer oshibki : '.$_FILES['userfile']['error'].' )'.$photoUploadDir;
			exit(json_encode($array));
		}
		
		if($type == 'avatar'){//Если это аватарка юзера, то скрипт обновляет данные пользователя.
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
			$array->text = 'Vash file sohranen na servere!';
			echo(json_encode($array));
		} else {
			$array->text = 'Oshibka mysql zaprosa!';
			exit(json_encode($array));
		}
		
	}
	
	
	
	else if($_POST['file'] == 'news'){
		
		$rootCheck();
		
		if($_POST['type'] == 'upload') {
			
			$content = stripslashes(htmlspecialchars($_POST['content']));
			$title = stripslashes(htmlspecialchars($_POST['title']));
			$category = stripslashes(htmlspecialchars($_POST['category']));
			
			/*if($_POST['filename']) {
				$sql = mysql_query("INSERT INTO `newslist`(`content`, `title`,`categories`,`filename`,`filetype`) VALUES ('".$_POST["content"]."','".$_POST["title"]."','".$_POST["category"]."','".json_encode($files)."','".$_POST["filetype"]."')");
				echo($_POST["filetype"]);
			}*/
			//else {
				$sql = mysql_query('INSERT INTO `newslist`(`content`, `title`,`categories`) VALUES ("'.$content.'", "'.$title.'", "'.$category.'")');
			//}
		}
		
		//Добавление категории
		else if($_POST['type'] == 'uploadCat') {
			
			$const = stripslashes(htmlspecialchars($_POST['category']));
			$category = stripslashes(htmlspecialchars($_POST['category']));
			$sql = mysql_query('SELECT * FROM `newscategs` WHERE category = "'.$const.'"');
			
			if($sql) 
			{
				$array->text = 'error';
				exit(json_encode($array));
			}
			//Вставка новой категории в таблицу
			else {
				$sql = mysql_query('INSERT INTO `newscategs`(`category`) VALUES ("'.$category.'")');
				$array->text = 'nice';
				echo(json_encode($array));
			}
		}
		//Отправка списка категорий, мультфильмов

		
		
		//Удаление
		else if($_POST['type'] == 'delete') {
			
			//Добавить удаление файлов
			
			$id = stripslashes(htmlspecialchars($_POST['id']));
			
			$sql = mysql_query('DELETE FROM `newslist` WHERE id="'.$id.'"');
			
			if($sql){
				$array->text = 'Success';
				echo(json_encode($array));
			} else {
				$array->text = 'Error!';
				echo(json_encode($array));
			}
		}
		
		//Обновление данных
		else if($_POST['type'] == 'update') {
			
			$content = stripslashes(htmlspecialchars($_POST['content']));
			$title = stripslashes(htmlspecialchars($_POST['title']));
			$category = stripslashes(htmlspecialchars($_POST['category']));
			$id = stripslashes(htmlspecialchars($_POST['id']));
			$sql = mysql_query('UPDATE `newslist` SET `title`="'.$title.'",`content`="'.$content.'",`categories`="'.$category.'" WHERE id="'.$id.'"');
			
			if($sql){
				$array->text = 'Success'; 
				echo(json_encode($array));
			} else {
				$array->text = 'Error!';
				echo(json_encode($array));
			}
		}
		
	}
	
	
	
	else if($_POST['file'] == 'user-data-edit'){
		if($_POST['type'] == 'data'){
			
			$loginCheck();
			
			$fname = stripslashes(htmlspecialchars($_POST['fname']));
			$mname = stripslashes(htmlspecialchars($_POST['mname']));
			$lname = stripslashes(htmlspecialchars($_POST['lname']));
			$result = '';
			
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
			
			$array->text = 'Dannie izmeneni! '; 
			
			echo json_encode($array);
		} 
		
		
		
		else if($_POST['type'] == 'pass'){
			
			loginCheck();
			
			$oldPass = md5(htmlspecialchars(stripslashes($_POST['oldPass'])));
			$pass = htmlspecialchars(stripslashes($_POST['pass']));
			$result = '';
			$userlist = '';
			
			$result = mysql_query('SELECT `pass` FROM `users` WHERE login="'.$_SESSION['login'].'"');
			$usersList = mysql_fetch_array($result);
			
			if($usersList['pass'] != $oldPass){
				$array->text = 'Ne vernii starii parol!';
				exit(json_encode($array));
			};
			
			if(strlen($pass) < 8) {
				$array->text = 'Slishkom korotkii novii parol!';
				exit(json_encode($array));
			};
			
			$pass = md5($pass);
			
			$result = mysql_query('UPDATE `users` SET `pass`="'.$pass.'" WHERE login="'.$_SESSION['login'].'"');
			
			if($result){
				echo 'Vash parol izmenen!';
			};
		}
	}
	

?>