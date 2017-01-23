//Прорисовка списка категорий, получение и запись данных
var news__category = {
	render:	function() {
		$('.category__list__inPicker').html("");
		$('.news__category .page-content .newsMain').html("");
		function createPost() {
			var block;
			block = $("<div class='post'><h3> "+DataAjax.newslist[i].title+"</h3><div>"+DataAjax.newslist[i].content +"</div></div>");
			$(".newsMain").append(block);
		}
		for(var i = 0; i < DataAjax.newslist.length; i++) {
			createPost();
		}
		for(var i = 0; i < DataAjax.categorylist.length; i++) {
			if(DataAjax.categorylist[i].type == "news") {
				var newsFolder = $("<a href='#news' data-newscat='"+DataAjax.categorylist[i].id+"' class='newsCategory'>"+DataAjax.categorylist[i].category+" </a></br>");
				$('.categoryPicker .category__list__inPicker').append(newsFolder);
			}
		}
		news__category.bindEvents();
	},
	bindEvents: function(){
		$('.category__list__inPicker').on('click', '.newsCategory', function (e) {
			var categ = $(this).attr('data-newscat');
			$('.newsFolder').attr("data-category",categ);
			app.closeModal('.categoryPicker')	
		});
		if(!news__category.notFirstUse) {
			$('.open-categoryPicker').on('click', function () {
				app.pickerModal('.categoryPicker')
			});
		}
		news__category.notFirstUse = true;
	},
	notFirstUse: false,
}