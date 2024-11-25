const display = document.getElementById('display');
let currentMode = 'degrees'; // Default mode

// Append a value to the display
function append(value) {
    if (value === 'pi') {
        display.value += Math.PI.toFixed(6);
    } else if (value === 'e') {
        display.value += Math.E.toFixed(6);
    } else {
        display.value += value;
    }
}

// Clear the display
function clearDisplay() {
    display.value = '';
}

// Function to calculate the result
function calculate() {
    try {
        if (currentMode === 'radians') {
            calculateRadians();
        } else {
            calculateDegrees();
        }
    } catch (error) {
        display.value = 'Error';
    }
}

// Calculate result in radians
function calculateRadians() {
    try {
        let expression = display.value
            .replace(/\^/g, '**')
            .replace(/sqrt\(/g, 'Math.sqrt(')
            .replace(/sin\(/g, 'Math.sin(')
            .replace(/cos\(/g, 'Math.cos(')
            .replace(/tan\(/g, 'Math.tan(')
            .replace(/log\(/g, 'Math.log10(')
            .replace(/%/g, '/100');

        const result = new Function(`return ${expression}`)();
        display.value = Number.isFinite(result) ? result.toFixed(6) : 'Error';
    } catch {
        display.value = 'Error';
    }
}

// Calculate result in degrees
function calculateDegrees() {
    try {
        let expression = display.value
            .replace(/\^/g, '**')
            .replace(/sqrt\(/g, 'Math.sqrt(')
            .replace(/sin\(/g, 'degToRadSin(')
            .replace(/cos\(/g, 'degToRadCos(')
            .replace(/tan\(/g, 'degToRadTan(')
            .replace(/log\(/g, 'Math.log10(')
            .replace(/%/g, '/100');

        const result = new Function(`return ${expression}`)();
        display.value = Number.isFinite(result) ? result.toFixed(6) : 'Error';
    } catch {
        display.value = 'Error';
    }
}

// Helper functions to convert degrees to radians for trigonometric calculations
function degToRadSin(value) {
    return Math.sin((value * Math.PI) / 180);
}

function degToRadCos(value) {
    return Math.cos((value * Math.PI) / 180);
}

function degToRadTan(value) {
    return Math.tan((value * Math.PI) / 180);
}

// Switch to radians mode
function setRadiansMode() {
    currentMode = 'radians';
    clearDisplay(); // Clear the display to avoid confusion
    updateModeLabel();
}

// Switch to degrees mode
function setDegreesMode() {
    currentMode = 'degrees';
    clearDisplay(); // Clear the display to avoid confusion
    updateModeLabel();
}


function backspace() {
    display.value = display.value.slice(0, -1); // Remove the last character
}


// Update the mode label visually
function updateModeLabel() {
    const radiansButton = document.getElementById('radians-mode');
    const degreesButton = document.getElementById('degrees-mode');
    radiansButton.classList.toggle('active', currentMode === 'radians');
    degreesButton.classList.toggle('active', currentMode === 'degrees');
}
