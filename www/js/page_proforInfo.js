//Прорисовка списка категорий, получение и запись данных
var proforInfo = {
	id:-1,
	type:	"",
	render:	function() {
		var info = "";
		var data = DataAjax.proforDB[proforInfo.type][proforInfo.id];
		console.log(data);
		info += data.info;
		$(".profor_info_title").html(data.name);
		if(proforInfo.type == 0) {
			info+= "<br/> Вы можете получить специальность в следующих университетах:<br/>";
			for(var key in data.universities) {
				if(data.universities[key] == 1){
					info+= "<li>"+key+"</li>";
				}
			}
		}
		else {
			info+= "<br/> Вы можете обучиться на следующие специальности:<br/>";
			
			for(var i=0; i< data.professions.length;i++) {
				info+= "<li>"+data.professions[i]+"</li>";
			}
		}
		$(".profor_info_block").html(info);
	}
}