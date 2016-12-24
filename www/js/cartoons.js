//Прорисовка списка категорий, получение и запись данных
var cartoons = {
	render: function() {
		$('.cartoons .page-content .cartoonBlock').html("");
		for(var i = 0; i < DataAjax.cartoonscategory.length; i++) {
			var folder = $("<a href='#renderCartoons' data-cartooncat='"+DataAjax.cartoonscategory[i].category+"' class='cartoonCategory'>"+DataAjax.cartoonscategory[i].category+" </a></br>");
			$('.cartoons .page-content .cartoonBlock').append(folder);
		}
	},
	renderCartoonFolder: function(cat) {
		$(".inFolder").html("");
		var ifClear = true;
		function createVideo() {
			var block = $("<div class='video'><div> "+DataAjax.cartoonslist[i].name +"</div><iframe width='350' height='200' src='"+DataAjax.cartoonslist[i].url+"?rel=0&amp;controls=0&amp;showinfo=0&feature=player_embedded' frameborder='0' allowfullscreen> </iframe></div>");
			$(".inFolder").append(block);
		}
		for(var i = 0; i < DataAjax.cartoonslist.length; i++) {
			if(firstCartRender) {
				DataAjax.cartoonslist[i].category = DataAjax.cartoonslist[i].category.split(",");
			}
			else {
			}
			if(DataAjax.cartoonslist[i].category.length >=2) {
				for(var y=0; y<DataAjax.cartoonslist[i].category.length;y++ ) {
					if(cat ==DataAjax.cartoonslist[i].category[y]) {
						createVideo();
						ifClear = false;
					}					
				}
			}
			else {
				if(cat == DataAjax.cartoonslist[i].category) {
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
		if(!cartoons.notFirstUse) {
			$('.cartoons').on('click', '.cartoonCategory', function (e) {
				var categ = $(this).attr('data-cartooncat');
				console.log("Idk");
				cartoons.renderCartoonFolder(categ);
			});
		}
		cartoons.notFirstUse = true;
	},
	notFirstUse: false,
};