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
	//Инициация рисования маркера
	drawMarker:function() {
		mapManager.clearMap();
		drawingManager.marker.setMap(mapManager.map);
	},
	//Настройка модуля рисования маркеров и события
	drawMarkerSetup: function() {
		//Загрузка
		drawingManager.marker = new google.maps.drawing.DrawingManager({
			drawingMode: google.maps.drawing.OverlayType.MARKER,
			drawingControl: false,
			markerOptions: {
				draggable: true,
			},
		});	
		//Когда маркер поставлен
		google.maps.event.addListener(drawingManager.marker, 'markercomplete', function(marker) {
			drawingManager.marker.setMap(null);
			marker.addListener('drag', function() {
				console.log(marker.getPosition().lat(),marker.getPosition().lng());
			});
			mapManager.clearMap();
			console.log("handler");
			
		});
	}
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
			entrypoints.getStories(city);
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
			mapManager.infoWindow(marker, Data[category].markers[city][i].story)
			mapManager.markers.push(marker);
		}
		drawingManager.drawMarkerSetup();
		//Кластеризация маркеров
		//var markerCluster = new MarkerClusterer(map.map, map.markers,
       // {imagePath: 'assets/m'});
		mapManager.oldCateg = category;
	},
	//Иные параметры
	markers: [],
	oldCateg: "",
	map: "",
	firstCall:	true
};