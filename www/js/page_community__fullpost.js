var community__full__post = {
	//Прорисовка категории
	render:	function() {
		$(".community__full__post").html("");
		var postId = $(".community__fullPost").attr("data-id");
		var block;
		block = $("<div class='post'><h3> "+DataAjax.grouplist[postId].title+"</h3><div>"+DataAjax.grouplist[postId].content +"</div></div>");
		$(".community__fullPost").append(block);
	}
}