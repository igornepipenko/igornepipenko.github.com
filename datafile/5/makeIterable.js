function makeIterable(func) {
	var massFunc = func;

	var rezMass = []; // обьявляю массив результатов

	return function(mass) {

		for (var i = 0; i < mass.length; i++) { // пробегаюсь по массиву аргументу функции
			rezMass[i] = massFunc(mass[i]); // к каждому применяю исходную функцию и записываю в массив

		}
		return rezMass; // вывожу результирующий массив
	}


}