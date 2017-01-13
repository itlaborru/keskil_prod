<?
	//Добавление мультфильма
	
	if(!$_POST){//Если пустой запрос.
		exit('Pustoi zapros!');
	}
	
	if($_POST['type'] != 'download'){//Проверка прав, если попытка изменить данные.
		include('admin/rootChecker.php');
	};
	
	$loginFordb = '032885006_valera';
	$passFordb = '123456';
	
	include('includes/connect.php');//Подключение к серверу
	
	if($_POST['type'] == 'upload') {//Загрузка на сервер
		$sql = mysql_query('INSERT INTO `cartoonsList`(`url`, `name`,`category`) VALUES ("'.htmlspecialchars($_POST['url']).'","'.htmlspecialchars(stripslashes($_POST['name'])).'","'.htmlspecialchars(stripslashes($_POST['category'])).'")');
	}
	//Добавление категории
	else if($_POST['type'] == 'uploadCat') {
		
		$const = htmlspecialchars(stripslashes($_POST['category']));//Проверка на занятость категории
		$sql = mysql_query('SELECT * FROM `cartoonscategory` WHERE category = "'.$const.'"');
		if($sql) 
		{
			exit('error');
		}
		
		//Вставка новой категории в таблицу
		$sql = mysql_query('INSERT INTO `cartoonscategory` (`category`) VALUES ("'.htmlspecialchars(stripslashes($_POST['category'])).'")');
		echo "Rabotaet";
	}
	//Отправка списка категорий, мультфильмов
	else if($_POST['type'] == 'download'){
		//Загрузка строк
		$finalResult = array();
		$categoriesTable = mysql_query('SELECT * FROM `cartoonscategory` WHERE 1');
		$categories = array();
		while ($row = mysql_fetch_assoc($categoriesTable)) {//Пуш на массив выходящий в конце.
			$cat = $row['category'];
			array_push($categories, $cat);
		}
		array_push($finalResult, $categories);
		
		
		$sql = mysql_query('SELECT * FROM `cartoonslist` WHERE 1');
		$elements = array();
		while ($result = mysql_fetch_assoc($sql)){//Пуш на массив выходящий в конце.
			$element = array($result['name'],$result['url'],$result['category'],$result['id']);
			array_push($elements, $element);
		}
		array_push($finalResult, $elements);
		
		echo json_encode($finalResult);
	}
	
	//Удаление
	else if($_POST['type'] == 'delete') {
		
		$sql = mysql_query('DELETE FROM `cartoonslist` WHERE id="'.htmlspecialchars(stripslashes($_POST['id'])).'"');
		
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
			'UPDATE `cartoonslist` SET `name`="'.htmlspecialchars(stripslashes($_POST['name'])).'",`url`="'.htmlspecialchars(stripslashes($_POST['url'])).'",`category`="'.htmlspecialchars(stripslashes($_POST['categories'])).'"WHERE id="'.htmlspecialchars(stripslashes($_POST['id'])).'"'
		);
		if($sql){
			echo('Success');
		} else {
			echo('Error!');
		}
	}
?>