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
};

// FUNC: Set variable object keys to initial values
function initialize() {
  // Set all inObj keys to null
  Object.keys(inObj).forEach((key) => (inObj[key] = null));
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

// FUNC: Update the display with a string from any number button
function sendNumToDisplay(a) {
  outObj.output = a;
  displayOutput();
}

//  Get reference to Display
const display = document.querySelector(".display.txt");

//  ATTACH EVENT HANDLERS TO BUTTONS

//  Number buttons
const numBtns = {
  decimal: document.querySelector(".btn.decimal"),
  zero: document.querySelector(".btn.num-0"),
  one: document.querySelector(".btn.num-1"),
  two: document.querySelector(".btn.num-2"),
  three: document.querySelector(".btn.num-3"),
  four: document.querySelector(".btn.num-4"),
  five: document.querySelector(".btn.num-5"),
  six: document.querySelector(".btn.num-6"),
  seven: document.querySelector(".btn.num-7"),
  eight: document.querySelector(".btn.num-8"),
  nine: document.querySelector(".btn.num-9"),
};

for (const btnEl of Object.values(numBtns)) {
  btnEl.addEventListener("click", () => sendNumToDisplay(btnEl.value));
}

// Modifier buttons
const modifierBtns = {
  clear: document.querySelector(".btn.modifier.clear"),
  sign: document.querySelector(".btn.modifier.sign"),
  percent: document.querySelector(".btn.modifier.modulus"),
};

modifierBtns["clear"].addEventListener("click", () => sendNumToDisplay(event.target.value));
modifierBtns["sign"].addEventListener("click", () => sendNumToDisplay(event.target.value));
modifierBtns["percent"].addEventListener("click", () => sendNumToDisplay(event.target.value));

//  Operator buttons
const operatorBtns = {
  //  For readability, I used different names for these buttons than their corresponding functions
  div: document.querySelector(".btn.operator.divide"),
  mult: document.querySelector(".btn.operator.multiply"),
  sub: document.querySelector(".btn.operator.subtract"),
  plus: document.querySelector(".btn.operator.add"),
};

for (const [name, btnEl] of Object.entries(operatorBtns)) {
  btnEl.addEventListener("click", () => sendNumToDisplay(event.target.value));
}

//  Equals button
const equalsBtn = document.querySelector(".btn.equals");
equalsBtn.addEventListener("click", () => operate());
