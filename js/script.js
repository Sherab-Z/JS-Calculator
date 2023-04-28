// OPERATION VARS
const inObj = {
  input: "",
  a: "",
  operator: "",
  b: "",
};

const toggleObj = {
  decimalApplied: false,
};

const outObj = {
  result: "",
  state: "ready mode",  // 4 States: ready mode, input mode, operator mode & result mode.
};

// FUNC: Set variable object keys to initial values
function initialize() {
  // Initialize inObj keys
  inObj.input = "";
  inObj.a = "";
  inObj.operator = "";
  inObj.b = "";

  // Initialize temporary variables
  toggleObj.decimalApplied = false;

  // Initialize outObj keys
  outObj.state = "start mode";

  // Display initial output value
  displayCurrentOutput();
}

// FUNC: Validate input num str and determine whether it can be appended to inObj.input
function filterNumBtnInputStr(btnStr) {
  const numStrsArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  if (btnStr.length <= 10) {
    if (btnStr === "." && !inObj.input.includes(".")) {
      return btnStr;
    } else if (numStrsArr.includes(btnStr)) {
      return btnStr;
    }
  }
}

function appendToInputStr(btnStr) {
  inObj.input += btnStr;
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
  if (outObj.state === "start mode") {
    display.textContent = "0";
  } else if (outObj.state === "input mode") {
    display.textContent = inObj.input;
  } else if (outObj.state === "operator mode") {
    display.textContent = inObj.b;
  } else if (outObj.state === "result mode") {
    display.textContent = outObj.result;
  } else {
    throw new Error("No valid mode specified - cannot display output");
  }
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
function add() {
  return inObj.a + inObj.b;
}

// FUNC: subtract b from a, return the result
function subtract() {
  return inObj.a - inObj.b;
}

// FUNC: multiply a and b, return the result
function multiply() {
  return inObj.a * inObj.b;
}

// FUNC: divide a by b, return the result
function divide() {
  return inObj.a / inObj.b;
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

function performOperation() {
  if (outObj.state === "operator mode") {
    inObj.b = inObj.input;

    const a = Number(inObj.a);
    const b = Number(inObj.b);

    const opResult = inObj.operator(a, b);

    outObj.result = opResult;

    sendNumToDisplay(opResult);
  } else if (outObj.state === "input mode" || outObj.state === "input mode") {

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
    updateCurrentOperator(opFunc);
    outObj.state = "operator mode";
  }
}

function handleEqualsBtnClick() {
  performOperation(inObj.operator);
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
