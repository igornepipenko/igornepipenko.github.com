var table = document.getElementById("grid");//получаю элемент страницы таблицу
table.addEventListener("click", function(event) {// навешиваю на нее событие
	var element = event.target;
	var th = table.getElementsByTagName("th");// выбираю заголовки, хочу знать сколько их что бы дальше сделать завязку не зависящую от 
// от количества столбцов
	if (element.getAttribute('data-type') === "number") {// если числа в колонке
		for (var i = 0; i <= th.length; i++) {// посмотрел на какой заголовок  нажал
			if (th[i] === element) {
				
				var j = i;// сохранил номер
			}
		}
		var trNumber = [];// массив для пересохранения массивоподобной колекции элементов далее

		var tr = table.querySelector("tbody").getElementsByTagName("tr");
		for (i = 0; i < tr.length; i++) {// переделываю массивоподобную коллекцию в массив

			trNumber.push(tr[i]);

		}

		function sortFunctionNumber(a, b) {// функция сортировки чисел
			a = parseInt(a.childNodes[j + 1].innerHTML);// парсю строки что бы были числовые значения из ячейки
			b = parseInt(b.childNodes[j + 1].innerHTML);
			if (a < b) {
				return -1 // Или любое число, меньшее нуля
			}
			if (a > b) {
				return 1 // Или любое число, большее нуля
				// в случае а = b вернуть 0
			}
			return 0;
		}


		trNumber.sort(sortFunctionNumber);// сортирую массив
		table.querySelector("tbody").innerHTML = "";//стераю таблицу
		for (i = 0; i < trNumber.length; i++) {// записываю отсортированую
			table.querySelector("tbody").appendChild(trNumber[i])

		}

	}
	if (element.getAttribute('data-type') === "string") {// если колоночка строковая
		for (var i = 0; i <= th.length; i++) {// тоже самое , только функция сортировочки своя для строк, без парсинга
			if (th[i] === element) {
				
				var j = i;
			}
		}
		var trNumber = [];

		var tr = table.querySelector("tbody").getElementsByTagName("tr");


		for (i = 0; i < tr.length; i++) {

			trNumber.push(tr[i]);

		}

		function sortFunctionString(a, b) {
			a = a.childNodes[3].innerHTML;
			b = b.childNodes[3].innerHTML;
			if (a < b) {
				return -1 // Или любое число, меньшее нуля
			}
			if (a > b) {
				return 1 // Или любое число, большее нуля
				// в случае а = b вернуть 0
			}
			return 0;
		}


		trNumber.sort(sortFunctionString);

		table.querySelector("tbody").innerHTML = "";
		for (i = 0; i < trNumber.length; i++) {
			table.querySelector("tbody").appendChild(trNumber[i])

		}



	}

}, false)


