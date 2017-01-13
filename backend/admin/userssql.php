<?

	include('rootChecker.php');
	
	$loginFordb = 'valeratop';
	$passFordb = '123456';
	
	include('includes/connect.php');
	
	$type = $_POST['type'];
	$id = $_POST['id'];

	if($type == 'delete'){
		$sql = mysql_query('DELETE FROM `users` WHERE id="'.$id.'"');
		
		if($sql){
			echo 'Gotovo!';
		}
	};
	
?>