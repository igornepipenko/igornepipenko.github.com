  var conteiner = document.querySelector("#messages-container"); // нашел контейнер

  conteiner.addEventListener("click", function(event) { //событие для щелчка по контойнеру добавил
    var element = event.target;
    if (hasClass(element, "remove-button") === true) { // выделил событие только щелчек по крестику
      conteiner.removeChild(element.parentNode); //удалил папу(родительский элемент)
    }
  }, false);

  /* моя функции hasClass с прошлого урока*/
  function hasClass(node, classToCheck) {

    if (node.length === undefined) { // опят реализация для селектора не getElementsByTagName

      if (node.getAttribute("class") === null) { //если нет вообще класса вернул false

        return false;
      } else {
        var clas = node.getAttribute("class").split(" "); //если есть класс бью его по пробелам смотрю вхождение интересуещего
        if (clas.indexOf(classToCheck) === (-1)) { // если нет вернул false
          return false
        };
      };
    } else {
      for (var i = 0; i < node.length; i++) { // тоже самое и для селектора getElementsByTagName

        if (classToCheck != node[i].getAttribute("class") && node[i].getAttribute("id") === null) {

          if (node[i].getAttribute("class") === null) { //если нет вообще класса вернул false

            return false
          } else {
            var clas = node[i].getAttribute("class").split(" "); //если есть класс бью его по пробелам смотрю вхождение интересуещего
            if (clas.indexOf(classToCheck) === (-1)) { // если нет вернул false

              return false

            };
          };

        };
      };
    };
    return true; // если никакие проверки не вернули false значит такой класс есть и вернул true
  };