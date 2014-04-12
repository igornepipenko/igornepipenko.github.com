function createList(listData, listContainer, itemContainer) {
	if (listContainer === undefined) { // парметры по умолчанию 
		listContainer = "ul";
	};
	if (itemContainer === undefined) { // парметры по умолчанию 
		itemContainer = "li";
	};
	var oldlist = listData; // предыдущий лист
	var ul = document.createElement(listContainer); //создаю элемент ul

	;
	for (var i = 0; i < oldlist.length; i++) { // иду по аргументу списку

		if (typeof(oldlist[i]) != "string") { // если натыкаюсь на массив заново выстраиваю элементы функцией в теге li
			var newlist = listData[i];
			var li = document.createElement(itemContainer);
			var list = createList(newlist, listContainer, itemContainer);
			li.appendChild(list);
			ul.appendChild(li);

		} else { // если не массив продолжаю в стандартном порядке
			var li = document.createElement(itemContainer);
			var text = document.createTextNode(listData[i]);
			li.appendChild(text);
			ul.appendChild(li);

		}

	}

	return ul; // возвращаю менюшку
}