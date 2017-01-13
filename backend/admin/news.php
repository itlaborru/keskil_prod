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
		
			<input class="id" name="id" type="text" placeholder="id" data-file=\'newssql.php\'>
			<input class="title" name="title" type="text" placeholder="title" data-file=\'newssql.php\'>
			<input class="content" name="content" type="text" placeholder="content" data-file=\'newssql.php\'>
			<input class="category" name="category" type="text" placeholder="category" data-file=\'newssql.php\'>
			<input class="push" name="push" type="button" value="push" data-file="newssql.php"> 
			<input class="update" name="update" type="button" value="update" data-file="newssql.php"> </br>';
	
	$sql = mysql_query('SELECT * FROM `newslist` WHERE 1');
	
	while ($result = mysql_fetch_assoc($sql)) //Пуш данных в массив для вывода.
	{ 
		echo $result['id'].' ';
		echo $result['title'].' ';
		echo $result['content'].' ';
		echo $result['category'].' ';
		echo '<input class="delete" name="delete" type="button" value="delete" data-file="newssql.php" data-id="'.$result['id'].'">'.'</br>';
	}
	
		echo '<input class="id" name="id" type="text" placeholder="id" data-file=\'newscategorysql.php\'>
		<input class="category" name="category" type="text" placeholder="category" data-file=\'newscategorysql.php\'>
		<input class="push" name="push" type="button" value="push" data-file="newscategorysql.php"> 
		<input class="update" name="update" type="button" value="update" data-file="newscategorysql.php"> </br>';
	
	$sql = mysql_query('SELECT * FROM `newscategs` WHERE 1');
	
	while ($result = mysql_fetch_assoc($sql)) //Пуш данных в массив для вывода.
	{ 
		echo $result['id'].' ';
		echo $result['category'].' ';
		echo '<input class="delete" name="delete" type="button" value="delete" data-file="newscategorysql.php" data-id="'.$result['id'].'">'.'</br>';
	}
	
	echo '
			</div>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
		<script>
			
			$(".push").on("click", function(){
				if( $(this).attr("data-file") == "newssql.php" ){
					var data = {
						type: "push",
						title: $(".title[data-file=\'newssql.php\']").val(),
						content: $(".content[data-file=\'newssql.php\']").val(),
						category: $(".category[data-file=\'newssql.php\']").val()
					};
				} else {
					var data = {
						type: "push",
						category: $(".category[data-file=\'newscategorysql.php\']").val()
					};
				}
				shortAjax(
					$(this).attr("data-file"),
					data,
					function(data){
						alert(data);
					}
				);
			});
			
			$(".update").on("click", function(){
				
				if( $(this).attr("data-file") == "newssql.php" ){
					var data = {
						type: "update",
						id: $(".id[data-file=\'newssql.php\']").val(),
						title: $(".title[data-file=\'newssql.php\']").val(),
						content: $(".content[data-file=\'newssql.php\']").val(),
						category: $(".category[data-file=\'newssql.php\']").val()
					};
				} else {
					var data = {
						type: "update",
						id: $(".id[data-file=\'newscategorysql.php\']").val(),
						category: $(".category[data-file=\'newscategorysql.php\']").val()
					};
				}
				
				shortAjax(
					$(this).attr("data-file"),
					data,
					function(data){
						alert(data);
					}
				);
			});
			
			$(".delete").on("click", function(){
				shortAjax(
					$(this).attr("data-file"),
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