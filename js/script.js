// --- VARIABLE OBJECTS ------------------------------ //
const inputObj = {
  inputStr: "0",
  operandA: "",
  operator: null,
  operandB: "",
};

const outputObj = {
  result: "",
  toDisplay: "",
  state: "ready", // 4 States: ready, input, operator & result.
};

const inputTypeObj = {
  numberBtnType: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."],
  operatorBtnType: ["+", "-", "*", "/"],
  modifierBtnType: ["+/-", "%"],
  clearBtnType: ["AC"],
  equalsBtnType: ["="],
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
    case "numberBtnType":
      processNumberButtonInput(inputStr, inputType);
      break;
    case "modifierBtnType":
      processModifierButtonInput(inputStr, inputType);
      break;
    case "operatorBtnType":
      processOperatorButtonInput(inputStr, inputType);
      break;
    case "clearBtnType":
      processClearButtonInput(inputStr, inputType);
      break;
    case "equalsBtnType":
      processEqualsButtonInput(inputStr, inputType);
      break;
    default:
      throw new Error("Unknown input type");
  }
}

// --- Number Inputting Functions ---//

// FUNC: Validate input number string and determine whether it can be appended to inputObj.inputStr
function filterNumberButtonInput(btnStr) {
  const numStrsArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]; // array of allowed digit inputs

  if (btnStr === "." && !inputObj.inputStr.includes(".")) {
    // If it's the FIRST decimal input, allow it
    return btnStr;
  } else if (numStrsArr.includes(btnStr)) {
    // If it's an allowed digit input, allow it
    return btnStr;
  }
}

function addToInputVarString(btnStr) {
  inputObj.inputStr += btnStr;
}

// HANDLER: Number button click
function processNumberButtonInput(inputStr) {
  const inputType = "numberBtnType";

  if (outputObj.state !== "input") {
    // Unless a number is already being input, clear the inputStr var to start fresh
    inputObj.inputStr = "";
  }

  // Filter the input string and store in a variable
  const filteredInput = filterNumberButtonInput(inputStr, inputType);

  // Check if the filtered input is not null or undefined, and append it to inputStr
  if (filteredInput != null && filteredInput !== undefined) {
    addToInputVarString(filteredInput);
    duplicateInputStrValueToTheCorrectOperand();
    updateAppState("input");
  }
}

function processModifierButtonInput(inputStr) {
  const inputType = "modifierBtnType";
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
  duplicateInputStrValueToTheCorrectOperand();
  updateAppState("input");
}

function processOperatorButtonInput(inputStr) {
  // TODO: Include case: Operator entered after '=' button clicked

  const inputType = "operatorBtnType";

  const newOperatorFunc = getNewOperatorFunction(inputStr, inputType);

  if (newOperatorFunc) {
    if (inputObj.operator === null) {
      // If this is the first operator input in this calculation:
      if (outputObj.state === "ready" || outputObj.state === "input") {
        // Note: I'm using nested if for useful error msgs in case of state mis-alignment, & for consistency
        inputObj.operandA = inputObj.inputStr; // Set operand A to the last input string
        inputObj.operator = newOperatorFunc; // Set operator to current input function
      } else if (outputObj.state === "result") {
        inputObj.operandA = outputObj.result; // Set operand A to the last result
        inputObj.operator = newOperatorFunc; // Set operator to current input
      } else {
        throw new Error(
          `ERROR: First operator entered in calculation, but state is misaligned`
        );
      }
    
    } else {
      //  For subsequent operator inputs, after the first one in a calculation:
      if (outputObj.state === "input") {
        // If the last input was a number
        inputObj.operandB = inputObj.inputStr;
      } else if (outputObj.state === "operator") {
        // If the last input was an operator
        inputObj.operandB = inputObj.operandA;
      } else {
        throw new Error(
          `ERROR: Subsequent operator entered in calculation, but state is misaligned`
        );
      }
      // Perform the operation based on existing operator & place result and new operator in their places
      const operationResult = calculateResult(); // calculate based on set values
      outputObj.result = operationResult.toString(); //

      inputObj.operandA = operationResult.toString(); // Set operand A to the result of the operation
      inputObj.operator = newOperatorFunc; // Update operator to new operator function
    }
  } else {
    throw new Error("Error: No new operator received in calculation");
  }

  // Clear redundant variables
  resetOperandB();

  // Update app state
  updateAppState("operator");
}

