<?
	//Подключение к БД
	
	$db = mysql_connect('localhost',$loginFordb, $passFordb) or die(mysql_error());
	
	mysql_select_db('lavr-ik_keskil', $db) or die("ERROR");

?>