if(localStorage.getItem("loggedIn")){//�������� �� ������������� ����
	cookies.setCookie('PHPSESSID', localStorage.getItem("phpSessionId"));
	$('.loginPanel').addClass('display-none');
	$('.userPanel__name').html(dictionary.unableToConnect);
} else {
	$('.userPanel').addClass('display-none');
};

// Handle Cordova Device Ready Event
$(document).on('deviceready', function() {
	initPages.handler();
	ajax(entrypoints.onReady.url,entrypoints.onReady.data,entrypoints.onReady.success);
	ajax(entrypoints.allData.url,entrypoints.allData.data,entrypoints.allData.success);
	initPages.splashscreen();
	login.bindEvents();
	
	console.log(dictionary.ready);
	
});