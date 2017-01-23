var transferImages = {
	uploadPhoto:	function(imageURI) {
		console.log(imageURI);
		var options = new FileUploadOptions();
		options.fileKey="userfile";
		options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
		options.mimeType="image/*";

		var params = new Object();
		params.file =  'fileChecker';
		params.user = userInfo.phpSessionId;
		if(transferImages.type.name == "contest") {
			params.contest = transferImages.type.contest;
			params.type = "contest";
		}
		if(transferImages.type.name == "avatar"){
			params.file = 'fileChecker';
			params.type="avatar";
		}
		
		options.params = params;
		
		globalVar.imageURI = imageURI;

		options.chunkedMode = false;
		// ** Тут меняешь адрес сервера для картинок
		var ft = new FileTransfer();
		ft.onprogress = function(result) {
			var percent =  result.loaded / result.total * 100;
			percent = Math.round(percent);
			app.setProgressbar($('.userPage__progressbar'), percent);
			if(percent == 100) {
				app.setProgressbar($('.userPage__progressbar'), 0);	
				userPage.updateUserinfo();
			}
		};
		ft.upload(imageURI, serverAdress + "entrypoints/set.php", transferImages.win, transferImages.fail, options);
	},
	getImage:	function() {
		// Retrieve image file location from specified source
		
		navigator.camera.getPicture(transferImages.uploadPhoto, function(message) {
			app.alert(dictionary.imageFail,dictionary.error);
		},{
			quality: 50, 
			destinationType: navigator.camera.DestinationType.FILE_URI,
			sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
		});
	},
	type: {
		name:	"",
		contest:	0,
	},
	
	win:	function(r) {
		console.log("Code = " + r.responseCode);
		console.log("Response = " + r.response);
		console.log("Sent = " + r.bytesSent);
		//alert(r.response,dictionary.keskil);
		app.alert(dictionary.uploaded,dictionary.success);
	},
	fail: function(error) {
		alert(dictionary.error +  error.code);
	}
};