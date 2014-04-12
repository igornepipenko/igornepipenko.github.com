(function(){
	'use strict'

function makeZoomable(node) {


	/*функция размера(ресайзинга)*/
	function size() {

		var elemScreen = $(window);
		var elemImg = $("#fongal").find("img");
		var closeDiv = $("#fongal").find("#boxgalx");
		var widthScreen = elemScreen.width();
		var heightScreen = elemScreen.height();
		if (elemImg.width() > elemImg.height()) {
			elemImg.width(widthScreen / 2.5);
			var left = (widthScreen - elemImg.width()) / 2;
			var top = (heightScreen / 2) - (elemImg.height() / 2);
		} else {
			elemImg.height(heightScreen * 0.8);
			var left = (widthScreen - elemImg.width()) / 2;
			var top = (heightScreen / 2) - (elemImg.height() / 2);
		}
		elemImg.css({
			"margin-left": left,
			"margin-top": top,
		});
		closeDiv.css("margin-top", top - 25);
		elemImg.css("visibility", "visible");
		
		if (elemImg.width() !== null) {
			closeDiv.css("visibility", "visible");
		};

	}
	/*обработка события клик по картинке*/
	$(node).find("img").click(function() {
		var src = this.src.split("/");
		var img = '<img '+'src="datafile/13/img/large/' + src[src.length - 1] + '"/>';
		$("#fongal").css("visibility", "visible").prepend(img);
		$("#fongal").find("img").css("visibility", "hidden");
		$("#fongal").find("#boxgalx").css("visibility", "hidden");
		$("#fongal").find("img").load(function() {
			size();
		});

	});

	/*обработка события клик по крестику(закрытие)*/

	$("#fongal").find("#boxgalx").click(function() {
		$("#fongal").css("visibility", "hidden").find("img").remove();
		$("#fongal").find("#boxgalx").css("visibility", "hidden");
	});

	/*обработка события закрытие картинки клавишей esc*/
	$(document).keyup(function(k) {
		console.log("key");
		if (k.keyCode === 27) {
			$("#fongal").css("visibility", "hidden").find("img").remove();
			$("#fongal").find("#boxgalx").css("visibility", "hidden");
		};
	});


	/*обработка события ресайзинг окна браузера*/
	$(window).resize(function() {
		$("#fongal").find("img").css("visibility", "hidden");
		size();
	});

}

window.makeZoomable = makeZoomable;
})();