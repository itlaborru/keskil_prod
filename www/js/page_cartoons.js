var cartoons = {
	render: function(cat) {
		$(".cartoonFolder").html("");
		var cat = $(".cartoonFolder").attr("data-category");
		var ifClear = true;
		function createVideo() {
			var block = $("<div class='video'><div> "+DataAjax.cartoonslist[i].name +"</div><iframe width='350' height='200' src='"+DataAjax.cartoonslist[i].url+"?rel=0&amp;controls=0&amp;showinfo=0&feature=player_embedded' frameborder='0' allowfullscreen> </iframe></div>");
			$(".cartoonFolder").append(block);
		}
		for(var i = 0; i < DataAjax.cartoonslist.length; i++) {
			if(DataAjax.cartoonslist[i].category.length >=2) {
				for(var y=0; y<DataAjax.cartoonslist[i].category.length;y++ ) {
					if(cat ==DataAjax.cartoonslist[i].category[y]) {
						createVideo();
						ifClear = false;
					}					
				}
			}
			else {
				if(cat == DataAjax.cartoonslist[i].category[0]) {
					createVideo();
					ifClear = false;
				}
			}
		}
		if(ifClear) {
			app.alert(dictionary.noContent, dictionary.sorry);
		}
	}
};