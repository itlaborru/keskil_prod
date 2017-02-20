//Прорисовка списка категорий, получение и запись данных
var profor = {
	render:	function(parameter) {
		$('.profor').html("");
		var info ="";	
		if(parameter == undefined) {
			for(var i = 0; i<DataAjax.profor.length;i++) {
				var title = DataAjax.profor[i].title;
				info+= "<h3 class='profor-test' data-id='"+DataAjax.profor[i].id+"'>"+title+"</h3>";
			}
			$(".profor").html(info);
			profor.bindEvents();
		}
		else {
			for(var i = 0; i<DataAjax.profor.length;i++) {
				if(DataAjax.profor[i].id != parameter) {
					continue;
				}
				else {
					var questions = "";
					for(var x = 0; x<DataAjax.profor[i].questions_stack.length;x++) {
						questions+= "<p>"+DataAjax.profor[i].questions_stack[x].title+"<br/><input class='answer_profor' type='radio' data-weight='0' data-id='"+x+"' name='"+x+"' value='radiobutton'/>"+DataAjax.profor[i].questions_stack[x][0]+"<input name='"+x+"' class='answer_profor' data-id='"+x+"' type='radio' data-weight='1' value='radiobutton'/>"+DataAjax.profor[i].questions_stack[x][1]+"</p><br/>";
					}
					info+= questions;
					break;
				}
			}
			$(".profor").html(info);
		}
	},
	bindEvents: function(){
		if(!profor.notFirstUse) {
			$('#profor_send').on('click', function () {
				var results= [];
				$('.answer_profor:checked').each(function() {
					results.push(parseInt($(this).attr("data-weight")));
				});
				var data = {
					file: "proftest",
					type: "pull",
					content: results
					
				}
				ajax(
					serverAdress+"entrypoints/set.php",
					data,
					function(Data){
						app.alert(Data, dictionary.success);
					}
				);
			});
		}
		$('.profor-test').on('click', function () {
			profor.render($(this).attr('data-id'));
		});
		profor.notFirstUse = true;
	},
	notFirstUse: false,
}