// реализация на  разности классов Date()

function timer(node) { // функция таймер, аргумент контейнер таймераstopSec.oldmili = 0;
	stopSec.olds = 0;
	stopSec.oldm = 0;
	stopSec.oldh = 0;
	startSec.stop = false;

	//все анологично как в секундомере на счетчике простом, только для каждого разряда своя функция счета
	//которая сводится в одной функции потом
	

	function sec() {


		var nowTime = new Date();
		var times = nowTime.getSeconds() + stopSec.olds - startSec.start.getSeconds();

		if (stopSec.olds > 0 && times >= 60) {
			times = nowTime.getSeconds() + stopSec.olds - startSec.start.getSeconds() - 60;

		}
		if ((times > 0) && (times < 10)) {
			times = "0" + times;

		} else if (times <= 0) {

			times = 60 + times;
			if (times === 60) {
				times = "00";
				min.s = parseInt(min.s) + 1;
				if (min.s >= 0 && min.s <= 10) {
					min.s = "0" + min.s;
				};
			};

		};

		sec.s = times;
	};


	function min() {
		var nowTime = new Date();
		var timeM = nowTime.getMinutes() + stopSec.oldm - startSec.start.getMinutes();

		if (timeM > 0) {
			if (timeM < 10) {
				timeM = "0" + timeM;
			}
		} else {

			timeM = 60 + timeM;
			if (timeM === 60) {
				timeM = "00";
				hour.s = parseInt(hour.s) + 1;
				if (hour.s >= 0 && hour.s <= 10) {
					hour.s = "0" + hour.s;
				}
			};

		};

		min.s = timeM;
	};



	function hour() {
		var nowTime = new Date();
		var timeH = nowTime.getHours() + stopSec.oldh - startSec.start.getHours();

		if (timeH >= 0) {
			if (timeH < 10) {
				timeH = "0" + timeH;
			}
		} else {

			timeH = 60 + timeH;
		};

		hour.s = timeH;
	};


	function secundomer() {
		var nowTime = new Date();
		var timemili = nowTime.getMilliseconds() - startSec.start.getMilliseconds();
		//var timeM = "00";

		if (stopSec.olds > 0 && timemili >= 999) {
			timemili = nowTime.getMilliseconds() + stopSec.oldmili - startSec.start.getMilliseconds() - 999;

		}
		if (timemili > 0) {

		} else if (timemili <= 0) {


			timemili = 999 + timemili;
			if (timemili > 999) {
				timemili = "000";
				sec.s = sec.s + 1
			};

		};
		if (min.s === undefined) {
			if (stopSec.oldm != 0) {
				min.s = 0 + stopSec.oldm;
			} else {
				min.s = "00";
			};
		};



		if (sec.s === undefined) {
			if (stopSec.olds != 0) {
				sec.s = 0 + stopSec.olds;
			} else {
				sec.s = "00";
			};
		};
		if (hour.s === undefined) {
			if (stopSec.oldh != 0) {
				hour.s = 0 + stopSec.oldh;
			} else {
				hour.s = "00";
			};
		};
		if (timemili === undefined) {
			if (stopSec.oldmili != 0) {
				timemili = 0 + stopSec.oldmili;
			} else {
				timemili = "00";
			};
		};


		node.querySelector(".stopwatch-current").innerHTML = hour.s + ":" + min.s + ":" + sec.s + ":" + timemili;
		secundomer.curenttime = hour.s + ":" + min.s + ":" + sec.s + ":" + timemili;

		secundomer.mili = timemili;
	}

	function startSec() {

		if (startSec.stop === false) {
			startSec.start = new Date();

			startSec.int1 = setInterval(sec, 1000);
			startSec.int2 = setInterval(min, 60000);
			startSec.int3 = setInterval(secundomer, 1);
			startSec.int4 = setInterval(hour, 3600000);
			startButton.innerHTML = "Stop";
			startSec.stop = true;
		} else if (startSec.stop === true) {

			clearInterval(startSec.int1);
			clearInterval(startSec.int2);
			clearInterval(startSec.int3);
			clearInterval(startSec.int4);
			stopSec.oldmili = parseInt(secundomer.mili);
			stopSec.olds = parseInt(sec.s);
			stopSec.oldm = parseInt(min.s);
			stopSec.oldh = parseInt(hour.s);

			startButton.innerHTML = "Start";
			startSec.stop = false;
		};
	};

	function resetSec() {


		clearInterval(startSec.int1);
		clearInterval(startSec.int2);
		clearInterval(startSec.int3);
		startButton.innerHTML = "Start";
		node.querySelector(".stopwatch-current").innerHTML = "00:00:00:000";
		stopSec.oldmili = 0;
		stopSec.olds = 0;
		stopSec.oldm = 0;
		stopSec.oldh = 0;
		secundomer.timemili = 0;
		sec.s = "00";
		min.s = "00";
		hour.s = "00";

	};

	function lapSec() {
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

	function delLapSec(element) {

		var e = element.target;

		if (hasClass(e, "label-danger")) {

			var first = e.previousSibling;
			var second = first.parentNode;
			var parent = second.parentNode;
			parent.removeChild(second);
		}
	};

	function stopSec() {
		clearInterval(startSec.int1);
		clearInterval(startSec.int2);
		clearInterval(startSec.int3);
		stopSec.oldmili = secundomer.timemili;
		stopSec.olds = sec.s;
		stopSec.oldm = min.s;
		stopSec.oldh = hour.s;
		startSec.int1 = setInterval("sec()", 1000);
		startSec.int2 = setInterval("min()", 60000);
		startSec.int3 = setInterval("secundomer()", 1);

		startButton.innerHTML = "Start";
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



	var startButton = node.querySelector(".btn-primary");
	var resButton = node.querySelector(".btn-sm");
	var lapButton = node.querySelector(".btn-info");
	var xlapButton = node.querySelector(".label-danger");
	var divLap = node.querySelector(".stopwatch-laps");

	startButton.addEventListener("click", startSec, false);
	resButton.addEventListener("click", resetSec, false);
	lapButton.addEventListener("click", lapSec, false);
	//xlapButton.addEventListener("click", delLapSec, false);
	divLap.addEventListener("click", delLapSec, false)


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



/*Использовал в решении функции из раздела DOM-intro*/
/* моя функции addClass из раздела DOM-intro*/
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

/* моя функции removeClass из раздела DOM-intro*/
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