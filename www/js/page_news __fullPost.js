//Прорисовка списка категорий, получение и запись данных
var news__full__post = {
	//Прорисовка категории
	render:	function() {
		$(".fullPost").html("");
		var postId = $(".fullPost").attr("data-id");
		var block;
		var tags = "";
		if(DataAjax.newslist[postId].category.length != 0 ) {
			tags = "Тэги: ";
			for(var x = 0; x <DataAjax.newslist[postId].category.length;x++) {
				for(var y = 0; y<DataAjax.categorylist.length;y++) {
					if(DataAjax.newslist[postId].category[x] == DataAjax.categorylist[y].id){
						tags = tags + DataAjax.categorylist[y].category +" ";
					}
				}
			}
		}
		block = $("<div class='post'><h3> "+DataAjax.newslist[postId].title+"</h3><div><div class='news__tag'>"+tags+"</div>"+DataAjax.newslist[postId].content +"</div></div>");
		$(".fullPost").append(block);
	}
}