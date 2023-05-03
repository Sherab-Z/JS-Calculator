// --- VARIABLE OBJECTS ------------------------------ //
const inputObj = {
  inputStr: "",
  operandA: "",
  operator: "",
  operandB: "",
};

const outputObj = {
  result: "",
  state: "ready", // 4 States: ready, input, operator & result.
};

const inputTypeObj = {
  numType: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."],
  opType: ["+", "-", "*", "/"],
  modType: ["+/-", "%"],
  clearType: ["AC"],
  equalsType: ["="],
};

// --- EVENT HANDLERS ------------------------------ //

function handleButtonClick(event) {
  const inputStr = event.target.value;
  const inputType = getInputType(inputStr);

  callMatchingInputProcessorFunction(inputStr, inputType);

  updateDisplay();
}

// --- Process button inputs --- //

function callMatchingInputProcessorFunction(inputStr, inputType) {
  switch (inputType) {
    case "numType":
      processNumberButtonInput(inputStr);
      break;
    case "modType":
      processModifierButtonInput(inputStr);
      break;
    case "opType":
      processOperatorButtonInput(inputStr);
      break;
    case "clearType":
      processClearButtonInput();
      break;
    case "equalsType":
      processEqualsButtonInput();
      break;
    default:
      throw new Error("Unknown input type");
  }
}

// HANDLER: Number button click
function processNumberButtonInput(inputStr) {
  // Filter the input string and store in a variable

  const filteredInput = filterNumberButtonInput(inputStr);

  // Check if the filtered input is not null or undefined, and pass it to updateAppState()
  if (filteredInput != null && filteredInput !== undefined) {
    updateAppState();
    addToInputStr(filteredInput);
    updateDisplay();
  }
}

function processModifierButtonInput(inputStr) {
  const modifier = inputStr;

  switch (modifier) {
    case "+/-":
      toggleNumberSign();
      break;
    case "%":
      convertToPercentage();
      break;
    default:
      throw new Error(
        "Error: no valid modifier string received by event handler (processModifierButtonInput)"
      );
  }
}

function processOperatorButtonInput(inputStr) {
  const operatorFunc = getSelectedOperatorFunction(inputStr);

  if (operatorFunc) {
    setOperandA();

    if (inputObj.operator && inputObj.operandA && inputObj.operandB) {
      executeOperation();
    }

    outputObj.state = "operator";
    setOperatorFunction(operatorFunc);
  }
  console.table([inputObj, outputObj]);
}

function processEqualsButtonInput() {
  executeOperation();
}
// HANDLER: 'AC' button click
function processClearButtonInput() {
  resetCalculator(); // Set variable objects inputObj and outputObj to initial values
}

// --- Number Inputting Functions ---//

// FUNC: Validate input number string and determine whether it can be appended to inputObj.inputStr
function filterNumberButtonInput(btnStr) {
  const numStrsArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  if (btnStr === "." && !inputObj.inputStr.includes(".")) {
    return btnStr;
  } else if (numStrsArr.includes(btnStr)) {
    return btnStr;
  }
}

function addToInputStr(btnStr) {
  inputObj.inputStr += btnStr;
  if (outputObj.state === "operator") {
    inputObj.operandB = inputObj.inputStr;
  }
}

// --- State Management Functions --- //

function getInputType(inputStr) {
  for (const key in inputTypeObj) {
    if (inputTypeObj[key].includes(inputStr)) {
      return key;
    }
  }
  return null;
}

// FUNC: Manage state after each input event
function updateAppState(inputType) {
  // For number, operator and modifier button inputs:
  if (
    inputObj.state === "ready" ||
    inputObj.state === "input" ||
    inputObj.state === "result"
  ) {
    switch (inputType) {
      case "numBtn":
        inputObj.state = "input";
        return;
      case "opBtn":
        inputObj.state = "operator";
        return;
      case "modBtn":
        inputObj.state = "input";
        return;
      default:
      // Do nothing
    }
  } else if (inputObj.state === "operator") {
    inputObj.state = "operator";
    return;
  }

  // For clear and equals button inputs:
  if (inputType === "equalsBtn") {
    inputObj.state = "result";
    return;
  } else if (inputType === "clearBtn") {
    inputObj.state = "ready";
    return;
  }
}

// --- Display Functions ---//

//FUNC: Display the current output value
function updateDisplay() {
  let toDisplay = "";

  if (outputObj.state === "ready") {
    toDisplay = "0";
  } else if (outputObj.state === "input") {
    toDisplay = inputObj.inputStr;
  } else if (outputObj.state === "operator") {
    toDisplay = inputObj.operandB;
  } else if (outputObj.state === "result") {
    toDisplay = outputObj.result;
  } else {
    throw new Error("No valid mode specified - cannot display output");
  }

  if (toDisplay.toString().length > 10) {
    toDisplay = formatNumberScientifically(toDisplay);
  }

  display.textContent = toDisplay;

  console.table([inputObj, outputObj]);
}

