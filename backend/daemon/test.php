<?php
header("Access-Control-Allow-Origin: *");
if ($_POST['object'] = "yes" ){
	$lines = file('object.json');
	echo json_encode($lines);
	
}

?>