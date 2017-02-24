var community__fullpost = {
	//Прорисовка категории
	render:	function() {
		$(".community__full__post").html("");
		var postId = $(".community__full__post").attr("data-id");
		var block;
		block = $("<div class='post'><img src='"+DataAjax.grouplist[postId].icon+"' /><div class='community__name'>"+DataAjax.grouplist[postId].name+"</div><div class='post__group__users'>"+JSON.parse(DataAjax.grouplist[postId].users).length+"</div></div>");
		$(".community__full__post").append(block);
		ajax(
			entrypoints.communityGetPost.url,
			{
				file: 'group',
				type: 'groupPostData',
				id: DataAjax.grouplist[postId].id
			},
			function(data){
				var postList = JSON.parse(data);
				$.each(postList, function(key,val){
					
					block = $("<div class='post'>"+val.content+"</div>");
					$(".community__full__post").append(block);
					
				})
			}
		);
		community__fullpost.bindEvents();
	},
	bindEvents: function(){
		$('.community__fullpost .pushPost').on('click', function(){
			
			var pushData = {
				
				id: $(".community__full__post").attr("data-id"),
				file: 'group',
				type: 'addPost',
				content: $('.content').val()
				
			};
			
			ajax(entrypoints.communityAddPost.url, pushData, entrypoints.communityAddPost.success);
			
		});
	}
}