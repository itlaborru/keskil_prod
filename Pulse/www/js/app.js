// Initialize app
var app = new Framework7();

var $ = Dom7;

// Add view
var mainView = app.addView('.view-main', {
    dynamicNavbar: true,
	domCache : true
});
//Движок рисования
var drawingManager = {
	marker:"",
	//Рисование маркера
	drawMarker:function(latLng) {
		if(drawingManager.marker!="") {
			drawingManager.marker.setMap(null);
		}
		drawingManager.marker = new google.maps.Marker({
			position: latLng,
			map: mapManager.map,
			draggable:true,
		});
	},
	clickListener:"",
	//События
	drawMarkerSetup: function() {
		//Вход и выход
		$(".startDraw").on('click', function () {
			mapManager.clearMap();
			drawingManager.clickListener = mapManager.map.addListener('click', function(event) {
				drawingManager.drawMarker(event.latLng);
			});
		});
		$(".endDraw").on('click', function () {
			drawingManager.clearDrawings();
		});
		//Открытие информационного окна
		$(".completeDraw").on('click', function () {
			drawingManager.infoWindow.open(mapManager.map, drawingManager.marker);
			$(".button__push").on('click', function () {
				if($(".content__push").val()==="") {
					app.alert("Поле ввода пусто", "Ошибка");
				}
				else {
					var sendData = {
						lat: drawingManager.marker.position.lat(),
						lng: drawingManager.marker.position.lng(),
						content :$(".content__push").val(),
						city:	mapManager.oldCity
					};
					entrypoints.sendMarker(sendData,mapManager.oldCateg);
				}
			});
		});
	},
	//Очистка нарисованного маркера и прорисовка имеющихся
	clearDrawings: function() {
		google.maps.event.removeListener(drawingManager.clickListener);
		
		if(drawingManager.marker!="") {
			drawingManager.marker.setMap(null);
		}
		
		for(var i=0; i<Data[mapManager.oldCateg].markers[mapManager.oldCity].length; i++){
			var marker = new google.maps.Marker({
				position: {lat: Data[mapManager.oldCateg].markers[mapManager.oldCity][i].lat, lng: Data[mapManager.oldCateg].markers[mapManager.oldCity][i].lng},
				map: mapManager.map
			});
			mapManager.infoWindow(marker, Data[mapManager.oldCateg].markers[mapManager.oldCity][i].content)
			mapManager.markers.push(marker);
		}
	},
	//Текстовое окно при отправке маркера
	infoWindow:	new google.maps.InfoWindow({
		content: '<textarea placeholder="Введите текст" class="content__push">'+'</textarea>'+'<p>'+'<a href="#" class="button active button__push">'+'Отправить'+'</a>'+'</p>'
	}),
};
//Движок меню
var menuManager = {
	//Функция выбора города
	chooseCity:function() {
		
	}
};
//Движок карты и действий с ней
var mapManager = {
	//Параметры, по которым рисуется карта (дизайн, центр и тд)
	renderParameters: {
		city:"",
		lat:"",
		lng:""
	},
	//Показ информационного окна
	infoWindow: function(marker,data) {
		var infowindow = new google.maps.InfoWindow({ content: data });
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map,marker);
			});  
	},
	//Очистка карты
	clearMap: function() {
		for (var i = 0; i < mapManager.markers.length; i++) {
			mapManager.markers[i].setMap(null);
		}
	},
	//Изменение параметров карты в соответствии с выбранным городом, загрузка данных, связанных с городом
	setUpCity: function(ifFirst,city) {
		var category;
		currentCity = city;
		if(ifFirst) {
			category = "stories";
			entrypoints.getMarkers(city,category);
		}
		else {
			category = mapManager.oldCateg;
		}
		mapManager.firstCall = true;
		mapManager.renderParameters.city = cities[city].name;
		mapManager.renderParameters.lat = parseFloat(cities[city].lat);
		mapManager.renderParameters.lng = parseFloat(cities[city].lng);
		mapManager.renderParameters.zoom = parseInt(cities[city].zoom);
	},
	//Прорисовывание карты
	render: function(ifFirst,category,city) {
		if(ifFirst){
			mapManager.map = new google.maps.Map(document.getElementById('map'), {
				center: {lat: mapManager.renderParameters.lat, lng: mapManager.renderParameters.lng},
				zoom: mapManager.renderParameters.zoom,
				minZoom: 4,
				maxZoom: 18,
				disableDefaultUI: true,
			});
			mapManager.firstCall = false;
			//Открыть карту
			$(".loadingScreen").addClass("hideLoadingScreen");
			setTimeout(function() {
				$(".loadingScreen").addClass("display-none");
			}, SPLASH_SCREEN_TIMEOUT);
		}
		else {	
			mapManager.clearMap();
			mapManager.markers = [];
		}
		//Чтение и отрисовывание маркеров
		for(var i=0; i<Data[category].markers[city].length; i++){
			var marker = new google.maps.Marker({
				position: {lat: Data[category].markers[city][i].lat, lng: Data[category].markers[city][i].lng},
				map: mapManager.map
			});
			mapManager.infoWindow(marker, Data[category].markers[city][i].content)
			mapManager.markers.push(marker);
		}
		//Кластеризация маркеров
		//var markerCluster = new MarkerClusterer(map.map, map.markers,
       // {imagePath: 'assets/m'});
		drawingManager.drawMarkerSetup();
		mapManager.oldCateg = category;
		mapManager.oldCity = city;
	},
	//Иные параметры
	markers: [],
	oldCateg: "",
	oldCity: "",
	map: "",
	firstCall:	true
};