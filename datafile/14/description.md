##Slider-widget

----------


Реализовать класс **Slider**. Слайдер состоит из фиксированного количества слайдов (4шт), изображения имеют одинаковый заранее известный размер. Переход между слайдами анимирован. При клике на плашку слева происходит переход к соответствующему слайдеру, соответствие определяется порядком. Верхняя плашка - первый слайд, вторая сверху - второй, итд.
Сразу же после инициализации у слайдера включается режим автопрокрутки: показ следующего слайда каждые 2 секунды. Если пользователь кликнул на одну из плашек, перейдя к слайду, автопрокрутку нужно отключить. Автопрокрутку нужно включать через 5 секунд после последнего клика пользователя по плашке. Автопрокрутка циклическая: с последнего слайда происходит переход к первому. На странице можно разместить несколько слайдеров.

- использовать возможности jQuery по максимум
- слайдер должен работать в ie8
- никаких готовых плагинов, только самописный код
- слайдер должен быть реализован на прототипах
