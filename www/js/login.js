var login = {
	bindEvents: function() {
		$('.signin').on('click', function(){
			
			app.closePanel();
			
			//�������� �� ����� ��� �������� ������ �� ������.
			if( 
				( $('.login').val().length < 4 ) || ( $('.pass').val().length <8 ) 
			){
				app.alert(dictionary.error +dictionary.register,dictionary.error);
			} else {
				//ajax(entrypoints.signIn.url,entrypoints.signIn.data,entrypoints.signIn.success);
				ajax(
				'http://ovz1.itlaborykt.zm9y1.vps.myjino.ru/entrypoints/loginChecker.php', 
					
					{
						'login': $('.login').val(),
						'pass': $('.pass').val(),
					},
					
					function(data){
						var dataLogin = JSON.parse(data);
						app.alert(dataLogin.text,dictionary.success);
						if(dataLogin.sessionId != undefined){
							userInfo.phpSessionId = dataLogin.sessionId;
							userInfo.loggedIn = true;
							localStorage.setItem("userInfo",JSON.stringify(userInfo));
							$('.loginPanel').addClass('display-none');
							$('.loginPanel').removeClass('display-block');
							$('.userPanel').removeClass('display-none');
							$('.userPanel').addClass('display-block');
							$('.userPanel__icon').attr('src', '');
							$('.userPanel__name').html(dictionary.unableToConnect);
							$('.login').val('');
							$('.pass').val('');
							$('.loginReg').val('');
							$('.passReg').val('');
							$('.mail').val('');
							ajax(
								'http://ovz1.itlaborykt.zm9y1.vps.myjino.ru/entrypoints/user-data-ajax.php', 
								
								{
									'type': 'get',
								},
								
								function(data){
									var dataLogin = JSON.parse(data);
									$('.userPanel__icon').attr('src', dataLogin.icon);
									$('.userPanel__name').html(dataLogin.login);
									localStorage.setItem("userInfo", JSON.stringify(userInfo));
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
			
			//�������� �� ����� ��� �������� ������ �� ������.
			if( 
				( $('.loginReg').val().length < 4 ) || ( $('.passReg').val().length <8 ) 
			){
				app.alert(dictionary.error +dictionary.register,dictionary.error);
			}
			
			ajax(
				'http://it-labor.ru/playground/valera/registration.php',
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
				'http://ovz1.itlaborykt.zm9y1.vps.myjino.ru/entrypoints/logout.php',
				{},
				function(data){
					app.alert(data,dictionary.success);
					cookies.getCookie('PHPSESSID', null);
					userInfo = {};
					localStorage.clear();
					$('.loginPanel').addClass('display-block');
					$('.userPanel').addClass('display-none');
					$('.userPanel').removeClass('display-block');
					$('.loginPanel').removeClass('display-none');
				}
			);
			
		});
		$('.updateUserinfo').on('click', function(){
			userOptions.updateUserinfo();
		});
	}
}