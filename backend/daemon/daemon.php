<?php
set_time_limit (0);
$b = true;
$loginFordb = 'Keskil';
$passFordb = '123456';

$db = mysql_connect('localhost',$loginFordb, $passFordb) or die(mysql_error());

mysql_select_db('lavr-ik_keskil', $db) or die("ERROR");
mysql_query("SET NAMES utf8");
mysql_set_charset("utf8");



$tabels = array ("newslist","categorylist","cartoonslist","contestlist"); //������ ������ ������� ������ ����� � cache.json
while($b){
	echo "working ";
	foreach($tabels as $value){
		
		$sqlQuery = "SELECT * FROM ".$value." ORDER BY  `id` DESC";
		$result=mysql_query($sqlQuery);
		$arr = array();
		while($row=mysql_fetch_assoc($result)){
			if ($value == "newslist" || $value == "cartoonslist" ){
				$decode = $row["category"];
				$row["category"] = (json_decode($decode));
			}
			else if ($value == "categorylist") {
				$decode = $row["post"];
				$row["post"] = (json_decode($decode));
			}
			array_push($arr, $row);
		};
		$response[$value.""] = ($arr);
	};
	$fp = fopen(dirname(__FILE__)."/cache.json", "w");
	fwrite($fp, json_encode($response));
	fclose($fp);
	sleep(5);
};
//������ usr/local/zend/bin/php -f var/www/domains/ovz1.itlaborykt.zm9y1.vps.myjino.ru/daemon/daemon.php &
?>