var userPage = {
	render: function() {
		/*
		$(".profileInfo").html("");
		var userId = $('.userPage').attr('user-id');
		console.log(userId);
		*/
		
	},
	suc: function(data){
		data = JSON.parse(data);
		$('.user__icon').attr('src', data.icon);
		$('.user__fullname').html(data.lname + ' ' + data.fname + ' ' +  data.mname);
		$('.user__login').html(data.login);
	},
	makingNewPage: function(userId){
		var newPageContent = '<div class="page" data-page="userPage">' +
                        '<div class="page-content">' +
                          '<div style="margin: 0 auto 50px; max-height: 200px; max-width: 200px;"><img src=""class="user__icon" style="max-height: 200px; max-width: 200px; background-size: contain; margin: auto;"/></div><div class="user__fullname"></div><div class="user__name"></div><div class="user__login"></div>' +
                        '</div>' +
                      '</div>';
		mainView.router.loadContent(newPageContent);
		var data = {'type': 'getUserInfo','id':userId};
		ajax(entrypoints.newUserInfo.url,data,this.suc);
	},
}