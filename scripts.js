// Initialize Variables and set display
const display = document.querySelector('#display');
const buttonContainer = document.querySelector('#button-container');

const clearDisplayButton = buttonContainer.querySelector('.clear-display-button');
const numberButtons = buttonContainer.querySelectorAll('.number-button');
const backspaceButton = buttonContainer.querySelector('.backspace-button');
const operatorButtons = buttonContainer.querySelectorAll('.operator-button');
const equalsButton = buttonContainer.querySelector('.equals-button');

let leftArgument;
let rightArgument;
let currentOperator;
let expression = '';
updateDisplay();

// Event Listeners
document.addEventListener('keypress', (event) => {
    if (event.key <= 10) {
        addCharacterToExpression(event.key);
    }
})

equalsButton.addEventListener('click', () => {
    createPartsForCalculating();
})

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {

        if (!String(expression).includes(button.textContent)) {
            expression += `${button.textContent}`;
            updateDisplay();
        }
    })
})

clearDisplayButton.addEventListener('click', () => {
    clearDisplay();
})
backspaceButton.addEventListener('click', () => {
    backspace();
})

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        addCharacterToExpression(button.textContent)
    })
})


// Math and Calculations

function createPartsForCalculating() {
    let operators = '+-%/*'

    currentOperator = String(expression)
        .split('')
        .find(element => operators.includes(element));

    let operatorIndex = expression.indexOf(currentOperator);

    leftArgument = expression.slice(0, operatorIndex);
    rightArgument = expression.slice(operatorIndex + 1);

    operate(currentOperator, Number(leftArgument), Number(rightArgument));
}

add = function (num1, num2) {
    return num1 + num2;
}

subtract = function (num1, num2) {
    return num1 - num2;
}

multiply = function (num1, num2) {
    return num1 * num2;
}

divide = function (num1, num2) {
    return num1 / num2;
}

operate = function (operator, num1, num2) {

    let doOperation;

    switch (operator) {
        case '+':
            doOperation = add;
            break;
        case '-':
            doOperation = subtract;
            break;
        case '*':
            doOperation = multiply;
            break;
        case '/':
            doOperation = divide;
            break;
        default:
            break;
    }

    expression = doOperation(num1, num2);
    updateDisplay();
}

function isInteger(value) {
    return Number.isInteger(value);
}

// Handles Display
function updateDisplay() {
    if (expression.length <= 0) {
        expression = '0';
    }

    display.value = expression;
}

function clearDisplay() {
    expression = '0';
    updateDisplay();
}

function backspace() {
    expression = String(expression).slice(0, -1);
    updateDisplay();
}

function addCharacterToExpression(char) {

    expression === '0' ? expression = char : expression += char;
    updateDisplay();
}