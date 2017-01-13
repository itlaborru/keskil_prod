<?

	include('rootChecker.php');
	
	$loginFordb = '032885006_valera';
	$passFordb = '123456';
	
	include('../includes/connect.php');
	
	echo
		'<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8" />
			<title>Название</title>
		</head>
		<body>
		
			';
	
	$sql = mysql_query('SELECT * FROM `feedback` WHERE 1');
	
	while ($result = mysql_fetch_assoc($sql)) //Пуш данных в массив для вывода.
	{ 
		echo $result['id'].' ';
		echo $result['content'].' ';
		echo $result['user'].' ';
		echo '<input class="delete" name="delete" type="button" value="delete" data-id="'.$result['id'].'">'.'</br>';
	}
	
	echo '
			</div>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
		<script>
			
			$(".delete").on("click", function(){
				shortAjax(
					"feedbacksql.php",
					{
						type: "delete",
						id: $(this).attr("data-id")
					},
					function(data){
						alert(data);
					}
				);
			});
			
			var shortAjax = function(url, data, onSuccess){
				$.ajax({
					method : "POST",
					url: url,
					data: data,
					success: onSuccess,
				
				});
			};
			
		</script>
		</body>
		</html>';

?>