<?
	include('rootChecker.php');
	
	$loginFordb = 'valeratop';
	$passFordb = '123456';
	
	include('includes/connect.php');
	include('../includes/functions.php');
	$type = htmlspecialchars(stripslashes($_POST['type']));
	$id = htmlspecialchars(stripslashes($_POST['id']));
	$category = htmlspecialchars(stripslashes($_POST['category']));
	$categoryType = htmlspecialchars(stripslashes($_POST['categoryType']));

	if($type == 'push'){
		
		$sql = mysql_query('SELECT * FROM `categorylist` WHERE category="'.$category.'"');
		
		if(!empty(mysql_fetch_assoc($sql))){
			exit('Eta kategoriya uzhe zanyata ');
		}
		
		$sql = mysql_query('INSERT INTO `categorylist`(`category`,`type`,`post`) VALUES ("'.$category.'","'.$categoryType.'", "[]")');
		if($sql){
			echo 'Gotovo!';
		}
		
	} else 
		
	if($type == 'update'){
		
		$sql = mysql_query('SELECT * FROM `categorylist` WHERE id="'.$id.'"');
		
		if(empty(mysql_fetch_assoc($sql))){
			exit('Net takogo id!');
		}
		
		$sql = mysql_query('UPDATE `categorylist` SET `category`="'.$category.'" WHERE id ="'.$id.'"');
		
		if($sql){
			echo 'Gotovo!';
		}
		
	} else
		
	if($type == 'delete'){
		$sql = mysql_query('DELETE FROM `categorylist` WHERE id="'.$id.'"');
		
		if($sql){
			echo 'Gotovo!';
		}
	};
	
	changeDB('categorylist');
?>