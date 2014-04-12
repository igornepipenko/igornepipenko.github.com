function next(node) {
	var nexTag = node.nextSibling; // определяю следуйщий тег(узел)
	if (nexTag === null) { //если его нет вернул null
		return null;
	};
	while (nexTag.nodeType != 1) { // если есть но текстовый или другой ищу узел
		nexTag = nexTag.nextSibling;
		if (nexTag === null) { // если не нашел вернул null
			return null;
		};
	};
	return nexTag; // вернул следуйщий узел(тег)
}