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