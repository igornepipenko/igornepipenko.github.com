//это первое из двух вариантов решение на простом счетчике, мне кажется оно более простое чем на разнице дат

(function($){
	'use strict'
function timer(node) { // функция таймер, аргумент контейнер таймера

	secundomer.hour = 0; //это стартовые значения для таймеров
	secundomer.min = 0;
	secundomer.sec = 0
	secundomer.mili = 0;
	startSec.stop = false; // переменная -флажек для отслеживания клика по старт/стоп



	function secundomer() { // сама функция секундомера, на счетчике, еще делад на разнице дат, ну там сложнее. Тот скрипт тоже приложу

		secundomer.mili = secundomer.mili + 11; // хитрю считаю через 11 милисек


		if (secundomer.mili > 999) { // это блок для подсчета секунд, минут ,часов 
			secundomer.mili = 0;
			secundomer.sec = secundomer.sec + 1;

			if (secundomer.sec > 59) {
				secundomer.sec = 0;
				secundomer.min = secundomer.min + 1;
				if (secundomer.min > 60) {
					secundomer.min = 0;
					secundomer.hour = secundomer.hour + 1;
				};
			};
		};
		var milis = secundomer.mili; //переобозначаю что бы длеать проверки и не перетирать значения счетчика
		var s = secundomer.sec;
		var m = secundomer.min;
		var h = secundomer.hour;


		if (secundomer.sec >= 0 && secundomer.sec < 10) { // блок для корректной записи 01, 05 сек, мин, часов
			s = "0" + s;
		};
		if (secundomer.min >= 0 && secundomer.min < 10) {
			m = "0" + m;
		};
		if (secundomer.hour >= 0 && secundomer.hour < 10) {
			h = "0" + h;
		};

		node.querySelector(".stopwatch-current").innerHTML = h + ":" + m + ":" + s + ":" + milis; // вывожу секундомер
		secundomer.curenttime = h + ":" + m + ":" + s + ":" + milis; // запоминаю для сохранения  при нажатии кнопки круг

	};

	function startSec() { // функция старт/стоп

		if (startSec.stop === false) { //кнопка старт
			startSec.start = new Date();


			startSec.interval = setInterval(secundomer, 10); // вот тут Дима, долго мучался читал так работает, а так setInterval("secundomer", 10) ,setInterval("secundomer()", 10) нет ,обьясни пож вначале лекции
			startButton.innerHTML = "Stop";
			startSec.stop = true;
		} else if (startSec.stop === true) { //кнопка стоп


			clearInterval(startSec.interval);


			startButton.innerHTML = "Start";
			startSec.stop = false;
		};
	};

	function resetSec() { // обработчик сброса

		clearInterval(startSec.interval);
		startButton.innerHTML = "Start";

		node.querySelector(".stopwatch-current").innerHTML = "00:00:00:000";


		secundomer.hour = 0;
		secundomer.min = 0;
		secundomer.sec = 0
		secundomer.mili = 0;
		startSec.stop = false;



	};

	function lapSec() { //обработчик сохранения круга  и вывода его

		if (secundomer.curenttime === undefined) {
			secundomer.curenttime = "00:00:00:000"
		}

		var divLap = document.createElement("div");

		addClass(divLap, "alert");
		addClass(divLap, "alert-info");

		var span = document.createElement("span");

		addClass(span, "label");
		addClass(span, "label-danger");

		var textLap = document.createTextNode(secundomer.curenttime);
		var closeLap = document.createTextNode("×");

		span.appendChild(closeLap);
		divLap.appendChild(textLap);
		divLap.appendChild(span);

		var div = node.querySelector(".stopwatch-laps");
		div.appendChild(divLap);
		lapSec.xlapButton = node.querySelector(".label-danger");
		lapSec.xlapButton.addEventListener("click", delLapSec, false);
	};

	function delLapSec(element) { // обработчик удаления записи круга

		var e = element.target;

		if (hasClass(e, "label-danger")) {

			var first = e.previousSibling;
			var second = first.parentNode;
			var parent = second.parentNode;
			parent.removeChild(second);
		}
	};



	document.documentElement.addEventListener('keyup', function(element) { // обработка нажатия на кнопки, функции отслеж мыши курсора находится на глобальном уровне
		var key = element.keyCode;
		//проверки где находилась мышь
		if (key === 83) {
			if (node === mous.node) {
				startSec();
			};

		} else if (key === 82) {
			if (node === mous.node) {
				resetSec();
			};
		} else if (key === 76) {
			if (node === mous.node) {
				lapSec();
			};
		};

	}, false);



	//определяю кнопки 
	var startButton = node.querySelector(".btn-primary");
	var resButton = node.querySelector(".btn-sm");
	var lapButton = node.querySelector(".btn-info");

	var divLap = node.querySelector(".stopwatch-laps");
	// навешиваю им события
	startButton.addEventListener("click", startSec, false);
	resButton.addEventListener("click", resetSec, false);
	lapButton.addEventListener("click", lapSec, false);

	divLap.addEventListener("click", delLapSec, false);


};
//функция отслеживания нахождения курсора надо блоком
function mous(event) {

	var element = event.target
	if (hasClass(element.parentNode, "container") === true) {
		mous.node = element.parentNode;
	} else if (hasClass(element.parentNode.parentNode, "container") === true) {
		mous.node = element.parentNode.parentNode;
	}

}
//навесил событие
document.addEventListener('mouseover', mous, false);

/*Использовал в решении функции с прошлого д/з*/
/* моя функции addClass с прошлого урока*/
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

/* моя функции removeClass с прошлого урока*/
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
/* моя функции hasClass с прошлого урока*/
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

window.timer=timer;
})(jQuery);