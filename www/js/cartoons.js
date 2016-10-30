function renderCartoons() {
	shortAjax('http://it-labor.ru/playground/valera/admin/admin-cartoonsListServer.php', 
		{
			'type':'download',
		},
		function(data) {
			$$('.cartoons .page-content .cartoonBlock').html(data);
		}
	);
}