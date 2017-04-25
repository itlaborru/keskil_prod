// Initialize app
var app = new Framework7();


var $ = Dom7;

// Add view
var mainView = app.addView('.view-main', {
    dynamicNavbar: true,
	domCache : true
});

// Handle Cordova Device Ready Event
$(document).on('deviceready', function() {
    console.log("Device is ready!");
	map.render();
});
var map = {
	infoWindow: function(marker,data) {
		var infowindow = new google.maps.InfoWindow({ content: data });
			google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map,marker);
		});  
	},
	markers : [
		{
			lat:62.0271247323787,lng:129.73246335983276
		},
		{
			lat:62.035698730736634,lng:129.67437744140625
		},
		{
			lat:62.059154174081044,lng:129.7342872619629
		},
		{
			lat:62.03920009142909,lng:129.7002124786377
		}
	],
	render: function() {
		map.map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 62.031030526953856, lng: 129.72959222272038},
			zoom: 12,
			minZoom: 4,
			maxZoom: 18,
			disableDefaultUI: true,
		});
		
		var infowindow = new google.maps.InfoWindow({
			content: "Hello"
		});
		var markers = [];
		for(var i=0; i<map.markers.length; i++){
			var marker = new google.maps.Marker({
				position: {lat: map.markers[i].lat, lng: map.markers[i].lng},
				map: map.map
			});
			map.infoWindow(marker, "Hello")
			markers.push(marker);
		}
		var markerCluster = new MarkerClusterer(map.map, markers,
        {imagePath: 'assets/m'});
	},
	map: ""
};