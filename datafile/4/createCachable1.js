function createCachable(func) {
	var e = func;
	var obj = {};
	var massRez = [];
	var podMass = [];
	console.log(e);
	i = 0;
	//console.log(e.arguments);
	return function cachable() {
		//var rez=e(arguments[0]);
		//console.log(e.arguments);
		//console.log(e);
		//obj[e]=arguments[0];
		//mass.push(obj);
		//console.log(obj);
		if ((massRez.indexOf(e) === (-1)) && (podMass.indexOf(arguments[0]) === (-1))) {
			massRez.push(e);
			massRez.push(arguments[0]);
			massRez.push(e(arguments[0]));
			//massRez.push(podMass);
			return massRez[2];
		}
		console.log(massRez);

		return massRez[2];
		//return (rez);
	}

};