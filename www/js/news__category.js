//Прорисовка списка категорий, получение и запись данных
var news__category = {
	render:	function() {
		ajax('http://it-labor.ru/playground/valera/news.php', 
			{
				'type':'download',
			},
			function(data) {
				data = JSON.parse(data);
				$('.news__category .page-content .news').html("");
				for(var i = 0; i < data[0].length; i++) {
					var newsFolder = $("<a href='#renderNews' data-newscat='"+data[0][i][0]+"' class='newsCategory'>"+data[0][i][0]+" </a></br>");
					newsFolder.on('click', function(){
						var categ = $(this).attr('data-newscat');
						news.renderNewsFolder(categ);
					});
					$('.news .page-content .news').append(newsFolder);
				}
				newsData = data[1];
			}
		);
	},
}