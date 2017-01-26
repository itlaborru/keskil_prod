<?
	header("Access-Control-Allow-Origin: *");
	
	if(!$_POST){//≈сли пустой запрос.
		$array->text = 'pustoi zapros!';
		exit(json_encode($array));
	}
	
	$loginFordb = 'valeratop';
	$passFordb = '123456';
	include('includes/time.php');
	include('../includes/functions.php');
	
	$db = connect($loginFordb, $passFordb);
	
	if($_POST['file'] == 'cartoonsServer'){
		
		$sql;
		
		rootCheck();
		
		changeDB('cartoonslist');
		
		if($_POST['type'] == 'upload') {//«агрузка на сервер
			
			$url = htmlspecialchars(stripslashes($_POST['url']));
			$name = htmlspecialchars(stripslashes($_POST['name']));
			$category = htmlspecialchars(stripslashes($_POST['category']));
		
			$sql = mysql_query('INSERT INTO `cartoonsList`(`url`, `name`,`category`) VALUES ("'.$url.'","'.$name.'","'.$category.'")');
		}//”даление ЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁ
		
		
		
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
		}//ќбновление данных ЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁ
		
		
		
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
		
		if($_POST['type'] == 'upload'){//«агрузка сообщени¤ на фидбек.
			
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
			
			rootCheck();//ѕроверка на права админа.
			
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
		
		//ѕодключение к бд и подключение функций.
		
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
		
		if($_FILES['userfile']['size'] > 10485760 || $_FILES['userfile']['size'] == 0){//ѕроверка на вес файла.
			
			$array->text = 'File vesit slishkom mnogo. ('.$_FILES['userfile']['size'].')';
			exit(json_encode($array));
			
		}
		
		if(!file_exists('images/'.$type.'Photo')){
			mkdir('images/'.$type.'Photo');
		}
		
		echo pathinfo($_FILES['userfile']['name']);
		
		$filetype = pathinfo($_FILES['userfile']['name']);//“ут должна быть проверка на тип файла, но она почему-то не работает. ¬озможно ошибка на стороне отправки названи¤ файла со стороны клиента.
		$filetype = $filetype['extension'];
		if(($filetype != 'jpeg') && ($filetype != 'jpg') && ($filetype != 'png')){
			//exit('Ne pravilnii tip faila ('.$filetype.')');
		};
		
		//$photoUploadDir = __DIR__ . '/images/'.$type.'Photo/'.getRandomFileName('images/'.$type.'Photo/', $filetype).'.'.$filetype;//√енераци¤ рандомного названи¤ файла
		
		$server = '/var/www/domains/ovz1.itlaborykt.zm9y1.vps.myjino.ru/';
		
		$photoUploadDir = 'assets/'.getRandomFileName('../assets/', $filetype).'.'.$filetype;//√енераци¤ рандомного названи¤ файла
		
		if(move_uploaded_file($_FILES['userfile']['tmp_name'], $server.$photoUploadDir)){//≈сли файл переместитс¤
			$photoUploadDir = 'http://ovz1.itlaborykt.zm9y1.vps.myjino.ru/'.$photoUploadDir;
			$sqlData = 'INSERT INTO `filelist`(`user`, `type`, `contest`, `name`, `date`, `text`) VALUES ("'.$_SESSION['login'].'", "'.$type.'","'.$contest.'", "'.$photoUploadDir.'","'.$time['year'].$time['month'].$time['day'].'","'.$text.'")';
			$result = mysql_query($sqlData);
		} else {
			$array->text = 'Neizvestnaya oshibka pri peremeshenii faila! (nomer oshibki : '.$_FILES['userfile']['error'].' )'.$photoUploadDir;
			exit(json_encode($array));
		}
		
		if($type == 'avatar'){//≈сли это аватарка юзера, то скрипт обновл¤ет данные пользовател¤.
			session_start();
			$sqlData = 'SELECT `icon` FROM `users` WHERE id="'.$_SESSION['id'].'"';
			$fileDelete = mysql_query($sqlData);
			$fileDelete = mysql_fetch_assoc($fileDelete)['icon'];
			if($fileDelete != 'http://it-labor.ru/playground/valera/images/avatarPhoto/changeMe.png'){//≈сли аватарка уже есть, но она не равна дефолтной, то скрипт удал¤ет прежний файл.
				
				unlink($fileDelete);
				
			};
			$sqlData = 'UPDATE `users` SET `icon`="'.$photoUploadDir.'" WHERE id = "'.$_SESSION['id'].'"';
			$result = mysql_query($sqlData);
		};
		
		if($result) {//—ообщение в конце скрипта.
			$array->text = 'Vash file sohranen na servere!';
			echo(json_encode($array));
		} else {
			$array->text = 'Oshibka mysql zaprosa!';
			exit(json_encode($array));
		}
		
	}
	
	
	
	else if($_POST['file'] == 'news'){
		
		$rootCheck();
		
		changeDB('newslist');
		
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
		
		//ƒобавление категории
		else if($_POST['type'] == 'uploadCat') {
			
			$const = stripslashes(htmlspecialchars($_POST['category']));
			$category = stripslashes(htmlspecialchars($_POST['category']));
			$sql = mysql_query('SELECT * FROM `newscategs` WHERE category = "'.$const.'"');
			
			if($sql) 
			{
				$array->text = 'error';
				exit(json_encode($array));
			}
			//¬ставка новой категории в таблицу
			else {
				$sql = mysql_query('INSERT INTO `newscategs`(`category`) VALUES ("'.$category.'")');
				$array->text = 'nice';
				echo(json_encode($array));
			}
		}
		//ќтправка списка категорий, мультфильмов

		
		
		//”даление
		else if($_POST['type'] == 'delete') {
			
			//ƒобавить удаление файлов
			
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
		
		//ќбновление данных
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
			
			loginCheck();
			
			$fname = stripslashes(htmlspecialchars($_POST['fname']));
			$mname = stripslashes(htmlspecialchars($_POST['mname']));
			$lname = stripslashes(htmlspecialchars($_POST['lname']));
			$result = '';
			
			$sql = 'UPDATE `users` SET ';//—оздание переменной sql, котора¤ и будет потом пушить данные
			
			if(!empty($fname)){//ƒобавление изменени¤ переменных при их наличии
				$sql .= '`fname`=';
				$sql .= '"'.$fname.'"';
				$zapyataya = true;
			};
			
			if(!empty($mname)){
				if($zapyataya){//ƒобавление зап¤той при наличии вставленных до нее переменных
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
	
	
	
	else if($_POST['file'] == 'pulsegoroda'){
		
		$sql;
		
		loginCheck();
		
		if($_POST['type'] == 'upload') {//«агрузка на сервер
			
			$name = htmlspecialchars(stripslashes($_POST['name']));
			$lat = htmlspecialchars(stripslashes($_POST['lat']));
			$lang = htmlspecialchars(stripslashes($_POST['lang']));
			$story_name = htmlspecialchars(stripslashes($_POST['story_name']));
			$story = htmlspecialchars(stripslashes($_POST['story']));
			$user = htmlspecialchars(stripslashes($_POST['user']));
		
			$sql = mysql_query('INSERT INTO `pulsegorodaModeration`(`name`, `lat`, `lang`, `story_name`, `story`, `user`) VALUES ("'.name.'", "'.lat.'", "'.lang.'", "'.story_name.'", "'.story.'", "'.user.'")');
		}//”даление ЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁ
		
		
		
		else if($_POST['type'] == 'delete') {
			$id = htmlspecialchars(stripslashes($_POST['id']));
			$user = htmlspecialchars(stripslashes($_POST['user']));
			
			$sql = mysql_query('DELETE FROM `pulsegorodaModeration` WHERE id="'.$id.'" AND user="'.$user.'"');
			
			if($sql){
				$array->text = 'success!';
				echo(json_encode($array));
			} else {
				$array->text = 'error!';
				echo(json_encode($array));
			}
		}//ќбновление данных ЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁЁ
		
		
		
		else if($_POST['type'] == 'update') {
			
			$name = htmlspecialchars(stripslashes($_POST['name']));
			$lat = htmlspecialchars(stripslashes($_POST['lat']));
			$lang = htmlspecialchars(stripslashes($_POST['lang']));
			$story_name = htmlspecialchars(stripslashes($_POST['story_name']));
			$story = htmlspecialchars(stripslashes($_POST['story']));
			$user = htmlspecialchars(stripslashes($_POST['user']));
			
			$sql = 'UPDATE `pulsegorodaModeration` SET ';
			
			if(!empty($name)){//ƒобавление изменени¤ переменных при их наличии
				$sql .= '`name`=';
				$sql .= '"'.$name.'"';
				$zapyataya = true;
			};
			
			if(!empty($lat)){
				if($zapyataya){//ƒобавление зап¤той при наличии вставленных до нее переменных
					$sql .= ', ';
				};
				$zapyataya = true;
				$sql .= '`lat`=';
				$sql .= '"'.$lat.'"';
			};
			
			if(!empty($lang)){
				if($zapyataya){//ƒобавление зап¤той при наличии вставленных до нее переменных
					$sql .= ', ';
				};
				$zapyataya = true;
				$sql .= '`lang`=';
				$sql .= '"'.$lang.'"';
			};
			
			if(!empty($story_name)){
				if($zapyataya){//ƒобавление зап¤той при наличии вставленных до нее переменных
					$sql .= ', ';
				};
				$zapyataya = true;
				$sql .= '`story_name`=';
				$sql .= '"'.$story_name.'"';
			};
			
			if(!empty($story)){
				if($zapyataya){//ƒобавление зап¤той при наличии вставленных до нее переменных
					$sql .= ', ';
				};
				$zapyataya = true;
				$sql .= '`story`=';
				$sql .= '"'.$story.'"';
			};
			
			$sql = mysql_query($sql);
			
			if($sql){
				$array->text = 'success!';
				echo(json_encode($array));
			} else {
				$array->text = 'error!';
				echo(json_encode($array));
			}	
			
		}
		
	}
	

?>