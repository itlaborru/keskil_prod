<?php
header("Access-Control-Allow-Origin: *");
$j = file_get_contents('cache.json');
$a =  json_decode($j);
if ($_POST['object'] == "yes" ){
	echo json_encode($a);
}
if ($_POST['cache']){
	$response = array();
	$cacheList = $_POST['cache'];
	foreach($cacheList as $value){
		$cacheVal = $a->$value;
		$response[$value.""] = ($cacheVal);
		
	};
	echo json_encode($response);
}
if ($_POST['lastChanges'] ){
	session_start(); 

	if($_SESSION['loggedIn'] != 'yes'){ 
		//exit('Voidite v sistemu!'); 
	} 
	$resList = array();
	$cacheList = $_POST['lastChanges'];
	$change = $a->lastChanges;
	$change = $change[0];	
	$sesId =  $_SESSION['id'];
	foreach($cacheList as  $key => $value){
		$changeVal = $change->$key;
		if($changeVal > $value) {
			array_push($resList, $key.'');
			
		}
	};
	foreach($resList as $value){
		$cacheVal = $a->$value;
		$cacheVal = array_slice($cacheVal, 0, 20);
		$response[$value.""] = ($cacheVal);
		
	};
	
	$response["lastChangesNew"] = ($change);
	echo json_encode($response);
}

?>