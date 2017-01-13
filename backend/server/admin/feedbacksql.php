<?

	include('rootChecker.php');
	
	$loginFordb = '032885006_valera';
	$passFordb = '123456';
	
	include('../includes/connect.php');
	
	$type = $_POST['type'];
	$id = $_POST['id'];

	if($type == 'delete'){
		$sql = mysql_query('DELETE FROM `feedback` WHERE id="'.$id.'"');
		
		if($sql){
			echo 'Gotovo!';
		}
	};
	
?>