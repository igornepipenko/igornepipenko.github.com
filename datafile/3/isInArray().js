function isInArray() {
	var flag = true;
	var mass = arguments[arguments.length - 1]; //выделяю последний элемент-массив
	for (i = 0; i <= arguments.length - 2; i++) { //пробегаюсь по всем элементам кроме последнего

		if (mass.indexOf(arguments[i]) === (-1)) { //условие переключения флажка
			flag = false;
		}

	}
	return flag; //вернул флажек
}