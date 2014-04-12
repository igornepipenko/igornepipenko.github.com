(function(){
	
var TagList = function(node, list) {
	var mode = 1; //переменная (ключ) режима
	var self = this; //переменная сохранения контекста

	/*инициализация тела виджета*/

	var containerTagList = document.createElement("div");
	addClass(containerTagList, "containerTagList");
	var br = document.createElement("br");
	var linkcreate = document.createElement("a");
	linkcreate.style.cursor = "pointer";
	linkcreate.innerHTML = "Редактировать теги";
	containerTagList.appendChild(linkcreate);
	containerTagList.appendChild(br);
	var tagsDiv = document.createElement("div");
	containerTagList.appendChild(tagsDiv);
	addClass(tagsDiv, "tagsDiv");
	containerTagList.appendChild(br);
	var input = document.createElement("input");
	input.setAttribute("type", "text");
	addClass(input, "form-control");
	input.style.width = "380px";
	input.style.cssFloat = "right";
	var button = document.createElement("button");
	button.innerHTML = "Создать"
	addClass(button, "btn ");
	addClass(button, "btn-primary");
	var containerInput = document.createElement("table");
	var table = document.createElement("tbody");
	var tr = document.createElement("tr");
	var tdtext = document.createElement("td");
	tdtext.style.textAlign = "right";
	var tdbutton = document.createElement("td");
	tdbutton.style.textAlign = "left";
	tdtext.appendChild(input);
	tdbutton.appendChild(button);
	tr.appendChild(tdtext);
	tr.appendChild(tdbutton);
	table.appendChild(tr);
	containerInput.appendChild(table);
	addClass(containerInput, "containerInput");
	containerTagList.appendChild(containerInput);
	node.appendChild(containerTagList);
	addClass(containerInput, "hidden");


	/* обраотка второго необязательного аргумента-массива*/

	if (!list) { // если списка нет, просто пустое тело
		var divTag = document.createElement("div");
	} else { // если есть в тело записываю(генерирую) еще и теги
		for (var i = 0; i < list.length; i++) {
			var divTag = document.createElement("div");
			addClass(divTag, "mytag");
			divTag.innerHTML = list[i];
			var span = document.createElement("span");
			span.style.cursor = "pointer";
			addClass(span, "tagclose");
			addClass(span, "label");
			addClass(span, "label-danger");
			var close = document.createTextNode("×");
			span.appendChild(close);
			divTag.appendChild(span);
			tagsDiv.appendChild(divTag);
			addClass(span, "hidden");
		}
	}

	/*метод отображения виджета*/

	this.show = function() {
		removeClass(containerInput, "visible"); //скрываю блок ввода
		addClass(containerInput, "hidden");
		linkcreate.innerHTML = "Редактировать теги";
		var close = containerTagList.querySelectorAll(".tagclose");
		for (var i = 0; i < close.length; i++) { //скрываю дивы закрытия у всех тегов
			removeClass(close[i], "visible");
			addClass(close[i], "hidden");
		}

	};

	/*метод редактирования виджета*/

	this.edit = function() { // полностью противоположный метод методо показа
		removeClass(containerInput, "hidden"); //показываю блок воода тегов
		addClass(containerInput, "visible");
		linkcreate.innerHTML = "Завершить редактирование";
		var close = containerTagList.querySelectorAll(".tagclose");
		for (var i = 0; i < close.length; i++) { //показываю дивы закрытия на всех тегах
			removeClass(close[i], "hidden");
			addClass(close[i], "visible");
		}
	};

	/*функция события изменения режима виджета и ее навешивание на ссылку*/

	function changeMode() {
		if (mode === 1) {
			self.edit();
			mode = 2;
		} else if (mode === 2) {
			self.show();
			mode = 1;
		};

	};
	if (!linkcreate.addEventListener) {
		linkcreate.attachEvent('onclick', changeMode);
	} else {
		linkcreate.addEventListener("click", changeMode, false);
	};

	/*функция события обработки клика по кнопке создать виджета и ее навешивание на кнопку*/

	function buttonClick() {
		var tagmass = []
		var elemdivTag = tagsDiv.getElementsByTagName("div");
		for (var i = 0; i < elemdivTag.length; i++) {
			var elem = elemdivTag[i].firstChild.nodeValue;

			tagmass.push(elem);
		};
		var val = input.value;
		var tagHtml = /[<\>]/; //регулярка для отслеживания тегов html
		if (tagmass.indexOf(val) === (-1) && val !== "") { //условие что тега такого нет и не пустое поле ввода
			var divTag = document.createElement("div");
			addClass(divTag, "mytag");


			if (tagHtml.test(val) === true) { // обработка если введен тег html, так как innerHTML парсит их и закрывает автоматически
				var newText = document.createTextNode(val);
				divTag.appendChild(newText);

			} else {
				divTag.innerHTML = val;
			};

			var span = document.createElement("span");
			span.style.cursor = "pointer";
			addClass(span, "tagclose");
			addClass(span, "label");
			addClass(span, "label-danger");
			var close = document.createTextNode("×");
			span.appendChild(close);
			divTag.appendChild(span);
			tagsDiv.appendChild(divTag);

			input.value = ""; // очищаю поле ввода, долго думал. Чисто субьективно раздражает
			// когда остается старый текст названия тега в поле
		};
	};


	if (!button.addEventListener) {
		button.attachEvent('onclick', buttonClick);
	} else {
		button.addEventListener("click", buttonClick, false);
	};

	/*функция обратки удаления тега и навешивание ее на иконку закрытия*/

	function deltag(element) {
		var el = element.target;
		if (hasClass(el, "tagclose")) {
			var first = el.parentNode;
			var second = first.parentNode;
			second.removeChild(first);
		}
	};

	if (!containerTagList.addEventListener) {
		function deltag(event) { // обработчик удаления записи круга
			var el = event.srcElement;
			if (hasClass(el, "tagclose")) {
				var first = el.parentNode;
				var second = first.parentNode;
				second.removeChild(first);
			}
		};
		var hendler = deltag.bind(containerTagList);
		containerTagList.attachEvent('onclick', hendler);
	} else {
		containerTagList.addEventListener("click", deltag, false);
	};

	/*обработка клика по энтеру*/

	if (!document.documentElement.addEventListener) { // аналогично первому обработчику , обрабатываю нажатие на кнопке
		function enter(element) {
			var key = element.keyCode;
			var ev = element.srcElement;
			var tag = ev.parentNode.parentNode.parentNode.parentNode.parentNode;

			if (key === 13) {
				if (containerTagList === tag) {
					buttonClick();
				};
			}
		};
		var hendler = enter.bind(document.documentElement);
		document.documentElement.attachEvent('onkeyup', hendler);


	} else {
		document.documentElement.addEventListener('keyup', function(element) {
			var key = element.keyCode;
			var ev = element.target;
			var tag = ev.parentNode.parentNode.parentNode.parentNode.parentNode;

			if (key === 13) {
				if (containerTagList === tag) {
					buttonClick();
				};
			}

		}, false);
	}



	/*метод получения списка тегов в массиве*/

	this.getTagList = function() {
		var massTag = [];
		var elementdivTag = tagsDiv.getElementsByTagName("div");

		for (var i = 0; i < elementdivTag.length; i++) {
			var el = elementdivTag[i].firstChild.nodeValue;

			massTag.push(el);
		}
		console.log(massTag);
	}

};



/*Использовал в решении функции с решения заданий раздела DOM-intro*/
/* моя функции addClass с решения заданий раздела DOM-intro*/
function addClass(node, classToAdd) {

	if (node.length === undefined) { // если селектор не getElementsByTagName

		if (node.getAttribute("class") === null) { // если нет такого класса
			node.setAttribute("class", classToAdd); // добавил
		} else {
			var clas = node.getAttribute("class").split(" "); // бью строку по пробелам между классами
			if (clas.indexOf(classToAdd) === (-1)) { // если не входит в массив 
				node.setAttribute("class", node.getAttribute("class") + " " + classToAdd); // добавляю класс
			};
		};
	} else {
		for (var i = 0; i < node.length; i++) { // условие что селектор getElementsByTagName

			if (classToAdd != node[i].getAttribute("class") && node[i].getAttribute("id") === null) { // беру только без айдишников и без класса

				if (node[i].getAttribute("class") === null) { // и снова если нет класса
					node[i].setAttribute("class", classToAdd); // добавил класс
				} else {
					var clas = node[i].getAttribute("class").split(" "); // бью строку по пробелам
					if (clas.indexOf(classToAdd) === (-1)) { // если нет вхождения добавляю класс
						node[i].setAttribute("class", node[i].getAttribute("class") + " " + classToAdd);
					};
				};

			};
		};
	};
};

/* моя функции removeClass с решения заданий раздела DOM-intro*/
function removeClass(node, classToRemove) {
	if (node.getAttribute("class") === null) {
		//если нет вообще класса у элемента ничего не просиходит
	} else {
		var clas = node.getAttribute("class").split(" "); // разбиваю по пробелам атрибут классов в массив

		for (var i = 0; i < clas.length; i++) { //побежал по массивам
			if (clas.indexOf(classToRemove) === (-1)) { //еслинеттакогокласса, ничегонепроисходит
			} else {
				clas[clas.indexOf(classToRemove)] = " "; //если такой класс есть сделал этот элемент пустым
			};
		};
		clas = clas.join(" "); // вернул массив снова в строчку
		node.setAttribute("class", clas); // эту строчку сделал атрибутом класс
	};
};
/* моя функции hasClass с решения заданий раздела DOM-intro*/
function hasClass(node, classToCheck) {

	if (node.length === undefined) { // опят реализация для селектора не getElementsByTagName

		if (node.getAttribute("class") === null) { //если нет вообще класса вернул false

			return false;
		} else {
			var clas = node.getAttribute("class").split(" "); //если есть класс бью его по пробелам смотрю вхождение интересуещего
			if (clas.indexOf(classToCheck) === (-1)) { // если нет вернул false
				return false
			};
		};
	} else {
		for (var i = 0; i < node.length; i++) { // тоже самое и для селектора getElementsByTagName

			if (classToCheck != node[i].getAttribute("class") && node[i].getAttribute("id") === null) {

				if (node[i].getAttribute("class") === null) { //если нет вообще класса вернул false

					return false
				} else {
					var clas = node[i].getAttribute("class").split(" "); //если есть класс бью его по пробелам смотрю вхождение интересуещего
					if (clas.indexOf(classToCheck) === (-1)) { // если нет вернул false

						return false

					};
				};

			};
		};
	};
	return true; // если никакие проверки не вернули false значит такой класс есть и вернул true
};
/*полифил для indexOf*/
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(searchElement, fromIndex) {
		if (this === undefined || this === null) {
			throw new TypeError('"this" is null or not defined');
		}

		var length = this.length >>> 0; // Hack to convert object.length to a UInt32

		fromIndex = +fromIndex || 0;

		if (Math.abs(fromIndex) === Infinity) {
			fromIndex = 0;
		}

		if (fromIndex < 0) {
			fromIndex += length;
			if (fromIndex < 0) {
				fromIndex = 0;
			}
		}

		for (; fromIndex < length; fromIndex++) {
			if (this[fromIndex] === searchElement) {
				return fromIndex;
			}
		}

		return -1;
	};
}
/*полифил для bind*/
if (!Function.prototype.bind) {
	Function.prototype.bind = function(oThis) {
		if (typeof this !== "function") {
			// closest thing possible to the ECMAScript 5 internal IsCallable function
			throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
		}

		var aArgs = Array.prototype.slice.call(arguments, 1),
			fToBind = this,
			fNOP = function() {},
			fBound = function() {
				return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
					aArgs.concat(Array.prototype.slice.call(arguments)));
			};

		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();

		return fBound;
	};
}
window.TagList=TagList;
})();