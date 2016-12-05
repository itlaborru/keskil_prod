$('.userPanel__icon').on('click', function(){
	
	getOtherImage();
	globalVar.imgData = '';
	globalVar.typeData = 'avatar';
	updateUserinfo();
	
});

$('.changeUserInfo').on('click', function(){
	
	ajax(
		'http://it-labor.ru/playground/valera/user-data-edit.php',
		{
			'fname': $('.userPage__fullname__fname__change').val(),
			'mname': $('.userPage__fullname__mname__change').val(),
			'lname': $('.userPage__fullname__lname__change').val(),
			//'pass': $('.userPage__pass__change').val(),
			//'mail': $('.userPage__mail__change').val(),
		},
		function(data){
			alert(data);
		}
	);
	
});