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
		
			<input class="id" name="id" type="text" placeholder="id" data-file=\'cartoonssql.php\'>
			<input class="url" name="url" type="text" placeholder="url" data-file=\'cartoonssql.php\'>
			<input class="name" name="name" type="text" placeholder="name" data-file=\'cartoonssql.php\'>
			<input class="category" name="category" type="text" placeholder="category" data-file=\'cartoonssql.php\'>
			<input class="push" name="push" type="button" value="push" data-file="cartoonssql.php"> 
			<input class="update" name="update" type="button" value="update" data-file="cartoonssql.php"> </br>';
	
	$sql = mysql_query('SELECT * FROM `cartoonslist` WHERE 1');
	
	while ($result = mysql_fetch_assoc($sql)) //Пуш данных в массив для вывода.
	{ 
		echo $result['id'].' ';
		echo $result['url'].' ';
		echo $result['name'].' ';
		echo $result['category'].' ';
		echo '<input class="delete" name="delete" type="button" value="delete" data-file="cartoonssql.php" data-id="'.$result['id'].'">'.'</br>';
	}
	
		echo '<input class="id" name="id" type="text" placeholder="id" data-file=\'cartoonscategorysql.php\'>
		<input class="category" name="category" type="text" placeholder="category" data-file=\'cartoonscategorysql.php\'>
		<input class="push" name="push" type="button" value="push" data-file="cartoonscategorysql.php"> 
		<input class="update" name="update" type="button" value="update" data-file="cartoonscategorysql.php"> </br>';
	
	$sql = mysql_query('SELECT * FROM `cartoonscategory` WHERE 1');
	
	while ($result = mysql_fetch_assoc($sql)) //Пуш данных в массив для вывода.
	{ 
		echo $result['id'].' ';
		echo $result['category'].' ';
		echo '<input class="delete" name="delete" type="button" value="delete" data-file="cartoonscategorysql.php" data-id="'.$result['id'].'">'.'</br>';
	}
	
	echo '
			</div>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
		<script>
			
			$(".push").on("click", function(){
				if( $(this).attr("data-file") == "cartoonssql.php" ){
					var data = {
						type: "push",
						url: $(".url[data-file=\'cartoonssql.php\']").val(),
						name: $(".name[data-file=\'cartoonssql.php\']").val(),
						category: $(".category[data-file=\'cartoonssql.php\']").val()
					};
				} else {
					var data = {
						type: "push",
						category: $(".category[data-file=\'cartoonscategorysql.php\']").val()
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
				
				if( $(this).attr("data-file") == "cartoonssql.php" ){
					var data = {
						type: "update",
						id: $(".id[data-file=\'cartoonssql.php\']").val(),
						url: $(".url[data-file=\'cartoonssql.php\']").val(),
						name: $(".name[data-file=\'cartoonssql.php\']").val(),
						category: $(".category[data-file=\'cartoonssql.php\']").val()
					};
				} else {
					var data = {
						type: "update",
						id: $(".id[data-file=\'cartoonscategorysql.php\']").val(),
						category: $(".category[data-file=\'cartoonscategorysql.php\']").val()
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