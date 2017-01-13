<?

	$loginFordb = '032885006_valera';
	$passFordb = '123456';
	
	include('includes/connect.php');
	
	session_start();
	
	if($_SESSION['loggedIn'] != 'yes'){
		exit('Voidite v sistemu!');
	}
	
	$result = mysql_query('SELECT `pass` FROM `users` WHERE login="'.$_SESSION['login'].'"');
	$usersList = mysql_fetch_array($result);
	
	$oldPass = md5(htmlspecialchars(stripslashes($_POST['oldPass'])));
	$oldPass = htmlspecialchars($oldPass);
	
	$pass = stripslashes($_POST['pass']);
	$pass = htmlspecialchars($pass);
	
	if($usersList['pass'] != $oldPass){
		exit('Ne vernii starii parol!'.$userlist['pass']);
	};
	
	if(strlen($pass) < 8) {
		exit('Slishkom korotkii novii parol!');
	};
	
	$result = mysql_query('UPDATE `users` SET `pass`="'.md5($pass).'" WHERE login="'.$_SESSION['login'].'"');
	
	if($result){
		echo 'Vash parol smenen';
	};

?>