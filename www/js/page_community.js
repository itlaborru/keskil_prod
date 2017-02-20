var community = {
	scroll:	0,
	actualHeight:	"",
	actualScroll:	0,
	activeScroll:	false,
	render:	function(update) {
		$('.communityMain').html("");
		var ifClear = true;
		function createGroup(value) {
			var block;
			block = $("<div class='community__group' data-id='"+value.id+"'><img src='"+value.icon+"' /><div class='community__name'>"+value.name+"</div><div class='post__group__users'>"+JSON.parse(value.users).length+"</div></div>");
			$(".communityMain").append(block);
			ifClear = false;
		}
		
		for(var i = 0; i < DataAjax.grouplist.length; i++) {
			createGroup(DataAjax.grouplist[i]);
		}
		
		if(ifClear) {
			app.alert(dictionary.noContent, dictionary.sorry);
		}
		
		community.bindEvents();
	},
	bindEvents: function(){
		$('.communityMain').on('click', '.community__group', function (e) {
			/*var postId = $(this).attr('data-id');
			$('.community__fullPost').attr("data-id",postId);
			mainView.router.load({pageName: 'community__full__post'});*/
			var postId = $(this).attr('data-id');
			$('.community__fullPost').attr("data-id",postId);
			mainView.router.load({pageName: 'community__full__post'});
		});
	},
	notFirstUse: false,
}