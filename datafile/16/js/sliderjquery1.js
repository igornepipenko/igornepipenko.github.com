(function($) {

	'use strict'


	function Slider(node) { //обьявляю переменные инициализации
		this.node = node;
		this.countDiv = 0;
		this.left = 0;
		this.topMargin = 22;
		this.init(); //запускаю слайдер методом инит

	}

	/*метод инициализации*/

	Slider.prototype.init = function() {
		this.intmoveLeft = setInterval($.proxy(this.moveLeft, this), 2000); //овертываю метод движения слайдера и плашек в интервал(выполняется каждые 2 сек)
		this.node.find(".divPointer").find("div").on("click", $.proxy(this.clickPointer, this)); // навешиваю на клик по плашкам метод обработки щелчка по плашкам слайдера

	};

	/*метод обработки щелчка по плашкам слайдера*/

	Slider.prototype.clickPointer = function(event) {

		if (this.inttimeOutl !== undefined) { //очистака таймаута если он есть( защита от многоразовых кликов по плашке)
			clearInterval(this.inttimeOutl);
		};
		clearInterval(this.intmoveLeft); // очищаю интервал движения слайдера
		function time() {
			this.intmoveLeft = setInterval($.proxy(this.moveLeft, this), 2000);
		}
		this.inttimeOutl = setTimeout($.proxy(time, this), 5000); // запускаю слайдер спустя 5 сек
		var thisDiv = event.target; // далее идет логика определения на какую именно клацнул плашку и показа нужного(соответствующего ) слайда
		var numberPoiner;
		this.node.find(".divPointer").find("div").each(function(i) {
			if (thisDiv === this) {
				numberPoiner = i;
			};
		});
		this.node.find(".divPointer").find("div").removeClass("pointer");
		this.topMargin = 22 + 28 * (numberPoiner);
		this.node.find(".arrow").css("top", this.topMargin);
		$(event.target).addClass("pointer");
		//для того что бы избавиться от переходов через все слайды, меняю очередь на ходу(см метод движения слайдера и плашек)
		// далее идет блок определение нужного числа перестановок в очереди что бы получить нужную и собственно ее перестановка
		if (numberPoiner - this.countDiv > 0) {
			for (var i = 0; i <= (numberPoiner - this.countDiv - 1); i++) {
				this.node.find(".divImg").find("div").eq(0).appendTo(this.node.find(".divImg"));
			};
			this.countDiv = numberPoiner;
		} else if (numberPoiner - this.countDiv < 0) {
			for (var i = 0; i <= (Math.abs(numberPoiner - this.countDiv) - 1); i++) {
				$(this.node).find(".divImg").find("div").eq(3).prependTo(this.node.find(".divImg"));
			};
			this.countDiv = numberPoiner;
		};
		this.left = 0;
		this.node.find(".divImg").css("left", this.left);
	};

	/*Метод обрабоки движение слайдера и плашек*/

	Slider.prototype.moveLeft = function() {

		function movePointer() {
			this.node.find(".divPointer").find("div").eq(this.countDiv).removeClass("pointer");
			if (this.countDiv === 3) {
				this.countDiv = -1;
			}
			this.countDiv = this.countDiv + 1;
			this.topMargin = this.topMargin + 28;

			if (this.topMargin > 115) {
				this.topMargin = 22;

			};
			this.node.find(".divPointer").find("div").eq(this.countDiv).addClass("pointer");
			this.node.find(".arrow").css("top", this.topMargin);
		};
		setTimeout($.proxy(movePointer, this), 150);
		//для того что бы избавиться от переходов через все слайды, меняю очередь на ходу позавершении анимации
		// логику назову - "первый в конце"
		this.node.find(".divImg").animate({
			left: this.left - 303
		}, {
			complete: $.proxy(function() {
				this.node.find(".divImg").find("div").eq(0).appendTo(this.node.find(".divImg"));
				this.left = 0;
				this.node.find(".divImg").css("left", this.left);
			}, this)
		}, "slow");

	};

	window.Slider = Slider;

})(jQuery);