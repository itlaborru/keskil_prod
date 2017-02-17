var community = {
	scroll:	0,
	actualHeight:	"",
	actualScroll:	0,
	activeScroll:	false,
	render:	function(update) {
		$('.communityMain').html("");
		var ifClear = true;
		function createGroup(value) {
			var block;
			block = $("<div class='community__group' data-id='"+value.id+"'><img src='"+value.icon+"' /><div class='community__name'>"+value.name+"</div><div class='post__group__users'>"+value.users.length+"</div></div>");
			$(".communityMain").append(block);
			ifClear = false;
		}
		for(var i = 0; i < DataAjax.grouplist.length; i++) {
			createGroup(DataAjax.grouplist[i]);
		}
		
		if(ifClear) {
			app.alert(dictionary.noContent, dictionary.sorry);
		}
		
		news.bindEvents();
	},
	bindEvents: function(){
		/*$('.category__list__inPicker').on('click', '.newsCategory', function (e) {
			var categ = $(this).attr('data-newscat');
			$('.newsMain').attr("data-category",categ);
			app.closeModal('.categoryPicker');
			news.render();			
		});
		$('.newsMain').on('click', '.post', function (e) {
			var postId = $(this).attr('data-id');
			$('.fullPost').attr("data-id",postId);
			mainView.router.load({pageName: 'news__full__post'});
		});

		if(!news.notFirstUse) {
			$('.open-categoryPicker').on('click', function () {
				app.pickerModal('.categoryPicker');
			});
			$('.newNews').on('click', function () {
				$('.newsMainTriggerScroll').scrollTop(0);
				$('.newNews').removeClass('state_active');
				news.activeScroll = false;
			});
			$('.newsMainTriggerScroll').on('scroll', function () {
				if(news.activeScroll) {
					if($('.newsMainTriggerScroll').scrollTop() <80) {		
						$('.newNews').removeClass('state_active');
						news.activeScroll = false;
					}
				}
			});
		}
		news.notFirstUse = true;
		*/
	},
	notFirstUse: false,
}