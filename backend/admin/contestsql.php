<?

	include('rootChecker.php');
	
	$loginFordb = 'valeratop';
	$passFordb = '123456';
	
	include('includes/connect.php');
	include('includes/time.php');
<<<<<<< HEAD
	
=======
	include('/var/www/domains/ovz1.itlaborykt.zm9y1.vps.myjino.ru/daemon/change.php');
	changeDB('contestlist');
>>>>>>> cbb6aed668b139b9f139da7e7a042cdf48c6ffd8
	$type = htmlspecialchars(stripslashes($_POST['type']));
	$id = htmlspecialchars(stripslashes($_POST['id']));
	$start = htmlspecialchars(stripslashes($_POST['start']));
	$end = htmlspecialchars(stripslashes($_POST['end']));
	$title = htmlspecialchars(stripslashes($_POST['title']));
	$content = htmlspecialchars(stripslashes($_POST['content']));
	$contest = htmlspecialchars(stripslashes($_POST['contest']));

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
	} else
	if($type == 'stop'){
		$sql = mysql_query('UPDATE `contestlist` SET `end`="'.$time['year'].'-'.$time['month'].'-'.$time['day'].'" WHERE id = "'.$id.'"');
		
		if($sql){
			echo 'Gotovo!';
		}
	} else
	if($type == 'win'){
		$sql = mysql_query('UPDATE `contestlist` SET `winner`='.$id.' WHERE id ="'.$contest.'"');
		
		if($sql){
			echo 'Gotovo!';
		} else {
			echo 'Oshibka!';
		}
	}
	
	$js = file_get_contents("../daemon/lastChanges.json");
	$j =json_decode($js, true);
	$val = 'contestlist';
	$j[$val] = $j[$val]+1;
	$fp = fopen("../daemon/lastChanges.json", "w");
	fwrite($fp, json_encode($j));
	fclose($fp);
	
?>