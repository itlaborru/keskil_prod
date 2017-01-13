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
		
		$sql = mysql_query('INSERT INTO `newslist`(`title`, `content`, `category`) VALUES ("'.$title.'","'.$content.'","'.$category.'")');
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
		};
		
		$sql = mysql_query($sql.' WHERE id ="'.$id.'"');
		
		if($sql){
			echo 'Gotovo!';
		}
		
	} else
		
	if($type == 'delete'){
		$sql = mysql_query('DELETE FROM `newslist` WHERE id="'.$id.'"');
		
		if($sql){
			echo 'Gotovo!';
		}
	};
	
?>