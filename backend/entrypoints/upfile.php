<?
	
	$loginFordb = 'valeratop';
	$passFordb = '123456';
	include('includes/time.php');
	include('includes/functions.php');
	
	$sqlData = mysql_query('INSERT INTO `filelist`(`user`, `type`, `contest`, `name`, `date`, `text`) VALUES ("'.$_POST['login'].'", "'.$_POST['type'].'","'.$_POST['contest'].'", "'.$_POST['dir'].'","'.$_POST['time'].'","'.$_POST['text'].'")');

?>