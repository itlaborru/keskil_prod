var app = new Framework7();

var $ = Dom7;

var mainView = app.addView('.view-main', {
    dynamicNavbar: true
});

$(document).on('deviceready', function() {
    console.log("Device is ready!");
});