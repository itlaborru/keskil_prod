$('.pulseGorodapush').on('click',function(){
	alert(1);
	$.ajax({
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
		
	});
});
var map;
function initAutocomplete() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 62.031030526953856, lng: 129.72959222272038},
		zoom: 1,
		minZoom: 10,
		maxZoom: 18,
		disableDefaultUI: true,
	});
}
