//Прорисовка списка категорий, получение и запись данных
var contests__list = {
	render:	function() {
		$('.contestListBlock').html("");
		for(var i = 0; i < DataAjax.contestlist.length; i++) {
			var contest = $("<a href='#contest' data-id='"+DataAjax.contestlist[i].id+"' class='contestItem'>"+DataAjax.contestlist[i].title+" </a></br>");
			$('.contestListBlock').append(contest);
		}
		contests__list.bindEvents();
	},
	bindEvents: function(){
		if(!contests__list.notFirstUse) {
			$('.contestListBlock').on('click', '.contestItem', function (e) {
				var categ = $(this).attr('data-id');
				$('.contestBlock').attr("data-id",categ);
			});
			$('.contestBlock').on('click', '.contestSend', function (e) {
				transferImages.type.name = "contest";
				transferImages.getImage();
				transferImages.type.contest = $('.contestBlock').attr("data-id") ;
			});
		}
		contests__list.notFirstUse = true;
	},
	notFirstUse: false,
}