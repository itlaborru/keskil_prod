//Прорисовка списка категорий, получение и запись данных
function renderCartoons() {
	shortAjax('http://it-labor.ru/playground/valera/cartoonsServer.php', 
		{
			'type':'download',
		},
		function(data) {
			//$$('.cartoons .page-content .cartoonBlock').html(data); 
			data = JSON.parse(data);
			for(var i = 0; i < data[0].length; i++) {
				var folder = $$("<a href='#renderCartoons' data-cartooncat='"+data[0][i][0]+"' class='cartoonCategory'>"+data[0][i][0]+" </a></br>");
				$$('.cartoons .page-content .cartoonBlock').append(folder);
			}
			cartoonData = data[1];
			console.log(data);
			console.log(cartoonData);
		}
	);
}
//Клик по категории
$$('.cartoons').on('click', '.cartoonCategory', function (e) {
	//console.log("KAEF");
	var categ = $$(this).attr('data-cartooncat');
	renderCartoonFolder(categ);
});
//Прорисовка категории
function renderCartoonFolder(cat) {
	$$(".inFolder").html("");
	var ifClear = true;
	function createVideo() {
		var block = $$("<div class='video'><div> "+cartoonData[i][0] +"</div><iframe width='350' height='200' src='"+cartoonData[i][1]+"?rel=0&amp;controls=0&amp;showinfo=0&feature=player_embedded' frameborder='0' allowfullscreen> </iframe></div>");
		$$(".inFolder").append(block);
	}
	for(var i = 0; i < cartoonData.length; i++) {
		if(firstCartRender) {
			cartoonData[i][2] = cartoonData[i][2].split(",");
		}
		else {
		}
		if(cartoonData[i][2].length >=2) {
			//console.log(cartoonData[i][2]);
			for(var y=0; y<cartoonData[i][2].length;y++ ) {
				if(cat ==cartoonData[i][2][y]) {
					createVideo();
					ifClear = false;
				}					
			}
		}
		else {
			if(cat == cartoonData[i][2]) {
				createVideo();
				ifClear = false;
			}
		}
	}
	if(firstCartRender) {
		firstCartRender = false;
	}
	if(ifClear) {
		myApp.alert('В данной категории пока отсутствует контент', 'Приносим извинения');
	}
}