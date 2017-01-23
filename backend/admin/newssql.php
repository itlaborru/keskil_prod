<?
	include('rootChecker.php');
	
	$loginFordb = 'valeratop';
	$passFordb = '123456';
	
	include('includes/connect.php');
	
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
		
		foreach ($categorylist as &$value) {
			$sql = mysql_query('SELECT * FROM `categorylist` WHERE id="'.$value.'"');
			
			$result = mysql_fetch_assoc($sql);
			
			$json = json_decode($result['post']);
			
			array_push($json, $lastid);
			
			$json = json_encode($json);
			
			$sql = mysql_query('UPDATE `categorylist` SET `post`="'.$json.'" WHERE id = "'.$result['id'].'"');
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
			
			foreach ($categorylist as &$value) {
				$sqlget = mysql_query('SELECT * FROM `categorylist` WHERE id='.$value.'');
				
				$resultget = mysql_fetch_assoc($sqlget);
				
				$json = json_decode($resultget['post']);
				
				
				foreach ($json as $key => $value1) {
					if($value1 == $id){
						echo $value1;
						unset($json[$key]);
						break;
					}
				}
				
				echo 'A';
				
				$json = json_encode($json);
				
				$sqlupd = mysql_query('UPDATE `categorylist` SET `post`="'.$json.'" WHERE id = '.$value);
			}
			
			$categorylist = array_diff(json_decode($category), json_decode($resultOldCat['category']));
			
			foreach ($categorylist as &$value) {
				$sqlset = mysql_query('SELECT * FROM `categorylist` WHERE id="'.$value.'"');
				
				$resultset = mysql_fetch_assoc($sqlset);
				
				$json = json_decode($resultset['post']);
				
				array_push($json, $id);
				
				$json = json_encode($json);
				
				$sqlupd = mysql_query('UPDATE `categorylist` SET `post`='.$json.' WHERE id = '.$value.'');
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
		
		$sqlget = json_decode($sqlget);
		
		$sql = mysql_query('DELETE FROM `newslist` WHERE id="'.$id.'"');
		
		foreach ($sqlget as &$value) {
			$sqldel = mysql_query('SELECT * FROM `categorylist` WHERE id="'.$value.'"');
			
			$resultdel = mysql_fetch_assoc($sqldel);
			
			$json = json_decode($resultdel['post']);
			
			
			foreach ($json as &$value) {
				if($value == $id){
					unset($value);
					break;
				}
			}
			
			
			$json = json_encode($json);
			
			$sql = mysql_query('UPDATE `categorylist` SET `post`="'.$json.'" WHERE id = "'.$id.'"');
		}
		
		if($sql){
			echo 'Gotovo!';
		}
	};
	
	$js = file_get_contents(dirname(__FILE__)."/../daemon/lastChanges.json");
	$j =json_decode($js, true);
	$val = 'newslist';
	$j[$val] = $j[$val]+1;
	echo json_encode($j);
	$fp = fopen(dirname(__FILE__)."/../daemon/lastChanges.json", "w");
	fwrite($fp, json_encode($j));
	fclose($fp);
	
?>