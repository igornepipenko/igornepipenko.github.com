/*процедурное решение*/
(function() {
	'use strict'
	//настройки по умолчанию
	var defaults = {
		"listNode": ">ul>*",
		"contentNode": ">div:first>*"
	}
	$.fn.tabable = function(option) {
		var opt = $.extend(defaults, option); //переобозначаю настройки в зависимости от того что ввел пользователь
		this.listNode = opt.listNode;
		this.contentNode = opt.contentNode;

		if (!this.data("listObj")) { // тело инициализация плагина
			//навешиваю нужные для плагина стили стили
			this.addClass("tabableWidget");
			this.find(this.listNode).parent().addClass("tabable-listTab-container");
			this.find(this.contentNode).parent().addClass("tabable-tabs-content");
			this.find(this.listNode).each(function(i, element) {
				$(element).addClass("tabable-listTab")
			});
			this.find(this.contentNode).each(function(i, element) {
				$(element).addClass("tabable-contentTab")
			});

			this.currentActive = 0; //счетчики индексов плашек
			this.prevActibe;
			//навешиваю событие , обработчик клика по плашкам
			this.on('click.tabable', $.proxy(function(event, index) {
				var target = $(event.target);
				if (target.hasClass("tabable-listTab")) {
					var index = target.index();
					this.find(this.listNode).eq(index).removeClass("tabable-listTab-hidden").addClass("tabable-listTab-show").siblings().removeClass("tabable-listTab-show").addClass("tabable-listTab-hidden")
					this.find(this.contentNode).eq(index).show().siblings().hide();
					this.prevActibe = this.currentActive;
					this.currentActive = index;

					this.trigger('tabable-tab-shown', { // стреляю событие показа плашки
						node: this,
						index: index,
						currentActive: this.currentActive
					});
					this.trigger('tabable-tab-hidden', { // стреляю событие скрытия плашки
						node: this,
						index: index,
						prevActibe: this.prevActibe
					});

				};

			}, this));

			this.find(this.listNode).eq(0).trigger('click', 0); // стреляем событие на выделение первой плашки
			//конструируем обьект возвращаемый плагином с двумя методами
			var objTabablePlagin = {}
			objTabablePlagin.show = $.proxy(function(index) {
				if (index < this.find(this.listNode).length && index >= 0) {
					this.find(this.listNode).eq(index).trigger('click', index); // решил реализовать через эмитацию клика по плашке
				};
			}, this);
			objTabablePlagin.destroy = $.proxy(function() { // в этом методе подчищаем за собой
				this.removeData("listObj");
				this.off(".tabable");
				this.removeClass("tabableWidget");
				this.find(this.listNode).parent().removeClass("tabable-listTab-container");
				this.find(this.contentNode).parent().removeClass("tabable-tabs-content");
				this.find(this.listNode).each(function(i, element) {
					$(element).removeClass("tabable-listTab tabable-listTab-hidden tabable-listTab-show");
				});
				this.find(this.contentNode).each(function(i, element) {
					$(element).removeClass("tabable-contentTab").show();
				});
			}, this);

			this.trigger('tabable-init', objTabablePlagin);
			this.data("listObj", objTabablePlagin); //записываю обьект в дата атрибут
			return this.data("listObj"); // вернул обьект
		} else {
			return this.data("listObj");
		}
	}

})(jQuery);