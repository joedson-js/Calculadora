class Calculadora {

	constructor() {
		this._lastOperator = '';
		this._lastNumber = '';
		this._operation = [];
		this._displayEl = document.querySelector('.resultado');
		this.initialize();
		this.initiButtons();
		this.initiKeyboard();
	}

	initialize() {

		this.setNumberToDisplay();
		
	}

	initiKeyboard() {

		document.addEventListener('keyup', e => {
		
			switch (e.key) {

				case 'Backspace':
					this.clearEntry();
					break;
				case 'Escape':
					this.cleatAll();
					break;
				case '+':
				case '-':
				case '*':
				case '/':
				case '%':
					this.addOperator(e.key);
					break;
				case '.':
				case ',':
					this.addDot();
					break;
				case '=':
				case 'Enter':
					this.calc();
					break;
				case '0':
				case '1':
				case '2':
				case '3':
				case '4':
				case '5':
				case '6':
				case '7':
				case '8':
				case '9':
					this.addOperator(parseInt(e.key));
					break;
				
			}
		});
	}

	cleatAll() {

		this._operation = [];
		this._lastNumber = '';
		this._lastOperator = '';
		this.setNumberToDisplay();

	}

	clearEntry() {

		this._operation.pop();
		this._lastNumber = '';
		this._lastOperator = '';
		this.setNumberToDisplay();

	}

	setError() {

		this.displayCalc = 'Error';

	}

	getLastOperation() {
		return this._operation[this._operation.length - 1]; // retorna o ultimo indice 
	}

	isOperator(value) {

		return (['+','-','*','/'].indexOf(value) > -1);

	}

	setLastOperator(value) {

		this._operation[this._operation.length - 1] = value;
	}

	pushOperator(value) {

		this._operation.push(value);

		if (this._operation.length > 3) {

			this.calc();

		}

	}

	getResult() {

		try {
			return eval(this._operation.join(""));
		} catch(e) {
			setTimeout(() => {
				this.setError();
			},1);
			
		}
			
	}

	calc() {

		let last = '';

		this._lastOperator = this.getLastItem();

		if (this._operation.length < 3) {

			let firstItem = this._operation[0];
			this._operation = [firstItem, this._lastOperator, this._lastNumber];
		}

		if (this.isOperator.length > 3) {

			last = this._operation.pop();
			this._lastNumber = this.getResult();

		} else if (this._operation.length == 3) {

			this._lastNumber = this.getLastItem(false);

		}

		let result = this.getResult();
		if (last == '%') {

			result /= 100;
			this._operation = [result];

		} else {

			this._operation = [result];

			console.log(last);
			if (last) this._operation.push(last);

		}

		this.setNumberToDisplay();
	}

	getLastItem(isOperator = true) {

		let lastItem;

		for (let i = this._operation.length-1; i >= 0; i--) {

			if (this.isOperator(this._operation[i]) == isOperator) {
				lastItem = this._operation[i];
				break;
			}

		}

		if (!lastItem) {
			lastItem = (isOperator) ? this._operation : this._lastNumber;
		}

		return lastItem;

	}

	setNumberToDisplay() {

		let lastNumber = this.getLastItem(false);

		if (!lastNumber) lastNumber = 0;

		this.displayCalc = lastNumber;
	}

	addOperator(value) {

		if (isNaN(this.getLastOperation())) {

			if (this.isOperator(value)) {

				this.setLastOperator(value);

			} else {

				this.pushOperator(value);
				this.setNumberToDisplay(); 
			}

		} else {

			if (this.isOperator(value)) {

				this.pushOperator(value);

			} else {

				let newValue = this.getLastOperation().toString() + value.toString();
				this.setLastOperator(newValue);

				this.setNumberToDisplay();

			}

			
		}

		
		console.log(this._operation);
	}

	addDot() {

		let lastOperation = this.getLastOperation();

		if (typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;

		if (this.isOperator(lastOperation) || !lastOperation) {
			this.pushOperator('0.');
		} else {
			this.setLastOperator(lastOperation.toString() + '.');
		}

		this.setNumberToDisplay();

	}

	execBtn(value) {

		switch (value) {

			case 'C':
				this.clearEntry();
				break;
			case '+':
				this.addOperator('+');
				break;
			case '-':
				this.addOperator('-');
				break;
			case 'x':
				this.addOperator('*');
				break;
			case '/':
				this.addOperator('/');
				break;
			case '.':
				this.addDot();
				break;
			case '=':
				this.calc();
				break;
			case '%':
				this.addOperator('%');
				break;
			case '0':
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
				this.addOperator(parseInt(value));
				break;
			default:
				this.setError();
				break;

			
		}

	}

	initiButtons() {

		let buttons = document.querySelectorAll('.row > button');

		buttons.forEach(btn => {

			btn.addEventListener('click', () => {
				
				let textBtn = btn.innerHTML;
				console.log(textBtn);
				this.execBtn(textBtn);

			});

		});

	}

	get displayCalc() {

		return this._displayEl.value;
	}


	set displayCalc(v) {

		if (v.toString().length > 20) {
			this.setError();
			return false;
		}

		this._displayEl.value = v;
	}


}

window.calc = new Calculadora(); // variavel global window

