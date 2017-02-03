var friends = {
	render: function() {
		
		$.each(userInfo.friends, function(i, val) {
			var data = {'type': 'getUserInfo','id':val};
			ajax(entrypoints.newUserInfo.url,data,friends.succ);
		});
		
	},
	succ: function(datas){
		data = JSON.parse(datas);
		var block;
		var user__icon = '.user__icon'+data.id;
		var user__fullname = '.user__fullname'+data.id;
		var user__login = '.user__login'+data.id;
		$(".friendsList").html("");
		block = $("<div class='friendinfo userHref' user-id='"+data.id+"' style='margin: 0 auto 50px; max-height: 200px; max-width: 200px;'><img class='user__icon"+data.id+"' style='max-height: 200px; max-width: 200px; background-size: contain; margin: auto;'/><div class='user__fullname"+data.id+"'></div><div class='user__login"+data.id+"'></div></div>");
		$(".friendsList").append(block);
		$(user__icon).attr('src', data.icon);
		$(user__fullname).html(data.lname + ' ' + data.fname + ' ' +  data.mname);
		$(user__login).html(data.login);
		
	},
}