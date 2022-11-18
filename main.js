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

// Function Show Its argument in the top side of calculator's screen.
function showInScreen (value) {
	const topScreen = document.querySelector('.top-screen');
	topScreen.textContent = value;
}
