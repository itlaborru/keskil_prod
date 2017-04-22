// Initialize app
var app = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $ = Dom7;

// Add view
var mainView = app.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$(document).on('deviceready', function() {
    console.log("Device is ready!");
});
var map = {
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
		
		var markers = map.markers.map(function(location, i) {
			return new google.maps.Marker({
				position: location
			});
		}); 
		var markerCluster = new MarkerClusterer(map.map, markers,
            {imagePath: 'assets/m'});
	},
	map: ""
};


// Option 2. Using one 'pageInit' event handler for all pages:
$(document).on('pageBeforeAnimation', function (e) {
    // Get page data from event data
    var page = e.detail.page.name;
	window[page].render();
});
