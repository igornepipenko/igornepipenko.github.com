function toMatrix(data, rowSize) {

	var a = data; // пересваюиваю исходный массив,для удоства
	var b = []; // обьявляю новый пустой массив, в который буду формировать результат
	var alength = a.length; //длинна исходного массива
	var row = alength / rowSize; //число элементов в подмассиве
	if (alength === 0 || rowSize === 0) { //условие пустого массива или 0 строк
		//ничего не делаю  в конце просто возвратится пустой массив
	} else
	if (rowSize < alength) { //валидное условие 
		if (rowSize === 1) { //условие 1 строка
			for (i = 0; i <= alength - 1; i++) {
				b.push([a[i]]); //добавляю элементы в массив на каждом шаге
			}
		} else if (rowSize > 1) {
			k = 0; //дополнительный счетчик
			for (i = 0; i < row; i++) {
				b[i] = []; //делаю каждый элемент также массивом
				for (j = rowSize * i - k; j < rowSize * i + rowSize - k; j++) { //условие формирования элементов
					if (a[i + j] === undefined) { //выбрасываю посторонние значения
						break;
					}
					b[i].push(a[i + j]); //формирую элементы

				}
				k++;
			}
		}
	} else if (a != [] && rowSize >= alength) { //условие возрата массива в случае строк больше длинны массива
		b = [a];
	}
	return b; // возвращаю результирующий массив без смены исходного

}