<?php
header("Access-Control-Allow-Origin: *");
$j = file_get_contents(dirname(__FILE__)."/cache.json");
$LC = file_get_contents(dirname(__FILE__)."/lastChanges.json");
$a =  json_decode($j);
$change =  json_decode($LC);
if($_POST['object'] == "yes" ){
	foreach($a as  $key => $value){
		$cacheVal = $a->$key;
		$response[$key.""] = ($cacheVal);
	};
	$response["lastChanges"] = ($change);
	echo json_encode($response);
}  if ($_POST['cache']){
	$response = array();
	$cacheList = $_POST['cache'];
	foreach($cacheList as $value){
		$cacheVal = $a->$value;
		$response[$value.""] = ($cacheVal);
		
	};
	echo json_encode($response);
}  if ($_POST['lastChanges']){
	$resList = array();
	$cacheList = $_POST['lastChanges'];
	
	
	$isChanged = 0;
	foreach($cacheList as  $key => $value){
		$changeVal = ($change->$key);
		if($changeVal > $value) {
			array_push($resList, $key.'');
			$isChanged = $isChanged + 1;
		}
	};
	foreach($resList as $value){
		$cacheVal = $a->$value;
		$response[$value.""] = ($cacheVal);
		
	};
	if ($isChanged >= 1) {
		$response["lastChanges"] = ($change);
		echo json_encode($response);
	}
	else {
		echo  'false';
	}
}
?>