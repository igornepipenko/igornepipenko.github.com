(function($){
	'use strict'
//решил переделать на прототипах
function PortfolioHTML(date) { 
	this.converter;
	this.leftPosition;
	this.date=date;
	this.animateInduration = false;
	this.init(date);
};
//инициализация класса, тут вызываю конфиг и навешиваю обработчики
PortfolioHTML.prototype.init = function() {
	this.config();
	$(".arrowblock").on('click', $.proxy(this.clickArrow,this));
	$(".verticalmenu").on('click', $.proxy(this.clicVerticalmenu,this));
	$(".horizontalmenu").on('click', $.proxy(this.clicHorizontalmenu,this));
};

//модуль конфига , формирования стартового отображения страницы
PortfolioHTML.prototype.config = function() {

	this.converter = new Markdown.Converter(); //конструктор маркдаун конвертора, который нашел
	
	this.item =this.date;
	this.numberOfRow=this.item.length-1;
	for (var i = this.item.length-1; i > 0; i--) { //формирую вертикальное меню по заголовкам задания из конфига
		var element = '<div class="markvmenu"><div class="vmenu" ><img src="img/bulet.png" />' + this.item[i].title + '</div></div>';
		$(element).appendTo($('.verticalmenu'));
	};
	for (var key in this.item[this.numberOfRow]) {

		if (key !== "title") { //все пункты (тоесть  название файлов ) выношу в горизонтальное меню
			if (this.item[this.numberOfRow][key] === "index.html") {
					this.item[this.numberOfRow][key] = "demo";
				}
			var element = '<div class="markhmenu"><div class="hmenu" >' + this.item[this.numberOfRow][key] + '</div></div>';
			$(element).appendTo($('.horizontalmenu'));
		};
	};
	this.arrowSet();
	$('.verticalmenu').find("div").eq(0).addClass("chengedv"); // выделяю первые пункты обоих меню
	$('.horizontalmenu').find("div").eq(0).addClass("chengedh");
	$('<img src="img/ajax-loader.gif"/ class="gif">').appendTo($('.content')); // гифка подгрузки пока идет загрузка
	$.get("datafile/17/description.md", $.proxy(function(date) { // подгружаю описание в формате маркдауна конвертирую и вывожу
		var marktext = this.converter.makeHtml(date);
		$('.content').find(".gif").remove();
		$('.content').html(marktext);
	},this));

};
//метод класса отвечающий за инициализацию и отображение стрелок навигации горизонтального меню
//в случае когда табиков сильно много
PortfolioHTML.prototype.arrowSet = function() {
	if ($(".markhmenu").length > 6) {
		var width = $(".markhmenu").length * 106 + 'px';
		$(".arrowl").show();
		$(".arrowr").hide();
		$('.horizontalmenu').css("width", width);
	} else {
		$('.horizontalmenu').css("width", "100%");
		$(".arrowl").hide();
		$(".arrowr").hide();
	};
	$('.horizontalmenu').css("left", "0px");
};

//метод класса отвечающий за обработку кликов по стрелкам навигации горизонтального меню
PortfolioHTML.prototype.clickArrow = function(event) {
	
	var left = parseInt($(".horizontalmenu").css("left"));
	
	if ($(event.target).parent().hasClass("arrowl") && this.animateInduration === false) {
		$(".horizontalmenu").animate({
			left: left - 106
		}, {
			done: $.proxy(function() {
				this.animateInduration = false;
				left = left - 106;

				if (parseInt($(".horizontalmenu").css("width")) - parseInt($(".horizontalmenu").parent().css("width")) === Math.abs(left)) {
					$(".arrowl").hide();
				}
				if (left < 0) {

					$(".arrowr").show();
				}
			},this)
		}, "slow");
	} else if ($(event.target).parent().hasClass("arrowr") && this.animateInduration === false) {
		$(".horizontalmenu").animate({
			left: left + 106
		}, {
			done: $.proxy(function() {
				this.animateInduration = false;
				left = left + 106;

				if (parseInt($(".horizontalmenu").css("left")) === 0) {
					$(".arrowr").hide();
					$(".arrowl").show();
				}
				if (parseInt($(".horizontalmenu").css("width")) - parseInt($(".horizontalmenu").parent().css("width")) + left === 106) {
					$(".arrowl").show();
				}
			},this)
		}, "slow");
	};

	this.animateInduration = true;

};

//метод класса отвечающий за обработку клика по вертикальному меню
PortfolioHTML.prototype.clicVerticalmenu = function(event) {
	if ($(event.target).hasClass("vmenu")) { // определяю что кликнул по плашке вертикального меню
		$('.verticalmenu').find("div").removeClass("chengedv"); // перевыделяю плашку
		$(event.target).parent().addClass("chengedv");
		//var index = $(event.target).parent().index(); //определил номер плашки по которой кликнул
		this.numberOfRow=this.item.length-$(event.target).parent().index()-1;
		$(".horizontalmenu").empty();
		for (var key in this.item[this.numberOfRow]) {
			if (key !== "title" && key !== "widget") { // переписываю горизонтальное меню в соответствии нужной плашки
				var itemText = this.item[this.numberOfRow][key];
				if (itemText === "index.html") {
					itemText = "demo";
				}
				var element = '<div class="markhmenu"><div class="hmenu" >' + itemText + '</div></div>';
				$(element).appendTo($('.horizontalmenu'));

			};
		};

		this.arrowSet();


		$('.content').empty(); //очищаем контент
		$('<img src="img/ajax-loader.gif" class="gif"/>').appendTo($('.content'));
		var adress = "datafile/" + this.numberOfRow/*$(event.target).parent().index()*/ + "/description.md"; // формирую адресс запроса

		$.get(adress, $.proxy(function(date) { //запрашиваю сответствующее описание конвертирую и вывожу его
			var marktext = this.converter.makeHtml(date);
			$('.content').find(".gif").remove();
			$('.content').html(marktext);
		},this));

		$('.horizontalmenu').find("div").eq(0).addClass("chengedh"); //выделяю первый пункт горизонтального меню
	}
};

//метод класса отвечающий за клик по горизонтальному меню
PortfolioHTML.prototype.clicHorizontalmenu = function(event) {

	if ($(event.target).hasClass("hmenu")) { // определяю что кликнул по пункту горизонтального меню
		$('.horizontalmenu').find("div").removeClass("chengedh"); // перевыделяю пункты меню
		$(event.target).parent().addClass("chengedh");
		$('.content').empty(); //очищаю контент
		$('<img src="img/ajax-loader.gif" class="gif"/>').appendTo($('.content')); // гифка ожидания подгрузки,вывожу ее
		var file = $(event.target).text(); //по названию пункта меню формирую адресс запроса ниже
		var adress = "datafile/" + this.numberOfRow/*$(".chengedv").index()*/ + "/" + file;
		if (file != "index.html" && file != "demo" && file != "description.md") {
			var element = '<pre><code></pre></code>'; //делаю разметку для подсветки
			$(element).appendTo($('.content')); // добавляю ее в блок контента
			$('.content').find('code').load(adress, function() {
				$('.content').find(".gif").remove(); //удаляю гифку загрузки
				$('pre code').each(function(i, e) { //подсвечиваю выведеный текст
					hljs.highlightBlock(e)
				});

			});
		}
		if (file === "demo") {
			adress = "datafile/" + this.numberOfRow/*$(".chengedv").index()*/ + "/" + "index.html";
			$('.content').load(adress, "text", function() {
				$('.content').find(".gif").remove(); //удаляю гифку загрузки
			});
		};
		if (file === "description.md") {
			adress = "datafile/" + this.numberOfRow/*$(".chengedv").index()*/ + "/" + file;
			$.get(adress, $.proxy(function(date) { //запрашиваю сответствующее описание конвертирую и вывожу его
				var marktext = this.converter.makeHtml(date);
				$('.content').find(".gif").remove();
				$('.content').html(marktext);
			},this));
		};


	}
//});
};
window.PortfolioHTML=PortfolioHTML;// выношу только конструктор на глобальный уровень
})(jQuery);


