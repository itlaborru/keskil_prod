var map;
function initMap() {
	var styles = [
		{
		  stylers: [
			{ hue: "#338cff" },
			{ saturation: -20 }
		  ]
		},
		{
		  featureType: "road",
		  elementType: "geometry",
		  stylers: [
			{ lightness: 100 },
			{ visibility: "simplified" }
		  ]
		},
		{
		  featureType: "road",
		  elementType: "labels",
		  stylers: [
			{ visibility: "off" }
		  ]
		}
	];
	
	var styledMap = new google.maps.StyledMapType(styles,
		{name: "Styled Map"}
	);
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 62.031030526953856, lng: 129.72959222272038},
		zoom: 1,
		minZoom: 13,
		maxZoom: 18,
		disableDefaultUI: true,
	});
		
	map.mapTypes.set('map_style', styledMap);
	map.setMapTypeId('map_style');
	
	var marker1 = new google.maps.Marker({
		position: {lat: 62.04424687451881, lng: 129.74153668619692},
		map: map,
	});
}
addEventListener("keydown", function(event) {
    if (event.keyCode == 86)
		initMap();
});//пока что по нажатию V показывать карту