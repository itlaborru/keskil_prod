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
	proforDb: {
		url:	serverAdress + "entrypoints/get.php", 
		data:	{
			'file':'proftest',
			'type': 'pullDb',
		},
		success:	function(data) {
			data = JSON.parse(data);
			data[0] = JSON.parse(data[0]);
			data[1] = JSON.parse(data[1]);
			DataAjax.proforDB = data;
		}
	},
	newUserInfo: {
		url:	serverAdress + 'entrypoints/user-data-ajax.php',
		data:	{
			'type': 'get',
		},
		success:	function(data){
			userOptions.updateUserinfoClient(data);
		},
	},
	pulseAddStory: {
		url:	serverAdress + "entrypoints/set.php",
		success:	function(data){
			app.alert(dictionary.storySent, dictionary.keskil);
		}
	},
	friendsJoinGroup: {
		url:	serverAdress + "entrypoints/set.php",
		success:	function(data){
			app.alert(dictionary.keskil+' '+data);
			userOptions.updateUserinfo();
		}
	},
	friendsOutGroup: {
		url:	serverAdress + "entrypoints/set.php",
		success:	function(data){
			app.alert(dictionary.keskil+' '+data);
			userOptions.updateUserinfo();
		}
	},
	friendsAddPost: {
		url:	serverAdress + "entrypoints/set.php",
		success:	function(data){
			app.alert(dictionary.keskil+' '+data);
			$('.postName').val("");
		}
	},
	friendsGetPost: function(){
		ajax(serverAdress + "entrypoints/get.php",
			{
				file: 'friends',
				type: 'friendPostData',
				id: friends__fullpost.data.id
			},
			function(data){
				console.log(data);
				var postList = JSON.parse(data);
				console.log(postList);
				$.each(postList, function(key,val){
					var block = $("<div class='post'><p>"+val.content+"</p> <p> Автор: " + val.user + "</p></div>");
					$(".friends__full__post").append(block);
					
				});
			}
		);
	},
	friendsGetAllFriends: {
		url:	serverAdress + "entrypoints/get.php"
	},
	friendsGetAllFriends: function(){
		ajax(serverAdress + "entrypoints/get.php",
			{
				file: 'friends',
				type: 'friendStackData',
				id: JSON.stringify(DataAjax.users)
			},
			function(data){
				friends.friendsData = JSON.parse(data);
				console.log(friends.friendsData);
				for(var i = 0; i < friends.friendsData.length; i++) {
					friends.createGroup(friends.friendsData[i],i);
				};
				if(friends.ifClear) {
					app.alert(dictionary.noContent, dictionary.sorry);
				};
			});
	},
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
					var pageName = $(".view-main").attr("data-page");
					for(var key in Data) {
						DataAjax[key] = Data[key];
						if(key == "newslist" && pageName == "news"){
							news.scroll = $('.newsMainTriggerScroll').scrollTop();
							news.render("new");
						}
						else if(key == "cartoonslist" && pageName == "cartoons__category"){
							cartoons__category.render();
						}
						else if(key == "contestlist" && pageName == "contest"){
							contests__list.render();
						}
						else if(key == "pulsegoroda" && pageName == "pulsegoroda"){
							pulsegoroda.render();
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
	}
};