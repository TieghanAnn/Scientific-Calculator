// Get the display screen and buttons
var calcScreen = document.querySelector('#calc-screen');
var calculatorButtons = document.querySelectorAll('.btn');

// Loop through each button and add event listener
for (let button of calculatorButtons) {
    button.addEventListener('click', (event) => {
        let buttonText = event.target.innerText;

        // Handle multiplication and division symbol conversion
        if (buttonText == '×') {
            buttonText = '*';
        }
        if (buttonText == '÷') {
            buttonText = '/';
        }

        // Handle special button '=' for evaluation
        if (buttonText == '=') {
            evaluateExpression();
            return;
        }

        // Handle the "AC" button for clearing the screen
        if (buttonText == 'AC') {
            clearScreen();
            return;
        }

        // Append button text to screen
        calcScreen.value += buttonText;
    });
}

// Clear the screen
function clearScreen() {
    calcScreen.value = '';
}

// Evaluate the mathematical expression
function evaluateExpression() {
    try {
        // Attempt to evaluate the expression safely
        calcScreen.value = (new Function('return ' + calcScreen.value))();
    } catch (error) {
        calcScreen.value = "Error"; // Show error if expression is invalid
    }
}

// Trigonometric functions (convert to radians)
function sinFunction() {
    let value = parseFloat(calcScreen.value);
    if (!isNaN(value)) {
        calcScreen.value = Math.sin(toRadians(value));
    } else {
        calcScreen.value = "Error"; // Invalid input
    }
}

function cosFunction() {
    let value = parseFloat(calcScreen.value);
    if (!isNaN(value)) {
        calcScreen.value = Math.cos(toRadians(value));
    } else {
        calcScreen.value = "Error"; // Invalid input
    }
}

function tanFunction() {
    let value = parseFloat(calcScreen.value);
    if (!isNaN(value)) {
        calcScreen.value = Math.tan(toRadians(value));
    } else {
        calcScreen.value = "Error"; // Invalid input
    }
}

// Square root function
function sqrtFunction() {
    let value = parseFloat(calcScreen.value);
    if (!isNaN(value) && value >= 0) {
        calcScreen.value = Math.sqrt(value);
    } else {
        calcScreen.value = "Error"; // Invalid input
    }
}

// Logarithm function
function logFunction() {
    let value = parseFloat(calcScreen.value);
    if (!isNaN(value) && value > 0) {
        calcScreen.value = Math.log(value);
    } else {
        calcScreen.value = "Error"; // Invalid input
    }
}

// Insert π (Pi) constant
function insertPi() {
    calcScreen.value += Math.PI;
}

// Insert Euler's constant (e)
function insertE() {
    calcScreen.value += Math.E;
}

// Power function (x^2)
function powerFunction() {
    let value = parseFloat(calcScreen.value);
    if (!isNaN(value)) {
        calcScreen.value = Math.pow(value, 2);
    } else {
        calcScreen.value = "Error"; // Invalid input
    }
}

// Factorial function
function calculateFactorial() {
    let value = parseInt(calcScreen.value);
    if (!isNaN(value) && value >= 0) {
        let result = 1;
        for (let i = 1; i <= value; i++) {
            result *= i;
        }
        calcScreen.value = result;
    } else {
        calcScreen.value = "Error"; // Invalid input
    }
}

// Convert degrees to radians (since trig functions expect radians)
function toRadians(degrees) {
    return degrees * Math.PI / 180;
}
