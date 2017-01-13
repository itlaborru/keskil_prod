<?	
	session_start();
	
	if($_SESSION['loggedIn'] != 'yes'){//Проверка сессии на наличие
		exit('Voidite v sistemu!');
	};
	
	$loginFordb = '032885006_valera';
	$passFordb = '123456';
	
	include('includes/connect.php');//Логин на бдшку
	
	$fname = stripslashes(htmlspecialchars($_POST['fname']));
	$mname = stripslashes(htmlspecialchars($_POST['mname']));
	$lname = stripslashes(htmlspecialchars($_POST['lname']));
	
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
	
	echo 'Dannie izmeneni! ';

?>