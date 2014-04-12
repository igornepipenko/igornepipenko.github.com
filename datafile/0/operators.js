var taxUa = 0.17;
var taxUs = 0.2;
var priceUa = 100;
var priceUs = 10;/*добавляем ; везде вконце строки*/
priceUa=priceUa*(1+taxUa);//расчет цены в доларах с учетом НДС
priceUs=priceUs*(1+taxUs);//расчет цены в гривнах с учетом НДС
var description="You're about to spend "+priceUs+" dollars"+"\n"+"Вы сейчас потратите "+priceUa+" гривен";//формирую строку
description; //выводим строку


