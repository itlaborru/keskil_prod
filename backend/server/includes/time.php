<?
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
date_default_timezone_set('Asia/Yakutsk');

$time = array(
	'year' => date('Y'),
	'month' =>  date('m'),
	'day' =>  date('d'), 
	'hours' => date('H'),
	'minutes' => date('i'),
);
?>