<<<<<<< HEAD
var markers = [
	{
		lat :  62.04424687451881,
		lng : 129.74153668619692,
		text : "Якутск - место, где постоянно проходит схватка между искусством и прозой жизни. Ближайшее место, где вы сможете убедиться в этом лично находится в пяти минутах от центра города и подходит как для прогулки, так и для того, чтобы понять дух города. Здесь вы сможете увидеть примерно вот такие вещи .",
	},
	{
		lat : 62.034325,
		lng : 129.713775,
		text : "В Якутске существует Невезучий Карась. Вкратце - благодаря этой рыбе, местные жители смогли пережить голод во время сложного исторического периода. К сожалению, чувство благодарности к этому историческому деятелю испытывают не все, поэтому скульптуру регулярно похищают. Прогулявшись к мосту, вы сможете лично узнать актуальное состояние Карася и сделать соответствующий пост в Instagram с хэш-тэгом #SaveYakitianFish.",
	},
	{
		lat : 62.03079996961933,
		lng : 129.729242362082,
		text : "Немного прогулявшись в этом районе вы неминуемо столкнетесь со статуей Терминатора, который вылезает из-под земли. Когда будете фотографироваться с ним и заливать фотку в социальные сети, имейте в виду, что он такой же герой, как и Карась. Просто ему везет больше. Ну или настоящее искусство все же побеждает. ",
	},
];

var map;
function initMap() {
	var styles = [
=======
var pulsegoroda = {
	markers : [
>>>>>>> 2df141920f74d28689f20fdc00eea7471c47f4f1
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
	map : "",
	render:	function() {
		this.initMap();
	},
	initMap : function() {
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
			minZoom: 10,
			maxZoom: 18,
			disableDefaultUI: true,
		});
<<<<<<< HEAD
		makeInfoWin(marker, markers[i].text)
	}	
	
	function makeInfoWin(marker, data) {
		var infowindow = new google.maps.InfoWindow({ content: data });
		google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map,marker);
		});  
	}
}
addEventListener("keydown", function(event) {
    if (event.keyCode == 86)//пока что по нажатию V показывать карту
		initMap();
});


var myApp = new Framework7();
 
var $$ = Dom7;
 
$$('.open-about').on('click', function () {
	 
});  

=======
			
		map.mapTypes.set('map_style', styledMap);
		map.setMapTypeId('map_style');
		
		for(var i=0; i<this.markers.length; i++){
			marker = new google.maps.Marker({
				position: {lat: this.markers[i].lat, lng: this.markers[i].lng},
				map: map,
			});
			makeInfoWin(marker, this.markers[i].text)
		}	
		
		function makeInfoWin(marker, data) {
			var infowindow = new google.maps.InfoWindow({ content: data });
				google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map,marker);
			});  
		};
	},
};
/*
$('.button').on('click', function () {
	myApp.popup('.popup');
});  
*/
>>>>>>> 2df141920f74d28689f20fdc00eea7471c47f4f1
