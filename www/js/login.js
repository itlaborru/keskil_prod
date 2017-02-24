var login = {
	bindEvents: function() {
		$('.signin').on('click', function(){
			
			app.closePanel();
			
			//Проверка на длину при отправке данных на сервер.
			if( 
				( $('.login').val().length < 4 ) || ( $('.pass').val().length <8 ) 
			){
				app.alert(dictionary.error +dictionary.register,dictionary.error);
			} else {
				
				ajax(
				serverAdress + 'entrypoints/loginChecker.php', 
					
					{
						'login': $('.login').val(),
						'pass': $('.pass').val(),
					},
					
					function(data){
						var dataLogin = JSON.parse(data);
						if(dataLogin.text == "error") {
							app.alert(dictionary.error +dictionary.wrongLogin,dictionary.error);			
						}
						else {
							if(dataLogin.sessionId != undefined){
								userInfo.phpSessionId = dataLogin.sessionId;
								userInfo.loggedIn = true;
								localStorage.setItem("userInfo",JSON.stringify(userInfo));
								$(".myPage").attr("style","display: block;");
								$('.loginPanel').toggleClass("state_active");
								$('.userPanel').toggleClass("state_active");
								$('.login').val('');
								$('.pass').val('');
								$('.loginReg').val('');
								$('.passReg').val('');
								$('.mail').val('');
								ajax(
									serverAdress + 'entrypoints/user-data-ajax.php', 
									
									{
										'type': 'get',
									},
									
									function(data){
										userOptions.updateUserinfoClient(data);
										app.alert(dictionary.hello + dataLogin.login,dictionary.success);
									});
							}
						}
					}
				);
			}
			
		});
		$('.register').on('click', function(){
			
			app.closePanel();
			
			//Проверка на длину при отправке данных на сервер.
			if( 
				( $('.loginReg').val().length < 4 ) || ( $('.passReg').val().length <8 ) 
			){
				app.alert(dictionary.error +dictionary.register,dictionary.error);
			}
			
			ajax(
				serverAdress + 'entrypoints/registration.php',
				{ 
					'login': $('.loginReg').val(), 
					'pass': $('.passReg').val(),
					'mail': $('.mail').val()
				},
				function(data){
					app.alert(data,dictionary.keskil);
					$('.login').val('');
					$('.pass').val('');
					$('.loginReg').val('');
					$('.passReg').val('');
					$('.mail').val('');
				}
			);
			
		});
		$('.logout').on('click', function(){
			
			app.closePanel();
			
			$('.login').val('');
			$('.pass').val('');
			$('.loginReg').val('');
			$('.passReg').val('');
			$('.mail').val('');
			
			mainView.router.back({'pageName':'index', 'force':true});
			ajax(
				serverAdress + 'entrypoints/logout.php',
				{},
				function(data){
					app.alert(data,dictionary.success);
					cookies.getCookie('PHPSESSID', null);
					userInfo = {};
					localStorage.removeItem("userInfo");
					$(".myPage").attr("style","display: none;");
					$('.loginPanel').toggleClass("state_active");
					$('.userPanel').toggleClass("state_active");
				}
			);
			
		});
		$('.updateUserinfo').on('click', function(){
			userPage.updateUserinfo();
		});
	}
}