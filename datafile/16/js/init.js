(function(widgetTime,widgetSlide,widgetZoom,$) {
	widgetTime(document.querySelector('.container-1'));
	var slide=new widgetSlide($(".sliderBody"));
	widgetZoom(document.querySelector('.gallery-1'));
	widgetZoom(document.querySelector('.gallery-2'));
})(timer,Slider,makeZoomable,jQuery);