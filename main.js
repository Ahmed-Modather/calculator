/*  
	The program starts by clicking on any of the calculator's buttons and sending 
	the value of the button as an argument to a method called "takeInput" which
 	exist in an object called "calculator" 
*/
const buttons = document.querySelectorAll('button');
buttons.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		calculator.takeInput(e.target.id);
	});
});

const calculator = {
	/*	Properties	*/
	equation: [null, null, null],// equation = [operand1, operator, operand2] 
	number: new Number(),//create number object using function constractor Number.

	/*	Methods	*/
	// Take input and evalute it.
	takeInput: function (input) {	
		//In case type of input is number store it as digit in number object. 
		if (!isNaN(+input) || input==='.') {
			this.number.addDigit(input);
			viewResult(this.number.returnNumber());
		}
		//In case user press "DELETE" button remove digit from object number.
		if (input === 'DELETE') {
			this.number.removeDigit();
			viewResult(this.number.returnNumber());
		}
		//In case user press "CLEAR" button call "clear" method.
		if (input === 'CLEAR') this.clear();

		//In case user press any of "+" or "-" or "×" or "÷" buttons.
		if (input === 'add' ||input === 'subtract' ||input === 'multiply' ||input === 'divide') {
			//If there are number stored/entered before(i.e calculator has operand1 and operator and need operand2)
			if (this.equation[0] !== null) { 
				this.equation[2] = this.number.returnNumber();//gather the digits entered and store it(operand2).
				/*
				In this case the user want to do a sequance of operations before press "="
				  first: evaluate the first pair of numbers 
				  second: display the result of that calculation and use that result as 
				  		  the first number in next calculation,
				*/
				let result = operate(this.equation[1], +this.equation[0], +this.equation[2]);
				viewInScreen(result)//view in top of screen.
				viewResult('CLEAR');//clear the bottom of screen.
				this.equation[0] = result;
				this.equation[1] = input;
				this.number.digits.length = 0;//clear for the next input of digits.
			}
			//If there are no number stored before or if cleared the calculator (primary cases)
			if (this.equation[0] === null) { // --->(*)
				this.equation[0] = this.number.returnNumber();//gather the digits entered and store it.
				this.equation[1] = input;
				this.number.digits.length = 0;//clear for the next input of digits.
				viewInScreen(this.equation[0]);//view in top of screen.
				viewResult('CLEAR');//clear the bottom of screen.
			}
		}
		//In case user press "=" button call "calculateResult" method.
		if (input === 'equal') this.calculateResult();

	},
	// Method wipe out any existing data and make user stating fresh.
	clear: function () {
		viewInScreen('CLEAR');
		viewResult('CLEAR');
		this.number.digits.length = 0;
		this.equation[0] = this.equation[1] = this.equation[2] = null;
	},
	// Method calculate the result and show it in screen(the bottom side with large font-size)
	calculateResult: function () {
		this.equation[2] = this.number.returnNumber();
		let result = operate(this.equation[1], +this.equation[0], +this.equation[2]);
		this.clear();
		
		if(isNaN(+result)){
			/*This section for show to user an ERROR message when try divide by zero.
			Here the message will display from the top side of screen because it has 
			small font-size!*/
			viewInScreen(result); 
			this.number.digits.length = 0;
		} else {
		viewResult(result);
		result += ''; 
		this.number.digits = [...result.split('')]; /* Note this line enable the user to
		continue in calculating with the result value after press "=".
		here instead of put: equation[0] = result, the result will stores as digits
		in digits[] array of number and be ready to gathered togather in --->(*) */
		}
	},
};

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
	if (number2 === 0) {//To not allow dividing by zero.
		calculator.clear();
		return 'ERROR: division by zero is invalid operation!';
	}
	return parseFloat((number1/number2).toFixed(8));//To round the result to 8 digits.
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
	if (value === 'CLEAR') {
		topScreen.textContent = '';
	} else {
		topScreen.textContent = value;
	}
}

// Function Shows Its argument in the bottom side of calculator's screen "when press "=".
function viewResult(value) {
	const result = document.querySelector('.result');
	if (value === 'CLEAR') {
		result.textContent = '';
	} else {
		result.textContent = value;
	}
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
