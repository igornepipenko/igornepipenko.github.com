function createObject(keys, values) {
	var a = keys; //делаю переобозначения
	var b = values; //для краткости(можно и неделать работать с исходными параметрами)
	var razmera = a.length; //длина массива ключей
	var razmerb = b.length; //длина массива значений
	var obj = {}; //обьявляем обьект
	for (i = 0; i <= razmera - 1; i++) {
		obj[a[i]] = b[i]; //формируем обьект

	}
	return obj; //возвращаем обьект
}