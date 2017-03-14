var friends = {
	scroll:	0,
	actualHeight:	"",
	actualScroll:	0,
	activeScroll:	false,
	render:	function(update) {
		$('.friendsMain').html("");
		var ifClear = true;
		var friendsData = [];
		function createGroup(value,key) {
			var block;
			block = $("<div class='friends__group' data-id='"+value.id+"'><img src='"+value.icon+"' style='height: 100px; width: 100px;' /><div class='friends__name'>"+value.login+"</div><div class='post__group__users'>"+JSON.parse(value.friends).length+"</div></div>");
			$(".friendsMain").append(block);
			ifClear = false;
		}
		
		ajax(
			
			entrypoints.friendsGetAllFriends.url,
			{
				
				file: 'friends',
				type: 'friendStackData',
				id: JSON.stringify(userInfo.friends)
				
			},
			function(data){
				friendsData = JSON.parse(data);
				for(var i = 0; i < friendsData.length; i++) {
					createGroup(friendsData[i],i);
				};
				
				if(ifClear) {
					app.alert(dictionary.noContent, dictionary.sorry);
				};
				
				friends.bindEvents();
			}
			
		);	
		
	},
	bindEvents: function(){
		$('.friendsMain').on('click', '.friends__group', function (e) {
			/*var postId = $(this).attr('data-id');
			$('.friends__fullPost').attr("data-id",postId);
			mainView.router.load({pageName: 'friends__full__post'});*/
			var postId = $(this).attr('data-id');
			$('.friends__full__post').attr("data-id",postId);
			mainView.router.load({pageName: 'friends__fullpost'});
		});
		
		if(!friends.notFirstUse){
			
			friends.notFirstUse = true;
		}
	},
	notFirstUse: false
}