const display = document.querySelector('#display');
const buttonContainer = document.querySelector('#button-container');

const clearDisplayButton = buttonContainer.querySelector('.clear-display-button');
const numberButtons = buttonContainer.querySelectorAll('.number-button');
const backspaceButton = buttonContainer.querySelector('.backspace-button');
const operatorButtons = buttonContainer.querySelectorAll('.operator-button');
const equalsButton = buttonContainer.querySelector('.equals-button');

equalsButton.addEventListener('click', () => {
    createPartsForCalculating();
})

let leftArgument;
let rightArgument;
let currentOperator;
let expression = '';
updateDisplay();

function createPartsForCalculating() {
    let operators = '+-%/*'

    currentOperator = expression
        .split('')
        .find(element => operators.includes(element));

    let operatorIndex = expression.indexOf(currentOperator);

    leftArgument = expression.slice(0,operatorIndex);
    rightArgument = expression.slice(operatorIndex + 1);

    operate(currentOperator,Number(leftArgument),Number(rightArgument));
}

document.addEventListener('keypress', (event) => {
    if (event.key <= 10){
        addCharacterToExpression(event.key);
    }
})

function addCharacterToExpression(char) {
    if (expression.length >= 15){
        return;
    }

    expression === '0' ? expression = char : expression += char;
    updateDisplay();    
}

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {

        if (!String(expression).includes(button.textContent)){
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



add = function(num1,num2) {
    expression = num1 + num2;
}

subtract = function(num1,num2) {
    expression = num1 - num2;
}

multiply = function(num1, num2) {
    expression = num1 * num2;
}

divide = function(num1,num2) {
    expression = num1 / num2;
}

operate = function(operator,num1,num2) {

    switch(operator){
        case '+':
            add(num1,num2);
            updateDisplay();
            break;
        case '-':
            subtract(num1,num2);
            updateDisplay();
            break;
        case '*':
            multiply(num1,num2)
            updateDisplay();            
            break;
        case '/':
            divide(num1,num2)
            updateDisplay();
            break;
        default:
            break;
    }
}

function updateDisplay() {
    if (expression.length <= 0){
        expression = '0';
    }

    display.textContent = expression;
}

function clearDisplay() {
    expression = '0'
    updateDisplay();
}

function backspace() {
    expression = expression.slice(0,-1);
    updateDisplay();
}