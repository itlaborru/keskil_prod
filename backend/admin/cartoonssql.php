<?
	include('rootChecker.php');
	
	$loginFordb = 'valeratop';
	$passFordb = '123456';
	
	include('includes/connect.php');
	
	$type = htmlspecialchars(stripslashes($_POST['type']));
	$id = htmlspecialchars(stripslashes($_POST['id']));
	$url = htmlspecialchars(stripslashes($_POST['url']));
	$name = htmlspecialchars(stripslashes($_POST['name']));
	$category = htmlspecialchars(stripslashes($_POST['category']));

	if($type == 'push'){
		
		$sql = mysql_query('INSERT INTO `cartoonslist`(`url`, `name`, `category`) VALUES ("'.$url.'","'.$name.'","'.$category.'")');
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
	
?>