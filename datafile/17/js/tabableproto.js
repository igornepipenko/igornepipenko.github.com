/*решение на прототипах*/
(function() {
	'use strict'
	var defaults = {// настройки по умолчанию
		"listNode": ">ul>*",
		"contentNode": ">div:first>*"
	}
	$.fn.tabable = function(option) {
		var opt = $.extend(defaults, option);// формирую настройки в зависимости от настроек пользователя
		var node = this;
/*делаю конструктор*/
		function ObjTabablePlagin(node, listNode, contentNode) {

			node.listNode = listNode;
			node.contentNode = contentNode;

			this.init();


		}
		/*метод инициализации, логика как и в процедурном подходе*/
		ObjTabablePlagin.prototype.init = function() {
			node.addClass("tabableWidget");
			node.find(node.listNode).parent().addClass("tabable-listTab-container");
			node.find(node.contentNode).parent().addClass("tabable-tabs-content");
			node.find(node.listNode).each(function(i, element) {
				$(element).addClass("tabable-listTab")
			});
			node.find(node.contentNode).each(function(i, element) {
				$(element).addClass("tabable-contentTab")
			});

			node.currentActive = 0;
			node.prevActibe;
			node.on('click.tabable', $.proxy(this.clickOnTabs, node));
			node.find(node.listNode).eq(0).trigger('click', 0);

			var objTabablePlagin = {}
			objTabablePlagin.show = node.show;
			objTabablePlagin.destroy = node.destroy;

			node.trigger('tabable-init', objTabablePlagin);
			node.data("listObj", objTabablePlagin);
			return node.data("listObj");
		}
		/*метод обработки клика по плашке, логика как и в процедруном решении*/
		ObjTabablePlagin.prototype.clickOnTabs = function(event, index) {
			var target = $(event.target);
			if (target.hasClass("tabable-listTab")) {
				var index = target.index();
				node.find(node.listNode).eq(index).removeClass("tabable-listTab-hidden").addClass("tabable-listTab-show").siblings().removeClass("tabable-listTab-show").addClass("tabable-listTab-hidden")
				node.find(node.contentNode).eq(index).show().siblings().hide();
				node.prevActibe = node.currentActive;
				node.currentActive = index;

				node.trigger('tabable-tab-shown', {
					node: node,
					index: index,
					currentActive: node.currentActive
				});
				node.trigger('tabable-tab-hidden', {
					node: node,
					index: index,
					prevActibe: node.prevActibe
				});

			};

		}
		/*метод показа програмно нужной плашки*/
		ObjTabablePlagin.prototype.show = function(index) {

			if (index < node.find(node.listNode).length && index >= 0) {
				node.find(node.listNode).eq(index).trigger('click', index);
			};
		}
		/*метод удаления плагина,логика аналогично процедурному решению*/
		ObjTabablePlagin.prototype.destroy = function() {
			node.removeData("listObj");
			node.off(".tabable");
			node.removeClass("tabableWidget");
			node.find(node.listNode).parent().removeClass("tabable-listTab-container");
			node.find(node.contentNode).parent().removeClass("tabable-tabs-content");
			node.find(node.listNode).each(function(i, element) {
				$(element).removeClass("tabable-listTab tabable-listTab-hidden tabable-listTab-show");
			});
			node.find(node.contentNode).each(function(i, element) {
				$(element).removeClass("tabable-contentTab").show();
			});

		}
		if (!this.data("listObj")) {
			var newTabable = new ObjTabablePlagin(this, opt.listNode, opt.contentNode);//вызываю конструктор
			this.data("listObj", newTabable);//щаписываю в дата атрибут
			return this.data("listObj");// возвращаю его
		} else {
			return node.data("listObj");
		}

	}


})(jQuery);