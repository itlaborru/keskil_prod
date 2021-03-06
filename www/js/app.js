﻿// Initialize app
var app = new Framework7();

var globalVar = {};

// If we need to use custom DOM library, let's save it to $ variable:
var $ = Dom7;

// Add view
var mainView = app.addView('.view-main', {
	// Because we want to use dynamic navbar, we need to enable it for this view:
	dynamicNavbar: true,
	domCache : true,
});
var initPages = {
	splashscreen: function(){
		$(".loadingScreen").addClass("hideLoadingScreen");
		setTimeout(function() {
			$(".loadingScreen").addClass("display-none");
		}, SPLASH_SCREEN_TIMEOUT); //change 1 to 2000

	},
	handler: 	function(){
		$(document).on('pageBeforeAnimation', function (e) {
			var page = e.detail.page.name;
			if( page != "index" ) {
				window[page].render();
			}
		});
		
	},
};   
	
//Укороченный ajax.
var ajax = function(url, data, onSuccess){
	$.ajax({
		method : 'POST',
		url: url,
		data: data,
		success: onSuccess,
		error: function(xhr, stat){
			console.log(stat);
		}
	});
};

//Show/Hide
$(".show__element-call").click(function() {
	$(".show__element[data-id='"+$(this).attr('data-id')+"']").toggleClass("state_active");
	return false;
});

$(".newsList").click(function() {
	$(".newsMain").attr("data-category","without")
});

$(".userHref").click(function() {
	$('.friends__full__post').attr("data-id",'me');
	mainView.router.load({pageName: 'friends__fullpost'});
});