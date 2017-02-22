var friends = {
	render: function() {
		
	},
	fgh: function() {
		//friends.content = "<div class='page' data-page='friends'>"+friends.content+"<div class='page-content friendList'></div></div>";
		friends.content = '<div class="page" data-page="friends">' +
                        '<div class="page-content friendList">' +
                          friends.content +
                        '</div>' +
                      '</div>';
		mainView.router.loadContent(friends.content);
		
	},
	suc: function(datas){
		data = JSON.parse(datas);
		var block;
		friends.lastfriend = friends.lastfriend-1;
		block ="<div class='friendinfo userHref' user-id='"+data.id+"' style='margin: 0 auto 50px; max-height: 200px; max-width: 200px;'><img class='user__icon"+data.id+"' src='"+data.icon+"' style='max-height: 200px; max-width: 200px; background-size: contain; margin: auto;'/><div class='user__fullname"+data.id+"'>"+data.lname+" "+data.fname+" "+data.mname+"</div><div class='user__login"+data.id+"'>"+data.login+"</div></div>";
		friends.content = friends.content+block+"";
		if(friends.lastfriend == 0) {
			friends.fgh();
			console.log("heh")
		}
	},
	makingNewPage: function(userId){
		friends.content = '';
		friends.friendList ='';
		
		var data = {'type': 'getUserInfo','id':userId};
			ajax(entrypoints.newUserInfo.url,data,function(datas) {
				data = JSON.parse(datas);
				friends.friendList = data.friends
				friends.lastfriend = data.friends.length;
				console.log(friends.friendList);
				$.each(friends.friendList , function(i, val) {
					var data = {'type': 'getUserInfo','id':val};
					ajax(entrypoints.newUserInfo.url,data,friends.suc);
				});
			});
		
		
	},
	friendList: '',
	content: '',
	lastfriend:0 ,
}