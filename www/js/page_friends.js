var friends = {
	render: function() {
		
	},
	fgh: function() {
		var newPageContent = "<div class='page' data-page='friends'>"+friends.content+"<div class='page-content friendList'> </div></div>";
		mainView.router.loadContent(newPageContent);
		console.log("asdasd");
	},
	suc: function(datas){
		data = JSON.parse(datas);
		var block;
		block ="<div class='friendinfo userHref' user-id='"+data.id+"' style='margin: 0 auto 50px; max-height: 200px; max-width: 200px;'><img class='user__icon"+data.id+"' src='"+data.icon+"' style='max-height: 200px; max-width: 200px; background-size: contain; margin: auto;'/><div class='user__fullname"+data.id+"'>"+data.lname+" "+data.fname+" "+data.mname+"</div><div class='user__login"+data.id+"'>"+data.login+"</div></div>";
		friends.content = friends.content+block+"";
		friends.fgh();
		
	},
	makingNewPage: function(userId){
		
		$.each(userInfo.friends, function(i, val) {
			var data = {'type': 'getUserInfo','id':val};
			ajax(entrypoints.newUserInfo.url,data,friends.suc);
		});
	},
	content: '',
}