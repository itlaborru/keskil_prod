﻿if(localStorage.getItem("userInfo")) {
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
document.addEventListener('deviceready', onDeviceReady, false);
if(document.location.hostname == "it-labor.ru")  {
	onDeviceReady();
}
function onDeviceReady() {
	initPages.handler();
	
	entrypoints.allDataUpdate();
	ajax(entrypoints.onReady.url,entrypoints.onReady.data,entrypoints.onReady.success); 
	setInterval(function() {
		entrypoints.allDataUpdate();
	} , 5000);
	
	
	initPages.splashscreen();
	login.bindEvents();
	
	console.log(dictionary.ready);
}