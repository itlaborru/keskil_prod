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
<title>��������</title>
</head>
<body>

<input class="id" name="id" type="text" placeholder="id" data-file='newssql.php'>
<input class="title" name="title" type="text" placeholder="title" data-file='newssql.php'>
<input class="content" name="content" type="text" placeholder="content" data-file='newssql.php'></br>

<?
$categorylist = array();
$sql = mysql_query('SELECT * FROM `categorylist` WHERE type = "news"');
while ($result = mysql_fetch_assoc($sql)){  //��� ������ � ������ ��� ������.
	echo "<input type='checkbox' class='categoryid".$result['id']."' value='".$result['category']." '>".$result['category']"</br>";
	array_push($categorylist,array($result));	
}
?>

<input class="push" name="push" type="button" value="push" data-file="newssql.php"> 
<input class="update" name="update" type="button" value="update" data-file="newssql.php"> </br>

<?
$sql = mysql_query('SELECT * FROM `newslist` WHERE 1');
while ($result = mysql_fetch_assoc($sql)) //��� ������ � ������ ��� ������.
{ 
	echo $result['id'].' ';
	echo $result['title'].' ';
	echo $result['content'].' ';
	echo $result['category'].' ';
	echo '<input class="delete" name="delete" type="button" value="delete" data-file="newssql.php" data-id="'.$result['id'].'">'.'</br>';
}
?>

<input class="id" name="id" type="text" placeholder="id" data-file='categorysql.php'>
<input class="push" name="push" type="button" value="push" data-file="categorysql.php"> 
<input class="update" name="update" type="button" value="update" data-file="categorysql.php"> </br>

<?
$sql = mysql_query('SELECT * FROM `categorylist` WHERE type = "news"');
while ($result = mysql_fetch_assoc($sql)) //��� ������ � ������ ��� ������.
{ 
	echo $result['id'].' ';
	echo $result['category'].' ';
	echo '<input class="delete" name="delete" type="button" value="delete" data-file="categorysql.php" data-id="'.$result['id'].'">'.'</br>';
}
?>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script>
var categorylist = <? echo json_encode($categorylist) ?> ;
$(".push").on("click", function(){
	var category = [];
	var data;
	for(var i = 0; i<categorylist.length; i++){
		if($('.categoryid'+categorylist[i][0]['id']).prop("checked")){
			category.push(parseInt(categorylist[i][0]['id']));
			console.log(category);
		};
	}
	if( $(this).attr("data-file") == "newssql.php" ){
		data = {
		type: "push",
		title: $(".title[data-file='newssql.php']").val(),
		content: $(".content[data-file='newssql.php']").val(),
		category: JSON.stringify(category)
		};
	} else {
		data = {
			type: "push",
			//category: $(".category[data-file='categorysql.php']").val()
		};
	};
	shortAjax(
		$(this).attr("data-file"),
		data,
		function(data){
			alert(data);
		}
	);
});
$(".update").on("click", function(){
	var category = [];
	var data;
	for(var i = 0; i<categorylist.length; i++){
		if($('.categoryid'+categorylist[i][0]['id']).prop("checked")){
			category.push(parseInt(categorylist[i][0]['id']));
		};
	}
	if( $(this).attr("data-file") == "newssql.php" ){
		data = {
			type: "update",
			id: $(".id[data-file='newssql.php']").val(),
			title: $(".title[data-file='newssql.php']").val(),
			content: $(".content[data-file='newssql.php']").val(),
			//category: JSON.stringify(category)
		};
	} else {
		data = {
			type: "update",
			id: $(".id[data-file='categorysql.php']").val(),
			//category: $(".category[data-file='categorysql.php']").val()
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
};\
</script>
</body>
</html>