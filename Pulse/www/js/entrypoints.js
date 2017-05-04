var server = "http://keskil-online.ru/pulse/entrypoints/";
var entrypoints = {
	getStories:function() {
		ajax(server + "get.php",
			{
				'file':	'stories'
			},
			function(Data){
				//Data = JSON.parse(Data);
				console.log(Data);
			}
		);
	}
}