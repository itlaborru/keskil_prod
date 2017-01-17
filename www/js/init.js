if(localStorage.getItem("userInfo")) {
	userInfo = JSON.parse(localStorage.getItem("userInfo"));
	console.log(userInfo);
	if(userInfo.loggedIn){//Проверка на сохраненность куки
		cookies.setCookie('PHPSESSID', userInfo.phpSessionId);
		$('.loginPanel').addClass('display-none');
		$('.userPanel__name').html(dictionary.unableToConnect);
	} 
}
else {
	$('.userPanel').addClass('display-none');
};

// Handle Cordova Device Ready Event
$(document).on('deviceready', function() {
	initPages.handler();
	
	entrypoints.allDataUpdate();
	ajax(entrypoints.onReady.url,entrypoints.onReady.data,entrypoints.onReady.success); 
	setInterval(function() {
		entrypoints.allDataUpdate();
	} , 5000);
	
	
	initPages.splashscreen();
	login.bindEvents();
	
	console.log(dictionary.ready);
	
});