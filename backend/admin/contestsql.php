<?

	include('rootChecker.php');
	
	$loginFordb = 'valeratop';
	$passFordb = '123456';
	
	include('includes/connect.php');
	
	$type = htmlspecialchars(stripslashes($_POST['type']));
	$id = htmlspecialchars(stripslashes($_POST['id']));
	$start = htmlspecialchars(stripslashes($_POST['start']));
	$end = htmlspecialchars(stripslashes($_POST['end']));
	$title = htmlspecialchars(stripslashes($_POST['title']));
	$content = htmlspecialchars(stripslashes($_POST['content']));

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