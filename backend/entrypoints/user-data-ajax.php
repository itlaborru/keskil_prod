<?
	session_start();
	
	if($_SESSION["loggedIn"] != 'yes'){//�������� ������ �� �������
		exit('Voidite v sistemu!');
	};
	
	$loginFordb = 'Keskil';
	$passFordb = '123456';
	
	include('includes/connect.php');//����� �� �����
	
	if($_POST['type'] == 'get'){//get - post ������ �� ��������� ������
		
		$id = $_SESSION['id'];
		
		$usersdata = mysql_query('SELECT `id`, `login`, `mail`, `fname`, `mname`, `lname`, `icon` FROM `users` WHERE id="'.$id.'"');
		
		$result = mysql_fetch_assoc($usersdata);
		
		echo json_encode($result);
		
	} else if ($_POST['type'] == 'edit'){//edit - ������ �� ��������� ������ �����
		
		$fname = stripslashes($_POST['fname']);
		$fname = htmlspecialchars($fname);
		$mname = stripslashes($_POST['mname']);
		$mname = htmlspecialchars($mname);
		$lname = stripslashes($_POST['lname']);
		$lname = htmlspecialchars($lname);
		
		$sql = 'UPDATE `users` SET ';//�������� ���������� sql, ������� � ����� ����� ������ ������
		
		if(!empty($fname)){//���������� ��������� ���������� ��� �� �������
			$sql .= '`fname`=';
			$sql .= '"'.$fname.'"';
			$zapyataya = true;
		};
		
		if(!empty($mname)){
			if($zapyataya){//���������� ������� ��� ������� ����������� �� ��� ����������
				$sql .= ', ';
			};
			$zapyataya = true;
			$sql .= '`mname`=';
			$sql .= '"'.$mname.'"';
		};
		
		if(!empty($lname)){
			if($zapyataya){
				$sql .= ', ';
			};
			$zapyataya = true;
			$sql .= ' `lname`=';
			$sql .= ' "'.$lname.'"';
		};
		
		$result = mysql_query($sql.' WHERE id = "'.$_SESSION['id'].'"');//sql ������ �� �����
		
		echo 'Dannie izmeneni! ';
		
	}

?>