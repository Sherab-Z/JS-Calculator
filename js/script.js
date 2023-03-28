// Operator Functions:
// FUNC: sum() input 2 numbers, return their sum
function add(a, b) {
  return (isNaN(a) || isNaN(b)) ? prompt("Error: Input is not a number") : a + b;
}

// FUNC: subtract() input 2 numbers, return their difference
function subtract(a, b) {
  return (isNaN(a) || isNaN(b)) ? prompt("Error: Input is not a number") : a - b;
}

// FUNC: multiply() input 2 numbers, return their multiplication
function multiply(a, b) {
  return (isNaN(a) || isNaN(b)) ? prompt("Error: Input is not a number") : a * b;
}

// FUNC: divide() input 2 numbers, return their division
function divide(a, b) {
  return (isNaN(a) || isNaN(b)) ? prompt("Error: Input is not a number") : a / b;
}