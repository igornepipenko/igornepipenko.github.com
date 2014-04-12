'use strict'
/*глобальные переменные получение номера комикса и флажек закончен ли ответ*/
var inResponse = false;
var count = parseInt(window.location.pathname.split("/")[2]);

/*моя функция запроса*/
function ajax(typeReq, typeRes, url, functionCallBack) {
	ajax.func = functionCallBack
	var xml = new XMLHttpRequest();
	xml.open(typeReq, url, true);
	xml.onreadystatechange = function() {
		if (xml.readyState == 4) {
			var date = xml.response;
			ajax.func(date);
			inResponse = false;

		};
	};
	xml.responseType = typeRes;
	xml.send();
	inResponse = true
};

/*функция колбека, при успешном ответе*/
function functionCallBack(date) {
	var conteiner = document.querySelector("#maincontent").getElementsByTagName("div")[2];
	if (date.querySelector("#maincontent").getElementsByTagName("div").length > 1) {
		conteiner.appendChild(date.querySelector("#maincontent").getElementsByTagName("div")[2]);

	};



};
/*навешиваю обработчики на событие скролирования*/
window.onscroll = function() {
	var conteiner = document.querySelector("#maincontent").getElementsByTagName("div")[2];
	if (window.scrollY > 0.6 * conteiner.offsetHeight && inResponse === false) {
		count = count - 1;
		ajax("get", "document", "/comics/" + count + "/", functionCallBack);
	};
};