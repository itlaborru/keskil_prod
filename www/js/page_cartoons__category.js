//Прорисовка списка категорий, получение и запись данных
var cartoons__category = {
	render: function() {
		$('.category__list__inPicker').html("");
		$(".cartoonCatBlock").html("");
		function createVideo() {
			var block = $("<div class='video'><div> "+DataAjax.cartoonslist[i].name +"</div><iframe width='350' height='200' src='https://www.youtube.com/embed/"+DataAjax.cartoonslist[i].url+"?rel=0&amp;controls=0&amp;showinfo=0&feature=player_embedded' frameborder='0' allowfullscreen> </iframe></div>");
			$(".cartoonCatBlock").append(block);
		}
		for(var i = 0; i < DataAjax.cartoonslist.length; i++) {
			createVideo();
		}
		for(var i = 0; i < DataAjax.categorylist.length; i++) {
			var folder = $("<a href='#cartoons' data-cartooncat='"+DataAjax.categorylist[i].id+"' class='cartoonCategory'>"+DataAjax.categorylist[i].category+" </a></br>");
			$('.categoryPicker .category__list__inPicker').append(folder);
		};
		cartoons__category.bindEvents();
	},
	bindEvents: function(){
		$('.category__list__inPicker').on('click', '.cartoonCategory', function (e) {
			var categ = $(this).attr('data-cartooncat');
			$('.cartoonFolder').attr("data-category",categ);
			app.closeModal('.categoryPicker')	
		});
		if(!cartoons__category.notFirstUse) {
			$('.open-categoryPicker').on('click', function () {
				app.pickerModal('.categoryPicker')
			});
		}
		cartoons__category.notFirstUse = true;
	},
	notFirstUse: false,
};