//Прорисовка списка категорий, получение и запись данных
var universities = {
	render:	function() {
		$('.universities').html("");
		var info ="";
		for(var i = 0; i<DataAjax.proforDB[1].length;i++) {
			var university = DataAjax.proforDB[1][i].name;
			if(DataAjax.proforDB[1][i].professions != "") {
				if(!universities.notFirstUse) {
					DataAjax.proforDB[1][i].professions = JSON.parse(DataAjax.proforDB[1][i].professions);
					universities.notFirstUse = true;
				}
			}
			info+= "<a class='university' href='#proforInfo' data-type='1' data-index="+i+">"+university+"</a><br/>";
		}
		$(".universities").html(info);
		universities.bindEvents();
	},
	bindEvents: function(){
		$('.universities').on('click', '.university', function (e) {
			var index = $(this).attr('data-index');
			var type = $(this).attr('data-type');
			proforInfo.id = index;
			proforInfo.type = type;
		});
	},
	notFirstUse: false
}