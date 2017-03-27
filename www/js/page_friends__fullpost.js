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
		
		$.each(userInfo.friends, function(key, value){
			if(userInfo.friends[key] == DataAjax.users[postId]){
				console.log('Drug -'+value+' '+key+' '+postId);
				$('.outGroupDiv').removeClass( 'display-none' );
				$('.joinGroupDiv').addClass( 'display-none' );
			}
		});
		
		
		
		friends__fullpost.bindEvents();
	},
	bindEvents: function(){
		
		if(!friends__fullpost.notFirstUse){
			$('.friends__fullpost').on('click', '.pushPost', function(){
				
				var pushData = {
					
					id: friends.friendsData[$(".friends__full__post").attr("data-id")].id,
					file: 'friends',
					type: 'addPost',
					content: $('.postName').val()
					
				};
				
				ajax(entrypoints.friendsAddPost.url, pushData, entrypoints.friendsAddPost.success);
				
			});
			
			$('.friends__fullpost').on('click', '.joinGroup', function(){
				
				console.log('click');
				
				var pushData = {
					
					id: friends.friendsData[$(".friends__full__post").attr("data-id")].id,
					file: 'friends',
					type: 'joinFriend'
					
				};
				
				ajax(entrypoints.friendsJoinGroup.url, pushData, entrypoints.friendsJoinGroup.success);
				
				$('.outGroupDiv').removeClass( 'display-none' );
				$('.joinGroupDiv').addClass( 'display-none' );
				
			});
			
			$('.friends__fullpost').on('click', '.outGroup', function(){
				
				var pushData = {
					
					id: friends.friendsData[$(".friends__full__post").attr("data-id")].id,
					file: 'friends',
					type: 'outFriend'
					
				};
				
				$('.outGroupDiv').addClass( 'display-none' );
				$('.joinGroupDiv').removeClass( 'display-none' );
				
				ajax(entrypoints.friendsOutGroup.url, pushData, entrypoints.friendsJoinGroup.success);
				
			});
			friends__fullpost.notFirstUse = true;
		}
	},
	notFirstUse: false
}