// Initialize app
var myApp = new Framework7();

var globalVar = {};

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
	// Because we want to use dynamic navbar, we need to enable it for this view:
	dynamicNavbar: true,
	domCache : true,
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
	
	var opacityRedact = function(){
		var i = 100;
	
		var loadScreensOpChanger = setInterval(function() {
			i-=1;
			$$(".loadingScreen").css('opacity', i/100);
			if(i<=0){
				clearInterval(loadScreensOpChanger);
				$$(".loadingScreen").css('display', 'none');
			};
		}, 1);
	};
	
	opacityRedact();
	
	console.log("Ready");
	
	shortAjax(
		'http://it-labor.ru/playground/valera/data-ajax.php',
		{},
		function(data){
			var contestList = JSON.parse(data);
			$$('.contests .page-content .content-block').html('');
			for(var i = 0; i < contestList.contest.length; i++){
			
				$$('.contests .page-content .content-block').append(
					//' '+contestList.contest[i].start
					//+
					//' '+contestList.contest[i].end
					//+
					'<a href = "#contest'+contestList.contest[i].id+'">'+contestList.contest[i].title
					//+
					//' '+contestList.contest[i].content
					+
					'</a> </br>'
				);
				
				var myPage = $$('<div></div>');
				var myContent_block = $$('<div></div>');
				var myPage_content = $$('<div></div>');
				
				myPage.addClass('page cached contest'+contestList.contest[i].id);
				myPage.attr('data-page', 'contest'+contestList.contest[i].id);
				myPage_content.addClass('page-content');
				myContent_block.addClass('content-block');
				
				myContent_block.append(
					' '+contestList.contest[i].start
					+
					' '+contestList.contest[i].end
					+
					' '+contestList.contest[i].title
					+
					' '+contestList.contest[i].content
					+
					'</br>'
					+
					'<p class="photoUploadButton" data-contest = "'+contestList.contest[i].id+'">фотки</p>'
				);
				
				myPage_content.append(myContent_block);
				myPage.append(myPage_content);
				
				$$('.pages').append(myPage);
			
			};
			
			$$('.photoUploadButton').on('click', function(){
				globalVar.imgData = $$(this).attr('data-contest')
				getImage();
			});
		}
	);
});

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
	
	console.log(globalVar.imgData);

	options.params = params;
	options.chunkedMode = false;

	var ft = new FileTransfer();
	ft.upload(imageURI, "http://it-labor.ru/playground/valera/fileChecker.php", win, fail, options);
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



//Логин (Действия при нажатии).
		
$$('.signin').on('click', function(){
	
	//Проверка на длину при отправке данных на сервер.
	if( 
		( $$('.login').val().length < 4 ) || ( $$('.pass').val().length <8 ) 
	){
		alert('Ошибка! Минимальная длина пароля - 8, минимальная длина логина - 4');
	} else {
		shortAjax(
			'http://it-labor.ru/playground/valera/loginChecker.php', 
			
			{
			'login': $$('.login').val(),
			'pass': $$('.pass').val(),
			},
			
			function(data){
				alert(data);
			}
		);
	}
	
});

$$('.register').on('click', function(){

	//Проверка на длину при отправке данных на сервер.
	if( 
		( $$('.loginReg').val().length < 4 ) || ( $$('.passReg').val().length <8 ) 
	){
		alert('Ошибка! Минимальная длина пароля - 8, минимальная длина логина - 4');
	}
	
	shortAjax(
		'http://it-labor.ru/playground/valera/registration.php',
		{ 
			'login': $$('.loginReg').val(), 
			'pass': $$('.passReg').val(),
			'mail': $$('.mail').val()
		},
		function(data){
			alert(data);
		}
	);
	
});

$$('.logout').on('click', function(){
	
	shortAjax(
		'http://it-labor.ru/playground/valera/logout.php',
		{},
		function(data){
			alert(data);
		}
	);
	
});
		
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