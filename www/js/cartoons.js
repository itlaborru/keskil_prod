//Прорисовка списка категорий, получение и запись данных
var cartoons = {
	renderCartoons: function() {
		ajax(entrypoints.cartoonsServer.url,entrypoints.cartoonsServer.data,entrypoints.cartoonsServer.success);
	},
	renderCartoonFolder: function(cat) {
		$(".inFolder").html("");
		var ifClear = true;
		function createVideo() {
			var block = $("<div class='video'><div> "+cartoonData[i][0] +"</div><iframe width='350' height='200' src='"+cartoonData[i][1]+"?rel=0&amp;controls=0&amp;showinfo=0&feature=player_embedded' frameborder='0' allowfullscreen> </iframe></div>");
			$(".inFolder").append(block);
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
			app.alert(dictionary.noContent, dictionary.sorry);
		}
	},
	bindEvents: function(){
		$('.cartoons').on('click', '.cartoonCategory', function (e) {
			var categ = $(this).attr('data-cartooncat');
			cartoons.renderCartoonFolder(categ);
		});
	},
};