<?php
$b = true;
header("Access-Control-Allow-Origin: *");
$loginFordb = 'root';
$passFordb = '123456';

$db = mysql_connect('localhost',$loginFordb, $passFordb) or die(mysql_error());

mysql_select_db('lavr-ik_keskil', $db) or die("ERROR");
mysql_query("SET NAMES utf8");
mysql_set_charset("utf8");
$tabels = array ("newslist","newscategs","lastChanges","cartoonslist","cartoonscategory","contestlist");

foreach($tabels as $value){
	$limit = 20;
	if($value == "lastChanges" ){
		$limit = 1;
	}
	$sqlQuery = "SELECT * FROM ".$value." ORDER BY  `id` DESC LIMIT 0 , ".$limit;
	$result=mysql_query($sqlQuery);
	$arr = array();
	while($row=mysql_fetch_assoc($result)){
		array_push($arr, $row);
	};
	$response[$value.""] = ($arr);
};
echo json_encode($response);





//запуск usr/local/zend/bin/php -f var/www/domains/ovz1.itlaborykt.zm9y1.vps.myjino.ru/daemon/daemon.php &
?>