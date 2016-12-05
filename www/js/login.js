var login = {
	bindEvents: function() {
		$('.signin').on('click', function(){
			
			app.closePanel();
			
			//Проверка на длину при отправке данных на сервер.
			if( 
				( $('.login').val().length < 4 ) || ( $('.pass').val().length <8 ) 
			){
				alert(dictionary.error +dictionary.register);
			} else {
				//ajax(entrypoints.signIn.url,entrypoints.signIn.data,entrypoints.signIn.success);
				ajax(
				
					'http://it-labor.ru/playground/valera/loginChecker.php', 
					
					{
						'login': $('.login').val(),
						'pass': $('.pass').val(),
					},
					
					function(data){
						var dataLogin = JSON.parse(data);
						console.log(dataLogin.text);
						if(dataLogin.sessionId != undefined){
							localStorage.setItem("phpSessionId", dataLogin.sessionId);
							localStorage.setItem("loggedIn", true);
							$('.loginPanel').css('display', 'none');
							$('.userPanel').css('display', 'block');
							$('.userPanel__icon').attr('src', '');
							$('.userPanel__name').html(dictionary.unableToConnect);
							$('.login').val('');
							$('.pass').val('');
							$('.loginReg').val('');
							$('.passReg').val('');
							$('.mail').val('');
							ajax(
								'http://it-labor.ru/playground/valera/user-data-ajax.php', 
								
								{
									'type': 'get',
								},
								
								function(data){
									var dataLogin = JSON.parse(data);
									$('.userPanel__icon').attr('src', dataLogin.icon);
									$('.userPanel__name').html(dataLogin.login);
									currentLogin = dataLogin.login;
									localStorage.setItem("userName", currentLogin);
									$('.userPage__fullname').html(dataLogin.lname + ' ' + dataLogin.fname + ' ' +  dataLogin.mname);
									$('.userPanel__mail').html(dataLogin.mail);
								});
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
				alert(dictionary.error +dictionary.register);
			}
			
			ajax(
				'http://it-labor.ru/playground/valera/registration.php',
				{ 
					'login': $('.loginReg').val(), 
					'pass': $('.passReg').val(),
					'mail': $('.mail').val()
				},
				function(data){
					alert(data);
					$('.login').val('');
					$('.pass').val('');
					$('.loginReg').val('');
					$('.passReg').val('');
					$('.mail').val('');
				}
			);
			
		});
		$('.logout').on('click', function(){
			currentLogin = "";
			
			app.closePanel();
			
			$('.login').val('');
			$('.pass').val('');
			$('.loginReg').val('');
			$('.passReg').val('');
			$('.mail').val('');
			
			mainView.router.back({'pageName':'index', 'force':true});
			ajax(
				'http://it-labor.ru/playground/valera/logout.php',
				{},
				function(data){
					alert(data);
					cookies.getCookie('PHPSESSID', null);
					localStorage.clear();
					console.log(localStorage.getItem('phpSessionId'));
					$('.loginPanel').css('display', 'block');
					$('.userPanel').css('display', 'none');
				}
			);
			
		});
		$('.updateUserinfo').on('click', function(){
			userOptions.updateUserinfo();
		});
	}
}