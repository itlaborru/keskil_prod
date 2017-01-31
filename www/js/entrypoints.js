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
			userOptions.updateUserinfoClient(data);
		},
	},
	pulseAddStory: {
		url:	serverAdress + "entrypoints/set.php",
		success:	function(data){
			app.alert(dictionary.storySent, dictionary.keskil);
		}
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
						else if(key == "pulsegoroda"){
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
	},
};