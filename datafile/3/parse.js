function parse(queryString) {
	var resObj = {}; //обьявляю результрующий обьект
	var str = queryString.split("&"); //разбиваю строку по символу &
	var obj = []; //обьявляю вспомогательный массив
	if (queryString === "") { //обрабатываю частный случай
		return resObj;
	} else {
		for (i = 0; i <= str.length - 1; i++) { //пробегаюсь по массиву который получился в результате разбиения
			obj[i] = str[i].split("="); // разбиваю каждый элемент по символу =
			if (obj[i][1] === "true") { // частный случай с булевыми значеними
				resObj[obj[i][0]] = true; //и формируем ключ свойство
			} else if (obj[i][1] === "false") {
				resObj[obj[i][0]] = false;
			} else if (Boolean(2 * parseInt(obj[i][1]) + 1)) { //обработка случая числового значения
				resObj[obj[i][0]] = parseFloat(obj[i][1]); //и формируем ключ свойство
			} else {
				resObj[obj[i][0]] = obj[i][1]; // формируем ключ свойство обьекта в прочих случаях
			}

		}
		return resObj; //возвращаем результирующий обьект
	}
}