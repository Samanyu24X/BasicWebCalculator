class Calculator {
    constructor(prevOperandText, currOperandText) {
        this.prevOperandText = prevOperandText;
        this.currOperandText = currOperandText;
        this.clear()
    }

    clear() {
        this.currOperand = ''; // clear both operands and operation
        this.prevOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currOperand = this.currOperand.toString().slice(0, -1) // get rid of last digit
    }

    appendNumber(number) {
        if (number === '.' && this.currOperand.includes('.')) return // if user tries to add a second decimal point, return
        this.currOperand = this.currOperand.toString() + number.toString() // concatenate current number with new digit
    }

    chooseOperation(operation) {
        if (this.currOperand === '') return // return if no operand
        if (this.prevOperand !== '') { // compute if there is a previous operand
            this.compute()
        }
        this.operation = operation // save the new operator and move the current operand up
        this.prevOperand = this.currOperand
        this.currOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.prevOperand)
        const curr = parseFloat(this.currOperand)
        if (isNaN(prev) || isNaN(curr)) return // return if previous or current are NaN, otherwise compute
        switch (this.operation) {
            case '+':
                computation = prev + curr
                break
            case '-':
                computation = prev - curr
                break
            case '*':
                computation = prev * curr
                break
            case '÷':
                if (curr === 0) {
                    computation = 0 // if dividing by 0, manually set answer to 0 instead of defaulting to infinity
                } else {
                computation = prev / curr
                }
                break
            default:
                return
        }
        this.currOperand = computation // put the answer in the current operand display
        this.operation = undefined
        this.prevOperand = '' // set previous operand to blank
    }

    getDisplayNumber(number) {
        const stringNum = number.toString()
        const intDigits = parseFloat(stringNum.split('.')[0]) // grab integer digits and decimal digits
        const decDigits = stringNum.split('.')[1]
        let intDisplay
        if (isNaN(intDigits)) {
            intDisplay = '' // if there are no integer digits, leave blank
        } else {
            intDisplay = intDigits.toLocaleString('en', {
                maximumFractionDigits: 0}) // if there are integer digits, format them with commas
        }
        if (decDigits != null) {
            return `${intDisplay}.${decDigits}` // if there are decimal digits, concatenate with integer digits
        } else {
            return intDisplay
        } 
    }

    updateDisplay() {
        this.currOperandText.innerText = this.getDisplayNumber(this.currOperand) // get display number from helper function
        if (this.operation != null) {
            this.prevOperandText.innerText = `${this.getDisplayNumber(this.prevOperand)} ${this.operation}` // if there is an operator, concatenate it with the previous operand
        } else {
            this.prevOperandText.innerText = '' // otherwise, set previous operand to blank
        }
    }
}

// connect button variables with the buttons on the document
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete')
const clearButton = document.querySelector('[data-clear]')
const prevOperandText = document.querySelector('[data-prev-operand]')
const currOperandText = document.querySelector('[data-curr-operand]')

// create calculator and add event listeners with their respective methods
const calculator = new Calculator(prevOperandText, currOperandText)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})