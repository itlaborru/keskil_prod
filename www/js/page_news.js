//Прорисовка списка категорий, получение и запись данных
var news = {
	//Прорисовка категории
	render:	function() {
		$(".newsFolder").html("");
		var ifClear = true;
		var cat = $(".newsFolder").attr("data-category");
		function createPost() {
			var block;
			//Это если есть прикрепленные файлы
			/*if(DataAjax[i][4]) {
				var file = newsData[i][5];
				file = JSON.parse(file)[0];
				file = file.split('/')[0];
				var url  = JSON.parse(newsData[i][4])[0];
				if(file == "image"){
					block = $("<div class='post'><div><h3> "+newsData[i][0]+"</h3> Категории: "+newsData[i][2]+" <div>"+newsData[i][1] +"</div></div> <img style='max-width:500px;max-height:300px;' src='http://it-labor.ru/playground/valera/images/newsUploads/"+url+"'/> </div>");
				}
				else if(file == "audio") {
					block = $("<div class='post'><div><h3> "+newsData[i][0]+"</h3> Категории: "+newsData[i][2]+" <div>"+newsData[i][1] +"</div></div> <div> <audio controls>	<source src='http://it-labor.ru/playground/valera/images/newsUploads/"+url+"' type='audio/mpeg'>	Тег audio не поддерживается вашим браузером.  </audio> </div> </div>");
				}
				else if(file == "video") {
					block = $("<div class='post'><div><h3> "+newsData[i][0]+"</h3> Категории: "+newsData[i][2]+" <div>"+newsData[i][1] +"</div></div> <div> <video controls src='http://it-labor.ru/playground/valera/images/newsUploads/"+url+"'> </video> </div> </div>");
				}
				else {
					block = $("<div class='post'><div><h3> "+newsData[i][0]+"</h3> Категории: "+newsData[i][2]+" <div>"+newsData[i][1] +"</div></div> Не получилось обработать файл, приносим извинения!</div>");
				}
			}*/
			//else {
				//var block = $("<div class='post'><div><h3> "+newsData[i][0]+"</h3> Категории: "+newsData[i][2]+" <div>"+newsData[i][1] +"</div></div></div>");
				block = $("<div class='post'><div><h3> "+DataAjax.newslist[i].title+"</h3> Категории: "+DataAjax.newslist[i].categories+" <div>"+DataAjax.newslist[i].content +"</div></div></div>");
			//}
			$(".newsFolder").append(block);
		}
		for(var i = 0; i < DataAjax.newslist.length; i++) {
			if(firstCartRender) {
				DataAjax.newslist[i].categories = DataAjax.newslist[i].categories.split(",");
			}
			else {
			}
			if(DataAjax.newslist[i].categories.length >=2) {
				for(var y=0; y<DataAjax.newslist[i].categories.length;y++ ) {
					if(cat ==DataAjax.newslist[i].categories[y]) {
						createPost();
						ifClear = false;
					}					
				}
			}
			else {
				if(cat == DataAjax.newslist[i].categories) {
					createPost();
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
	}
}