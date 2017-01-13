<?
	include('rootChecker.php');
	
	$loginFordb = 'valeratop';
	$passFordb = '123456';
	
	include('includes/connect.php');
	
	echo 
		'<a href="contests.php"> contests </a> </br> 
		<a href="cartoons.php"> Cartoons </a> </br> 
		<a href="users.php"> users </a> </br> 
		<a href="feedback.php"> feedback </a> </br> 
		<a href="news.php"> News </a> </br> 
		
		<a href="#" class="logout">logout</a>
		
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
		<script>
			var shortAjax = function(url, data, onSuccess){
				$.ajax({
					method : "POST",
					url: url,
					data: data,
					success: onSuccess,
				
				});
			};
			
			$(".logout").on("click", function(){
				
				shortAjax(
					"../entrypoints/logout.php",
					{},
					function(data){
						alert(data);
					}
				);
				
			});
		</script>';

?>