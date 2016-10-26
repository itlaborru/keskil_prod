<?
	/*include('../includes/connect.php');*/
	
	/*if($_COOKIE['loggedIn'] != 'yes'){
		exit('Vi ne voshli v svoi account');
	}*/
	
	if($_FILES['userfile']['size'] > 10485760 || $_FILES['userfile']['size'] == 0){
		
		echo('File vesit slishkom mnogo');
		
	}
	
	$filetype = substr(basename($_FILES['userfile']['name']), strlen(basename($_FILES['userfile']['name']))-3);
	if(($filetype != 'jpeg') && ($filetype != 'jpg') && ($filetype != 'png')){
		exit('Ne pravilnii tip faila ('.$filetype.')');
	}
	$filetype = $_FILES['userfile']['type'];
	if(($filetype != 'image/jpeg') && ($filetype != 'image/jpg') && ($filetype != 'image/png')){
		exit('Ne pravilnii tip faila ('.$filetype.')');
	}
	
	/*$getId = mysql_query("SELECT `id` FROM `filelist` WHERE 1");
	
	$id = LAST_INSERT_ID($getId);*/
	
	$photoUploadDir = 'photo/'.basename($_FILES['userfile']['name']);
	
	
	
	if(move_uploaded_file($_FILES['userfile']['tmp_name'], $photoUploadDir)){
		/*$result = mysql_query('INSERT INTO `filelist`(`dir`, `user`) VALUES ("'.$photoUploadDir.'","'.$_COOKIE['login'].'")');*/
		echo('Loli <3');
	} else {
		exit('Neizvestnaya oshibka pri peremeshenii faila! (nomer oshibki : '.$_FILES['userfile']['error'].' )');
	}
	
	/*if($result) {
		echo('Asuka <3 '.$id['id']);
	} else {
		exit('Oshibka mysql zaprosa!');
	}*/
?>