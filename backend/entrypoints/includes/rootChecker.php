<?
	session_start();
	
	if($_SESSION['admin'] != true){
		exit('Vi ne admin!');
	}

?>