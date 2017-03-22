var friends__fullpost = {
	//Прорисовка категории
	render:	function() {
		$(".friends__full__post").html("");
		var postId = $(".friends__full__post").attr("data-id");
		var block;
		block = $("<div class='post'><img src='"+friends.friendsData[postId].icon+"' /><div class='friends__name'>"+friends.friendsData[postId].login+"</div><div class='post__group__users'>"+JSON.parse(friends.friendsData[postId].friends).length+"</div></div>");
		$(".friends__full__post").append(block);
		ajax(
			entrypoints.friendsGetPost.url,
			{
				file: 'friends',
				type: 'friendPostData',
				id: friends.friendsData[postId].id
			},
			function(data){
				console.log(data);
				var postList = JSON.parse(data);
				console.log(postList);
				$.each(postList, function(key,val){
					
					block = $("<div class='post'><p>"+val.content+"</p> <p> Автор: " + val.user + "</p></div>");
					$(".friends__full__post").append(block);
					
				});
			}
		);
		
		$('.outGroupDiv').addClass( 'display-none' );
		$('.joinGroupDiv').removeClass( 'display-none' );
		
		$.each(friends.friendsData, function(key, value){
			if(key == postId){
				$('.outGroupDiv').removeClass( 'display-none' );
				$('.joinGroupDiv').addClass( 'display-none' );
			}
		});
		
		
		
		friends__fullpost.bindEvents();
	},
	bindEvents: function(){
		
		if(!friends__fullpost.notFirstUse){
			$('.friends__fullpost .pushPost').on('click', function(){
				
				var pushData = {
					
					id: friends.friendsData[$(".friends__full__post").attr("data-id")].id,
					file: 'friends',
					type: 'addPost',
					content: $('.postName').val()
					
				};
				
				ajax(entrypoints.friendsAddPost.url, pushData, entrypoints.friendsAddPost.success);
				
			});
			
			$('.friends__fullpost .joinGroup').on('click', function(){
				
				var pushData = {
					
					id: friends.friendsData[$(".friends__full__post").attr("data-id")].id,
					file: 'friends',
					type: 'joinFriend'
					
				};
				
				ajax(entrypoints.friendsJoinGroup.url, pushData, entrypoints.friendsJoinGroup.success);
				
			});
			
			$('.friends__fullpost .outGroup').on('click', function(){
				
				var pushData = {
					
					id: friends.friendsData[$(".friends__full__post").attr("data-id")].id,
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