function formatNumberScientifically(number) {
  const maxLength = 9;
  const numberStr = number.toString();

  if (numberStr.length <= maxLength) {
    return numberStr; // No need to convert to scientific notation.
  }

  // Convert to scientific notation and round the significant digits
  const orderOfMagnitude = Math.floor(Math.log10(Math.abs(number)));
  const significantDigits = maxLength - (orderOfMagnitude >= 0 ? 2 : 3); // Adjust for sign, decimal point, and exponent symbol.
  const roundedCoefficient = parseFloat(
    number / Math.pow(10, orderOfMagnitude)
  ).toFixed(significantDigits - 1);
  return `${roundedCoefficient}e${orderOfMagnitude}`;
}

// --- Modifier Functions ---//

function toggleNumberSign() {
  // Convert the input string to a number.
  const number = parseFloat(inputObj.inputStr);

  // Toggle the sign.
  const toggledNumber = number * -1;

  // Update the input value and display.
  const toggledNumberStr = toggledNumber.toString();
  inputObj.inputStr =
    toggledNumberStr.length > 10
      ? formatNumberScientifically(toggledNumber)
      : toggledNumberStr;
  updateDisplay();
}

function convertToPercentage() {
  inputObj.inputStr *= 0.01;
  updateDisplay();
}

// --- Operator Functions ---//

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
function getSelectedOperatorFunction(operatorStr) {
  //  Type-check arguments
  if (typeof operatorStr === "string") {
    //  Depending on the operator passed in, call the appropriate operation function on the input.
    switch (operatorStr) {
      case "+":
        return add;
      case "-":
        return subtract;
      case "*":
        return multiply;
      case "/":
        return divide;
      default:
        console.error(`${operatorStr} is not a valid operator string`);
    }
  } else {
    // If type-check fails, log an error to the console.
    console.error(`Invalid input: Wrong data type`);
  }
}

function setOperatorFunction(operatorFunc) {
  inputObj.operator = operatorFunc;
  outputObj.state = "operator";
}

function setOperandA() {
  inputObj.operandA = inputObj.inputStr;
  inputObj.inputStr = "";
}

function setOperandB() {
  inputObj.operandB = inputObj.inputStr;
  inputObj.inputStr = "";
}

// --- Calculation Functions --- //
function executeOperation() {
  // TODO: Fix bug - after operator btn click, next number input sets state back to "input", but it should stay in "operator" state

  if (outputObj.state === "operator") {
    setOperandB();

    const a = Number(inputObj.operandA);
    const b = Number(inputObj.operandB);

    outputObj.result = inputObj.operator(a, b);
    outputObj.state = "result";

    updateDisplay();
  } else if (outputObj.state === "input") {
    outputObj.result = inputObj.inputStr;
    inputObj.inputStr = "";
    outputObj.state = "result";

    updateDisplay();
  } else if (outputObj.state === "result" || outputObj.state === "ready") {
    // Do nothing
  }

  console.log(
    `executeOperation(), inputObj: [input: ${inputObj.inputStr}, a: ${inputObj.operandA}, op: ${inputObj.operator}, b: ${inputObj.operandB}] outputObj: [result: ${outputObj.result}, state: ${outputObj.state}]`
  );
}

// --- Initialization Functions --- //

// FUNC: Set variable object keys to initial values
function resetCalculator() {
  // Initialize inputObj keys
  inputObj.inputStr = "";
  inputObj.operandA = "";
  inputObj.operator = "";
  inputObj.operandB = "";

  // Initialize outputObj keys
  outputObj.result = "";
  outputObj.state = "ready";

  // Display initial output value
  updateDisplay();
}

// --- GET ELEMENTS + ATTACH EVENT LISTENERS --- //

//  Display
const display = document.querySelector(".display.txt");

//  Number buttons
const numberButtons = {
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

for (const btnEl of Object.values(numberButtons)) {
  btnEl.addEventListener("click", handleButtonClick);
}

// Clear (AC) button
const clearButton = document.querySelector(".btn.modifier.clear");
clearButton.addEventListener("click", handleButtonClick);

// Modifier buttons
const modifierButtons = {
  sign: document.querySelector(".btn.modifier.sign"),
  percent: document.querySelector(".btn.modifier.modulus"),
};

modifierButtons["sign"].addEventListener("click", handleButtonClick);
modifierButtons["percent"].addEventListener("click", handleButtonClick);

//  Operator buttons
const operatorButtons = {
  //  For readability, I used different names for these buttons than their corresponding functions
  div: document.querySelector(".btn.operator.divide"),
  mult: document.querySelector(".btn.operator.multiply"),
  sub: document.querySelector(".btn.operator.subtract"),
  plus: document.querySelector(".btn.operator.add"),
};

Object.values(operatorButtons).forEach((btnEl) => {
  btnEl.addEventListener("click", handleButtonClick);
});

//  Equals button
const equalsBtn = document.querySelector(".btn.equals");
equalsBtn.addEventListener("click", handleButtonClick);

// ----------------------------------------------------------------
