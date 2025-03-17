const buttonContainer = document.querySelector('#button-container');
const numberButtons = buttonContainer.querySelectorAll('.number-button');
const display = document.querySelector('#display');
const clearDisplayButton = buttonContainer.querySelector('.clear-display-button');

clearDisplayButton.addEventListener('click', () => {
    clearDisplay();
})

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        display.textContent += button.textContent;
    })
})

let leftNum;
let rightNum;
let currentOperator;

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

togglePositiveNegative = function() {
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
    display.textContent = '';
}