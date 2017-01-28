var pulsegoroda = {
	markers : [
		{
			lat :  62.04424687451881,
			lng : 129.74153668619692,
			text : "Якутск - место, где постоянно проходит схватка между искусством и прозой жизни. Ближайшее место, где вы сможете убедиться в этом лично находится в пяти минутах от центра города и подходит как для прогулки, так и для того, чтобы понять дух города. Здесь вы сможете увидеть примерно вот такие вещи .",
		},
		{
			lat : 62.0300669311373,
			lng : 129.7295600362122,
			text : "В Якутске существует Невезучий Карась. Вкратце - благодаря этой рыбе, местные жители смогли пережить голод во время сложного исторического периода. К сожалению, чувство благодарности к этому историческому деятелю испытывают не все, поэтому скульптуру регулярно похищают. Прогулявшись к мосту, вы сможете лично узнать актуальное состояние Карася и сделать соответствующий пост в Instagram с хэш-тэгом #SaveYakitianFish.",
		},
		{
			lat : 62.03079996961933,
			lng : 129.729242362082,
			text : "Немного прогулявшись в этом районе вы неминуемо столкнетесь со статуей Терминатора, который вылезает из-под земли. Когда будете фотографироваться с ним и заливать фотку в социальные сети, имейте в виду, что он такой же герой, как и Карась. Просто ему везет больше. Ну или настоящее искусство все же побеждает. ",
		},
	],
	actualMarkers:	[
	],
	map : "",
	map2 : "",
	render:	function() {
		pulsegoroda.initMap();
		pulsegoroda.bindEvents();
	},
	notFirstUse:	false,
	bindEvents: function() {
		if(!pulsegoroda.notFirstUse) {
			$('.pulseGorodapush').on('click',function(){
				alert(1);
				/*$.ajax({
					type: "POST",
					data:{
						file: "pulsegoroda",
						type: "push",
						story_name: $('.story_name').val(),
						story: $('.story').val()
					},
					url: "http://ovz1.itlaborykt.zm9y1.vps.myjino.ru/entrypoints/set.php",
					success:function(data){
						alert(data);
					}
				});*/
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
			makeInfoWin(marker, pulsegoroda.markers[i].text)
		}	
		
		function makeInfoWin(marker, data) {
			var infowindow = new google.maps.InfoWindow({ content: data });
				google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map,marker);
			});  
		};
	},
};