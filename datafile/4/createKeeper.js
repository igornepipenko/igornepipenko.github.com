function createKeeper() {
	var saveObj = [] //создаю массив "базу данных"
	var obj = { //обьект с методами
		put: function(key, value) {
			if (saveObj.indexOf(key) === (-1)) { //проверка на существование ключа уже в записаных "базе данных"
				saveObj.push(this.put.arguments[0]);
				saveObj.push(this.put.arguments[1]);
			} else {
				saveObj[saveObj.indexOf(key) + 1] = this.put.arguments[1]; //запись в массив "базу данных"

			}
		},
		get: function(key) {
			if (saveObj.indexOf(key) != (-1)) { // если есть такой ключ в базе  возвращаем значение
				return saveObj[saveObj.indexOf(key) + 1]
			} else { // если нету вернул нуль
				return null;
			}
		}

	};
	return obj; // возвращаю функции обьект
};