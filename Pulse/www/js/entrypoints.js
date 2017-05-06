var server = "http://keskil-online.ru/pulse/entrypoints/";
var entrypoints = {
	getCities:function() {
		ajax(server + "get.php",
			{
				'file':	'cities'
			},
			function(Data){
				cities = JSON.parse(Data);
				if(mapManager.firstCall) {
					//Тут должна вызываться функция, отвечающая за рендер поля выбора города
					mapManager.setUpCity(mapManager.firstCall,"Yakutsk");
				}
			}
		);
	},
	getStories:function() {
		ajax(server + "get.php",
			{
				'file':	'stories',
				'data': 'all'
			},
			function(Data){
				Data = JSON.parse(Data);
				console.log(Data);
			}
		);
	}
}