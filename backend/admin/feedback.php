<?

	include('rootChecker.php');
	
	$loginFordb = 'valeratop';
	$passFordb = '123456';
	
	include('includes/connect.php');
	
	echo
		'<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8" />
			<title>Название</title>
			<script src="//cdn.tinymce.com/4/tinymce.min.js"></script>
			<script>
				tinymce.init({
					selector: "#mytextarea"
				});
			</script>
		</head>
		<body>
			<textarea id="mytextarea"></textarea>
			<input class="push" name="push" type="button" value="push" >
			<div class="asdf">
			</div>';
	
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
			
			$(".push").on("click", function(){
				
				$(".asdf").html( $("#mytextarea_ifr").contents().find("body").html());
				
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