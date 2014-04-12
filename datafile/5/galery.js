var Galery = function() {}; //тело галереи, тут может быть оформление , дефолтные настройки

Galery.prototype.fullScreen = function() {
	// метод отвечающий за нажатие в правом верхнем углу значек растяжение на весь экран

};
Galery.prototype.rightImg = function() {
	//отображение следующей картинки справа стрелка

};
Galery.prototype.leftImg = function() {
	//отображение предыдущей картинки слева стрелка

};
Galery.prototype.clickMini = function() {
	//метод обработки щелчка по миниатюре, нижняя полоска

};
Galery.prototype.clickBig = function() {
	//метод обработки щелчка по большому изображению

};
Galery.prototype.eventRunSmall = function() {

	// метод прокрутки(перетягивания) полосы миниатюр при зажатой мышке	
};
Galery.prototype.eventRunBig = function() {

	// метод прокрутки(перетягивания) центральньго изображения при зажатой мышке мышке	
};