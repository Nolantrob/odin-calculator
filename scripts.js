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
let finalChar = expression.charAt(expression.length - 1);
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
    return String(string)
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
        let beginLeftArg = decimalLeftArgument === '' ? '0.' : '.';
        addCharacterToExpression(beginLeftArg);            
    } else if (!String(decimalRightArgument).includes('.')){
        let beginRightArg = decimalRightArgument === '' ? '0.' : '.';
        addCharacterToExpression(beginRightArg);            

    }
})

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {

        if (!containsOperator(expression)){
            addCharacterToExpression(button.textContent);
        } else {
            expression = expression.slice(0,-1)
            addCharacterToExpression(button.textContent);
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
    
    if (containsOperator(finalChar)){
        return;
    }

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


// Handles Display
function updateDisplay() {
    if (expression.length <= 0) {
        expression = '0';
    }

    if (expression === '.'){
        expression = '0.'
    }

    display.value = expression;
}

function clearDisplay() {
    expression = '';
    updateDisplay();
}

function backspace() {
    expression = String(expression).slice(0, -1);
    updateDisplay();
}

function addCharacterToExpression(char) {
    if (containsOperator(char)){
        expression += char;
    } else {
        expression === '0' ? expression = char : expression += char;
    }

    updateDisplay();
}