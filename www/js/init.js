if(localStorage.getItem("userInfo")) {
	userInfo = JSON.parse(localStorage.getItem("userInfo"));
	console.log(userInfo);
	if(userInfo.loggedIn){//Проверка на сохраненность куки
		cookies.setCookie('PHPSESSID', userInfo.phpSessionId);
		$('.loginPanel').toggleClass("state_active");
		$('.userPanel').toggleClass("state_active");
		$('.userPanel__icon').attr('src', '');
		$('.userPanel__icon').attr('src', userInfo.icon);
		$('.userPanel__name').html(userInfo.login);
		$('.userPage__fullname').html(userInfo.lname + ' ' + userInfo.fname + ' ' +  userInfo.mname);
		$('.userPanel__mail').html(userInfo.mail);
		ajax(entrypoints.newUserInfo.url,entrypoints.newUserInfo.data,entrypoints.newUserInfo.success);
	} 
}
else {
	$('.userPanel').addClass('display-none');
};
// Handle Cordova Device Ready Event
$(document).on('deviceready', function() {
	onDeviceReady();
});
if(document.location.hostname == "it-labor.ru") {
	onDeviceReady();
}
function onDeviceReady() {
	initPages.handler();
	
	if(localStorage.getItem("cache")) {
		DataAjax = JSON.parse(localStorage.getItem("cache"));
	}
	else {
		entrypoints.allDataUpdate();
	} 
	setInterval(function() {
		var lastChanges = JSON.parse(localStorage.getItem("lastChanges"));
		ajax(entrypoints.checkForUpdates.url,{
			"object" : {
				"coldStart":"no",
				"lastChanges":lastChanges
			},
		},entrypoints.checkForUpdates.success); 
	} , LAST_CHANGES_INTERVAL);
	
	
	initPages.splashscreen();
	login.bindEvents();
	userPage.bindEvents();
	
	console.log(dictionary.ready);
}