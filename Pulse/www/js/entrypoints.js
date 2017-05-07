//Краткий ajax-запрос
var ajax = function(url, data, onSuccess){
	$.ajax({
		method : 'POST',
		url: url,
		data: data,
		success: onSuccess,
		error: function(xhr, stat){
			console.log(stat);
		}
	});
};
//Адрес сервера
var server = "http://keskil-online.ru/pulse/entrypoints/";
var entrypoints = {
	//Получение списка городов и информации о них
	getCities:function() {
		ajax(server + "get.php",
			{
				'file':	'cities'
			},
			function(Data){
				cities = JSON.parse(Data);
				if(mapManager.firstCall) {
					//Тут должна вызываться функция, отвечающая за рендер поля выбора города
					
					//Костыль, эта функция должна просто получать список городов
					mapManager.setUpCity(mapManager.firstCall,"Yakutsk");
				}
			}
		);
	},
	//Получение историй
	getStories:function(city) {
		ajax(server + "get.php",
			{
				'file':	'stories',
				'data': 'all',
				'city':	city,
			},
			function(data){
				//Создание объекта историй
				var newStories = 
				{
					markers: {
					}
				};
				newStories.markers[city] = JSON.parse(data);
				Data['stories'] = newStories;
				//Парсинг координат
				for(var i = 0;i<Data['stories'].markers[city].length;i++){
					Data['stories'].markers[city][i].lat = parseFloat(Data['stories'].markers[city][i].lat);
					Data['stories'].markers[city][i].lng = parseFloat(Data['stories'].markers[city][i].lng);
				}
				//Отрисовка карты
				mapManager.render(mapManager.firstCall,'stories',city);
			}
		);
	}
}