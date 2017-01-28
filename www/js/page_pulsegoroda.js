var pulsegoroda = {
	markers : [
	],
	actualMarkers:	[
	],
	map : "",
	render:	function() {
		pulsegoroda.markers = [];
		for (var i = 0; i < DataAjax.pulsegoroda.length; i++) {
			if(DataAjax.pulsegoroda[i].available == "1") {
				var thisMarker = DataAjax.pulsegoroda[i];
				thisMarker.lng = JSON.parse(thisMarker.lang);
				thisMarker.lat = JSON.parse(thisMarker.lat);
				pulsegoroda.markers.push(thisMarker);
				
			}
		}
		pulsegoroda.initMap();
		pulsegoroda.bindEvents();
	},
	notFirstUse:	false,
	bindEvents: function() {
		if(!pulsegoroda.notFirstUse) {
			$('.pulseGorodapush').on('click',function(){
				ajax(entrypoints.pulseAddStory.url,
					{
						file: "pulsegoroda",
						type: "push",
						story_name: $('.story_name').val(),
						story: $('.story').val()
					},
					entrypoints.pulseAddStory.success
				);
			});
			
			$("#pulsegoroda__addstory").click(function() {
				app.alert(dictionary.choosePlace, dictionary.keskil);
				pulsegoroda.setMapOnAll(null);
				
				var drawingManager = new google.maps.drawing.DrawingManager({
					drawingMode: google.maps.drawing.OverlayType.MARKER,
					drawingControl: true,
					drawingControlOptions: {
						position: google.maps.ControlPosition.TOP_CENTER,
						drawingModes: [
							google.maps.drawing.OverlayType.MARKER,
						]
					},
					markerOptions: {
						draggable: true,
					},
				});	

				drawingManager.setMap(pulsegoroda.map);
				
				return false;
			});
			pulsegoroda.notFirstUse = true;
		}
	},
	setMapOnAll: function(map) {
		for (var i = 0; i < pulsegoroda.actualMarkers.length; i++) {
			pulsegoroda.actualMarkers[i].setMap(map);
		}
	},
	initMap : function() {	

		if(!pulsegoroda.notFirstUse) {
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
			pulsegoroda.map = new google.maps.Map(document.getElementById('map'), {
				center: {lat: 62.031030526953856, lng: 129.72959222272038},
				zoom: 1,
				minZoom: 10,
				maxZoom: 18,
				disableDefaultUI: true,
			});
			
			console.log(map);
			
			pulsegoroda.map.mapTypes.set('map_style', styledMap);
			pulsegoroda.map.setMapTypeId('map_style');
		}

		
		pulsegoroda.setMapOnAll(null);
		
		for(var i=0; i<pulsegoroda.markers.length; i++){
			marker = new google.maps.Marker({
				position: {lat: pulsegoroda.markers[i].lat, lng: pulsegoroda.markers[i].lng},
				map: pulsegoroda.map,
			});
			pulsegoroda.actualMarkers.push(marker);
			makeInfoWin(marker, pulsegoroda.markers[i].story)
		}	
		
		
		
		function makeInfoWin(marker, data) {
			var infowindow = new google.maps.InfoWindow({ content: data });
				google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map,marker);
			});  
		};
	}
};	
