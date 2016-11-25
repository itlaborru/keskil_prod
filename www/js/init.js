// Initialize app
var myApp = new Framework7();

var globalVar = {};

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
	// Because we want to use dynamic navbar, we need to enable it for this view:
	dynamicNavbar: true,
	domCache : true,
});

if(localStorage.getItem("loggedIn")){//Проверка на сохраненность куки
	setCookie('PHPSESSID', localStorage.getItem("phpSessionId"));
	$$('.loginPanel').css('display', 'none');
	$$('.userPanel__name').html('Oshibka v soedinenii s serverom!');
} else {
	$$('.userPanel').css('display', 'none');
};

var updateUserinfo = function(){
	shortAjax(
		'http://it-labor.ru/playground/valera/user-data-ajax.php', 
		
		{
			'type': 'get',
		},
		
		function(data){
			var dataLogin = JSON.parse(data);
			$$('.userPanel__icon').attr('src', dataLogin.icon);
			$$('.userPanel__name').html(dataLogin.login);
			currentLogin = dataLogin.login;
			localStorage.setItem("userName", currentLogin);
			$$('.userPage__fullname').html(dataLogin.lname + ' ' + dataLogin.fname + ' ' +  dataLogin.mname);
			$$('.userPanel__mail').html(dataLogin.mail);
		}
	);
};

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
	
	shortAjax(
		'http://it-labor.ru/playground/valera/data-ajax.php',
		{},
		function(data){
			var data_ajax = JSON.parse(data);
			
			if(localStorage.getItem("loggedIn")){
				$$('.userPanel__name').html(data_ajax.userData.login);
				$$('.userPanel__icon').attr('src', data_ajax.userData.icon);
				console.log(data_ajax);
				$$('.userPage__fullname').html(data_ajax.userData.lname + ' ' + data_ajax.userData.fname + ' ' +  data_ajax.userData.mname);
				$$('.userPanel__mail').html(data_ajax.userData.mail);
			};
			
			$$('.contests .page-content .content-block').html('');
			for(var i = 0; i < data_ajax.contest.length; i++){
			
				$$('.contests .page-content .content-block').append(
					//' '+data_ajax.contest[i].start
					//+
					//' '+data_ajax.contest[i].end
					//+
					'<a href = "#contest'+data_ajax.contest[i].id+'">'+data_ajax.contest[i].title
					//+
					//' '+data_ajax.contest[i].content
					+
					'</a> </br>'
				);
				
				var myPage = $$('<div></div>');
				var myContent_block = $$('<div></div>');
				var myPage_content = $$('<div></div>');
				
				myPage.addClass('page cached contest'+data_ajax.contest[i].id);
				myPage.attr('data-page', 'contest'+data_ajax.contest[i].id);
				myPage_content.addClass('page-content');
				myContent_block.addClass('content-block');
				
				myContent_block.append(
					' '+data_ajax.contest[i].start
					+
					' '+data_ajax.contest[i].end
					+
					' '+data_ajax.contest[i].title
					+
					' '+data_ajax.contest[i].content
					+
					'</br>'
					+
					'<p class="photoUploadButton" data-contest = "'+data_ajax.contest[i].id+'">Выбрать фото</p>'
					+
					'<textarea placeholder = "Краткое описание(Не обязательно)" class = "textareaFor'+data_ajax.contest[i].id+'"></textarea>'
					+
					'<p class="uploadButton" data-contest = "'+data_ajax.contest[i].id+'" data-type = "contest">Отправить!</p>'
				);
				
				myPage_content.append(myContent_block);
				myPage.append(myPage_content);
				
				$$('.pages').append(myPage);
			
			};
			
			$$('.photoUploadButton').on('click', function(){
				globalVar.imgData = $$(this).attr('data-contest');
				globalVar.typeData = $$(this).attr('data-type');
				getImage();
			});
		});
	
	var opacityRedact = function(){
		var i = 100;
	
		var loadScreensOpChanger = setInterval(function() {
			i-=1;
			$$(".loadingScreen").css('opacity', i/100);
			if(i<=0){
				clearInterval(loadScreensOpChanger);
				$$(".loadingScreen").css('display', 'none');
			};
		}, 1);
	};
	renderCartoons(); // Прогрузка видеозаписей на страницу с мультфильмами, функция описана в cartoons.js
	
	renderNews();
	
	opacityRedact();
	
	console.log("Ready");
	
});