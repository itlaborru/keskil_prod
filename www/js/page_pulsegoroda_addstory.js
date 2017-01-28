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

