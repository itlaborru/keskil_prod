
 // Тут можешь переписывать на боевой сервак
 
var entrypoints = {
	allDataUpdate: function() {
		ajax(entrypoints.allData.url,entrypoints.allData.data,entrypoints.allData.success);
	},
	feedbackSend:	function(){
		var content = $('.feedback').val();
		ajax(entrypoints.feedback.url,
			{
				'file':'feedback',
				'type':'upload',
				'content':	content,
			},
		entrypoints.feedback.success);
	},
	feedback: {
		url:	serverAdress + "entrypoints/set.php", 
		success:	function(data) {
			console.log($('.feedback').val());
			console.log(data);
			$('.feedback').val("");
			app.alert(dictionary.feedbackSent, dictionary.success);
		},
	},
	newUserInfo: {
		url:	serverAdress + 'entrypoints/user-data-ajax.php',
		data:	{
			'type': 'get',
		},
		success:	function(data){
			var dataLogin = JSON.parse(data);
			$('.userPanel__icon').attr('src', dataLogin.icon);
			$('.userPanel__name').html(dataLogin.login);
			userInfo.userName = dataLogin.login;
			localStorage.setItem("userInfo", JSON.stringify(userInfo));
			$('.userPage__fullname').html(dataLogin.lname + ' ' + dataLogin.fname + ' ' +  dataLogin.mname);
			$('.userPanel__mail').html(dataLogin.mail);
			userInfo.login = dataLogin.login;
			userInfo.fname = dataLogin.fname;
			userInfo.lname = dataLogin.lname;
			userInfo.mname = dataLogin.mname;
			userInfo.mail = dataLogin.mail;
			userInfo.icon = dataLogin.icon;
			localStorage.setItem("userInfo", JSON.stringify(userInfo));
		},
	},
	/*onReady: {
		url:	'http://it-labor.ru/playground/valera/data-ajax.php',
		data:	{},
		success:	function(data){
			var data_ajax = JSON.parse(data);
			if(localStorage.getItem("userInfo")) {
				userInfo = JSON.parse(localStorage.getItem("userInfo"));
				if(userInfo.loggedIn){
					$('.userPanel__name').html(data_ajax.userData.login);
					$('.userPanel__icon').attr('src', data_ajax.userData.icon);
					console.log(data_ajax);
					$('.userPage__fullname').html(data_ajax.userData.lname + ' ' + data_ajax.userData.fname + ' ' +  data_ajax.userData.mname);
					$('.userPanel__mail').html(data_ajax.userData.mail);
				}
			}
			
			$('.contests .page-content .content-block').html('');
			for(var i = 0; i < data_ajax.contest.length; i++){
			
				$('.contests .page-content .content-block').append(
					'<a href = "#contest'+data_ajax.contest[i].id+'">'+data_ajax.contest[i].title
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
					'</br><p class="photoUploadButton" data-contest = "'+data_ajax.contest[i].id+'">Выбрать фото</p><textarea placeholder = "Краткое описание(Не обязательно)" class = "textareaFor'+data_ajax.contest[i].id+'"></textarea><p class="uploadButton" data-contest = "'+data_ajax.contest[i].id+'" data-type = "contest">Отправить!</p>');
				
				myPage_content.append(myContent_block);
				myPage.append(myPage_content);
				
				$('.pages').append(myPage);
			
			};
			
			$('.photoUploadButton').on('click', function(){
				globalVar.imgData = $(this).attr('data-contest');
				globalVar.typeData = $(this).attr('data-type');
				transferImages.getImage();
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
				userInfo.phpSessionId = dataLogin.sessionId;
				userInfo.loggedIn =	true;
				localStorage.setItem("userInfo", JSON.stringify(userInfo));
				$('.loginPanel').addClass('display-none');
				$('.userPanel').addClass('display-block');
				$('.userPanel').removeClass('display-none');
				$('.loginPanel').removeClass('display-block');
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
						userInfo = JSON.parse(localStorage.getItem("userInfo"));
						userInfo.userName =  dataLogin.login;
						localStorage.setItem("userInfo", JSON.stringify(userInfo));
						$('.userPage__fullname').html(dataLogin.lname + ' ' + dataLogin.fname + ' ' +  dataLogin.mname);
						$('.userPanel__mail').html(dataLogin.mail);
					});
			}
		},
	},*/
	allData: {
		url:	serverAdress + "daemon/get.php",
		data:	{
			"object": {
				"coldStart": "yes",
			},
		},
		success:	function(data) {
			DataAjax = JSON.parse(data);
			console.log(DataAjax);
			localStorage.setItem("cache", JSON.stringify(DataAjax));
			localStorage.setItem("lastChanges", JSON.stringify(DataAjax.lastChanges));
		},
	},
	checkOneMore:	 function() {
		console.log("null");
		var lastChanges = JSON.parse(localStorage.getItem("lastChanges"));
		ajax(entrypoints.checkForUpdates.url,
		{
			"object" : {
				"coldStart":"no",
				"lastChanges":lastChanges
			},
		},entrypoints.checkForUpdates.success);
	},
	checkForUpdates: {
		url:	serverAdress + "daemon/get.php",
		success:	function(data) {
			if(data!= 'old') {
				var Data = JSON.parse(data);
				console.log(Data);
				if(Data.lastChanges == undefined) {
					entrypoints.checkOneMore();
				}
				else {
					console.log("New data");
					for(var key in Data) {
						DataAjax[key] = Data[key];
						if(key == "newslist"){
							news__category.render();
						}
						else if(key == "cartoonslist"){
							cartoons__category.render();
						}
						else if(key == "contestlist"){
							contests__list.render();
						}
					}
					localStorage.setItem("cache", JSON.stringify(DataAjax));
					localStorage.setItem("lastChanges", JSON.stringify(Data.lastChanges));
				}
			}
			else {
				console.log(false);
			}
		}
	},
};