

if(localStorage.getItem("loggedIn")){//�������� �� ������������� ����
	setCookie('PHPSESSID', localStorage.getItem("phpSessionId"));
	$('.loginPanel').css('display', 'none');
	$('.userPanel__name').html(dictionary.unableToConnect);
} else {
	$('.userPanel').css('display', 'none');
};

var updateUserinfo = function(){
	ajax(entrypoints.newUserInfo.url,entrypoints.newUserInfo.data,entrypoints.newUserInfo.success);
};

// Handle Cordova Device Ready Event
$(document).on('deviceready', function() {
	initPages.handler();
	ajax(entrypoints.onReady.url,entrypoints.onReady.data,entrypoints.onReady.success);
	
	var opacityRedact = function(){
		var i = 100;
	
		var loadScreensOpChanger = setInterval(function() {
			i-=1;
			$(".loadingScreen").css('opacity', i/100);
			if(i<=0){
				clearInterval(loadScreensOpChanger);
				$(".loadingScreen").css('display', 'none');
			};
		}, 1);
	};
	cartoons.renderCartoons(); // ��������� ������������ �� �������� � �������������, ������� ������� � cartoons.js
	
	renderNews();
	
	opacityRedact();
	
	console.log(dictionary.ready);
	
});