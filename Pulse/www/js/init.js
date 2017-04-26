//When the app starts
function onDeviceReady() {
    console.log("Device is ready!");
	$(".menu__links").on('click', function () {
		var category = $(this).attr("data-category");
		map.render(false,category);
		app.closePanel();
	});
	map.render(true,"stories");
}// Handle Cordova Device Ready Event
$(document).on('deviceready', function() {
	onDeviceReady();
});