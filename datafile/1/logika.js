var b1 = true;
true && b1; // -> true

var b2 = false;
!'Hey there' || b2; // -> false

var b3 = false; //здесь можно и b3 = 0, так как !b3 вернет true
0 || !b3 && true; // -> true

var b4 = false; // здесь всегда будет возвращать false,так что можно присвоить что угодно
// при любых значениях (без разницы !10  возвращает false  )
!10 && !(b4 || false); // -> false

var b5 = true;
!(null && undefined) && (![] || b5); // -> true

var b6 = false; //здесь можно и b6 = 0, так как !b6 вернет true
( !! !! (false) || !b6) && !! ({} && []); // -> true