function processEqualsButtonInput(inputStr, inputType) {
  if (inputObj.operator === null) {
    // If no operator has been set
    if (outputObj.result === '') {  // IF there's no result from the previous operation
      outputObj.result = inputObj.inputStr;  // Set the result to the input string
    } else {
      // TODO: Fix this so results show up correctly based on variable states. If I hit = twice, it should show the same result; etc
      
    }
  } else {
    if (inputObj.operandB === "") {
      // If an operator has been set, but operandB is empty
      inputObj.operandB = inputObj.operandA; // Copy operandA to operandB
    }
    outputObj.result = calculateResult().toString(); // Set result to the stringified result of the operation
  }

  if (inputObj.operator !== "")
    //  Tidy up the variables
    resetInputObjData();
  updateAppState("result");
}

// HANDLER: 'AC' button click
function processClearButtonInput(inputStr, inputType) {
  resetCalculatorData(); // Set variable objects inputObj and outputObj to initial values
  updateAppState("ready"); // Redundant code included for consistency
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
}

function convertToPercentage() {
  const percentNum = inputObj.inputStr * 0.01; //  get percentage
  inputObj.inputStr = percentNum.toString(); //  Replace inputStr with its percentage in string form.
}

function duplicateInputStrValueToTheCorrectOperand() {
  // Duplicate the inputStr value to an operand, so the calculator is ready to perform a calculation
  if (inputObj.operandA === "") {
    // For first number input, duplicate the inputStr value to operandA
    inputObj.operandA = inputObj.inputStr;
  } else {
    // For subsequent number inputs, duplicate the inputStr value to operandB
    inputObj.operandB = inputObj.inputStr;
  }
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
function getNewOperatorFunction(operatorStr) {
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

function setnewOperatorFunction(newOperatorFunc) {
  inputObj.operator = newOperatorFunc;
  outputObj.state = "operator";
}

function setOperandA() {
  // TODO: Finish setting up the 'operator' mode condition
  inputObj.operandA = inputObj.inputStr;
}

function setOperandB() {
  inputObj.operandB = inputObj.inputStr;
  inputObj.inputStr = "";
}

// --- Calculation Functions --- //
function calculateResult() {
  if (inputObj.operandA && inputObj.operandB) {
    const a = Number(inputObj.operandA);
    const b = Number(inputObj.operandB);

    if (
      inputObj.operator === "divide(a, b) {return a / b;}" &&
      inputObj.operandB === "0"
    ) {
      // IF user tries to divide by 0
      updateDisplay(`That's not allowed!`);
    } else {
      return inputObj.operator(a, b);
    }
  }
}

// FUNC: Manage state after each input event
function updateAppState(newState) {
  outputObj.state = newState;
}

// --- Display Functions ---//

//FUNC: Display the current output value
function updateDisplay(outputString) {
  let toDisplay = "";

  if (!outputString) {

    switch (outputObj.state) {
      case "ready":
        toDisplay = inputObj.inputStr;
        break;
      case "input":
        toDisplay = inputObj.inputStr;
        break;
      case "operator":
        if (inputObj.operator && inputObj.operandB === "") {
          toDisplay = inputObj.operandA;
        } else if (inputObj.operator && inputObj.operandB !== "") {
          toDisplay = inputObj.operandB;
        }
        break;
      case "result":
        toDisplay = outputObj.result;
        break;
      default:
        throw new Error("No valid mode specified - cannot display output");
    }

    if (toDisplay.toString().length > 10) {
      toDisplay = formatNumberScientifically(toDisplay);
    }
  } else {
    toDisplay = outputString;
  }
  display.textContent = toDisplay;
  logObjValues();
}

// --- Initialization Functions --- //

function resetInputString() {
  inputObj.inputStr = "";
}

function resetOperandA() {
  inputObj.operandA = "";
}

function resetOperandB() {
  inputObj.operandB = "";
}

// FUNC: Clear operator values
function resetInputObjData() {
  // TODO: Do I need this function?
  // Initialize inputObj keys
  inputObj.inputStr = "0";
  inputObj.operandA = "";
  inputObj.operator = null;
  inputObj.operandB = "";
}

// FUNC: Set variable object keys to initial values
function resetCalculatorData() {
  // Initialize inputObj keys
  inputObj.inputStr = "0";
  inputObj.operandA = "";
  inputObj.operator = null;
  inputObj.operandB = "";

  // Initialize outputObj keys
  outputObj.result = "";
  outputObj.state = "ready";
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

function logObjValues() {
  console.table([inputObj, outputObj]);
}
