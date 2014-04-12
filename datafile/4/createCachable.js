function createCachable(func) {
	var cachFunc = func; // обьявляю кешируемую функцию 
	var massRez = []; // обьявляю массив "базу кэшуруемых данных"

	return function cachable() {

		if ((massRez.indexOf(cachFunc) === (-1)) && (massRez.indexOf(arguments[0]) === (-1))) { // если нет таких данных в кеше-заношу
			massRez.push(cachFunc);
			massRez.push(arguments[0]);
			massRez.push(cachFunc(arguments[0]));

			return massRez[2]; // и возвращаю
		}


		return massRez[2]; // если есть сразу возвращаю

	}

};