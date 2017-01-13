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
		</head>
		<body>
		
			<input class="id" name="id" type="text" placeholder="id">
			<input class="start" name="start" type="text" placeholder="start">
			<input class="end" name="end" type="text" placeholder="end">
			<input class="title" name="title" type="text" placeholder="title">
			<input class="content" name="content" type="text" placeholder="content">
			<input class="push" name="push" type="button" value="push"> 
			<input class="update" name="update" type="button" value="update"> </br>';
	
	$sql = mysql_query('SELECT * FROM `contestlist` WHERE 1');
	
	while ($result = mysql_fetch_assoc($sql)) //Пуш данных в массив для вывода.
	{ 
		echo $result['id'].' ';
		echo $result['start'].' ';
		echo $result['end'].' ';
		echo $result['title'].' ';
		echo $result['content'].' ';
		echo '<input class="delete" name="delete" type="button" value="delete" data-id="'.$result['id'].'">'.'</br>';
	}
	
	echo '
			</div>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
		<script>
			
			$(".push").on("click", function(){
				shortAjax(
					"contestsql.php",
					{
						type: "push",
						start: $(".start").val(),
						end: $(".end").val(),
						title: $(".title").val(),
						content: $(".content").val()
					},
					function(data){
						alert(data);
					}
				);
			});
			
			$(".update").on("click", function(){
				shortAjax(
					"contestsql.php",
					{
						type: "update",
						id: $(".id").val(),
						start: $(".start").val(),
						end: $(".end").val(),
						title: $(".title").val(),
						content: $(".content").val()
					},
					function(data){
						alert(data);
					}
				);
			});
			
			$(".delete").on("click", function(){
				shortAjax(
					"contestsql.php",
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