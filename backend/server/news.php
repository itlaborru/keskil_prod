<?
	
	$data = array();
	$files = array();
	
	//stripslashes(htmlspecialchars())
	
	if(!$_POST) {
		exit('Pustoi zapros!');
	}
	
	if($_POST['type'] != 'download'){
		include('admin/rootChecker.php');
	}
	/*
	if( isset( $_GET['uploadfiles'] ) ){
		include('includes/functions.php');
		$error = false;
		
		$uploaddir = 'images/newsUploads/';//ДОДЕЛАЙ. НЕ ЗАГРУЖАЕТ НА СЕРВЕР. ЗАПАРА!!
		foreach( $_FILES as $file ){
			echo $_FILES;
			$path_parts = pathinfo($file['tmp_name']);
			$path_parts = $path_parts['extension'];
			$path_parts = getRandomFileName($uploaddir,$path_parts).$path_parts;
			if( move_uploaded_file( $file['tmp_name'], $uploaddir . $path_parts) ){
				$files[count($files)] = $uploaddir . $path_parts;
			}
			else{
				$error = true;
			}
		}
	}
	*/
	//Добавление мультфильма
	$loginFordb = '032885006_valera';
	$passFordb = '123456';
	include('includes/connect.php');
	if($_POST['type'] == 'upload') {
		/*if($_POST['filename']) {
			$sql = mysql_query("INSERT INTO `newslist`(`content`, `title`,`categories`,`filename`,`filetype`) VALUES ('".$_POST["content"]."','".$_POST["title"]."','".$_POST["category"]."','".json_encode($files)."','".$_POST["filetype"]."')");
			echo($_POST["filetype"]);
		}*/
		//else {
			$sql = mysql_query('INSERT INTO `newslist`(`content`, `title`,`categories`) 
				VALUES ("'.stripslashes(htmlspecialchars($_POST['content'])).'",
				"'.stripslashes(htmlspecialchars($_POST['title'])).'",
				"'.stripslashes(htmlspecialchars($_POST['category'])).'")'
			);
		//}
	}
	
	//Добавление категории
	else if($_POST['type'] == 'uploadCat') {
		$const = stripslashes(htmlspecialchars($_POST['category']));
		$sql = mysql_query('SELECT * FROM `newscategs` WHERE category = "'.$const.'"');
		if($sql) 
		{
			exit('error');
		}
		//Вставка новой категории в таблицу
		else {
			$sql = mysql_query('INSERT INTO `newscategs`(`category`) VALUES ("'.$_POST['category'].'")');
			exit "good";
		}
	}
	//Отправка списка категорий, мультфильмов
	else if($_POST['type'] == 'download'){
		//Загрузка строк
		$finalResult = array();
		
		$categoriesTable = mysql_query('SELECT * FROM `newscategs` WHERE 1');
		$categories = array();
		while ($row = mysql_fetch_array($categoriesTable)) 
		{
			$cat = array($row['category']);
			array_push($categories, $cat);
		}
		array_push($finalResult, $categories);
		
		
		$sql = mysql_query('SELECT * FROM `newslist` WHERE 1');
		$elements = array();
		while ($result = mysql_fetch_array($sql)) 
		{
			if($result['filename']) {
				$element = array($result['title'],$result['content'],$result['categories'],$result['id'],$result['filename'],$result['filetype']);
			}
			else {
				$element = array($result['title'],$result['content'],$result['categories'],$result['id']);
			}
			array_push($elements, $element);
		}
		array_push($finalResult, $elements);
		
		echo json_encode($finalResult);
	}
	
	//Удаление
	else if($_POST['type'] == 'delete') {
		
		//Добавить удаление файлов
		
		$sql = mysql_query('DELETE FROM `newslist` WHERE id="'.$_POST['id'].'"');
		
		if($sql){
			echo('Success');
		} else {
			echo('Error!');
		}
	}
	
	//Обновление данных
	else if($_POST['type'] == 'update') {
		$sql = mysql_query
		(
			'UPDATE 
			`newslist` 
			SET 
			`title`="'.$_POST['title'].'",
			`content`="'.$_POST['content'].'",
			`categories`="'.$_POST['category'].'" 
			WHERE id="'.$_POST['id'].'"'
		);
		if($sql){
			echo('Success');
		} else {
			echo('Error!');
		}
	}
?>