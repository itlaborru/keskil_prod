// Initialize app
var app = new Framework7();

var globalVar = {};

// If we need to use custom DOM library, let's save it to $ variable:
var $ = Dom7;

// Add view
var mainView = app.addView('.view-main', {
	// Because we want to use dynamic navbar, we need to enable it for this view:
	dynamicNavbar: true,
	domCache : true,
});
var initPages = {
	handler: 	function(){
		$(document).on('pageInit', function (e) {
			var page = e.detail.page.name;
			if( (page !="renderCartoons") && page!="news" && page!="renderNews") {
				window[page].bindEvents();
			}
		});
	},
};   

var transferImages = {
	getOtherImage:	function() {
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
		ft.upload(imageURI, "http://it-labor.ru/playground/valera/fileChecker.php", win, fail, options);
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
			ft.upload(globalVar.imageURI, "http://it-labor.ru/playground/valera/fileChecker.php", win, fail, options);
			$('.uploadButton').off('click');
		});
	}
};

function win(r) {
	console.log("Code = " + r.responseCode);
	console.log("Response = " + r.response);
	console.log("Sent = " + r.bytesSent);
	alert(r.response);
}

function fail(error) {
	alert(dictionary.error +  error.code);
}

//alert('1');
    
		
//Укороченный ajax.
		
var ajax = function(url, data, onSuccess){
	$.ajax({
		method : 'POST',
		url: url,
		data: data,
		success: onSuccess,
		error: function(xhr, stat){
			alert(stat);
		}
	});
};