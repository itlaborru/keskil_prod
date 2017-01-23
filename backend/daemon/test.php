<?
header("Access-Control-Allow-Origin: *");
$loginFordb = 'Keskil';
$passFordb = '123456';

$db = mysql_connect('localhost',$loginFordb, $passFordb) or die(mysql_error());

mysql_select_db('lavr-ik_keskil', $db) or die("ERROR");
mysql_query("SET NAMES utf8");
mysql_set_charset("utf8");
@mail("demonrus99@gmail.com","Активация аккаунта","Сегодня в ","Content-Type: text/html; 
charset=windows-1251","From: ruslan.elizarov@bk.ru");

?>