function every(arr, func) {
	var rezflag = true; //обьявляю "флажек" истинности
	for (var i = 0; i <= arr.length - 1; i++) { //пробегаюсь по исходному массиву
		rezflag = rezflag && func(arr[i], i, arr); //булево сравнение флажка с функцией
	}
	return rezflag; //возвращаем "флажек"
}