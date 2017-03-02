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
				console.log(data);
				var postList = JSON.parse(data);
				console.log(postList);
				$.each(postList, function(key,val){
					
					block = $("<div class='post'>"+val.content+"</div>");
					$(".community__full__post").append(block);
					
				});
			}
		);
		
		$('.joinGroupDiv').removeClass( 'display-none' );
		$('.outGroupDiv').addClass( 'display-none' );
		
		$.each(userInfo.groups, function(key,val){
			if(val == DataAjax.grouplist[postId].id){
				$('.joinGroupDiv').addClass( 'display-none' );
				$('.outGroupDiv').removeClass( 'display-none' );
			}
		});
		
		community__fullpost.bindEvents();
	},
	bindEvents: function(){
		
		if(!community__fullpost.notFirstUse){
			$('.community__fullpost .pushPost').on('click', function(){
				
				var pushData = {
					
					id: DataAjax.grouplist[$(".community__full__post").attr("data-id")].id,
					file: 'group',
					type: 'addPost',
					content: $('.postName').val()
					
				};
				
				ajax(entrypoints.communityAddPost.url, pushData, entrypoints.communityAddPost.success);
				
			});
			
			$('.community__fullpost .joinGroup').on('click', function(){
				
				var pushData = {
					
					id: DataAjax.grouplist[$(".community__full__post").attr("data-id")].id,
					file: 'group',
					type: 'joinGroup'
					
				};
				
				ajax(entrypoints.communityJoinGroup.url, pushData, entrypoints.communityJoinGroup.success);
				
			});
			
			$('.community__fullpost .outGroup').on('click', function(){
				
				var pushData = {
					
					id: DataAjax.grouplist[$(".community__full__post").attr("data-id")].id,
					file: 'group',
					type: 'outGroup'
					
				};
				
				ajax(entrypoints.communityOutGroup.url, pushData, entrypoints.communityJoinGroup.success);
				
			});
			community__fullpost.notFirstUse = true;
		}
	},
	notFirstUse: false
}