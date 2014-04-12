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