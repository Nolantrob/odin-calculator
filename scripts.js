// Initialize Variables and set display
const display = document.querySelector('#display');
const buttonContainer = document.querySelector('#button-container');

const clearDisplayButton = buttonContainer.querySelector('.clear-display-button');
const numberButtons = buttonContainer.querySelectorAll('.number-button');
const backspaceButton = buttonContainer.querySelector('.backspace-button');
const operatorButtons = buttonContainer.querySelectorAll('.operator-button');
const equalsButton = buttonContainer.querySelector('.equals-button');
const decimalButton = buttonContainer.querySelector('.decimal-button');
const toggleNegativeButton = buttonContainer.querySelector('.negative-button')

let leftArgument = 0;
let rightArgument = '';
let currentOperator = '';
let expression = '';
let operators = '+-%/*';
let numericals = '0123456789'
let isCalculated = false;

function updateDisplay() {

    if (leftArgument.length === 0){
        leftArgument = 0;
    }

    expression = `${leftArgument}${currentOperator}${rightArgument}`;

    display.value = expression;
    isCalculated = false;
}
updateDisplay();

function isOperator(char) {
    return operators.includes(char);
}

function isEmpty(segment) {
    return segment.length <= 0;
}
    
function isNumerical(char) {
    return numericals.includes(char);
}


function addCharToExpression(char) {
    if (leftArgument === 'Nice try' && isOperator(char)){
        return;
    }

    if (isCalculated && !currentOperator && isNumerical(char)){
        leftArgument = char;
        updateDisplay();
        return;
    }

    // If the character is numerical and there's no operator, put it on the left
    if (isNumerical(char) && isEmpty(currentOperator)){
        leftArgument === 0 || leftArgument === '0' ? leftArgument = char : leftArgument += char;
    // If there IS an operator, put it on the right
    } else if (isNumerical(char) && !isEmpty(currentOperator)){
        rightArgument === 0 || rightArgument === '0' ? rightArgument = char : rightArgument += char;
        // If it's neither, it's an operator
    } else {
        // Is there an operator? If no, set operator
        if (isEmpty(rightArgument)){
            currentOperator = char;
            // Otherwise, calculate what we have, and start with our new operator
        } else {
            calculate();
            currentOperator = char;
        }
    }

    updateDisplay();
}

function backspace() {
    if (isCalculated) {
        clearDisplay();
        return;
    } else {
        if (String(rightArgument).length > 0) {
            rightArgument = rightArgument.slice(0, -1);
        } else if (currentOperator.length > 0) {
            currentOperator = currentOperator.slice(0, -1);
        } else {
            leftArgument = String(leftArgument).slice(0, -1);
        }
    }
    updateDisplay();

}

function clearDisplay() {
    leftArgument = '';
    currentOperator = '';
    rightArgument = '';
    updateDisplay();
}


function calculate() {

    if (leftArgument && currentOperator && !rightArgument || leftArgument && !currentOperator && !rightArgument){
        let saveLeft = leftArgument;
        clearDisplay();
        leftArgument = saveLeft;
        updateDisplay();
        return;
    }

    let result;
    let num1 = Number(leftArgument);
    let num2 = Number(rightArgument);
    let easterEggTrigger = false;

    switch(currentOperator){
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num2 === 0 ? easterEggTrigger = true : num1 / num2;
            break;
        case '%':
            result = num1 % num2;
            break;
        default:
            break;
    }

    if (easterEggTrigger === true){
        clearDisplay();
        leftArgument = 'Nice try';
        isCalculated = true;
        updateDisplay();
        return;
    }

    leftArgument = Number.isInteger(result) ? result : result.toFixed(3);
    currentOperator = '';
    rightArgument = '';
    isCalculated = true;
    updateDisplay();
}

function toggleNegative() {
    String(rightArgument).length > 0 ? rightArgument *= -1 : leftArgument *= -1;
    updateDisplay();
}

function createDecimal() {

    if (isCalculated && !rightArgument){
        leftArgument = '0.'
        updateDisplay();
        isCalculated = false;
    }

    if(currentOperator && !String(rightArgument).includes('.')){
        if (rightArgument.length > 0){
            rightArgument += '.';
        } else {
            rightArgument += '0.';
        }
    } else if (!currentOperator && !String(leftArgument).includes('.')){
        leftArgument += '.';
    }
    updateDisplay();
}

// Event Listeners
buttonContainer.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        switch (button.className){
            case 'operator-button':
                addCharToExpression(button.textContent);
                break;
            case 'number-button':
                addCharToExpression(button.textContent);
                break;
            case 'clear-display-button':
                clearDisplay();
                break;
            case 'negative-button':
                toggleNegative();
                break;
            case 'decimal-button':
                createDecimal();
                break;
            case 'equals-button':
                calculate();
                break;
            case 'backspace-button':
                backspace();
                break;
            default:
                break;
        }    
    })
})

document.addEventListener('keypress', (event) => {
    console.log(event.key);
    if (isNumerical(event.key) || isOperator(event.key)){
        addCharToExpression(event.key)
    }

    switch (event.key){
        case '=':
            calculate();
            break;
        case 'Enter':
            calculate();
            break;
        case '.':
            createDecimal();
            break;
        default:
            break;
    }
})
