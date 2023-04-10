// OPERATION VARS
const inObj = {
  input: null,
  a: null,
  operator: null,
  b: null,
  modifier: null,
};

const outObj = {
  result: 0,
  state: "input mode",
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

// FUNC: updates the display with a string from any number button
function sendNumToDisplay(a) {
  outObj.displayVal = a; // Hold the current display value in inObj for later use

  switch (a) {
    case "0":
      display.textContent = "0";
      break;
    case "1":
      display.textContent = "1";
      break;
    case "2":
      display.textContent = "2";
      break;
    case "3":
      display.textContent = "3";
      break;
    case "4":
      display.textContent = "4";
      break;
    case "5":
      display.textContent = "5";
      break;
    case "6":
      display.textContent = "6";
      break;
    case "7":
      display.textContent = "7";
      break;
    case "8":
      display.textContent = "8";
      break;
    case "9":
      display.textContent = "9";
      break;
    default:
      console.error("Unexpected input to sendNumToDisplay: " + a);
  }
}


// EVENT HANDLING
// Number Buttons
const display = document.querySelector(".display.txt");

const decimalBtn = document.querySelector(".btn.decimal");
decimalBtn.addEventListener("click", () => sendNumToDisplay("."));

const zeroBtn = document.querySelector(".btn.num-0");
zeroBtn.addEventListener("click", () => sendNumToDisplay("0"));

const oneBtn = document.querySelector(".btn.num-1");
oneBtn.addEventListener("click", () => sendNumToDisplay("1"));

const twoBtn = document.querySelector(".btn.num-2");
twoBtn.addEventListener("click", () => sendNumToDisplay("2"));

const threeBtn = document.querySelector(".btn.num-3");
threeBtn.addEventListener("click", () => sendNumToDisplay("3"));

const fourBtn = document.querySelector(".btn.num-4");
fourBtn.addEventListener("click", () => sendNumToDisplay("4"));

const fiveBtn = document.querySelector(".btn.num-5");
fiveBtn.addEventListener("click", () => sendNumToDisplay("5"));

const sixBtn = document.querySelector(".btn.num-6");
sixBtn.addEventListener("click", () => sendNumToDisplay("6"));

const sevenBtn = document.querySelector(".btn.num-7");
sevenBtn.addEventListener("click", () => sendNumToDisplay("7"));

const eightBtn = document.querySelector(".btn.num-8");
eightBtn.addEventListener("click", () => sendNumToDisplay("8"));

const nineBtn = document.querySelector(".btn.num-9");
nineBtn.addEventListener("click", () => sendNumToDisplay("9"));

