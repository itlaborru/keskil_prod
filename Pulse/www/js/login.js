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
		}
		login.ifFirst = false;
	},
	ifFirst:true
}