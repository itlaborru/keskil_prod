var entrypoints = {
	cartoonsServer: {
		url:	'http://it-labor.ru/playground/valera/cartoonsServer.php', 
		data:	{
			'type':'download',
		},
		success:	function(data) {
			//$$('.cartoons .page-content .cartoonBlock').html(data); 
			data = JSON.parse(data);
			for(var i = 0; i < data[0].length; i++) {
				var folder = $$("<a href='#renderCartoons' data-cartooncat='"+data[0][i][0]+"' class='cartoonCategory'>"+data[0][i][0]+" </a></br>");
				$$('.cartoons .page-content .cartoonBlock').append(folder);
			}
			cartoonData = data[1];
		},
	},
	feedback: {
		url:	'http://it-labor.ru/playground/valera/feedback.php', 
		data:	{
				'type':'upload',
				'content':	$$('.feedback').val(),
				'user':	localStorage.getItem("userName"),
		},
		success:	function(data) {
			console.log(data);
			$$('.feedback').val("");
			myApp.alert(dictionary.feedbackSent, dictionary.success);
		},
	},
	newUserInfo: {
		url:	'http://it-labor.ru/playground/valera/user-data-ajax.php', 
		data:	{
			'type': 'get',
		},
		success:	function(data){
			var dataLogin = JSON.parse(data);
			$$('.userPanel__icon').attr('src', dataLogin.icon);
			$$('.userPanel__name').html(dataLogin.login);
			currentLogin = dataLogin.login;
			localStorage.setItem("userName", currentLogin);
			$$('.userPage__fullname').html(dataLogin.lname + ' ' + dataLogin.fname + ' ' +  dataLogin.mname);
			$$('.userPanel__mail').html(dataLogin.mail);
		},
	},
	onReady: {
	},
};