var entrypoints = {
	cartoonsServer: {
		url:	'http://it-labor.ru/playground/valera/cartoonsServer.php', 
		data:	{
			'type':'download',
		},
		success:	function(data) {
			//$('.cartoons .page-content .cartoonBlock').html(data); 
			data = JSON.parse(data);
			for(var i = 0; i < data[0].length; i++) {
				var folder = $("<a href='#renderCartoons' data-cartooncat='"+data[0][i][0]+"' class='cartoonCategory'>"+data[0][i][0]+" </a></br>");
				$('.cartoons .page-content .cartoonBlock').append(folder);
			}
			cartoonData = data[1];
		},
	},
	feedback: {
		url:	'http://it-labor.ru/playground/valera/feedback.php', 
		data:	{
			'type':'upload',
			'content':	$('.feedback').val(),
			'user':	localStorage.getItem("userName"),
		},
		success:	function(data) {
			console.log(data);
			$('.feedback').val("");
			app.alert(dictionary.feedbackSent, dictionary.success);
		},
	},
	newUserInfo: {
		url:	'http://it-labor.ru/playground/valera/user-data-ajax.php', 
		data:	{
			'type': 'get',
		},
		success:	function(data){
			var dataLogin = JSON.parse(data);
			$('.userPanel__icon').attr('src', dataLogin.icon);
			$('.userPanel__name').html(dataLogin.login);
			currentLogin = dataLogin.login;
			localStorage.setItem("userName", currentLogin);
			$('.userPage__fullname').html(dataLogin.lname + ' ' + dataLogin.fname + ' ' +  dataLogin.mname);
			$('.userPanel__mail').html(dataLogin.mail);
		},
	},
	onReady: {
		url:	'http://it-labor.ru/playground/valera/data-ajax.php',
		data:	{},
		success:	function(data){
			var data_ajax = JSON.parse(data);
			
			if(localStorage.getItem("loggedIn")){
				$('.userPanel__name').html(data_ajax.userData.login);
				$('.userPanel__icon').attr('src', data_ajax.userData.icon);
				console.log(data_ajax);
				$('.userPage__fullname').html(data_ajax.userData.lname + ' ' + data_ajax.userData.fname + ' ' +  data_ajax.userData.mname);
				$('.userPanel__mail').html(data_ajax.userData.mail);
			};
			
			$('.contests .page-content .content-block').html('');
			for(var i = 0; i < data_ajax.contest.length; i++){
			
				$('.contests .page-content .content-block').append(
					//' '+data_ajax.contest[i].start
					//+
					//' '+data_ajax.contest[i].end
					//+
					'<a href = "#contest'+data_ajax.contest[i].id+'">'+data_ajax.contest[i].title
					//+
					//' '+data_ajax.contest[i].content
					+
					'</a> </br>'
				);
				
				var myPage = $('<div></div>');
				var myContent_block = $('<div></div>');
				var myPage_content = $('<div></div>');
				
				myPage.addClass('page cached contest'+data_ajax.contest[i].id);
				myPage.attr('data-page', 'contest'+data_ajax.contest[i].id);
				myPage_content.addClass('page-content');
				myContent_block.addClass('content-block');
				
				myContent_block.append(
					' '+data_ajax.contest[i].start
					+
					' '+data_ajax.contest[i].end
					+
					' '+data_ajax.contest[i].title
					+
					' '+data_ajax.contest[i].content
					+
					'</br>'
					+
					'<p class="photoUploadButton" data-contest = "'+data_ajax.contest[i].id+'">Выбрать фото</p>'
					+
					'<textarea placeholder = "Краткое описание(Не обязательно)" class = "textareaFor'+data_ajax.contest[i].id+'"></textarea>'
					+
					'<p class="uploadButton" data-contest = "'+data_ajax.contest[i].id+'" data-type = "contest">Отправить!</p>'
				);
				
				myPage_content.append(myContent_block);
				myPage.append(myPage_content);
				
				$('.pages').append(myPage);
			
			};
			
			$('.photoUploadButton').on('click', function(){
				globalVar.imgData = $(this).attr('data-contest');
				globalVar.typeData = $(this).attr('data-type');
				getImage();
			});
		},
	},
	signIn: {
		url:	'http://it-labor.ru/playground/valera/loginChecker.php', 
		
		data:	{
			'login': $('.login').val(),
			'pass': $('.pass').val(),
		},
		
		success:	function(data){
			var dataLogin = JSON.parse(data);
			console.log(dataLogin.text);
			if(dataLogin.sessionId != undefined){
				localStorage.setItem("phpSessionId", dataLogin.sessionId);
				localStorage.setItem("loggedIn", true);
				$('.loginPanel').css('display', 'none');
				$('.userPanel').css('display', 'block');
				$('.userPanel__icon').attr('src', '');
				$('.userPanel__name').html(dictionary.unableToConnect);
				$('.login').val('');
				$('.pass').val('');
				$('.loginReg').val('');
				$('.passReg').val('');
				$('.mail').val('');
				ajax(
					'http://it-labor.ru/playground/valera/user-data-ajax.php', 
					
					{
						'type': 'get',
					},
					
					function(data){
						var dataLogin = JSON.parse(data);
						$('.userPanel__icon').attr('src', dataLogin.icon);
						$('.userPanel__name').html(dataLogin.login);
						currentLogin = dataLogin.login;
						localStorage.setItem("userName", currentLogin);
						$('.userPage__fullname').html(dataLogin.lname + ' ' + dataLogin.fname + ' ' +  dataLogin.mname);
						$('.userPanel__mail').html(dataLogin.mail);
					});
			}
		},
	},
};