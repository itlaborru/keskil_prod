var userOptions = {
	render: function() {
	},
	updateUserinfo: function() {
		ajax(entrypoints.newUserInfo.url,entrypoints.newUserInfo.data,entrypoints.newUserInfo.success);
	},
	updateUserinfoClient:	function(data) {
		dataLogin = JSON.parse(data);
		$('.userPanel__icon').attr('src', dataLogin.icon);
		$('.userPanel__name').html(dataLogin.login);
		$('.userPage__fullname').html(dataLogin.lname + ' ' + dataLogin.fname + ' ' +  dataLogin.mname);
		$('.userPanel__mail').html(dataLogin.mail);
		
		app.alert(dictionary.hello + dataLogin.login,dictionary.success);
		
		userInfo.login = dataLogin.login;
		userInfo.id = dataLogin.id;
		userInfo.fname = dataLogin.fname;
		userInfo.lname = dataLogin.lname;
		userInfo.mname = dataLogin.mname;
		userInfo.mail = dataLogin.mail;
		userInfo.icon = dataLogin.icon;
		$(".myPage").attr("user-id", userInfo.id);
		localStorage.setItem("userInfo", JSON.stringify(userInfo));
	},
	bindEvents: function(){
		$('.userPage').on('click', '.userPanel__icon', function (e) {
			transferImages.type.name = "avatar";
			transferImages.getImage();
		});
		$('.userPanel').on('click', '.userPanel__icon', function (e) {
			transferImages.type.name = "avatar";
			transferImages.getImage();
			userPage.updateUserinfo();
		});
		$('.changeUserInfo').on('click', function(){
			ajax(
				serverAdress + "entrypoints/set.php",
				{
					'file':	'user-data-edit',
					'type':	'data',
					'fname': $('.userPage__fullname__fname__change').val(),
					'mname': $('.userPage__fullname__mname__change').val(),
					'lname': $('.userPage__fullname__lname__change').val(),
					//'pass': $('.userPage__pass__change').val(),
					//'mail': $('.userPage__mail__change').val(),
				},
				function(data){
					app.alert(data,dictionary.success);
					$('.userPage__fullname__fname__change').val("");
					$('.userPage__fullname__mname__change').val("");
					$('.userPage__fullname__lname__change').val("");
					userPage.updateUserinfo();
				}
			);
		});
	}
}