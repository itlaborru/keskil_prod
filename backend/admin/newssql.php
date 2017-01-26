<?
	include('rootChecker.php');
	
	include('../includes/functions.php');
	$type = htmlspecialchars(stripslashes($_POST['type']));
	$id = htmlspecialchars(stripslashes($_POST['id']));
	$title = htmlspecialchars(stripslashes($_POST['title']));
	$content = htmlspecialchars(stripslashes($_POST['content']));
	$category = htmlspecialchars(stripslashes($_POST['category']));
	
	if($type == 'push'){
		
		$categorylist = array();
		
		$sql = mysql_query('INSERT INTO `newslist`(`title`, `content`, `category`) VALUES ("'.$title.'","'.$content.'","'.$category.'")');
		
		$lastid = mysql_insert_id();
		
		$categorylist = json_decode($category);
		
		foreach ($categorylist as $key => $value) {
			$sql = mysql_query('SELECT * FROM `categorylist` WHERE id="'.$value.'"');
			
			$result = mysql_fetch_assoc($sql);
			
			$json = json_decode($result['post']);
			
			array_push($json, $lastid);
			
			$json = json_encode($json);
			
			$sql = mysql_query('UPDATE `categorylist` SET `post`="'.$json.'" WHERE id = "'.$value.'"');
		}
		
		if($sql){
			echo 'Gotovo!';
		}
		
	} else 
		
	if($type == 'update'){
		
		$sql = mysql_query('SELECT * FROM `newslist` WHERE id="'.$id.'"');
		
		$result = mysql_fetch_assoc($sql);
		
		if(empty($result['id'])){
			exit('Net takogo id!');
		}
		
		$sql = 'UPDATE `newslist` SET ';
		
		if(!empty($title)){
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
		
		if(!empty($category)){
			if($zapyataya){
				$sql .= ', ';
			};
			$sql .= '`category`=';
			$sql .= '"'.$category.'"';
			$zapyataya = true;
			
			$sqlOldCat = mysql_query('SELECT * FROM `newslist` WHERE id="'.$id.'"');
			
			$resultOldCat = mysql_fetch_assoc($sqlOldCat);
			
			$categorylist = array_diff(json_decode($resultOldCat['category']), json_decode($category));
			
			foreach ($categorylist as $key1 => $value) {
				$sqlget = mysql_query('SELECT * FROM `categorylist` WHERE id='.$value.'');
				
				$resultget = mysql_fetch_assoc($sqlget);
				
				$json = json_decode($resultget['post']);
				
				
				foreach ($json as $key => $value1) {
					if($value1 == $id){
						unset($json[$key]);
						break;
					}
				}
				
				$json = json_encode($json);
				
				$sqlupd = mysql_query('UPDATE `categorylist` SET `post`="'.$json.'" WHERE id = '.$value);
			}
			
			$categorylist = array_diff(json_decode($category), json_decode($resultOldCat['category']));
			
			foreach ($categorylist as $key => $value) {
				$sqlset = mysql_query('SELECT * FROM `categorylist` WHERE id="'.$value.'"');
				
				$resultset = mysql_fetch_assoc($sqlset);
				
				$json = json_decode($resultset['post']);
				
				echo json_encode($json);
				
				array_push($json, $id);
				
				echo json_encode($json);
				
				$json = json_encode($json);
				
				$sqlupd = mysql_query('UPDATE `categorylist` SET `post`="'.$json.'" WHERE id="'.$value.'"');
				
				if($sqlupd){
					echo 'qwe';
				}
			}
			
		};
		
		$sql = mysql_query($sql.' WHERE id ="'.$id.'"');
		
		if($sql){
			echo 'Gotovo!';
		}
		
	} else
		
	if($type == 'delete'){
		$sqlget = mysql_query('SELECT * FROM `newslist` WHERE id="'.$id.'"');
		
		$sqlget = mysql_fetch_assoc($sqlget);
		
		$sqlget = json_decode($sqlget['category']);
		
		$sql = mysql_query('DELETE FROM `newslist` WHERE id="'.$id.'"');
		
		foreach ($sqlget as $key1 => $value) {
			$sqldel = mysql_query('SELECT * FROM `categorylist` WHERE id="'.$value.'"');
			
			$resultdel = mysql_fetch_assoc($sqldel);
			
			$json = json_decode($resultdel['post']);
			
			
			foreach ($json as $key => $value1) {
				if($value1 == $id){
					unset($json[$key]);
					break;
				}
			}
			
			$json = json_encode($json);
			
			$sql = mysql_query('UPDATE `categorylist` SET `post`="'.$json.'" WHERE id = "'.$value.'"');
		}
		
		if($sql){
			echo 'Gotovo!';
		} else {
			echo 'error';
		}
	};
	
	changeDB('newslist');
?>