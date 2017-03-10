//Прорисовка списка категорий, получение и запись данных
var profor = {
	id:	-2,
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
						questions+= "<p>"+DataAjax.profor[i].questions_stack[x].title+"<br/>";
						for(var key in DataAjax.profor[i].questions_stack[x].answers) {
							questions+= "<input class='answer_profor' type='radio' data-weight='"+DataAjax.profor[i].questions_stack[x].answers[key].weight+"' data-id='"+x+"' name='"+x+"' value='radiobutton'/>"+DataAjax.profor[i].questions_stack[x].answers[key].name; 
						}
						questions+="</p><br/>";
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
					results.push(parseFloat($(this).attr("data-weight")));
				});
				var bestMatch = {
					sum:	0,
					name:	"",
				};
				console.log(results);
				for(var i=0;i<profor.answers.length;i++) {
					var difference = 0;
					for(var j=0;j<profor.answers[i].graph.length;j++) {
						difference += Math.abs(results[j] - profor.answers[i].graph[j]);
					};
					if(i == 0) {
						bestMatch.sum = difference;
						bestMatch.name = profor.answers[i].name;
					}
					else{
						if(bestMatch.sum > difference) {
							bestMatch.sum = difference;
							bestMatch.name = profor.answers[i].name;
						}
					}

				};
				app.alert(bestMatch.name, dictionary.success);
				
			});
		}
		$('.profor-test').on('click', function () {
			profor.render($(this).attr('data-id'));
			profor.id = $(this).attr('data-id');
			var data = {
				file: "proftest",
				type: "pull",
				id:	profor.id
			};
			ajax(
				serverAdress+"entrypoints/get.php",
				data,
				function(Data){
					profor.answers= JSON.parse(Data)[0];
				}
			);
		});
		profor.notFirstUse = true;
	},
	answers: "",
	notFirstUse: false,
}