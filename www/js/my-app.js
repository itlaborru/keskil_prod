// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

function getImage() {
            // Retrieve image file location from specified source
            navigator.camera.getPicture(uploadPhoto, function(message) {
			alert('get picture failed');
		},{
			quality: 50, 
			destinationType: navigator.camera.DestinationType.FILE_URI,
			sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
		}
            );
 
        }
 
		function uploadPhoto(imageURI) {
			
            var options = new FileUploadOptions();
            options.fileKey="userfile";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/*";
 
            var params = new Object();
            params.value1 = "test";
            params.value2 = "param";
 
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
		
		document.querySelector('.photoUploadButton').onclick = function(){
			
			getImage();
		
		};
		
		
		
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
				( $$('.login').val().length < 4 ) || ( $$('.pass').val().length <8 ) 
			){
				alert('Ошибка! Минимальная длина пароля - 8, минимальная длина логина - 4');
			}
			
			shortAjax(
				'http://it-labor.ru/playground/valera/registration.php',
				{ 
					'login': $$('.login').val(), 
					'pass': $$('.pass').val(),
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

