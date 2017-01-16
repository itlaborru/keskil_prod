//Прорисовка списка категорий, получение и запись данных
var contests__list = {
	render:	function() {
		$('.contestListBlock').html("");
		for(var i = 0; i < DataAjax.contestlist.length; i++) {
			/*var newsFolder = $("<a href='#news' data-newscat='"+DataAjax.newscategs[i].category+"' class='newsCategory'>"+DataAjax.newscategs[i].category+" </a></br>");
			$('.news__category .page-content .news').append(newsFolder);*/
			var contest = $("<a href='#contest'>"+DataAjax.contestlist[i].title+" </a></br>");
			$('.contestListBlock').append(contest);
		}
		contests__list.bindEvents();
	},
	bindEvents: function(){
		if(!contests__list.notFirstUse) {
			/*$('.news__category').on('click', '.newsCategory', function (e) {
				var categ = $(this).attr('data-newscat');
				$('.newsFolder').attr("data-category",categ);
			});*/
		}
		contests__list.notFirstUse = true;
	},
	notFirstUse: false,
}