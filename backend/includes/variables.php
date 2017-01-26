<?

date_default_timezone_set('Asia/Yakutsk');
$db = mysql_connect('localhost',$loginFordb, $passFordb) or die(mysql_error());
mysql_select_db('lavr-ik_keskil', $db) or die("ERROR");
$time = array(
	'year' => date('Y'),
	'month' =>  date('m'),
	'day' =>  date('d'), 
	'hours' => date('H'),
	'minutes' => date('i'),
);


?>