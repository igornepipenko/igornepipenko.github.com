var Counter = function() {}; //тело каунтера, возможно было сделать и инкапсуляцию
Counter.prototype.inc = function(a) { //метод инкримента
	if (a === undefined) { //определение значения по умолчанию
		a = 1;
	}
	initialValue = initialValue + a;

};
Counter.prototype.dec = function(b) { // метод декремента
	if (b === undefined) { //определение значения по умолчанию
		b = 1;
	}
	initialValue = initialValue - b;
};
Counter.prototype.get = function() { // метод возвращения результата
	return initialValue;
};