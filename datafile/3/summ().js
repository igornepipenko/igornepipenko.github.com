function summ() {
	var sum = 0; // начальная сумма
	for (i = 0; i <= arguments.length - 1; i++) { //пробегаемся по массиву
		sum = sum + parseFloat(arguments[i]); //считаем сумму
	}
	return sum; //возвращаем сумму
}