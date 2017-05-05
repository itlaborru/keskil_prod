var server = "http://keskil-online.ru/pulse/entrypoints/";
var cities;
var entrypoints = {
	getCities:function() {
		ajax(server + "get.php",
			{
				'file':	'cities'
			},
			function(Data){
				cities = JSON.parse(Data);
				console.log(cities);
				//КОСТЫЛЬ - ПЕРЕДЕЛАТЬ ПОТОМ
				mapManager.renderParameters.city = cities[0].name;
				mapManager.renderParameters.lat = parseFloat(cities[0].lat);
				mapManager.renderParameters.lng = parseFloat(cities[0].lng);
				mapManager.renderParameters.zoom = cities[0].zoom;
				//КОНЕЦ КОСТЫЛЯ
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