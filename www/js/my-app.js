function getImage() {
	// Retrieve image file location from specified source
	
	navigator.camera.getPicture(uploadPhoto, function(message) {
		alert('get picture failed');
	},{
		quality: 50, 
		destinationType: navigator.camera.DestinationType.FILE_URI,
		sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
	});
}
 
function uploadPhoto(imageURI) {
	
	var options = new FileUploadOptions();
	options.fileKey="userfile";
	options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
	options.mimeType="image/*";

	var params = new Object();
	params.contest = globalVar.imgData;
	params.type = globalVar.typeData;
	
	options.params = params;
	
	globalVar.imageURI = imageURI;

	$$('.uploadButton').on('click',function(){
		options.params.text = $$('.textareaFor'+globalVar.imgData).val();
		options.chunkedMode = false;
		
		var ft = new FileTransfer();
		ft.upload(globalVar.imageURI, "http://it-labor.ru/playground/valera/fileChecker.php", win, fail, options);
		$$('.uploadButton').off('click');
	});
}

function win(r) {
	console.log("Code = " + r.responseCode);
	console.log("Response = " + r.response);
	console.log("Sent = " + r.bytesSent);
	alert(r.response);
}

function fail(error) {
	alert("An error has occurred: Code = " + error.code);
}

//alert('1');

		
//Укороченный ajax.
		
var shortAjax = function(url, data, onSuccess){
	$$.ajax({
		method : 'POST',
		url: url,
		data: data,
		success: onSuccess,
		error: function(xhr, stat){
			alert(stat);
		}
	});
};