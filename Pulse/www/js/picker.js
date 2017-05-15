var picker = {
	render:function(type) {
		var arrayToDraw = [];
		if(type == "city") {
			for(var key in cities) {
				arrayToDraw.push(key);
			}
			var newPicker = app.picker({
				input: '#picker-city',
				rotateEffect: true,
				cols: [
				   {
					 values: arrayToDraw
				   }
				],
				onClose:function(){
					//Установка города для карты
					var currentValue = newPicker.value[0];
					mapManager.setUpCity(mapManager.firstCall,currentValue);
					mainView.router.load({pageName: 'index'});
				}
			});   
			newPicker.open();
		}
	}
	
}