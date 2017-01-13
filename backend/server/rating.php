<?	
	$loginFordb = '032885006_valera';
	$passFordb = '123456';
	include('includes/connect.php');//Подключение к серверу
	include('includes/functions.php');//Подключение функций
	
	//НУЖНО ДОДЕЛАТЬ! КОГДА ОДИН ЧЕЛОВЕК НЕСКОЛЬКО РАЗ ПУШИТ, ТО ОБРАБАТЫВАЮТСЯ ВСЕ ЗАПРОСЫ. НУЖНО СДЕЛАТЬ ЧЕКЕР ТОГО, ПЛЮСАНУЛ ЛИ ЮЗЕР ПОСТ
	
	//ПРОВЕРЬ ВСЕ ФУНКЦИИ. НИКТО НЕ ПРОВЕРЕН, НИЧТО НЕ ОБДУМАНО ДО КОНЦА.
	
	$thingId = htmlspecialchars(stripslashes($_POST['thingId'])) or '';//Если нет $_POST['что то'], обнуляет его
	$type = htmlspecialchars(stripslashes($_POST['type'])) or '';
	
	if( $_POST['action'] =="put"){//добавить 
		include('admin/rootChecker.php');//Проверка рут прав
		$id = getRandomStringName('rating', 'thingId');
		$sql = mysql_query("INSERT INTO `rating` (`type`, `rating`, `thingId`) VALUES ('".$type."' , '0',  '".$id."')");
		echo $id;
		
	} else
	if($_POST['action'] =="ratAdd" ){//Плюсануть рейтинг. НУЖНО ДОБАВИТЬ ЧЕКЕР ПЛЮСАНУЛ ЛИ ЮЗЕР ПОСТ
		$sql = mysql_query("UPDATE `rating` SET `rating` =  `rating` + 1 WHERE  thingId ='".$thingId."'");
		echo 2;
		
	} else
	if($_POST['action'] =="del" ){//удалить
		include('admin/rootChecker.php');
		$sql = "DELETE FROM `rating` WHERE `thingId` ='".$thingId."'";
		$res = mysql_query($sql);
		echo 3;
	} else
	if($_POST['action'] =="get" ){//для одного. НУЖНО ПОЛУЧАТЬ ЕЩЕ И ДРУГИЕ ПЕРЕМЕННЫЕ ИЗ ТАБЛИЦЫ
		$sql = "SELECT `rating` FROM `rating` WHERE thingId='".$thingId."'";
		$res = mysql_query($sql);
		$row = mysql_fetch_assoc($res);
		
		echo json_encode($row);
	} else
	if($_POST['action'] =="getType" ){//НУЖНО ПОЛУЧАТЬ ЕЩЕ И ДРУГИЕ ПЕРЕМЕННЫЕ ИЗ ТАБЛИЦЫ. ДО ЭТОГО НЕ ИМЕЕТ СМЫСЛА, ВЕДЬ ХЗ У КОГО КАКОЙ РЕЙТ
		$sql = "SELECT `rating` FROM `rating` WHERE type='".$type."'";
		$res = mysql_query($sql);
		$arr = array();
		while($row = mysql_fetch_assoc($res)) {
			array_push($arr, $row);
		};
		
		echo json_encode($arr);
	}
?>