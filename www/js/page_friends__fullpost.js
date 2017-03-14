var friends__fullpost = {
	//Прорисовка категории
	render:	function() {
		$(".friends__full__post").html("");
		var postId = $(".friends__full__post").attr("data-id");
		var block;
		block = $("<div class='post'><img src='"+DataAjax.grouplist[postId].icon+"' /><div class='friends__name'>"+DataAjax.grouplist[postId].name+"</div><div class='post__group__users'>"+JSON.parse(DataAjax.grouplist[postId].users).length+"</div></div>");
		$(".friends__full__post").append(block);
		ajax(
			entrypoints.friendsGetPost.url,
			{
				file: 'friends',
				type: 'friendsPostData',
				id: DataAjax.grouplist[postId].id
			},
			function(data){
				console.log(data);
				var postList = JSON.parse(data);
				console.log(postList);
				$.each(postList, function(key,val){
					
					block = $("<div class='post'>"+val.content+"</div>");
					$(".friends__full__post").append(block);
					
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
		
		friends__fullpost.bindEvents();
	},
	bindEvents: function(){
		
		if(!friends__fullpost.notFirstUse){
			$('.friends__fullpost .pushPost').on('click', function(){
				
				var pushData = {
					
					id: DataAjax.grouplist[$(".friends__full__post").attr("data-id")].id,
					file: 'friends',
					type: 'addPost',
					content: $('.postName').val()
					
				};
				
				ajax(entrypoints.friendsAddPost.url, pushData, entrypoints.friendsAddPost.success);
				
			});
			
			$('.friends__fullpost .joinGroup').on('click', function(){
				
				var pushData = {
					
					id: DataAjax.grouplist[$(".friends__full__post").attr("data-id")].id,
					file: 'friends',
					type: 'joinFriend'
					
				};
				
				ajax(entrypoints.friendsJoinGroup.url, pushData, entrypoints.friendsJoinGroup.success);
				
			});
			
			$('.friends__fullpost .outGroup').on('click', function(){
				
				var pushData = {
					
					id: DataAjax.grouplist[$(".friends__full__post").attr("data-id")].id,
					file: 'friends',
					type: 'outFriend'
					
				};
				
				ajax(entrypoints.friendsOutGroup.url, pushData, entrypoints.friendsJoinGroup.success);
				
			});
			friends__fullpost.notFirstUse = true;
		}
	},
	notFirstUse: false
}