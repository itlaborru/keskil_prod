<?
	include('rootChecker.php');
	
	$loginFordb = 'valeratop';
	$passFordb = '123456';
	
	include('includes/connect.php');
	include('../includes/functions.php');
	$search = ['https://www.youtube.com/watch?v=','http://youtu.be/'];
	$type = htmlspecialchars(stripslashes($_POST['type']));
	$id = htmlspecialchars(stripslashes($_POST['id']));
	$url = htmlspecialchars(stripslashes($_POST['url']));
	$name = htmlspecialchars(stripslashes($_POST['name']));
	$category = htmlspecialchars(stripslashes($_POST['category']));
	$url = str_replace($search, [], $url);
	if($type == 'push'){
		
		$sql = mysql_query('INSERT INTO `cartoonslist`(`url`, `name`, `category`) VALUES ("'.$url.'","'.$name.'","'.$category.'")');
		
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
		
		$sql = mysql_query('SELECT * FROM `cartoonslist` WHERE id="'.$id.'"');
		
		$result = mysql_fetch_assoc($sql);
		
		if(empty($result['id'])){
			exit('Net takogo id!');
		}
		
		$sql = 'UPDATE `cartoonslist` SET ';
		
		if(!empty($url)){
			$sql .= '`url`=';
			$sql .= '"'.$url.'"';
			$zapyataya = true;
		};
		
		if(!empty($name)){
			if($zapyataya){
				$sql .= ', ';
			};
			$sql .= '`name`=';
			$sql .= '"'.$name.'"';
			$zapyataya = true;
		};
		
		if(!empty($category)){
			if($zapyataya){
				$sql .= ', ';
			};
			$sql .= '`category`=';
			$sql .= '"'.$category.'"';
			$zapyataya = true;
		};
		
		$sql = mysql_query($sql.' WHERE id ="'.$id.'"');
		
		if($sql){
			echo 'Gotovo!';
		}
		
	} else
		
	if($type == 'delete'){
		$sql = mysql_query('DELETE FROM `cartoonslist` WHERE id="'.$id.'"');
		
		if($sql){
			echo 'Gotovo!';
		}
	};
	
	changeDB('cartoonslist');
?>