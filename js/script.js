// OPERATION VARS
const a = 0;
const op = "";
const b = 0;

// Operator Functions:
// FUNC: add a and b, return the result
function plus(a, b) {
  return isNaN(a) || isNaN(b) ? prompt("Error: Input is not a number") : a + b;
}

// FUNC: subtract b from a, return the result
function subtract(a, b) {
  return isNaN(a) || isNaN(b) ? prompt("Error: Input is not a number") : a - b;
}

// FUNC: multiply a and b, return the result
function multipliedBy(a, b) {
  return isNaN(a) || isNaN(b) ? prompt("Error: Input is not a number") : a * b;
}

// FUNC: divide a by b, return the result
function dividedBy(a, b) {
  return isNaN(a) || isNaN(b) ? prompt("Error: Input is not a number") : a / b;
}

function operate(a, op, b) {
  if (
    typeof a === "number" &&
    typeof b === "number" &&
    typeof op === "string"
  ) {
    switch (op) {
      case "add":
        return add(a, b);
      case "sub":
        return sub(a, b);
      case "mul":
        return mul(a, b);
      case "div":
        return div(a, b);
      default:
        console.error(op + " is not a valid operator");
    }
  } else {
    console.error("Invalid input: Wrong data type");
  }
}
