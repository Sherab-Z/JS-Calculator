// OPERATION VARS
const inObj = {
  input: null,
  a: null,
  operator: null,
  b: null,
  modifier: null,
};

const outObj = {
  output: 0,
  state: "input mode",
}

// FUNC: Set variable object keys to initial values
function initialize() {
  // Set all inObj keys to null
  Object.keys(inObj).forEach(key => inObj[key] = null);
  // Set outObj keys to initial values
  outObj.output = 0;
  outObj.state = "input mode";

  // Display initial output value
  displayOutput();
}

//FUNC: Display the current output value
function displayOutput() {
  display.textContent = outObj.output;
}

// Operator Functions:
// FUNC: add a and b, return the result
function add(a, b) {
  // Update properties in inObj
  inObj.a = a;
  inObj.b = b;

  // Return the sum.
  return a + b;
}

// FUNC: subtract b from a, return the result
function subtract(a, b) {
  // Update properties in inObj
  inObj.a = a;
  inObj.b = b;

  // Return the result.
  return a - b;
}

// FUNC: multiply a and b, return the result
function multiply(a, b) {
  // Update properties in inObj
  inObj.a = a;
  inObj.b = b;

  // Return the result.
  return a * b;
}

// FUNC: divide a by b, return the result
function divide(a, b) {
  // Update properties in inObj
  inObj.a = a;
  inObj.b = b;

  // Return the result.
  return a / b;
}

// function operate(operator) {
//   //  Type-check arguments
//   if (typeof operator === "string") {
//     //  Depending on the operator passed in, call the appropriate operation function on the input.
//     switch (operator) {
//       case "+":
//         return add(a, b);
//       case "-":
//         return subtract(a, b);
//       case "*":
//         return multiply(a, b);
//       case "/":
//         return divide(a, b);
//       default:
//         console.error(`${operator} is not a valid operator`);
//     }
//   } else {
//     // If type-check fails, log an error to the console.
//     console.error(`Invalid input: Wrong data type`);
//   }
// }

// FUNC: update the display with a string from any number button
function sendNumToDisplay(a) {
  outObj.output = a; 
  displayOutput();
}


// EVENT HANDLERS

// Display
const display = document.querySelector(".display.txt");

// Number buttons
const numBtns = {
  '.': document.querySelector(".btn.decimal"),
  '0': document.querySelector(".btn.num-0"),
  '1': document.querySelector(".btn.num-1"),
  '2': document.querySelector(".btn.num-2"),
  '3': document.querySelector(".btn.num-3"),
  '4': document.querySelector(".btn.num-4"),
  '5': document.querySelector(".btn.num-5"),
  '6': document.querySelector(".btn.num-6"),
  '7': document.querySelector(".btn.num-7"),
  '8': document.querySelector(".btn.num-8"),
  '9': document.querySelector(".btn.num-9")
};

for (const [key, value] of Object.entries(numBtns)) {
  value.addEventListener("click", () => sendNumToDisplay(key));
};

// Modifier buttons
const modifierBtns = {
  clear: document.querySelector(".btn.modifier.clear"),
  sign: document.querySelector(".btn.modifier.sign"),
  modulus: document.querySelector(".btn.modifier.modulus"),
};


  modifierBtns['clear'].addEventListener("click", () => initialize);


// Operator buttons
const operatorBtns = {
  '/': document.querySelector(".btn.operator.divide"),
  '*': document.querySelector(".btn.operator.multiply"),
  '-': document.querySelector(".btn.operator.subtract"),
  '+': document.querySelector(".btn.operator.add"),
};

for (const [key, value] of Object.entries(operatorBtns)) {
  value.addEventListener("click", () => sendNumToDisplay(value.textContent));
};

// Equals button
const equalsBtn = document.querySelector(".btn.equals");
equalsBtn.addEventListener("click", () => operate());


