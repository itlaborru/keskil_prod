<?
	if(!$_POST) {//�������� �� ������� �������.
		exit('Pustoi zapros!');
	}
		
	$loginFordb = '032885006_valera';
	$passFordb = '123456';
	include('includes/connect.php');//�������� � ��.
	
	if($_POST['type'] == 'upload'){//�������� ��������� �� ������.
		session_start();
		if($_SESSION['loggedIn'] != 'yes'){
			exit('voidite v sistemu!');
		}
		$sql = mysql_query('INSERT INTO `feedback`(`content`,`user`) VALUES ("'.htmlspecialchars(stripslashes($_POST['content'])).'","'.htmlspecialchars(stripslashes($_SESSION['login'])).'")');
		if($sql) {
			echo "Success!!!";
		}
	}
	else if($_POST['type'] == 'download'){//�������� ���� ��������� � �������.
		include('admin/rootChecker.php');//�������� �� ����� ������.
		$sql = mysql_query('SELECT * FROM `feedback` WHERE 1');
		$feedback = array();
		while ($result = mysql_fetch_assoc($sql)) //��� � ������ ��� ������.
		{
			array_push($feedback, $result);
		}
		
		echo json_encode($feedback);
	}
	else if($_POST['type'] == 'delete'){
		include('admin/rootChecker.php');//�������� �� ����� ������.
		$sql = mysql_query('DELETE FROM `feedback` WHERE id="'.htmlspecialchars(stripslashes($_POST['id'])).'"');
	}
?>