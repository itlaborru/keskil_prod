var transferImages = {
	/*getOtherImage:	function() {
		// Retrieve image file location from specified source
		
		navigator.camera.getPicture(transferImages.uploadOtherPhoto, function(message) {
			alert(dictionary.imageFail);
		},{
			quality: 50, 
			destinationType: navigator.camera.DestinationType.FILE_URI,
			sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
		});
	},

	uploadOtherPhoto:	function(imageURI) {
		
		var options = new FileUploadOptions();
		options.fileKey="userfile";
		options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
		options.mimeType="image/*";

		var params = new Object();
		params.contest = '';
		params.type = 'avatar';
		
		options.params = params;
		
		options.chunkedMode = false;
			
		var ft = new FileTransfer();
		ft.upload(imageURI, "http://it-labor.ru/playground/valera/fileChecker.php", transferImages.win, transferImages.fail, options);
	},*/
	uploadPhoto:	function(imageURI) {
		
		var options = new FileUploadOptions();
		options.fileKey="userfile";
		options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
		options.mimeType="image/*";

		var params = new Object();
		params.contest = globalVar.imgData;
		params.type = globalVar.typeData;
		
		options.params = params;
		
		globalVar.imageURI = imageURI;

		$('.uploadButton').on('click',function(){
			options.params.text = $('.textareaFor'+globalVar.imgData).val();
			$('.textareaFor'+globalVar.imgData).val('');
			options.chunkedMode = false;
			
			var ft = new FileTransfer();
			ft.upload(globalVar.imageURI, "http://it-labor.ru/playground/valera/fileChecker.php", transferImages.win, transferImages.fail, options);
			$('.uploadButton').off('click');
		});
	},
	getImage:	function() {
		// Retrieve image file location from specified source
		
		navigator.camera.getPicture(transferImages.uploadPhoto, function(message) {
			alert(dictionary.imageFail);
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
		alert(r.response);
	},
	fail: function(error) {
		alert(dictionary.error +  error.code);
	}
};