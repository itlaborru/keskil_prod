var friends = {
	scroll:	0,
	actualHeight:	"",
	actualScroll:	0,
	activeScroll:	false,
	friendsData:	[],
	createGroup: function(value,key){
		var block;
		block = $("<div class='friends__group' data-id='"+key+"'><img src='"+value.icon+"' style='max-height: 150px; max-width: 150px;' /><div class='friends__name'>"+value.login+"</div></div>");
		$(".friendsMain").append(block);
		friends.ifClear = false;
	},
	ifClear: true,
	render:	function(update) {
		$('.friendsMain').html("");
		friends.ifClear = true;
		entrypoints.friendsGetAllFriends();
		friends.bindEvents();
	},
	bindEvents: function(){
		$('.friendsMain').on('click', '.friends__group', function (e) {
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