//Прорисовка списка категорий, получение и запись данных
var professions = {
	render:	function() {
		$('.professions').html("");
		var info ="";
		for(var i = 0; i<DataAjax.proforDB[0].length;i++) {
			var profession = DataAjax.proforDB[0][i].name;
			info+= "<a class='profession' href='#proforInfo' data-type='0' data-index="+i+">"+profession+"</a><br/>";
		}
		$(".professions").html(info);
		professions.bindEvents();
	},
	bindEvents: function(){
		$('.professions').on('click', '.profession', function (e) {
			var index = $(this).attr('data-index');
			var type = $(this).attr('data-type');
			proforInfo.id = index;
			proforInfo.type = type;
		});
	}
}