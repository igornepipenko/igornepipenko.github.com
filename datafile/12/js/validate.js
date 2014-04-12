(function(){

var button = document.getElementById("submit"); // делаем кномку визуально неактивной
removeClass(button, "btn-primary")
addClass(button, "button-bad");
addClass(button, "disabled");
var validflag = false; // флажок валидации для чек бокса

var form = document.getElementById("formuser"); //выбираю форму


function valid() { //функция валидации когда заполнены правильно все основные поля и поставлен флажок в чекбоксе
	if (hasClass(next(pass), "alert-good") && hasClass(next(mail), "alert-good") && (validflag === true)) {

		form.setAttribute('onsubmit', "");

		removeClass(button, "button-bad")
		removeClass(button, "disabled")
		addClass(button, "btn-primary");


	} else { // если проврка  не прошла снова делаем визуально кнопку неактивной и возвращаем ей блокировку

		removeClass(button, "btn-primary")
		addClass(button, "button-bad");
		addClass(button, "disabled");
		form.setAttribute('onsubmit', "return false");

	}
}

var validMail = function validM(element) { //функция валидации почтового адресса
	var validmail = /([\w\-]{1,20}\.)*([\w\-]{1,20})\@([\w\-]{1,20}\.)*([\w\-]{1,20})\.([a-z]{2,5})$/;
	var notextnum = /[^\w\-\_\@\.]/;
	var textCaps = /[A-Z]/;

	var val = document.getElementById("email").value;
/*блок запроса валидации адресса*/
	var request = new XMLHttpRequest()
	var STATE_READY = 4
	request.open('get', '/check-email/?email=' + val, true);
	request.send();

	request.onreadystatechange = function() {//обработка ответа
		if (request.readyState === STATE_READY) {
			var used = JSON.parse(request.responseText);
			if (used.used === true) {
				removeClass(next(mail), "alert-good");
				addClass(next(mail), "alert-danger");
				var error = "Такой адресат уже существует";
			} else {//дальше идет старая валидация
				removeClass(next(mail), "alert-good");
				addClass(next(mail), "alert-danger");
				var error = "Сомнительный адресс";
				if (notextnum.test(val) === true) {
					removeClass(next(mail), "alert-good");
					addClass(next(mail), "alert-danger");
					var error = "адрес содержит запрещенные символы";
				} else if (textCaps.test(val) === true) {

					var error = "Убери Caps Lock";

				} else if (validmail.test(val) === true) {

					error = "";

				}

			}
			next(mail).innerHTML = error;

			if (error === "") {
				next(mail).innerHTML = "Все впорядке";
				removeClass(next(mail), "alert-danger")
				addClass(next(mail), "alert-good");

			};
			valid();
		}
	}

	

};


var validPass = function validP(elem) { //функция валидации пароля
	var textnum = /\w/;
	var notextnum = /[^\w\-]/
	var num = /\d/;
	var text = /[a-z]/
	var textCaps = /[A-Z]/
	var val = document.getElementById("password").value;
	var valLen = val.length;

	if ((notextnum.test(val) || textCaps.test(val)) === true) {
		removeClass(next(pass), "alert-good");
		addClass(next(pass), "alert-danger");
		var error = "Пароль содержит запрещенные символы";
	} else {

		if (valLen <= 5) {
			removeClass(next(pass), "alert-good");
			addClass(next(pass), "alert-danger");
			var error = "Слишком короткий пароль";
		} else {

			if ((text.test(val) && !num.test(val)) || (!text.test(val) && num.test(val))) {
				removeClass(next(pass), "alert-good");
				addClass(next(pass), "alert-danger");
				var error = "Слишком простой пароль";
			} else {
				var error = "";
			};
		};

	};

	next(pass).innerHTML = error;
	if (error === "") {
		next(pass).innerHTML = "Все впорядке";
		removeClass(next(pass), "alert-danger")
		addClass(next(pass), "alert-good");
	};
	valid();
};



var mail = document.getElementById("email"); // получаю ссылку на поле мыла

mail.addEventListener('focus', function validemail(elem) { // навешиваю валидацию на фокус поля мыла

	document.documentElement.addEventListener('keyup', validMail, false); // валидацию провожу при вводе каждого символа

}, false);
mail.addEventListener('paste', function validemail(elem) { //навешиваю так же валидацию на вставку в поле , если пользователь копирует что то в него
	document.documentElement.addEventListener('keyup', validMail, false); // и снова валидация при вводе. вдруг будет менять что то

}, false);


var pass = document.getElementById("password"); // точно так же как и для мыла поступаю и для пароля

pass.addEventListener('focus', function validepass(elem) {
	document.documentElement.addEventListener('keyup', validPass, false);
}, false);



pass.addEventListener('paste', function validepass(elem) {
	document.documentElement.addEventListener('keyup', validPass, false);
}, false);


var box = document.getElementById("checkbox"); // для флажка получаю ссылку на него
var checkbox = function check() { //функция контроля нажат или нет
	if (validflag === false) { //если флаг нажат , даю ему тру
		validflag = true;
	} else { // если нажат еще раз , тоесть снят , даю ему фалсе
		validflag = false;
	}
	valid();
};
box.addEventListener('change', checkbox, false); // добавляю событийную реализацию

box.addEventListener('blur', function() { // далее делаю проверку валидности при потере фокуса всеми элементами

	valid();
}, false);
pass.addEventListener('blur', function() {;
	valid();

}, false);
mail.addEventListener('blur', function() {
	valid();

}, false);

var city = document.getElementById("city"); // получаю необязательный элемент( ссылку на него) поле город

city.addEventListener('focus', function() { // для него проверки валидности при фокусе и потере фокуса и вставки скопированого
	valid();

}, false);
city.addEventListener('blur', function() {
	valid();

}, false);

city.addEventListener('paste', function() {
	valid();

}, false);

/*Использовал в решении функции  из раздела DOM-intro/
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
/* моя функции hasClass из раздела DOM-intro*/
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
//функция из раздела DOM-intro
/*моя функция поиска след элемента не текстового*/
function next(node) {
	var nexTag = node.nextSibling; // определяю следуйщий тег(узел)
	if (nexTag === null) { //если его нет вернул null
		return null;
	};
	while (nexTag.nodeType != 1) { // если есть но текстовый или другой ищу узел
		nexTag = nexTag.nextSibling;
		if (nexTag === null) { // если не нашел вернул null
			return null;
		};
	};
	return nexTag; // вернул следуйщий узел(тег)
}


})();