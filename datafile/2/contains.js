function contains(where, what) {
	var a = where; //пересваиваю переменные 
	var b = what; // чисто для своего удобства, можно работать с исходными параметрами
	var razmera = a.length; //переменные размеров исходных массивов
	var razmerb = b.length; //
	if (razmerb <= razmera) { //условие массив в котором ищем подмножество должен быть больше или равен второму
		var rez = []; //создаем вспомогательный массив
		for (i = 0; i <= razmerb - 1; i++) { //формируем вспомогательный массив
			//пробегаюсь по массиву и присваиваю 1- если элементы совпадают и 0-если элемент не существует в исходном
			for (j = 0; j <= razmera - 1; j++) {
				if (b[i] === a[j]) {
					rez[i] = 1;
					break
				} else {
					rez[i] = 0;
				}
			}
		}
		var z = 1;
		for (i = 0; i <= rez.length - 1; i++) { //перемножаю элементы вспомогательного массива
			z = rez[i] * z
		}
		if (z === 0) {
			//если произведение =0 ("Массив не является подмножеством массива исходного");
			return false;
		} else {
			//если произведение =1("Массив является подмножеством массива исходного");
			return true;
		}
	} else {
		console.log("Размер первого массива меньше второго"); //тут добавил реализацию случая
		//если второй массив больше первого то он не может быть подмножеством  первого
	}
}
