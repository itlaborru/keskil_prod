//Прорисовка списка категорий, получение и запись данных
var news = {
	scroll:	0,
	actualHeight:	"",
	actualScroll:	0,
	activeScroll:	false,
	render:	function(update) {
		$('.category__list__inPicker').html("");
		$('.news .page-content .newsMain').html("");
		var ifClear = true;
		var cat = $(".newsMain").attr("data-category");
		function createPost() {
			var block;
			var tags = "";
			if(DataAjax.newslist[i].category.length != 0 ) {
				tags = "Тэги: ";
				for(var x = 0; x <DataAjax.newslist[i].category.length;x++) {
					for(var y = 0; y<DataAjax.categorylist.length;y++) {
						if(DataAjax.newslist[i].category[x] == DataAjax.categorylist[y].id){
							tags = tags + DataAjax.categorylist[y].category +" ";
						}
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
			if(cat != "without") {
				if(DataAjax.newslist[i].category.length >=2) {
					for(var y=0; y<DataAjax.newslist[i].category.length;y++ ) {
						if(cat ==DataAjax.newslist[i].category[y]) {
							createPost();
							ifClear = false;
						}					
					}
				}
				else {
					if(cat == DataAjax.newslist[i].category[0]) {
						createPost();
						ifClear = false;
					}
				}
			}
			else {
				ifClear = false;
				createPost();
			}
		}
		if(ifClear) {
			app.alert(dictionary.noContent, dictionary.sorry);
			mainView.router.load({pageName: 'index'});
		}
		for(var i = 0; i < DataAjax.categorylist.length; i++) {
			if(DataAjax.categorylist[i].type == "news") {
				var newsFolder = $("<a href='#news' data-newscat='"+DataAjax.categorylist[i].id+"' class='newsCategory'>"+DataAjax.categorylist[i].category+" </a><br/>");
				$('.categoryPicker .category__list__inPicker').append(newsFolder);
			}
		}
		if(update == "new") {
			if(news.actualHeight >$('.newsMain').height() ) {
				news.actualScroll = news.actualHeight - $('.newsMain').height() + news.scroll;
			}
			else {
				news.actualScroll = $('.newsMain').height() -news.actualHeight + news.scroll;
			}
			$('.newsMainTriggerScroll').scrollTop(news.actualScroll);
			if(news.actualScroll > 80) {
				$('.newNews').addClass('state_active');
				news.activeScroll = true;
			}
		}
		
		news.actualHeight = $('.newsMain').height();
		news.bindEvents();
	},
	bindEvents: function(){
		$('.category__list__inPicker').on('click', '.newsCategory', function (e) {
			var categ = $(this).attr('data-newscat');
			$('.newsMain').attr("data-category",categ);
			app.closeModal('.categoryPicker');
			news.render();			
		});
		$('.newsMain').on('click', '.post', function (e) {
			var postId = $(this).attr('data-id');
			$('.fullPost').attr("data-id",postId);
			mainView.router.load({pageName: 'news__full__post'});
		});

		if(!news.notFirstUse) {
			$('.open-categoryPicker').on('click', function () {
				app.pickerModal('.categoryPicker');
			});
			$('.newNews').on('click', function () {
				$('.newsMainTriggerScroll').scrollTop(0);
				$('.newNews').removeClass('state_active');
				news.activeScroll = false;
			});
			$('.newsMainTriggerScroll').on('scroll', function () {
				if(news.activeScroll) {
					if($('.newsMainTriggerScroll').scrollTop() <80) {		
						$('.newNews').removeClass('state_active');
						news.activeScroll = false;
					}
				}
			});
		}
		news.notFirstUse = true;
	},
	notFirstUse: false,
}