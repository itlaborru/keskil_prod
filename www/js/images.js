var transferImages = {
	uploadPhoto:	function(imageURI) {
		var options = new FileUploadOptions();
		options.fileKey="userfile";
		options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
		options.mimeType="image/*";

		var params = new Object();
		//params.contest = globalVar.imgData;
		//params.type = globalVar.typeData;
		//if(type == "contest") {
			params.contest = 3;
			params.type = "contest";
			params.file =  'fileChecker';
			params.user = userInfo.phpSessionId;
		//}
		
		options.params = params;
		
		globalVar.imageURI = imageURI;

		options.chunkedMode = false;
		
		var ft = new FileTransfer();
		ft.upload(imageURI, "http://it-labor.ru/playground/valera/fileChecker.php", transferImages.win, transferImages.fail, options);
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
	 
	
	win:	function(r) {
		console.log("Code = " + r.responseCode);
		console.log("Response = " + r.response);
		console.log("Sent = " + r.bytesSent);
		alert(r.response,dictionary.keskil);
	},
	fail: function(error) {
		alert(dictionary.error +  error.code);
	}
};