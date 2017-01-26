<?php
header("Access-Control-Allow-Origin: *");
function changeDB($val){
	$js = file_get_contents(dirname(__FILE__)."/lastChanges.json");
	$j =json_decode($js, true);
	$j[$val] = $j[$val]+1;
	$fp = fopen(dirname(__FILE__)."/lastChanges.json", "w");
	fwrite($fp, json_encode($j));
	fclose($fp);
}
//usr/local/zend/bin/php -f var/www/domains/ovz1.itlaborykt.zm9y1.vps.myjino.ru/entrypoints/get.php &

?>