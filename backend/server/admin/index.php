<?
	include('rootChecker.php');
	
	$loginFordb = '032885006_valera';
	$passFordb = '123456';
	
	include('../includes/connect.php');
	
	echo 
		'<a href="contests.php"> contests </a> </br> 
		<a href="cartoons.php"> Cartoons </a> </br> 
		<a href="users.php"> users </a> </br> 
		<a href="feedback.php"> feedback </a> </br> 
		<a href="news.php"> News </a>';

?>