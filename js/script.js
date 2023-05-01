// OPERATION VARS
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

// FUNC: Set variable object keys to initial values
function resetCalculator() {
  // Initialize inputObj keys
  inputObj.inputStr = "";
  inputObj.operandA = "";
  inputObj.operator = "";
  inputObj.operandB = "";

  // Initialize outputObj keys
  outputObj.state = "ready";

  // Display initial output value
  updateDisplay();
}

// FUNC: Validate input num str and determine whether it can be appended to inputObj.inputStr
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
    inputObj.b = inputObj.inputStr;
  }
}

function handleNumericInput() {
  if (outputObj.state === "ready") {
    outputObj.state === "input";
    updateDisplay();
  } else if (outputObj.state === "input" || outputObj.state === "result") {
    updateDisplay();
  } else if (outputObj.state === "operator") {
    inputObj.b = inputObj.inputStr;
    updateDisplay();
  }
}

//FUNC: Display the current output value
function updateDisplay() {
  console.log("updateDisplay() called");

  let toDisplay = "";

  if (outputObj.state === "ready") {
    toDisplay = "0";
  } else if (outputObj.state === "input") {
    toDisplay = inputObj.inputStr;
  } else if (outputObj.state === "operator") {
    toDisplay = inputObj.b;
  } else if (outputObj.state === "result") {
    toDisplay = outputObj.result;
  } else {
    throw new Error("No valid mode specified - cannot display output");
  }

  if (toDisplay.toString().length > 10) {
    toDisplay = formatNumberScientifically(toDisplay);
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
  const roundedCoefficient = parseFloat(
    number / Math.pow(10, orderOfMagnitude)
  ).toFixed(significantDigits - 1);
  return `${roundedCoefficient}e${orderOfMagnitude}`;
}

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
function setSelectedOperatorFunction(operatorStr) {
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

function updateOperatorFunction(operatorFunc) {
  inputObj.operator = operatorFunc;
}

function setOperandA() {
  inputObj.operandA = inputObj.inputStr;
  inputObj.inputStr = "";
}

function setOperandB() {
  inputObj.b = inputObj.inputStr;
  inputObj.inputStr = "";
}

function executeOperation() {
  console.log(
    `executeOperation(), inputObj: [input: ${inputObj.inputStr}, a: ${inputObj.operandA}, op: ${inputObj.operator}, b: ${inputObj.b}] outputObj: [result: ${outputObj.result}, state: ${outputObj.state}]`
  );

  if (outputObj.state === "operator") {
    setOperandB();

    const a = Number(inputObj.operandA);
    const b = Number(inputObj.b);

    outputObj.result = inputObj.operator(a, b);
    outputObj.state = "result";

    updateDisplay();
  } else if (outputObj.state === "input") {
    outputObj.result = inputObj.inputStr;
    inputObj.inputStr = "";
    outputObj.state = "result";

    updateDisplay();
  } else if (outputObj.state === "result") {
    // Do nothing
  } else if (outputObj.state === "ready") {
  }
}
// --- EVENT HANDLERS ---

// HANDLER: 'AC' button click
function handleClearButtonClick() {
  resetCalculator(); // Set variable objects inputObj and outputObj to initial values
}

function handleModifierButtonClick(event) {
  const modifier = event.target.value;

  switch (modifier) {
    case "+/-":
      toggleNumberSign();
      break;
    case "%":
      convertToPercentage();
      break;
    default:
      console.log(
        "Error: no valid modifier string recieved by event handler (handleModifierButtonClick)"
      );
  }
}

// HANDLER: Number button click
function handleNumberButtonClick(event) {
  // Filter the input string and store in a variable 

  const filteredInput = filterNumberButtonInput(event.target.value);

  // Check if the filtered input is not null or undefined, and pass it to handleNumericInput()
  if (filteredInput != null) {
    outputObj.state = "input";
    addToInputStr(filteredInput);
    handleNumericInput();
  }
}

function handleOperatorButtonClick(event) {
  const operatorFunc = setSelectedOperatorFunction(event.target.value);
  if (operatorFunc) {
    outputObj.state = "operator";
    updateOperatorFunction(operatorFunc);
    setOperandA();
  }
}

function handleEqualsButtonClick() {
  executeOperation();
}

// --- GET ELEMENTS + ATTACH EVENT LISTENERS ---

//  Get reference to Display
const display = document.querySelector(".display.txt");

//  ATTACH EVENT HANDLERS TO BUTTONS

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
  btnEl.addEventListener("click", handleNumberButtonClick);
}

// Clear (AC) button
const clearButton = document.querySelector(".btn.modifier.clear");
clearButton.addEventListener("click", handleClearButtonClick);

// Modifier buttons
const modifierButtons = {
  sign: document.querySelector(".btn.modifier.sign"),
  percent: document.querySelector(".btn.modifier.modulus"),
};

modifierButtons["sign"].addEventListener("click", handleModifierButtonClick);
modifierButtons["percent"].addEventListener("click", handleModifierButtonClick);

//  Operator buttons
const operatorButtons = {
  //  For readability, I used different names for these buttons than their corresponding functions
  div: document.querySelector(".btn.operator.divide"),
  mult: document.querySelector(".btn.operator.multiply"),
  sub: document.querySelector(".btn.operator.subtract"),
  plus: document.querySelector(".btn.operator.add"),
};

Object.values(operatorButtons).forEach((btnEl) => {
  btnEl.addEventListener("click", handleOperatorButtonClick);
});


//  Equals button
const equalsBtn = document.querySelector(".btn.equals");
equalsBtn.addEventListener("click", handleEqualsButtonClick);

// ----------------------------------------------------------------

// *** Temporary functions ****

// *** ***
