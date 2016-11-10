//Прорисовка списка категорий, получение и запись данных
function renderNews() {
	shortAjax('http://it-labor.ru/playground/valera/news.php', 
		{
			'type':'download',
		},
		function(data) {
			data = JSON.parse(data);
			for(var i = 0; i < data[0].length; i++) {
				var newsFolder = $$("<a href='#renderNews' data-newscat='"+data[0][i][0]+"' class='newsCategory'>"+data[0][i][0]+" </a></br>");
				newsFolder.on('click', function(){
					var categ = $$(this).attr('data-newscat');
					console.log(categ);
					renderNewsFolder(categ);
				});
				$$('.news .page-content .news').append(newsFolder);
			}
			newsData = data[1];
			console.log(data);
		}
	);
}
//Прорисовка категории
function renderNewsFolder(cat) {
	$$(".inCateg").html("");
	var ifClear = true;
	function createPost() {
		var block = $$("<div class='post'><div><h3> "+newsData[i][0]+"</h3> Категории: "+newsData[i][2]+" <div>"+newsData[i][1] +"</div></div></div>");
		$$(".inCateg").append(block);
	}
	for(var i = 0; i < newsData.length; i++) {
		if(firstCartRender) {
			newsData[i][2] = newsData[i][2].split(",");
		}
		else {
		}
		if(newsData[i][2].length >=2) {
			for(var y=0; y<newsData[i][2].length;y++ ) {
				if(cat ==newsData[i][2][y]) {
					createPost();
					ifClear = false;
				}					
			}
		}
		else {
			if(cat == newsData[i][2]) {
				createPost();
				ifClear = false;
			}
		}
	}
	if(firstCartRender) {
		firstCartRender = false;
	}
	if(ifClear) {
		myApp.alert('В данной категории пока отсутствует контент', 'Приносим извинения');
	}
}