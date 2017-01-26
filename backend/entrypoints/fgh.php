<?php
header("Access-Control-Allow-Origin: *");
$js = file_get_contents('../daemon/lastChanges.json');
$j =json_decode($js, true);
$val = "newslist";//меняешь на нужную


$j[$val] = ($j[$val]+1)+'';
$fp = fopen("/var/www/domains/ovz1.itlaborykt.zm9y1.vps.myjino.ru/entryponts/lastChanges.json", "w");
fwrite($fp, json_encode($j));
fclose($fp);
echo json_encode($j);
//usr/local/zend/bin/php -f var/www/domains/ovz1.itlaborykt.zm9y1.vps.myjino.ru/entrypoints/get.php &

?>