var pulsegoroda = {
	latSend:	0,
	lngSend:	0,
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
			$("#pulsegoroda__addstory").click(function() {
				if(localStorage.getItem("userInfo")) {
					app.alert(dictionary.choosePlace, dictionary.keskil);
					pulsegoroda.setMapOnAll(null);
					$("#pulsegoroda__addstory").addClass("display-none");
					
					pulsegoroda.drawingManager.setMap(pulsegoroda.map);
				}
				else {
					app.alert(dictionary.plsLogin, dictionary.keskil);
				}
				return false;
			});
			pulsegoroda.notFirstUse = true;
		}
	},
	drawingManager:'',
	setMapOnAll: function(map) {
		for (var i = 0; i < pulsegoroda.actualMarkers.length; i++) {
			pulsegoroda.actualMarkers[i].setMap(map);
		}
	},
	
	infoWindow:	new google.maps.InfoWindow({
		content: '<textarea placeholder="Название истории" class="story_name">'+'</textarea>'+'<textarea placeholder="Ваша история" class="story">'+'</textarea>'+'<p>'+'<a href="#" class="button active pulseGorodapush">'+'Отправить'+'</a>'+'</p>'
	}),
	
	initMap : function() {	
		$("#pulsegoroda__addstory").removeClass("display-none");
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
			
			pulsegoroda.map.mapTypes.set('map_style', styledMap);
			pulsegoroda.map.setMapTypeId('map_style');
			
			pulsegoroda.drawingManager = new google.maps.drawing.DrawingManager({
				drawingMode: google.maps.drawing.OverlayType.MARKER,
				drawingControl: false,
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
		}

		google.maps.event.addListener(pulsegoroda.drawingManager, 'markercomplete', function(marker) {
			pulsegoroda.latSend = marker.getPosition().lat();
			pulsegoroda.lngSend = marker.getPosition().lng();
			pulsegoroda.drawingManager.setMap(null);
			
			marker.addListener('drag', function() {
				pulsegoroda.latSend = marker.getPosition().lat();
				pulsegoroda.lngSend = marker.getPosition().lng();
				console.log(pulsegoroda.latSend,pulsegoroda.lngSend);
			});
			
			$(".back").click(function() {
				pulsegoroda.infoWindow.setContent(pulsegoroda.infoWindow.content);
				pulsegoroda.infoWindow.close();
				marker.setMap(null);
			})
			
			marker.addListener('click', function() {
				pulsegoroda.infoWindow.open(pulsegoroda.map, marker);
				
				$('.pulseGorodapush').on('click',function(){
					if($(".story").val()===""){
						app.alert(dictionary.writeText, dictionary.keskil);
					}
					else{
						ajax(entrypoints.pulseAddStory.url,{
								file: "pulsegoroda",
								type: "push",
								lang:	pulsegoroda.lngSend,
								lat:	pulsegoroda.latSend,
								story: $('.story').val(),
								story_name: $('.story_name').val(),
							},
							entrypoints.pulseAddStory.success
						);
						pulsegoroda.infoWindow.setContent(pulsegoroda.infoWindow.content);
						pulsegoroda.infoWindow.close();
						marker.setMap(null);
						pulsegoroda.initMap();
					}
				});
				google.maps.event.clearListeners(marker, 'click');
			});
		});
		
				
		pulsegoroda.setMapOnAll(null);
		pulsegoroda.drawingManager.setMap(null);
		
		for(var i=0; i<pulsegoroda.markers.length; i++){
			marker1 = new google.maps.Marker({
				position: {lat: pulsegoroda.markers[i].lat, lng: pulsegoroda.markers[i].lng},
				map: pulsegoroda.map,
			});
			pulsegoroda.actualMarkers.push(marker1);
			makeInfoWin(marker1, pulsegoroda.markers[i].story)
		}	
		
		function makeInfoWin(marker1, data) {
			var infowindow = new google.maps.InfoWindow({ content: data });
				google.maps.event.addListener(marker1, 'click', function() {
				infowindow.open(map,marker1);
			});  
		};
	}
};	
