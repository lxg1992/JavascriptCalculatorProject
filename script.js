function add (n1, n2) {
	return n1 + n2;
}

function subtract (n1, n2) {
	return n1 - n2;
}

function sum (arr) {
	return arr.reduce((total, curval) => total + curval, 0);
}

function multiply (arr) {
	return arr.reduce((total, curVal) => total * curVal, 1);
}

function power(base, power) {
	let result = 1;
	while(power--){
		result*= base
	}
	return result;
}

function factorial(num) {
	if (num < 0) 
		return -1;
	else if (num == 0) 
  		return 1;
	else {
  		return (num * factorial(num - 1));
	}
}

module.exports = {
	add,
	subtract,
	sum,
	multiply,
    power,
	factorial
}