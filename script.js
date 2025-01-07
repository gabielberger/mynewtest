Sure! Here's a simple calculator built using HTML, CSS, and JavaScript. This calculator can perform basic arithmetic operations such as addition, subtraction, multiplication, and division.

### HTML
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Calculator</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="calculator">
        <input type="text" class="calculator-screen" value="" disabled />
        <div class="calculator-keys">
            <button type="button" class="operator" value="+">+</button>
            <button type="button" class="operator" value="-">-</button>
            <button type="button" class="operator" value="*">&times;</button>
            <button type="button" class="operator" value="/">&divide;</button>

            <button type="button" value="7">7</button>
            <button type="button" value="8">8</button>
            <button type="button" value="9">9</button>

            <button type="button" value="4">4</button>
            <button type="button" value="5">5</button>
            <button type="button" value="6">6</button>

            <button type="button" value="1">1</button>
            <button type="button" value="2">2</button>
            <button type="button" value="3">3</button>

            <button type="button" value="0">0</button>
            <button type="button" class="decimal" value=".">.</button>
            <button type="button" class="all-clear" value="all-clear">AC</button>

            <button type="button" class="equal-sign" value="=">=</button>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

### CSS (styles.css)
```css
body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f4f9;
    font-family: 'Arial', sans-serif;
}

.calculator {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}

.calculator-screen {
    width: 100%;
    height: 40px;
    border: none;
    background-color: #252525;
    color: #fff;
    text-align: right;
    font-size: 24px;
    padding-right: 10px;
    padding-left: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
}

button {
    height: 60px;
    width: 60px;
    border: none;
    background-color: #eaeaea;
    font-size: 18px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:active {
    background-color: #d4d4d4;
}

button.operator {
    background-color: #ff9500;
    color: #fff;
}

button.equal-sign {
    background-color: #ff9500;
    color: #fff;
    height: calc(60px * 2 + 10px);
}

button.all-clear {
    background-color: #ff3b30;
    color: #fff;
}

button.decimal {
    background-color: #d4d4d2;
}
```

### JavaScript (script.js)
```javascript
const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand === true) return;

    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondOperand)  {
        calculator.operator = nextOperator;
        return;
    }

    if (firstOperand == null) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const currentValue = firstOperand || 0;
        const result = performCalculation[operator](currentValue, inputValue);

        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
}

const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    '=': (firstOperand, secondOperand) => secondOperand
};

function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
}

function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('all-clear')) {
        resetCalculator();
        updateDisplay();
        return;
    }

    inputDigit(target.value);
    updateDisplay();
});
```

### Explanation
- **HTML**: This code sets up a simple structure for the calculator with a screen to display the current input or result and buttons for each digit and operation.
- **CSS**: This styles the calculator to make it visually appealing, adding colors, spacing, and transitions.
- **JavaScript**: This script provides the functionality for the calculator. It handles digit and operator inputs, performs calculations, updates the display, and resets the calculator.
