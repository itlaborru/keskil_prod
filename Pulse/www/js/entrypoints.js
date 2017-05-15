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
				if(localStorage.getItem("city")) {
					var city = localStorage.getItem("city");
					mapManager.setUpCity(mapManager.firstCall,city);
				}
				else {
					console.log("Choose a city");
					
					mainView.router.load({pageName: 'cityPicker'});
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
				app.alert('Подтвердите почту! Cледуйте инструкциям, отправленным на вашу почту. Если нет письма - проверьте папку "Спам"', 'Пульс');
				$('.loginReg').val('');
				$('.passReg').val('');
				$('.mailReg').val('');
			}
		);
	},
	signIn:function(login,pass) {
		ajax(server + "signIn.php",
			{
				'login':login,
				'pass': pass
			},
			function(data){
				data = JSON.parse(data);
				if(data.check =="correct") {
					app.alert('Вы вошли в свой аккаунт', 'Пульс');
					userInfo['sid'] = data.cookie;
					userInfo['userName'] = data.login;
					userInfo['loggedIn'] = true;
					localStorage.setItem("userInfo",JSON.stringify(userInfo));
					entrypoints.getCities();
					cookies.setCookie('PHPSESSID', userInfo.sid);
					$(".logOut").removeClass("display-none");
					$('.loginSign').val('');
					$('.passSign').val('');
				}
				else {
					app.alert('Ошибка: '+data.text, 'Пульс');
				}
			}
		);
	},
	logOut:function() {
		ajax(server + "logout.php",
			{
			},
			function(data){
				data = JSON.parse(data);
				console.log(data);
				if(data.check =="correct") {
					app.alert(data.text, 'Пульс');
					userInfo = {};
					localStorage.removeItem("userInfo");
					mainView.router.load({pageName: 'login'});
				}
				else {
					app.alert('Ошибка: '+data.text, 'Пульс');
				}
			}
		);
	}
	/*getUserData:function(sid) {
		ajax(server + "get.php",
			{
				'file':	'userInfo',
				'sid':sid
			},
			function(data){
				data = JSON.parse(data);
				if(data.check =="correct") {
					/*app.alert('Вы вошли в свой аккаунт', 'Пульс');
					userInfo['sid'] = data.cookie;
					userInfo['userName'] = data.login;
					userInfo['loggedIn'] = true;
					localStorage.setItem("userInfo",JSON.stringify(userInfo));
				}
				else {
					app.alert('Ошибка: '+data.text, 'Пульс');
				}
			}
		);
		
	}*/
}