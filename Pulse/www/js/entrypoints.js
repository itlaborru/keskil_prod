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
	//Отправка поста
	sendMarker: function(data,category){
		ajax(server + "set.php",
			{
				'file':	category,
				'lat': data.lat,
				'lng': data.lng,
				'content': data.content,
				'city': data.city,
				'checker': 'ok',
				'type': 'marker'
			},
			function(data){
				if(data =="ok") {
					app.alert("Ваш пост опубликован", "Пульс");
					drawingManager.clearDrawings();
					$(".show__element[data-id='drawing']").toggleClass("state_active");
					entrypoints.getMarkers(mapManager.oldCity,mapManager.oldCateg);
				}
				else {
					app.alert("Произошла ошибка, попробуйте немного позднее", "Пульс");
				}
			}
		);
	},
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
	//Получение постов
	getMarkers:function(city,category) {
		ajax(server + "get.php",
			{
				'file':	'marker',
				'category':category,
				'data': 'all',
				'city':	city
			},
			function(data){
				//Создание объекта историй
				var newStories = 
				{
					markers: {
					}
				};
				newStories.markers[city] = JSON.parse(data);
				Data[category] = newStories;
				//Парсинг координат
				for(var i = 0;i<Data[category].markers[city].length;i++){
					
					Data[category].markers[city][i].lat = parseFloat(Data[category].markers[city][i].lat);
					Data[category].markers[city][i].lng = parseFloat(Data[category].markers[city][i].lng);
				}
				//Отрисовка карты
				mapManager.render(mapManager.firstCall,category,city);
			}
		);
	},
	registration:function(login,pass,mail) {
		ajax(server + "registration.php",
			{
				'login':login,
				'pass': pass,
				'mail':	mail
			},
			function(data){
				console.log(data);
			}
		);
	}
}