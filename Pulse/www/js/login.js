var login = {
	render:function() {
		if(login.ifFirst) {
			$('.register').on('click', function(){
				if(($('.loginReg').val().length < 4)  || ( $('.passReg').val().length <8) || ($('.mailReg').val() =="") ) {
					app.alert("Недостаточно длиный логин (минимум 4 символа) или  параоль (минимум 8 символов) или не введена почта","Ошибка");	
				}
				else {
					entrypoints.registration($('.loginReg').val(),$('.passReg').val(),$('.mailReg').val());
				}
			});
			$('.signIn').on('click', function(){
				if( ($('.loginSign').val() =="")  || ($('.passSign').val() =="") ) {
					app.alert("Логин или пароль пустые");	
				}
				else {
					entrypoints.signIn($('.loginSign').val(),$('.passSign').val());
				}
			});
		}
		login.ifFirst = false;
	},
	ifFirst:true
}