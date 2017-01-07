//Прорисовка списка категорий, получение и запись данных
var news__category = {
	render:	function() {
		$('.news__category .page-content .news').html("");
		for(var i = 0; i < DataAjax.newscategs.length; i++) {
			var newsFolder = $("<a href='#news' data-newscat='"+DataAjax.newscategs[i].category+"' class='newsCategory'>"+DataAjax.newscategs[i].category+" </a></br>");
			$('.news__category .page-content .news').append(newsFolder);
		}
		news__category.bindEvents();
	},
	bindEvents: function(){
		if(!news__category.notFirstUse) {
			$('.news__category').on('click', '.newsCategory', function (e) {
				var categ = $(this).attr('data-newscat');
				$('.newsFolder').attr("data-category",categ);
			});
		}
		news__category.notFirstUse = true;
	},
	notFirstUse: false,
}