// Functions for basic math operators: add, subtract, multiply, divide.
const add = function (number1, number2) {
	return number1 + number2;
};

const subtract = function (number1, number2) {
	return number1 - number2;
};

const multiply = function (number1, number2) {
	return number1 * number2;
};

const divide = function (number1, number2) {
	return number1 / number2;
};

/* Function takes an operator and 2 numbers and then calls one of 
the above functions on the numbers*/
function operate(operator, number1, number2) {
	if (operator === 'add') {
		return add(number1, number2);
	}
	if (operator === 'subtract') {
		return subtract(number1, number2);
	}
	if (operator === 'multiply') {
		return multiply(number1, number2);
	}
	if (operator === 'divide') {
		return divide(number1, number2);
	}
}

// Function Shows Its argument in the top side of calculator's screen.
function viewInScreen(value) {
	const topScreen = document.querySelector('.top-screen');
	topScreen.textContent = value;
}

/* Constructor Function used to create number objects by add its digits one by one 
   and finally we can get the whole number.
   it allows to remove digit too.
   Note: In case there is no input it return zero*/
function Number() {
	this.digits = [];

	this.addDigit = function (digit) {
		this.digits.push(digit);
	};

	this.returnNumber = function () {
		return +this.digits.join('');
	};

	this.removeDigit = function () {
		this.digits.pop();
	};
}
