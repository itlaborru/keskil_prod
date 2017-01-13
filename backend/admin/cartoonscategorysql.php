<?
	include('rootChecker.php');
	
	$loginFordb = 'valeratop';
	$passFordb = '123456';
	
	include('includes/connect.php');
	
	$type = htmlspecialchars(stripslashes($_POST['type']));
	$id = htmlspecialchars(stripslashes($_POST['id']));
	$category = htmlspecialchars(stripslashes($_POST['category']));

	if($type == 'push'){
		
		$sql = mysql_query('SELECT * FROM `cartoonscategory` WHERE category="'.$category.'"');
		
		if(!empty(mysql_fetch_assoc($sql))){
			exit('Eta kategoriya uzhe zanyata ');
		}
		
		$sql = mysql_query('INSERT INTO `cartoonscategory`(`category`) VALUES ("'.$category.'")');
		if($sql){
			echo 'Gotovo!';
		}
		
	} else 
		
	if($type == 'update'){
		
		$sql = mysql_query('SELECT * FROM `cartoonscategory` WHERE id="'.$id.'"');
		
		if(empty(mysql_fetch_assoc($sql))){
			exit('Net takogo id!');
		}
		
		$sql = mysql_query('UPDATE `cartoonscategory` SET `category`="'.$category.'" WHERE id ="'.$id.'"');
		
		if($sql){
			echo 'Gotovo!';
		}
		
	} else
		
	if($type == 'delete'){
		$sql = mysql_query('DELETE FROM `cartoonscategory` WHERE id="'.$id.'"');
		
		if($sql){
			echo 'Gotovo!';
		}
	};
	
?>