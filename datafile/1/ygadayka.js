var mynumber = 7;
var txtvalue = prompt("Я игра угадайка :) \n Введи натуральное число от 1 до 10");
var floatvalue = parseFloat(txtvalue, 10);
var intvalue = parseInt(txtvalue, 10);
if (isNaN(txtvalue / 2)) {
	console.log("Ты понимаешь?! Число, а не текст!");

} else {

	if (txtvalue === null) {
		console.log("Ну как хочешь =( А я хотел поиграть. Пока!");
	} else if (txtvalue === "") {
		console.log("Зачем обманывать! Ты ничего не ввел!");
	} else if ((floatvalue % 2) === (1||(-1)) || (floatvalue % 2) === 0) {
		if (intvalue < 1 || intvalue > 10) {
			console.log("Ты читать умеешь?!=( натуральное число от 1 до 10!");
		} else if ((intvalue >= 1 || intvalue <= 10) && intvalue != mynumber) {
			console.log("Близко , но не то!=) Пробуй еще раз!");
		} else if (intvalue === mynumber) {
			console.log("Какой счастливчик! Угадал!=)");
		}
	} else {
		console.log("Ты вообще знаешь что такое натуральное число?! Зачем вводить рациональное?! ");
	}
}