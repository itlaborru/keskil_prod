//Прорисовка списка категорий, получение и запись данных
var news__category = {
	render:	function() {
		$('.category__list__inPicker').html("");
		$('.news__category .page-content .newsMain').html("");
		function createPost() {
			var block;
			var tags = "Тэги: ";
			for(var x = 0; x <DataAjax.newslist[i].category.length;x++) {
				for(var y = 0; y<DataAjax.categorylist.length;y++) {
					if(DataAjax.newslist[i].category[x] == DataAjax.categorylist[y].id){
						tags = tags + DataAjax.categorylist[y].category +" ";
					}
				}
			}
			var text = DataAjax.newslist[i].content;
			if(text.length > newsPreviewMaxSymbols) {
				text = text.slice(0,newsPreviewMaxSymbols) + "...";
			}
			block = $("<div class='post' data-id='"+i+"'><h3> "+DataAjax.newslist[i].title+"</h3><div class='news__tag'>"+tags+"</div><div class='post__content'>"+text +"</div></div>");
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
		$('.newsMain').on('click', '.post', function (e) {
			var postId = $(this).attr('data-id');
			$('.fullPost').attr("data-id",postId);
			mainView.router.load({pageName: 'news__full__post'});
		});
		$('.newsFolder').on('click', '.post', function (e) {
			var postId = $(this).attr('data-id');
			$('.fullPost').attr("data-id",postId);
			mainView.router.load({pageName: 'news__full__post'});
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