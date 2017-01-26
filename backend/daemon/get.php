<?php
header("Access-Control-Allow-Origin: *");
$cache =  json_decode(file_get_contents(dirname(__FILE__)."/cache.json"));
$change =  json_decode(file_get_contents(dirname(__FILE__)."/lastChanges.json"));
if($_POST['object']){
	if($_POST['object']['coldStart'] == "yes" ){
		foreach($cache as  $key => $value){
			$cacheVal = $cache->$key;
			$response[$key.""] = ($cacheVal);
		};
		$response["lastChanges"] = ($change);
		echo json_encode($response);
	}  
	/*if ($_POST['object']['cache']){
		$response = array();
		$cacheList = $_POST['cache'];
		foreach($cacheList as $value){
			$cacheVal = $cache->$value;
			$response[$value.""] = ($cacheVal);
			
		};
		echo json_encode($response);
	} */ 
	if ($_POST['object']['lastChanges']){
		$resList = array();
		$cacheList = $_POST['object']['lastChanges'];
		
		
		$isChanged = 0;
		foreach($cacheList as  $key => $value){
			$changeVal = ($change->$key);
			if($changeVal != $value) {
				array_push($resList, $key.'');
				$isChanged = $isChanged + 1;
			}
		};
		foreach($resList as $value){
			$cacheVal = $cache->$value;
			$response[$value.""] = ($cacheVal);
			
		};
		sleep(1);
		if ($isChanged >= 1) {
			$response["lastChanges"] = ($change);
			echo json_encode($response);
		}
		else {
			echo  'false';
		}
	}
}
?>