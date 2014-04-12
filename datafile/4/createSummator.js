function createSummator(initialValue) {
	if (initialValue === undefined) { //определение значения по умолчанию
		initialValue = 0;
	}
	var summObj = { // создаем обьект с методами
		inc: function(a) { //метод инкримента
			if (a === undefined) { //определение значения по умолчанию
				a = 1;
			}
			initialValue = initialValue + a;

		},
		dec: function(b) { // метод декремента
			if (b === undefined) { //определение значения по умолчанию
				b = 1;
			}
			initialValue = initialValue - b;
		},
		get: function() { // метод возвращения результата
			return initialValue;
		}
	}
	return summObj; //возвращаем обьект 
}