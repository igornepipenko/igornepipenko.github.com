function createMediator() {
	var keeperMass = []; //обьявил массив хранилище
	var objEvent = { // обьект с методами
		subscribe: function(eventName, handler) {
			if (keeperMass.indexOf(eventName) === (-1)) { // если нет такого события вставляю
				keeperMass.push(eventName);
				keeperMass.push([handler]);
			} else {
				keeperMass[keeperMass.indexOf(eventName) + 1].push(handler); //если есть такое событие добавляю для него обработчик
			}
		},
		publish: function(eventName, data) { // вызываем обработчики события
			if (keeperMass.indexOf(eventName) != (-1)) { // условие нахождения такого события в хранилище
				for (var i = 0; i < keeperMass[keeperMass.indexOf(eventName) + 1].length; i++) { // иду по подмасиву обработчика
					(keeperMass[keeperMass.indexOf(eventName) + 1][i])(data); // запускаю обработчики с аргументом дата
				}
			}
		},
		unsubscribe: function(eventName) {
			if (keeperMass.indexOf(eventName) != (-1)) {
				keeperMass[keeperMass.indexOf(eventName) + 1] = []; // решил оставить события ну убил для него обработчики, тут ты сказал на усмотрение
			}
		}

	}
	return objEvent // возвращаю обьект
};