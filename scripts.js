const display = document.querySelector('#display');
const buttonContainer = document.querySelector('#button-container');

const clearDisplayButton = buttonContainer.querySelector('.clear-display-button');
const numberButtons = buttonContainer.querySelectorAll('.number-button');
const backspaceButton = buttonContainer.querySelector('.backspace-button');
const operatorButtons = buttonContainer.querySelectorAll('.operator-button');
const equalsButton = buttonContainer.querySelector('.equals-button');

let leftArgument = 0;
let rightArgument = '';
let currentOperator = '';
let expression = `${leftArgument}${currentOperator}${rightArgument}`;
updateDisplay();

// equalsButton.addEventListener('click', () => {
//     operate()
// })

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

        if (!expression.includes(button.textContent)){
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

function updateDisplay() {
    display.textContent = expression;
}

add = function(num1,num2) {
    return num1 + num2;
}

subtract = function(num1,num2) {
    return num1 - num2;
}

multiply = function(num1, num2) {
    return num1 * num2;
}

divide = function(num1,num2) {
    return num1 / num2;
}

operate = function(operator,num1,num2) {
    switch(operator){
        case 'add':
            add(num1,num2)
            break;
        case 'subtract':
            subtract(num1,num2)
            break;
        case 'multiply':
            multiply(num1,num2)
            break;
        case 'divide':
            divide(num1,num2)
            break;
        default:
            break;
    }
}

function clearDisplay() {
    expression = '0';
    updateDisplay();
}

function backspace() {
    expression = expression.slice(0,-1);
    updateDisplay();
}