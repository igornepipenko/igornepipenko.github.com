function makeArmy() {

	var shooters = [];
	var shoot = [];
	var obj = {};
		for (var i = 0; i < 10; i++) {
		shoot.push(i);
	}

	for (var i = 0; i < 10; i++) {
		var shooter = function f() { // функция-стрелок
			var indexShooters = shooters.indexOf(f); // возвращаю номер функции в массиве :))))) улыбнула простота решения
			alert(indexShooters); // выводит свой номер
			
		};
		shooters.push(shooter);
	}

	return shooters;
}

var army = makeArmy();

army[0](); 
army[5]();  

army[4]();
army[9]();