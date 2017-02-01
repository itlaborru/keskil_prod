var userPage = {
	render: function() {
		$(".profileInfo").html("");
		var userId = $('.userPage').attr('user-id');
		var data = {'type': 'getUserInfo','id':userId+''};
		ajax(entrypoints.newUserInfo.url,data,this.suc);
		
	},
	suc: function(data){
		data = JSON.parse(data);
		console.log(data);
		var block;
		
		
		block = $("<div style='margin: 0 auto 50px; max-height: 200px; max-width: 200px;'><img class='user__icon' style='max-height: 200px; max-width: 200px; background-size: contain; margin: auto;'/></div><div class='user__fullname'></div><div class='user__name'></div><div class='user__login'></div>");
		$(".profileInfo").append(block);
		$('.user__icon').attr('src', data.icon);
		$('.user__fullname').html(data.lname + ' ' + data.fname + ' ' +  data.mname);
		$('.user__login').html(data.login);
	},
}