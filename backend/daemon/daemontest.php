<?php
set_time_limit (0);
$b = true;
$loginFordb = 'Keskil';
$passFordb = '123456';

$db = mysql_connect('localhost',$loginFordb, $passFordb) or die(mysql_error());

mysql_select_db('lavr-ik_keskil', $db) or die("ERROR");
mysql_query("SET NAMES utf8");
mysql_set_charset("utf8");



$tabels = array ("newslist","newscategs","lastChanges","cartoonslist","cartoonscategory","contestlist"); //список таблиц которые грузит демон в cache.json
while($b){
	echo "working ";
	foreach($tabels as $value){
		$limit = 20;
		if($value == "lastChanges" ){
			$limit = 1;
		}
		$sqlQuery = "SELECT * FROM ".$value." ORDER BY  `id` DESC LIMIT 0 , ".$limit;
		$result=mysql_query($sqlQuery);
		$arr = array();
		while($row=mysql_fetch_assoc($result)){
			if ($value == "newslist" || $value == "cartoonslist")
			{
				$decode = $row["category"];
				$row["category"] = (json_decode($decode));
			}
			array_push($arr, $row);
		};
		$response[$value.""] = ($arr);
	};
	$fp = fopen(dirname(__FILE__)."/cache4.json", "w");
	fwrite($fp, json_encode($response));
	fclose($fp);
	sleep(5);
};
//запуск usr/local/zend/bin/php -f var/www/domains/ovz1.itlaborykt.zm9y1.vps.myjino.ru/daemon/daemontest.php &
?>