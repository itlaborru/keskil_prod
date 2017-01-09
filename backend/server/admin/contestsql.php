<?

	include('rootChecker.php');
	
	$loginFordb = '032885006_valera';
	$passFordb = '123456';
	
	include('../includes/connect.php');
	
	$type = $_POST['type'];
	$id = $_POST['id'];
	$start = $_POST['start'];
	$end = $_POST['end'];
	$title = $_POST['title'];
	$content = $_POST['content'];

	if($type == 'push'){
		
		$sql = mysql_query('INSERT INTO `contestlist`(`start`, `end`, `title`, `content`) VALUES ("'.$start.'","'.$end.'","'.$title.'","'.$content.'")');
		if($sql){
			echo 'Gotovo!';
		}
		
	} else 
	if($type == 'update'){
		
		$sql = mysql_query('SELECT * FROM `contestlist` WHERE id="'.$id.'"');
		
		if(empty($sql)){
			exit('Net takogo id!');
		}
		
		$sql = 'UPDATE `contestlist` SET ';
		
		if(!empty($start)){
			$sql .= '`start`=';
			$sql .= '"'.$start.'"';
			$zapyataya = true;
		};
		
		if(!empty($end)){
			if($zapyataya){
				$sql .= ', ';
			};
			$sql .= '`end`=';
			$sql .= '"'.$end.'"';
			$zapyataya = true;
		};
		
		if(!empty($title)){
			if($zapyataya){
				$sql .= ', ';
			};
			$sql .= '`title`=';
			$sql .= '"'.$title.'"';
			$zapyataya = true;
		};
		
		if(!empty($content)){
			if($zapyataya){
				$sql .= ', ';
			};
			$sql .= '`content`=';
			$sql .= '"'.$content.'"';
			$zapyataya = true;
		};
		
		$sql = mysql_query($sql.' WHERE id ="'.$id.'"');
		
		if($sql){
			echo 'Gotovo!';
		}
		
	} else
	if($type == 'delete'){
		$sql = mysql_query('DELETE FROM `contestlist` WHERE id="'.$id.'"');
		
		if($sql){
			echo 'Gotovo!';
		}
	};
	
?>