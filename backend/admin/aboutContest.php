
<?

	include('rootChecker.php');
	
	$loginFordb = 'valeratop';
	$passFordb = '123456';
	
	include('includes/connect.php');
	
	?>
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8" />
			<title>Название</title>
		</head>
		<body>
		<input class="start" name="start" type="text" placeholder="start">
		<input class="end" name="end" type="text" placeholder="end">
		<input class="title" name="title" type="text" placeholder="title">
		<input class="content" name="content" type="text" placeholder="content">
		<input class="update" name="update" type="button" value="update">
		<input class="delete" name="delete" type="button" value="delete" data-id="<? echo $_GET['id'] ?>"> 
		<input class="stop" name="stop" type="button" value="stop" data-id="<? echo $_GET['id'] ?>"> </br>
		
	<?
	
	$sql = mysql_query('SELECT * FROM `contestlist` WHERE id = "'.$_GET['id'].'"');
	
	$result = mysql_fetch_assoc($sql);
	
	echo $result['id'].' ';
	echo $result['start'].' ';
	echo $result['end'].' ';
	echo $result['title'].' ';
	echo $result['content'].' ';
	echo $result['winner'].'</br>';
	
	
	$sql = mysql_query('SELECT * FROM `filelist` WHERE contest = "'.$_GET['id'].'" ');
	
	while ($result = mysql_fetch_assoc($sql)) //Пуш данных в массив для вывода.
	{ 
		echo $result['id'].' ';
		echo $result['user'].' ';
		echo $result['contest'].' ';
		echo '<img style="height:100px" src="http://'.$result['name'].'"/>';
		echo $result['date'].' ';
		echo $result['text'].' ';
		echo '<input class="win" name="win" type="button" value="make winner" data-id="'.$result['id'].'" data-contest="'.$result['contest'].' '.'">'.'</br>';
	}
	?>
	
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
		<script>
			
			$(".update").on("click", function(){
				shortAjax(
					"contestsql.php",
					{
						type: "update",
						id: <? echo $_GET['id'] ?>,
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
						id: <? echo $_GET['id'] ?>
					},
					function(data){
						alert(data);
					}
				);
			});
			
			$(".stop").on("click", function(){
				shortAjax(
					"contestsql.php",
					{
						type: "stop",
						id: <? echo $_GET['id'] ?>
					},
					function(data){
						alert(data);
					}
				);
			});
			
			$(".win").on("click", function(){
				shortAjax(
					"contestsql.php",
					{
						type: "win",
						id: $(this).attr("data-id"),
						contest: $(this).attr("data-contest")
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
					error: function(){
						alert(data);
					}
				
				});
			};
			
		</script>
		</body>
		</html>
		
<?

<?

	include('rootChecker.php');
	
	$loginFordb = 'valeratop';
	$passFordb = '123456';
	
	include('includes/connect.php');
	
	?>
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8" />
			<title>Название</title>
		</head>
		<body>
		<input class="start" name="start" type="text" placeholder="start">
		<input class="end" name="end" type="text" placeholder="end">
		<input class="title" name="title" type="text" placeholder="title">
		<input class="content" name="content" type="text" placeholder="content">
		<input class="update" name="update" type="button" value="update">
		<input class="delete" name="delete" type="button" value="delete" data-id="<? echo $_GET['id'] ?>"> 
		<input class="stop" name="stop" type="button" value="stop" data-id="<? echo $_GET['id'] ?>"> </br>
		
	<?
	
	$sql = mysql_query('SELECT * FROM `contestlist` WHERE id = "'.$_GET['id'].'"');
	
	$result = mysql_fetch_assoc($sql);
	
	echo $result['id'].' ';
	echo $result['start'].' ';
	echo $result['end'].' ';
	echo $result['title'].' ';
	echo $result['content'].' ';
	echo $result['winner'].'</br>';
	
	
	$sql = mysql_query('SELECT * FROM `filelist` WHERE contest = "'.$_GET['id'].'" ');
	
	while ($result = mysql_fetch_assoc($sql)) //Пуш данных в массив для вывода.
	{ 
		echo $result['id'].' ';
		echo $result['user'].' ';
		echo $result['contest'].' ';
		echo '<img style="height:100px" src="http://'.$result['name'].'"/>';
		echo $result['date'].' ';
		echo $result['text'].' ';
		echo '<input class="win" name="win" type="button" value="make winner" data-id="'.$result['id'].'" data-contest="'.$result['contest'].' '.'">'.'</br>';
	}
	?>
	
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
		<script>
			
			$(".update").on("click", function(){
				shortAjax(
					"contestsql.php",
					{
						type: "update",
						id: <? echo $_GET['id'] ?>,
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
						id: <? echo $_GET['id'] ?>
					},
					function(data){
						alert(data);
					}
				);
			});
			
			$(".stop").on("click", function(){
				shortAjax(
					"contestsql.php",
					{
						type: "stop",
						id: <? echo $_GET['id'] ?>
					},
					function(data){
						alert(data);
					}
				);
			});
			
			$(".win").on("click", function(){
				shortAjax(
					"contestsql.php",
					{
						type: "win",
						id: $(this).attr("data-id"),
						contest: $(this).attr("data-contest")
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
					error: function(){
						alert(data);
					}
				
				});
			};
			
		</script>
		</body>
		</html>
		
<?

?>