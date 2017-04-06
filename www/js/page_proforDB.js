//Прорисовка списка категорий, получение и запись данных
var proforDataBase = {
	render:	function() {
		ajax(entrypoints.proforDb.url,entrypoints.proforDb.data,entrypoints.proforDb.success);
	}
}