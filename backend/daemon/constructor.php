<?php
$loginFordb = 'root';
$passFordb = '123456';

header("Access-Control-Allow-Origin: *");

$db = mysql_connect('localhost',$loginFordb, $passFordb) or die(mysql_error());
mysql_select_db('lavr-ik_keskil', $db) or die("ERROR");
mysql_query("SET NAMES utf8");
$sqlNewslist ="SELECT * FROM  `newslist` ORDER BY  `id` DESC"; 
$sqlCartoonscategory ="SELECT * FROM  `cartoonscategory` ORDER BY  `id` DESC"; 
$sqlCartoonslist ="SELECT * FROM  `cartoonslist` ORDER BY  `id` DESC"; 
$sqlContestlist ="SELECT * FROM  `contestlist` ORDER BY  `id` DESC"; 
$dateKeyNews=mysql_fetch_array(mysql_query("SELECT id FROM newslist ORDER BY id DESC LIMIT 1"));
$key1=$dateKeyNews['id']; 
//if ($areDaemon = "daemon"){//демоновские штуки
//if ($_POST['id'] < $key1){//демоновские штуки
	$response = array();
	$newslist = array();
	$cartoonslist = array();
	$contestlist = array();
	$resultNewslist=mysql_query($sqlNewslist);
	/*while($row=mysql_fetch_array($resultNewslist)) {
		$id=$row['id']; 
		$title=$row['title']; 
		$content=$row['content']; 
		$categ=$row['categories']; 
		$filename=$row['filename']; 
		$filetype=$row['filetype']; 
		$rating=$row['rating'];
		$newslist[] = array("id"=> $id,"title"=> $title, "content"=> $content,"categories"=> $categ,"filename"=> $filename,"filetype"=> $filetype,"rating"=> $rating);
	};*/
	while($row=mysql_fetch_assoc($resultNewslist)){
		array_push($newslist, $row);
		
	};
	$response = array("newslist"=> $newslist);
	
	echo json_encode($response);
//}

/*if ($_POST['id']){штуки по запросу
	if( $_POST['id'] < $key1){
	} 
	//elseif( $_POST['id'] > $key1) { 
		echo "upToDate";
	}
}*/
?>