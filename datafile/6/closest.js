function closest(node, testFunc) {
	if (node === null) { // если нет такого элемента вернем нуль
		return null;
	};
	if (testFunc(node) === true) { //если функция всегда вернет true верну текущий элемент
		return node;
	} else {
		var parent = node.parentNode; // посмотрел на родителя
		if (testFunc(parent) === true) { // если функция с аргументом родителем вернет true
			return parent //верну родителя

		} else { // иначе запускаю снова функцию ну уже с родителем

			return closest(parent, testFunc);

		}
	}
}