function extend() {
	var rezObj = {}; //обьявляю обьект
	for (i = 0; i <= arguments.length - 1; i++) { //пробегаюсь по всем аргументам
		for (var key in arguments[i]) { //разбираю каждый обьект
			rezObj[key] = arguments[i][key]; //формирую результирующий обьект
		}
	}
	return rezObj; //возвращаю результирующий обьект
}