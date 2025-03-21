// Initialize Variables and set display
const display = document.querySelector('#display');
const buttonContainer = document.querySelector('#button-container');

const clearDisplayButton = buttonContainer.querySelector('.clear-display-button');
const numberButtons = buttonContainer.querySelectorAll('.number-button');
const backspaceButton = buttonContainer.querySelector('.backspace-button');
const operatorButtons = buttonContainer.querySelectorAll('.operator-button');
const equalsButton = buttonContainer.querySelector('.equals-button');
const decimalButton = buttonContainer.querySelector('.decimal-button');

let leftArgument;
let rightArgument;
let currentOperator;
let expression = '';
let operators = '+-%/*';
updateDisplay();

// Event Listeners
document.addEventListener('keypress', (event) => {
    if (event.key <= 10) {
        addCharacterToExpression(event.key);
    }
})

equalsButton.addEventListener('click', () => {
    createPartsForCalculating(expression);
    operate(currentOperator, Number(leftArgument), Number(rightArgument));
})

function containsOperator(string) {
    return string
        .split('')
        .some(char => operators.includes(char));
}

decimalButton.addEventListener('click', () => {

    let decimalOperator = String(expression)
        .split('')
        .find(element => operators.includes(element));


    let decimalOperatorIndex = expression.indexOf(decimalOperator);
    let decimalLeftArgument = containsOperator(expression) ? expression.slice(0, decimalOperatorIndex) : expression;
    let decimalRightArgument = expression.slice(decimalOperatorIndex + 1);

    if (!String(decimalLeftArgument).includes('.')){
        addCharacterToExpression('.');
    } else if (!String(decimalRightArgument).includes('.')){
        addCharacterToExpression('.');
    }
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

function createPartsForCalculating(expression) {

    currentOperator = String(expression)
        .split('')
        .find(element => operators.includes(element));

    let operatorIndex = expression.indexOf(currentOperator);

    leftArgument = expression.slice(0, operatorIndex);
    rightArgument = expression.slice(operatorIndex + 1);

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
    return num2 === 0 ? '5138008' : num1 / num2;
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