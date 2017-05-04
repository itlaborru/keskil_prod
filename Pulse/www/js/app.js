// Initialize app
var app = new Framework7();

var $ = Dom7;

// Add view
var mainView = app.addView('.view-main', {
    dynamicNavbar: true,
	domCache : true
});

//ПОТОМ НЕОБХОДИМО ПЕРЕМЕСТИТЬ ЭТО В ДРУГОЕ МЕСТО
var Data = {
	//Эмуляция полученных данных
	stories: {
		markers : [
			{
				lat:62.0271247323787,lng:129.73246335983276,
				content: "Здесь так красиво!"
			},
			{
				lat:62.035698730736634,lng:129.67437744140625,
				content: "Якутск - место, где постоянно проходит схватка между искусством и прозой жизни. Ближайшее место, где вы сможете убедиться в этом лично находится в пяти минутах от центра города и подходит как для прогулки, так и для того, чтобы понять дух города. Здесь вы сможете увидеть примерно вот такие вещи ."
			},
			{
				lat:62.059154174081044,lng:129.7342872619629,
				content: "Го катать в 21:00"
			},
			{
				lat:62.03920009142909,lng:129.7002124786377,
				content: "I w.h."
			}
		]
	},
	food: {
		markers : [
			{
				lat:62.03920009142909,lng:129.7002124786377,
				content: "I w.h."
			}
		]
	}
}
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
var mapManager = {
	//Показ информационного окна
	infoWindow: function(marker,data) {
		var infowindow = new google.maps.InfoWindow({ content: data });
			google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map,marker);
		});  
	},
	//Прорисовывание карты
	render: function(ifFirst,category) {
		if(ifFirst){
			mapManager.map = new google.maps.Map(document.getElementById('map'), {
				center: {lat: 62.031030526953856, lng: 129.72959222272038},
				zoom: 12,
				minZoom: 4,
				maxZoom: 18,
				disableDefaultUI: true,
			});
		}
		else {	
			for (var i = 0; i < mapManager.markers.length; i++) {
				mapManager.markers[i].setMap(null);
			}
			mapManager.markers = [];
		}
		//Чтение и отрисовывание маркеров
		for(var i=0; i<Data[category].markers.length; i++){
			var marker = new google.maps.Marker({
				position: {lat: Data[category].markers[i].lat, lng: Data[category].markers[i].lng},
				map: mapManager.map
			});
			mapManager.infoWindow(marker, Data[category].markers[i].content)
			mapManager.markers.push(marker);
		}
		//Кластеризация маркеров
		//var markerCluster = new MarkerClusterer(map.map, map.markers,
       // {imagePath: 'assets/m'});
		mapManager.oldCateg = category;
	},
	markers: [],
	oldCateg: "",
	map: ""
};