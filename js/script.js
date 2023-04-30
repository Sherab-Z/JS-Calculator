// OPERATION VARS
const inObj = {
  input: "",
  a: "",
  operator: "",
  b: "",
};

const outObj = {
  result: "",
  toDisplay: "",
  state: "ready mode", // 4 States: ready mode, input mode, operator mode & result mode.
};

// FUNC: Set variable object keys to initial values
function initialize() {
  // Initialize inObj keys
  inObj.input = "";
  inObj.a = "";
  inObj.operator = "";
  inObj.b = "";

  // Initialize outObj keys
  outObj.state = "start mode";

  // Display initial output value
  displayCurrentOutput();
}

// FUNC: Validate input num str and determine whether it can be appended to inObj.input
function filterNumBtnInputStr(btnStr) {
  const numStrsArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  if (btnStr === "." && !inObj.input.includes(".")) {
    return btnStr;
  } else if (numStrsArr.includes(btnStr)) {
    return btnStr;
  }
}

function appendToInputStr(btnStr) {
  inObj.input += btnStr;
  if (outObj.state === "operator mode") {
    inObj.b = inObj.input;
  }
}

function processNumInput() {
  if (outObj.state === "start mode") {
    outObj.state === "input mode";
    displayCurrentOutput();
  } else if (outObj.state === "input mode" || outObj.state === "result mode") {
    displayCurrentOutput();
  } else if (outObj.state === "operator mode") {
    inObj.b = inObj.input;
    displayCurrentOutput();
  }
}

//FUNC: Display the current output value
function displayCurrentOutput() {
  console.log("displayCurrentOutput() called");

  let toDisplay = "";

  if (outObj.state === "start mode") {
    toDisplay = "0";
  } else if (outObj.state === "input mode") {
    toDisplay = inObj.input;
  } else if (outObj.state === "operator mode") {
    toDisplay = inObj.b;
  } else if (outObj.state === "result mode") {
    toDisplay = outObj.result;
  } else {
    throw new Error("No valid mode specified - cannot display output");
  }

  if ( toDisplay.toString().length > 10 ) {
    toDisplay = formatNumberScientifically( toDisplay );
  } 

  display.textContent = toDisplay;
}
  
  function formatNumberScientifically(number) {
    console.log("formatNumberScientifically() called");

    const maxLength = 9;
    const numberStr = number.toString();
  
    if (numberStr.length <= maxLength) {
      return numberStr; // No need to convert to scientific notation.
    }
  
    // Convert to scientific notation and round the significant digits
    const orderOfMagnitude = Math.floor(Math.log10(Math.abs(number)));
    const significantDigits = maxLength - (orderOfMagnitude >= 0 ? 2 : 3); // Adjust for sign, decimal point, and exponent symbol.
    const roundedCoefficient = parseFloat(number / Math.pow(10, orderOfMagnitude)).toFixed(significantDigits - 1);
    return `${roundedCoefficient}e${orderOfMagnitude}`;
  }
  

function toggleNumSign() {
  inObj.input *= -1;
  displayCurrentOutput();
}

function turnNumIntoPercentage() {
  inObj.input *= 0.01;
  displayCurrentOutput();
}

// Operator Functions:
// FUNC: add a and b, return the result
function add(a, b) {
  return a + b;
}

// FUNC: subtract b from a, return the result
function subtract(a, b) {
  return a - b;
}

// FUNC: multiply a and b, return the result
function multiply(a, b) {
  return a * b;
}

// FUNC: divide a by b, return the result
function divide(a, b) {
  return a / b;
}

// FUNC: Take operator button inputs and place the relevant operator function into opObj.operator
function getSelectedOperatorFunction(opStr) {
  //  Type-check arguments
  if (typeof opStr === "string") {
    //  Depending on the operator passed in, call the appropriate operation function on the input.
    switch (opStr) {
      case "+":
        return add;
      case "-":
        return subtract;
      case "*":
        return multiply;
      case "/":
        return divide;
      default:
        console.error(`${opStr} is not a valid operator string`);
    }
  } else {
    // If type-check fails, log an error to the console.
    console.error(`Invalid input: Wrong data type`);
  }
}

function updateCurrentOperator(opFunc) {
  inObj.operator = opFunc;
}

function setOperandA() {
  inObj.a = inObj.input;
  inObj.input = "";
}

function setOperandB() {
  inObj.b = inObj.input;
  inObj.input = "";
}

function performOperation() {
  if (outObj.state === "operator mode") {
    setOperandB();

    const a = Number(inObj.a);
    const b = Number(inObj.b);

    outObj.result = inObj.operator(a, b);
    outObj.state = "result mode";

    displayCurrentOutput();
  } else if (outObj.state === "input mode" || outObj.state === "result mode") {
  }
}

// --- EVENT HANDLERS ---

// HANDLER: 'AC' button click
function handleACBtnInput() {
  initialize(); // Set variable objects inObj and outObj to initial values
}

function handleModBtnInput(event) {
  const mod = event.target.value;

  switch (mod) {
    case "+/-":
      toggleNumSign();
      break;
    case "%":
      turnNumIntoPercentage();
      break;
    default:
      console.log(
        "Error: no valid modifier string recieved by event handler (handleModBtnInput)"
      );
  }
}

// HANDLER: Number button click
function handleNumBtnClick(event) {
  // Call filterNumBtnInputStr() and store the result in a variable

  const filteredInput = filterNumBtnInputStr(event.target.value);

  // Check if the filtered input is not null or undefined, and pass it to processNumInput()
  if (filteredInput != null) {
    outObj.state = "input mode";
    appendToInputStr(filteredInput);
    processNumInput();
  }
}

function handleOpBtnClick(event) {
  const opFunc = getSelectedOperatorFunction(event.target.value);
  if (opFunc) {
    outObj.state = "operator mode";
    updateCurrentOperator(opFunc);
    setOperandA();
  }
}

function handleEqualsBtnClick() {
  performOperation();
}

// --- GET ELEMENTS + ATTACH EVENT LISTENERS ---

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
  btnEl.addEventListener("click", handleNumBtnClick);
}

// Clear (AC) button
const clearBtn = document.querySelector(".btn.modifier.clear");
clearBtn.addEventListener("click", handleACBtnInput);

// Modifier buttons
const modifierBtns = {
  sign: document.querySelector(".btn.modifier.sign"),
  percent: document.querySelector(".btn.modifier.modulus"),
};

modifierBtns["sign"].addEventListener("click", handleModBtnInput);
modifierBtns["percent"].addEventListener("click", handleModBtnInput);

//  Operator buttons
const operatorBtns = {
  //  For readability, I used different names for these buttons than their corresponding functions
  div: document.querySelector(".btn.operator.divide"),
  mult: document.querySelector(".btn.operator.multiply"),
  sub: document.querySelector(".btn.operator.subtract"),
  plus: document.querySelector(".btn.operator.add"),
};

for (const [name, btnEl] of Object.entries(operatorBtns)) {
  btnEl.addEventListener("click", handleOpBtnClick);
}

//  Equals button
const equalsBtn = document.querySelector(".btn.equals");
equalsBtn.addEventListener("click", handleEqualsBtnClick);

// ----------------------------------------------------------------

// *** Temporary functions ****

// FUNC: Update the display with a string from any number button
function sendNumToDisplay(event) {
  outObj.result = event.target.value;
  displayCurrentOutput();
}

// *** ***
