var contest = {
	//Прорисовка контеста
	render:	function() {
		$(".contestContent").html("");
		var ifClear = true;
		var id = $(".contestBlock").attr("data-id");
		for(var i = 0; i < DataAjax.contestlist.length; i++) {
			if(DataAjax.contestlist[i].id == id) {
				$(".contestContent").html(DataAjax.contestlist[i].content);
			}
		}
	},
}