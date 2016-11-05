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

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
	
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
	
	shortAjax(
		'http://it-labor.ru/playground/valera/data-ajax.php',
		{},
		function(data){
			var contestList = JSON.parse(data);
			$$('.contests .page-content .content-block').html('');
			for(var i = 0; i < contestList.contest.length; i++){
			
				$$('.contests .page-content .content-block').append(
					//' '+contestList.contest[i].start
					//+
					//' '+contestList.contest[i].end
					//+
					'<a href = "#contest'+contestList.contest[i].id+'">'+contestList.contest[i].title
					//+
					//' '+contestList.contest[i].content
					+
					'</a> </br>'
				);
				
				var myPage = $$('<div></div>');
				var myContent_block = $$('<div></div>');
				var myPage_content = $$('<div></div>');
				
				myPage.addClass('page cached contest'+contestList.contest[i].id);
				myPage.attr('data-page', 'contest'+contestList.contest[i].id);
				myPage_content.addClass('page-content');
				myContent_block.addClass('content-block');
				
				myContent_block.append(
					' '+contestList.contest[i].start
					+
					' '+contestList.contest[i].end
					+
					' '+contestList.contest[i].title
					+
					' '+contestList.contest[i].content
					+
					'</br>'
					+
					'<p class="photoUploadButton" data-contest = "'+contestList.contest[i].id+'">фотки</p>'
				);
				
				myPage_content.append(myContent_block);
				myPage.append(myPage_content);
				
				$$('.pages').append(myPage);
			
			};
			
			$$('.photoUploadButton').on('click', function(){
				globalVar.imgData = $$(this).attr('data-contest')
				getImage();
			});
		}
	);
});