//Прорисовка списка категорий, получение и запись данных
var cartoons__category = {
	render: function() {
		$(".cartoonCatBlock").html("");
		for(var i = 0; i < DataAjax.categorylist.length; i++) {
			var folder = $("<a href='#cartoons' data-cartooncat='"+DataAjax.categorylist[i].id+"' class='cartoonCategory'>"+DataAjax.categorylist[i].category+" </a></br>");
			$('.cartoons__category .page-content .cartoonCatBlock').append(folder);
		};
		cartoons__category.bindEvents();
	},
	bindEvents: function(){
		if(!cartoons__category.notFirstUse) {
			$('.cartoons__category').on('click', '.cartoonCategory', function (e) {
				var categ = $(this).attr('data-cartooncat');
				$('.cartoonFolder').attr("data-category",categ);
			});
		}
		cartoons__category.notFirstUse = true;
	},
	notFirstUse: false,
};