<?php
set_time_limit (0);
$b = true;
$loginFordb = 'Keskil';
$passFordb = '123456';

$db = mysql_connect('localhost',$loginFordb, $passFordb) or die(mysql_error());

mysql_select_db('lavr-ik_keskil', $db) or die("ERROR");



$tabels = array ("newslist","categorylist","cartoonslist","contestlist","lastChanges"); //список таблиц которые грузит демон в cache.json
while($b){
	$response = array();
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
			if($value != "lastChanges") {
				array_push($arr, $row);
			} else {
				$fp = fopen(dirname(__FILE__)."/lastChanges.json", "w");
				fwrite($fp, json_encode($row,JSON_UNESCAPED_UNICODE));
				fclose($fp);
			}
		};
		if($value != "lastChanges") {
			$response[$value.""] = ($arr);
		}
	};
	$fp = fopen(dirname(__FILE__)."/cache.json", "w");
	fwrite($fp, json_encode($response,JSON_UNESCAPED_UNICODE));
	fclose($fp);
	sleep(5);
};
//запуск usr/local/zend/bin/php -f var/www/domains/ovz1.itlaborykt.zm9y1.vps.myjino.ru/daemon/daemon.php &
?>