//Прорисовка списка категорий, получение и запись данных
var news = {
	//Прорисовка категории
	render:	function() {
		$(".newsFolder").html("");
		var ifClear = true;
		var cat = $(".newsFolder").attr("data-category");
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
			$(".newsFolder").append(block);
		}
		for(var i = 0; i < DataAjax.newslist.length; i++) {
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
		if(ifClear) {
			app.alert(dictionary.noContent, dictionary.sorry);
		}
	},
}